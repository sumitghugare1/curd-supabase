'use server'; 

import { revalidatePath } from 'next/cache';
import { createFaq } from '@/services/db';
import { FAQ_FIELDS } from '@/lib/schema';

// Server Action to create a new FAQ
export async function createFaqAction(formData) {
  const faqData = {
    [FAQ_FIELDS.QUESTION]: formData.get('question'),
    [FAQ_FIELDS.ANSWER]: formData.get('answer'),
  };

  await createFaq(faqData);

  // Revalidate the homepage where the FAQs are displayed
  revalidatePath('/');
}