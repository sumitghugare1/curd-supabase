"use client";

import { updatePostAction } from '@/services/server/posts';

export default function EditPostForm({ post }) {
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

      {/* --- SEO Settings Section (This is the new part) --- */}
      <h3>SEO Settings</h3>
      <div>
          <label htmlFor="meta_title">Meta Title</label>
          <input id="meta_title" name="meta_title" type="text" defaultValue={post.meta_title || ''} style={{ width: '100%', padding: '8px' }} />
      </div>
       <div>
          <label htmlFor="meta_description">Meta Description</label>
          <textarea id="meta_description" name="meta_description" defaultValue={post.meta_description || ''} rows={3} style={{ width: '100%', padding: '8px' }} />
      </div>
      <div>
          <label htmlFor="meta_keywords">Meta Keywords (comma-separated)</label>
          <input id="meta_keywords" name="meta_keywords" type="text" defaultValue={post.meta_keywords || ''} style={{ width: '100%', padding: '8px' }} />
      </div>
       <div>
          <label htmlFor="canonical_url">Canonical URL</label>
          <input id="canonical_url" name="canonical_url" type="url" defaultValue={post.canonical_url || ''} style={{ width: '100%', padding: '8px' }} />
      </div>
      <div>
          <label htmlFor="og_image_url">Open Graph Image URL</label>
          <input id="og_image_url" name="og_image_url" type="url" defaultValue={post.og_image_url || ''} style={{ width: '100%', padding: '8px' }} />
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