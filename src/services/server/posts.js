'use server'; // This directive marks all functions in this file as Server Actions.

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPost, deletePost, updatePost } from '@/services/db';

/**
 * Server Action to create a new post.
 * @param {FormData} formData The form data from the client.
 */
export async function createPostAction(formData) {
  const postData = {
    title: formData.get('title'),
    content: formData.get('content'),
  };
  await createPost(postData);
  revalidatePath('/'); // This clears the cache and triggers a re-render of the homepage.
}

/**
 * Server Action to update a post.
 * @param {string} id The ID of the post to update.
 * @param {FormData} formData The form data from the client.
 */
export async function updatePostAction(id, formData) {
  const postData = {
    title: formData.get('title'),
    content: formData.get('content'),
  };
  await updatePost(id, postData);
  revalidatePath('/'); // Revalidate homepage
  revalidatePath(`/posts/${id}`); // Revalidate detail page
  redirect(`/posts/${id}`); // Redirect back to the detail page
}

/**
 * Server Action to delete a post.
 * @param {string} id The ID of the post to delete.
 */
export async function deletePostAction(id) {
  await deletePost(id);
  revalidatePath('/');
}