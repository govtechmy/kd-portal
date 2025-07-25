# Statistics Page

This is a new statistics page that demonstrates how to create pages in your Next.js application that don't rely on PayloadCMS for content management.

## Features

- **External Data Integration**: Fetches data from external sources instead of PayloadCMS
- **Internationalization**: Supports both English (en-GB) and Malay (ms-MY)
- **Responsive Design**: Modern UI with trend indicators and statistics cards
- **Fallback Data**: Graceful degradation when external sources are unavailable

## File Structure

```
src/app/[locale]/statistik/
├── page.tsx              # Main page component (server-side)
├── page-component.tsx    # Client-side component with UI
└── README.md            # This documentation
```

## Data Sources

The statistics page can fetch data from multiple sources:

### 1. External API
```typescript
// Example API endpoint
const response = await fetch('https://api.example.com/statistics', {
  headers: {
    'Authorization': `Bearer ${process.env.STATISTICS_API_KEY}`,
    'Content-Type': 'application/json',
  },
});
```

### 2. Database
```typescript
// Example PostgreSQL query
const result = await pool.query(`
  SELECT category, label, value, change_percentage 
  FROM statistics 
  WHERE active = true 
  ORDER BY category, display_order
`);
```

### 3. File System
```typescript
// Example reading JSON file
const data = await fs.readFile('./data/statistics.json', 'utf8');
return JSON.parse(data);
```

### 4. Third-party Services
```typescript
// Example Google Analytics integration
const response = await analytics.data.ga.get({
  auth,
  ids: 'ga:' + process.env.GA_VIEW_ID,
  'start-date': '30daysAgo',
  'end-date': 'today',
  metrics: 'ga:sessions,ga:users,ga:pageviews',
});
```

## Usage

### Basic Usage
```typescript
import { getStatisticsData } from "@/lib/utils/statistics";

// Fetch from API (default)
const data = await getStatisticsData('api');

// Fetch from database
const data = await getStatisticsData('database');

// Fetch from file
const data = await getStatisticsData('file');

// Fetch from third-party service
const data = await getStatisticsData('third-party');
```

### Custom Implementation
You can also implement your own data fetching logic:

```typescript
// In your page.tsx
const Statistik: FSP = async ({ locale }) => {
  // Your custom data fetching logic here
  const data = await fetchYourCustomData();
  
  return (
    <Suspense>
      <StatistikComponent
        data={data}
        locale={locale}
      />
    </Suspense>
  );
};
```

## Data Structure

The statistics data should follow this interface:

```typescript
interface StatisticsData {
  digitalAdoption: {
    title: string;
    metrics: Array<{ label: string; value: string; change: string }>;
  };
  infrastructure: {
    title: string;
    metrics: Array<{ label: string; value: string; change: string }>;
  };
  cybersecurity: {
    title: string;
    metrics: Array<{ label: string; value: string; change: string }>;
  };
  digitalEconomy: {
    title: string;
    metrics: Array<{ label: string; value: string; change: string }>;
  };
}
```

## Environment Variables

Add these to your `.env` file:

```env
# For API integration
STATISTICS_API_KEY=your_api_key_here
STATISTICS_API_URL=https://api.example.com/statistics

# For database integration
DATABASE_URL=postgresql://user:password@localhost:5432/database

# For Google Analytics integration
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json
GA_VIEW_ID=your_ga_view_id
```

## Translation Keys

The page uses these translation keys:

### English (en-GB.json)
```json
{
  "Header": {
    "statistics": "Statistics"
  },
  "Statistics": {
    "header": "Digital Statistics",
    "description": "Comprehensive overview of Malaysia's digital progress",
    "important_note": "Important Note",
    "note_text": "This data is updated regularly and based on official sources. For the latest information, please refer to official Ministry of Digital reports.",
    "categories": {
      "digital_adoption": "Digital Adoption",
      "infrastructure": "Digital Infrastructure",
      "cybersecurity": "Cybersecurity",
      "digital_economy": "Digital Economy"
    }
  }
}
```

### Malay (ms-MY.json)
```json
{
  "Header": {
    "statistics": "Statistik"
  },
  "Statistics": {
    "header": "Statistik Digital",
    "description": "Tinjauan komprehensif mengenai kemajuan digital Malaysia",
    "important_note": "Nota Penting",
    "note_text": "Data ini dikemas kini secara berkala dan berdasarkan sumber rasmi. Untuk maklumat terkini, sila rujuk laporan rasmi Kementerian Digital.",
    "categories": {
      "digital_adoption": "Penerimaan Digital",
      "infrastructure": "Prasarana Digital",
      "cybersecurity": "Keselamatan Siber",
      "digital_economy": "Ekonomi Digital"
    }
  }
}
```

## Navigation

To add this page to your navigation, update your header component to include the statistics link:

```typescript
// In your header component
const navItems = [
  // ... other items
  {
    name: t("Header.statistics"),
    href: `/${locale}/statistik`,
  },
];
```

## Customization

### Styling
The page uses Tailwind CSS classes. You can customize the appearance by modifying the classes in `page-component.tsx`.

### Icons
The page uses custom icons from `src/icons/`. You can add new icons or modify existing ones to match your design.

### Layout
The page follows the same layout pattern as other pages in your application, using the `Section` component and maintaining consistency with your design system.

## Error Handling

The page includes built-in error handling:
- Fallback data when external sources fail
- Graceful degradation of UI components
- Console logging for debugging

## Performance

- Server-side rendering for better SEO
- Suspense boundaries for loading states
- Optimized data fetching with caching strategies
- Responsive images and components

## Security

- Environment variables for sensitive data
- Input validation and sanitization
- CORS handling for external APIs
- Rate limiting for external requests 