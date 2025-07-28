import { getPayload } from "payload";
import configPromise from "@payload-config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await getPayload({
    config: await configPromise,
  });

  const body = await req.json();

  try {
    const feedback = await payload.create({
      collection: "feedback",
      data: body,
    });

    return NextResponse.json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error submitting feedback" },
      { status: 500 },
    );
  }
} 