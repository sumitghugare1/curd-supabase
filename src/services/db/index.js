import { supabase } from '@/lib/supabaseClient';
import { TABLES, POST_FIELDS } from '@/lib/schema';

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