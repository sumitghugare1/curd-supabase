"use client";

import { createPostAction } from '@/services/server/posts';

export default function CreatePostForm() {
  return (
    // The form now directly calls the Server Action.
    <form action={createPostAction}>
      <input
        name="title" // The 'name' attribute is important for FormData
        type="text"
        placeholder="New post title..."
        style={{ padding: '8px', width: '70%' }}
        required
      />
      {/* You can add a content textarea here with name="content" if you like */}
      <button type="submit" style={{ padding: '8px' }}>Add Post</button>
    </form>
  );
}