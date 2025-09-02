'use server'; 

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPost, deletePost, updatePost } from '@/services/db';

// Server Action to create a new post.
export async function createPostAction(formData) {
  const postData = {
    title: formData.get('title'),
    content: formData.get('content'),
  };
  await createPost(postData);
  revalidatePath('/');
}

// Server Action to update a post.
export async function updatePostAction(id, formData) {
  const postData = {
    title: formData.get('title'),
    content: formData.get('content'),
  };
  await updatePost(id, postData);
  revalidatePath('/');
  revalidatePath(`/posts/${id}`);
  redirect(`/posts/${id}`);
}

// Server Action to delete a post.
export async function deletePostAction(id) {
  await deletePost(id);
  revalidatePath('/');
}