'use server'; 

import { revalidatePath } from 'next/cache';
import { updateLocalBusinessSettings, updateOrganizationSettings } from '@/services/db';

// Server Action to update local business settings
export async function updateLocalBusinessAction(formData) {
  const settingsData = {
    name: formData.get('name'),
    streetAddress: formData.get('streetAddress'),
    addressLocality: formData.get('addressLocality'),
    addressRegion: formData.get('addressRegion'),
    postalCode: formData.get('postalCode'),
    telephone: formData.get('telephone'),
    priceRange: formData.get('priceRange'),
  };

  await updateLocalBusinessSettings(settingsData);

  // Revalidate the homepage where this data is displayed
  revalidatePath('/');
}


// Server Action to update organization settings
export async function updateOrganizationAction(formData) {
  const settingsData = {
    name: formData.get('org_name'),
    url: formData.get('org_url'),
    logo: formData.get('org_logo'),
  };

  await updateOrganizationSettings(settingsData);

  // Revalidate the root layout where this data is used
  revalidatePath('/', 'layout');
}