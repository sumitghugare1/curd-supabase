import CreateEventForm from '@/components/CreateEventForm';
import { getAllEvents } from '@/services/db';

export default async function EventsAdminPage() {
  const events = await getAllEvents();

  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Manage Events</h1>
      
      <CreateEventForm />

      <h2 style={{ marginTop: '40px' }}>Existing Events</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {events.map(event => (
          <div key={event.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <strong>{event.name}</strong> - {new Date(event.start_date).toLocaleString()}
          </div>
        ))}
      </div>
    </main>
  );
}