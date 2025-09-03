import { supabase } from '@/lib/supabaseClient';
import { TABLES, POST_FIELDS, EVENT_FIELDS, PRODUCT_FIELDS,FAQ_FIELDS } from '@/lib/schema';

// This is the only file that should import and use the supabase client directly.

// Fetches all posts from the database.
export async function getAllPosts() {
  const { data, error } = await supabase
    .from(TABLES.POSTS)
    .select('*')
    .order(POST_FIELDS.CREATED_AT, { ascending: false });

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to fetch posts.');
  }
  return data;
}

// Fetches a single post by its ID.
export async function getPostById(id) {
    const { data, error } = await supabase
        .from(TABLES.POSTS)
        .select('*')
        .eq(POST_FIELDS.ID, id)
        .single();

    if (error) {
        console.error('Database Error:', error.message);
        throw new Error('Failed to fetch post.');
    }
    return data;
}

// Creates a new post in the database.
export async function createPost(postData) {
  const { data, error } = await supabase
    .from(TABLES.POSTS)
    .insert(postData)
    .select()
    .single();

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to create post.');
  }
  return data;
}

// Updates an existing post by its ID.
export async function updatePost(id, postData) {
  const { data, error } = await supabase
    .from(TABLES.POSTS)
    .update(postData)
    .eq(POST_FIELDS.ID, id)
    .select()
    .single();

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to update post.');
  }
  return data;
}

// Deletes a post by its ID.
export async function deletePost(id) {
  const { error } = await supabase
    .from(TABLES.POSTS)
    .delete()
    .eq(POST_FIELDS.ID, id);

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to delete post.');
  }
}




//events

export async function getAllEvents() {
  const { data, error } = await supabase
    .from(TABLES.EVENTS)
    .select('*')
    .order(EVENT_FIELDS.START_DATE, { ascending: true });

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to fetch events.');
  }
  return data;
}


export async function getNextUpcomingEvent() {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from(TABLES.EVENTS)
    .select('*')
    .gte(EVENT_FIELDS.START_DATE, now) // Get events where start_date is greater than or equal to now
    .order(EVENT_FIELDS.START_DATE, { ascending: true }) // Order by the soonest
    .limit(1) // We only want the very next one
    .single(); // Return as a single object, not an array

  // Note: .single() will return an error if no rows are found, which is okay.
  // We can just log it and return null.
  if (error && error.code !== 'PGRST116') { // PGRST116 is the error for "exact one row not found"
    console.error('Database Error:', error.message);
    throw new Error('Failed to fetch the next upcoming event.');
  }

  return data;
}




// Creates a new event in the database.
export async function createEvent(eventData) {
  const { data, error } = await supabase
    .from(TABLES.EVENTS)
    .insert(eventData)
    .select()
    .single();

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to create event.');
  }
  return data;
}



//PRODUCTS

// Fetches all products from the database.
export async function getAllProducts() {
  const { data, error } = await supabase
    .from(TABLES.PRODUCTS)
    .select('*')
    .order(PRODUCT_FIELDS.CREATED_AT, { ascending: false });

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to fetch products.');
  }
  return data;
}

// Creates a new product in the database.
export async function createProduct(productData) {
  const { data, error } = await supabase
    .from(TABLES.PRODUCTS)
    .insert(productData)
    .select()
    .single();

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to create product.');
  }
  return data;
}

//FAQS

// Fetches all active FAQs from the database.
export async function getAllActiveFaqs() {
  const { data, error } = await supabase
    .from(TABLES.FAQS)
    .select('*')
    .eq(FAQ_FIELDS.IS_ACTIVE, true)
    .order(FAQ_FIELDS.CREATED_AT, { ascending: true });

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to fetch FAQs.');
  }
  return data;
}

// Creates a new FAQ in the database.
export async function createFaq(faqData) {
  const { data, error } = await supabase
    .from(TABLES.FAQS)
    .insert(faqData)
    .select()
    .single();

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to create FAQ.');
  }
  return data;
}

// Fetches the local business settings.
export async function getLocalBusinessSettings() {
  const { data, error } = await supabase
    .from(TABLES.SITE_SETTINGS)
    .select('value')
    .eq('key', 'localBusiness')
    .single();

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to fetch local business settings.');
  }
  return data.value;
}



// Updates the local business settings.
export async function updateLocalBusinessSettings(settingsData) {
  const { data, error } = await supabase
    .from(TABLES.SITE_SETTINGS)
    .update({ value: settingsData })
    .eq('key', 'localBusiness')
    .select();

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to update settings.');
  }
  return data;
}



// Fetches the organization settings.
export async function getOrganizationSettings() {
  const { data, error } = await supabase
    .from(TABLES.SITE_SETTINGS)
    .select('value')
    .eq('key', 'organization')
    .single();

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to fetch organization settings.');
  }
  return data.value;
}

// Updates the organization settings.
export async function updateOrganizationSettings(settingsData) {
  const { data, error } = await supabase
    .from(TABLES.SITE_SETTINGS)
    .update({ value: settingsData })
    .eq('key', 'organization')
    .select();

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to update organization settings.');
  }
  return data;
}