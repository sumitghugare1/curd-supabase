'use server'; 

import { revalidatePath } from 'next/cache';
import { createEvent } from '@/services/db';
import { EVENT_FIELDS, TABLES } from '@/lib/schema';

// Server Action to create a new event
export async function createEventAction(formData) {
  const eventData = {
    [EVENT_FIELDS.NAME]: formData.get('name'),
    [EVENT_FIELDS.START_DATE]: new Date(formData.get('start_date')).toISOString(),
    [EVENT_FIELDS.DESCRIPTION]: formData.get('description'),
    [EVENT_FIELDS.LOCATION_URL]: formData.get('location_url'),
  };

  await createEvent(eventData);

  // Trigger rebuild of the public event page as per the guide
  revalidatePath('/event');
}