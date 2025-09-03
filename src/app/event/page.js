import JsonLd from '@/components/JsonLd';
import Link from 'next/link';

// This is the main page component for the event page
export default function EventPage() {

  // --- Create the Event Schema ---
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Supabase Meetup",
    "startDate": "2025-12-01T19:00-05:00",
    "endDate": "2025-12-01T21:00-05:00",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "VirtualLocation",
      "url": "https://curd-supabase.vercel.app/event"
    },
    "image": [
      "https://curd-supabase.vercel.app/default-post-image.png"
     ],
    "description": "Join us for a virtual meetup to discuss the latest in Supabase and Next.js integration.",
    "organizer": {
      "@type": "Organization",
      "name": "supabase curd app",
      "url": "https://curd-supabase.vercel.app"
    }
  };

  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      {/* This script tag injects the structured data into the page */}
      <JsonLd data={eventSchema} />

      <Link href="/">&larr; Back to home</Link>
      <h1 style={{ marginTop: '20px' }}>Supabase Meetup</h1>
      <p>Join us for our annual virtual meetup!</p>
      <img src="https://curd-supabase.vercel.app/default-post-image.png" alt="Event Banner" style={{width: '100%', marginTop: '20px'}}/>
      <p style={{ marginTop: '20px' }}>A comprehensive meetup covering the latest trends in Supabase for 2025, including real-time databases, authentication, and edge functions.</p>
    </main>
  );
}