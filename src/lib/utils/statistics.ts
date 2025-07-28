// Example utility functions for fetching statistics data from external sources
// This demonstrates how to integrate with APIs, databases, or other data sources

export interface StatisticMetric {
  label: string;
  value: string;
  change: string;
  status: "pass" | "fail" | "neutral";
}

export interface StatisticCategory {
  title: string;
  metrics: StatisticMetric[];
}

export interface StatisticsData {
  digitalAdoption: StatisticCategory;
  infrastructure: StatisticCategory;
  cybersecurity: StatisticCategory;
  digitalEconomy: StatisticCategory;
}

// Example 1: Fetch from external API
export async function fetchStatisticsFromAPI(): Promise<StatisticsData> {
  try {
    // Replace with your actual API endpoint
    // const response = await fetch('https://api.example.com/statistics', {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.STATISTICS_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    // });

    // if (process.env.APP_ENV === 'production' && !response.ok) {
    //   throw new Error('Failed to fetch statistics');
    // }

    // dummy data
    return {
      digitalAdoption: {
        title: "Digital Adoption",
        metrics: [
          {
            label: "E-Government Services",
            value: "85%",
            change: "+5%",
            status: "pass",
          },
          {
            label: "Digital Payments",
            value: "92%",
            change: "+8%",
            status: "pass",
          },
          {
            label: "Online Banking",
            value: "78%",
            change: "+12%",
            status: "pass",
          },
          {
            label: "E-Commerce Usage",
            value: "67%",
            change: "+15%",
            status: "pass",
          },
        ],
      },
      infrastructure: {
        title: "Digital Infrastructure",
        metrics: [
          {
            label: "5G Coverage",
            value: "75%",
            change: "+20%",
            status: "pass",
          },
          {
            label: "Fiber Optic Coverage",
            value: "68%",
            change: "+10%",
            status: "pass",
          },
          { label: "Digital Hubs", value: "45", change: "+5", status: "pass" },
          { label: "Smart Cities", value: "12", change: "+3", status: "pass" },
        ],
      },
      cybersecurity: {
        title: "Cybersecurity",
        metrics: [
          {
            label: "Security Incidents",
            value: "1,234",
            change: "-15%",
            status: "pass",
          },
          {
            label: "Response Time",
            value: "2.3hrs",
            change: "-30%",
            status: "pass",
          },
          {
            label: "Security Training",
            value: "15,000",
            change: "+25%",
            status: "pass",
          },
          {
            label: "Compliance Rate",
            value: "98%",
            change: "+2%",
            status: "pass",
          },
        ],
      },
      digitalEconomy: {
        title: "Digital Economy",
        metrics: [
          {
            label: "Digital GDP",
            value: "RM 45.2B",
            change: "+18%",
            status: "pass",
          },
          {
            label: "Tech Startups",
            value: "2,847",
            change: "+22%",
            status: "pass",
          },
          {
            label: "Digital Jobs",
            value: "125,000",
            change: "+35%",
            status: "pass",
          },
          {
            label: "Foreign Investment",
            value: "RM 8.9B",
            change: "+28%",
            status: "pass",
          },
        ],
      },
    };
    // return await response.json();
  } catch (error) {
    console.error("Error fetching statistics from API:", error);
    // Return fallback data
    return getFallbackStatistics();
  }
}

// Example 2: Fetch from database (e.g., PostgreSQL, MySQL)
export async function fetchStatisticsFromDatabase(): Promise<StatisticsData> {
  try {
    // Example using a database client
    // const { Pool } = require('pg');
    // const pool = new Pool({
    //   connectionString: process.env.DATABASE_URL,
    // });

    // const result = await pool.query(`
    //   SELECT category, label, value, change_percentage
    //   FROM statistics
    //   WHERE active = true
    //   ORDER BY category, display_order
    // `);

    // Process the database results into the expected format
    // return processDatabaseResults(result.rows);

    // For now, return fallback data
    return getFallbackStatistics();
  } catch (error) {
    console.error("Error fetching statistics from database:", error);
    return getFallbackStatistics();
  }
}

