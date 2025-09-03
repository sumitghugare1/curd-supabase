"use client";

import { createEventAction } from '@/services/server/events';

export default function CreateEventForm() {
  
  // This function will reset the form after successful submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await createEventAction(formData);
    event.target.reset();
    alert('Event created successfully!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
      <div>
        <label htmlFor="name">Event Name</label>
        <input id="name" name="name" type="text" style={{ width: '100%', padding: '8px' }} required />
      </div>
      <div>
        <label htmlFor="start_date">Start Date</label>
        <input id="start_date" name="start_date" type="datetime-local" style={{ width: '100%', padding: '8px' }} required />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={5} style={{ width: '100%', padding: '8px' }} />
      </div>
      <div>
        <label htmlFor="location_url">Location URL (e.g., webinar link)</label>
        <input id="location_url" name="location_url" type="url" style={{ width: '100%', padding: '8px' }} />
      </div>
      <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white' }}>Create Event</button>
    </form>
  );
}