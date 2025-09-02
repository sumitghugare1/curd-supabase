import { supabase } from '@/lib/supabaseClient';
import { TABLES, POST_FIELDS } from '@/lib/schema';

// This is now the ONLY file in the project that imports 'supabaseClient'.

/**
 * Fetches all posts from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
export async function getAllPosts() {
  const { data, error } = await supabase
    .from(TABLES.POSTS)
    .select('*')
    .order(POST_FIELDS.CREATED_AT, { ascending: false });

  if (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to fetch posts.');
  }

  // Supabase returns ISO strings for timestamps, which are safe for the client.
  // The sanitization step from the guide is not strictly necessary here, but
  // this service is where you would do it if needed.
  return data;
}

/**
 * Fetches a single post by its ID.
 * @param {string} id The ID of the post to fetch.
 * @returns {Promise<Object>} A promise that resolves to a single post object.
 */
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

// ... (keep getAllPosts and getPostById)

/**
 * Creates a new post in the database.
 * @param {Object} postData The data for the new post (e.g., { title, content }).
 * @returns {Promise<Object>} A promise that resolves to the newly created post.
 */
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

/**
 * Updates an existing post by its ID.
 * @param {string} id The ID of the post to update.
 * @param {Object} postData The new data for the post.
 * @returns {Promise<Object>} A promise that resolves to the updated post.
 */
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

/**
 * Deletes a post by its ID.
 * @param {string} id The ID of the post to delete.
 * @returns {Promise<void>}
 */
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

// We will add create, update, and delete functions here later
// when we refactor the client components with Server Actions.