// Example 3: Fetch from file system (JSON, CSV, etc.)
export async function fetchStatisticsFromFile(): Promise<StatisticsData> {
  try {
    // Example reading from a JSON file
    // const fs = require('fs').promises;
    // const data = await fs.readFile('./data/statistics.json', 'utf8');
    // return JSON.parse(data);

    // For now, return fallback data
    return getFallbackStatistics();
  } catch (error) {
    console.error("Error fetching statistics from file:", error);
    return getFallbackStatistics();
  }
}

// Example 4: Fetch from third-party services (Google Analytics, etc.)
export async function fetchStatisticsFromThirdParty(): Promise<StatisticsData> {
  try {
    // Example using Google Analytics API
    // const { google } = require('googleapis');
    // const analytics = google.analytics('v3');

    // const auth = new google.auth.GoogleAuth({
    //   keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    //   scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    // });

    // const response = await analytics.data.ga.get({
    //   auth,
    //   ids: 'ga:' + process.env.GA_VIEW_ID,
    //   'start-date': '30daysAgo',
    //   'end-date': 'today',
    //   metrics: 'ga:sessions,ga:users,ga:pageviews',
    //   dimensions: 'ga:date',
    // });

    // Process the analytics data into your format
    // return processAnalyticsData(response.data);

    // For now, return fallback data
    return getFallbackStatistics();
  } catch (error) {
    console.error("Error fetching statistics from third-party:", error);
    return getFallbackStatistics();
  }
}

// Fallback data when external sources fail
function getFallbackStatistics(): StatisticsData {
  return {
    digitalAdoption: {
      title: "Digital Adoption",
      metrics: [
        {
          label: "E-Government Services",
          value: "85%",
          change: "+5%",
          status: "pass",
        },
        {
          label: "Digital Payments",
          value: "92%",
          change: "+8%",
          status: "pass",
        },
        {
          label: "Online Banking",
          value: "78%",
          change: "+12%",
          status: "pass",
        },
        {
          label: "E-Commerce Usage",
          value: "67%",
          change: "+15%",
          status: "pass",
        },
      ],
    },
    infrastructure: {
      title: "Digital Infrastructure",
      metrics: [
        { label: "5G Coverage", value: "75%", change: "+20%", status: "pass" },
        {
          label: "Fiber Optic Coverage",
          value: "68%",
          change: "+10%",
          status: "pass",
        },
        { label: "Digital Hubs", value: "45", change: "+5", status: "pass" },
        { label: "Smart Cities", value: "12", change: "+3", status: "pass" },
      ],
    },
    cybersecurity: {
      title: "Cybersecurity",
      metrics: [
        {
          label: "Security Incidents",
          value: "1,234",
          change: "-15%",
          status: "pass",
        },
        {
          label: "Response Time",
          value: "2.3hrs",
          change: "-30%",
          status: "pass",
        },
        {
          label: "Security Training",
          value: "15,000",
          change: "+25%",
          status: "pass",
        },
        {
          label: "Compliance Rate",
          value: "98%",
          change: "+2%",
          status: "pass",
        },
      ],
    },
    digitalEconomy: {
      title: "Digital Economy",
      metrics: [
        {
          label: "Digital GDP",
          value: "RM 45.2B",
          change: "+18%",
          status: "pass",
        },
        {
          label: "Tech Startups",
          value: "2,847",
          change: "+22%",
          status: "pass",
        },
        {
          label: "Digital Jobs",
          value: "125,000",
          change: "+35%",
          status: "pass",
        },
        {
          label: "Foreign Investment",
          value: "RM 8.9B",
          change: "+28%",
          status: "pass",
        },
      ],
    },
  };
}

// Main function to get statistics data
export async function getStatisticsData(
  source: "api" | "database" | "file" | "third-party" = "api",
): Promise<StatisticsData> {
  switch (source) {
    case "api":
      return fetchStatisticsFromAPI();
    case "database":
      return fetchStatisticsFromDatabase();
    case "file":
      return fetchStatisticsFromFile();
    case "third-party":
      return fetchStatisticsFromThirdParty();
    default:
      return getFallbackStatistics();
  }
}
