"use client";

import { updatePostAction } from '@/services/server/posts';

export default function EditPostForm({ post }) {
  // Bind the post.id to the update action.
  const updateActionWithId = updatePostAction.bind(null, post.id);

  return (
    <form action={updateActionWithId} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      
      {/* --- Basic Post Details --- */}
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" defaultValue={post.title} style={{ width: '100%', padding: '8px' }} required />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" defaultValue={post.content || ''} rows={5} style={{ width: '100%', padding: '8px' }} />
      </div>

      <hr/>

      {/* --- Video Section --- */}
      <h3>Video Details</h3>
      <div>
        <label htmlFor="video_url">Video Embed URL (e.g., https://www.youtube.com/embed/...)</label>
        <input id="video_url" name="video_url" type="url" defaultValue={post.video_url || ''} style={{ width: '100%', padding: '8px' }} />
      </div>
       <div>
        <label htmlFor="video_name">Video Name</label>
        <input id="video_name" name="video_name" type="text" defaultValue={post.video_name || ''} style={{ width: '100%', padding: '8px' }} />
      </div>
       <div>
        <label htmlFor="video_description">Video Description</label>
        <input id="video_description" name="video_description" type="text" defaultValue={post.video_description || ''} style={{ width: '100%', padding: '8px' }} />
      </div>

      <hr/>

      {/* --- Q&A Section --- */}
      <h3>Q&A Section</h3>
       <div>
        <label htmlFor="qa_question">Question</label>
        <input id="qa_question" name="qa_question" type="text" defaultValue={post.qa_question || ''} style={{ width: '100%', padding: '8px' }} />
      </div>
       <div>
        <label htmlFor="qa_answer">Answer</label>
        <textarea id="qa_answer" name="qa_answer" defaultValue={post.qa_answer || ''} rows={3} style={{ width: '100%', padding: '8px' }} />
      </div>

      <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', marginTop: '20px' }}>Update Post</button>
    </form>
  );
}