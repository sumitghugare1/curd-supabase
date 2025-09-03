import { getNextUpcomingEvent } from '@/services/db'; // Use the new function
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';

export default async function EventPage() {
  const event = await getNextUpcomingEvent(); // Fetch only the next event

  // If no upcoming event is found, display a message.
  if (!event) {
    return (
        <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <Link href="/">&larr; Back to home</Link>
            <h1 style={{ marginTop: '20px' }}>Events</h1>
            <p>No upcoming events are currently scheduled. Please check back later!</p>
        </main>
    );
  }

  // --- Create the Event Schema from the correct event data ---
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "startDate": event.start_date,
    "endDate": event.end_date,
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "VirtualLocation",
      "url": event.location_url || "https://curd-supabase.vercel.app/event"
    },
    "image": [
      event.image_url || "https://curd-supabase.vercel.app/default-post-image.png"
     ],
    "description": event.description,
    "organizer": {
      "@type": "Organization",
      "name": "supabase curd app",
      "url": "https://curd-supabase.vercel.app"
    }
  };

  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <JsonLd data={eventSchema} />

      <Link href="/">&larr; Back to home</Link>
      <h1 style={{ marginTop: '20px' }}>{event.name}</h1>
      <p><strong>Date:</strong> {new Date(event.start_date).toLocaleString()}</p>
      <img src={event.image_url || "https://curd-supabase.vercel.app/default-post-image.png"} alt="Event Banner" style={{width: '100%', marginTop: '20px'}}/>
      <p style={{ marginTop: '20px' }}>{event.description}</p>
    </main>
  );
}