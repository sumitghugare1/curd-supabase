'use server'; 

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPost, deletePost, updatePost } from '@/services/db';
import { POST_FIELDS } from '@/lib/schema'; 

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
    // Use constants from your schema file
    [POST_FIELDS.TITLE]: formData.get('title'),
    [POST_FIELDS.CONTENT]: formData.get('content'),
    [POST_FIELDS.VIDEO_URL]: formData.get('video_url'),
    [POST_FIELDS.VIDEO_NAME]: formData.get('video_name'),
    [POST_FIELDS.VIDEO_DESCRIPTION]: formData.get('video_description'),
    [POST_FIELDS.QA_QUESTION]: formData.get('qa_question'),
    [POST_FIELDS.QA_ANSWER]: formData.get('qa_answer'),
     [POST_FIELDS.META_TITLE]: formData.get('meta_title'),
    [POST_FIELDS.META_DESCRIPTION]: formData.get('meta_description'),
    [POST_FIELDS.META_KEYWORDS]: formData.get('meta_keywords'),
    [POST_FIELDS.CANONICAL_URL]: formData.get('canonical_url'),
    [POST_FIELDS.OG_IMAGE_URL]: formData.get('og_image_url'),
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