"use client";

import { updatePostAction } from '@/services/server/posts';

export default function EditPostForm({ post }) {
  // Bind the post.id to the update action.
  const updateActionWithId = updatePostAction.bind(null, post.id);

  return (
    <form action={updateActionWithId} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={post.title} 
          style={{ width: '100%', padding: '8px' }}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          defaultValue={post.content || ''}
          rows={5}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white' }}>Update Post</button>
    </form>
  );
}