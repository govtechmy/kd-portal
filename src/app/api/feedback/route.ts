import { getPayload } from "payload";
import configPromise from "@payload-config";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// In-memory store for rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3; // 3 submissions per 15 minutes per IP

// Validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateICNumber(icNumber: string): boolean {
  const icRegex = /^\d{6}-\d{2}-\d{4}$/;
  return icRegex.test(icNumber);
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^\d{1,4}\s?\d{1,4}\s?\d{1,4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Cloudflare Turnstile verification
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
    console.warn('Cloudflare Turnstile secret key not configured');
    return true; // Skip verification if not configured
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  record.count++;
  return true;
}

// Spam detection
function detectSpam(data: any): boolean {
  const { name, message, email } = data;
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /\b(viagra|casino|loan|credit|buy\s+now|click\s+here)\b/i,
    /\b(https?:\/\/[^\s]+)/i, // URLs in message
    /\b[A-Z]{10,}\b/, // ALL CAPS words
    /\b\w{50,}\b/, // Very long words
  ];

  const textToCheck = `${name} ${message} ${email}`.toLowerCase();
  
  return suspiciousPatterns.some(pattern => pattern.test(textToCheck));
}

export async function POST(req: Request) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || 
             headersList.get('x-real-ip') || 
             'unknown';

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { turnstileToken, ...feedbackData } = body;

  // Validate required fields
  const requiredFields = ['name', 'ic_number', 'address', 'phone', 'email', 'agency', 'message'];
  for (const field of requiredFields) {
    if (!feedbackData[field] || feedbackData[field].trim() === '') {
      return NextResponse.json(
        { message: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  // Validate field formats
  if (!validateEmail(feedbackData.email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  if (!validateICNumber(feedbackData.ic_number)) {
    return NextResponse.json(
      { message: "Invalid IC number format" },
      { status: 400 }
    );
  }

  if (!validatePhone(feedbackData.phone)) {
    return NextResponse.json(
      { message: "Invalid phone number format" },
      { status: 400 }
    );
  }

  // Check message length
  if (feedbackData.message.length < 10) {
    return NextResponse.json(
      { message: "Message must be at least 10 characters long" },
      { status: 400 }
    );
  }

  if (feedbackData.message.length > 2000) {
    return NextResponse.json(
      { message: "Message must be less than 2000 characters" },
      { status: 400 }
    );
  }

  // Spam detection
  if (detectSpam(feedbackData)) {
    return NextResponse.json(
      { message: "Message appears to be spam" },
      { status: 400 }
    );
  }

  // Verify Cloudflare Turnstile (if configured)
  if (turnstileToken) {
    const isValidTurnstile = await verifyTurnstile(turnstileToken, ip);
    if (!isValidTurnstile) {
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 }
      );
    }
  }

  const payload = await getPayload({
    config: await configPromise,
  });

  try {
    const feedback = await payload.create({
      collection: "feedback",
      data: {
        ...feedbackData,
        ip_address: ip,
        submitted_at: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { message: "Error submitting feedback" },
      { status: 500 }
    );
  }
} 