"use client";

import Link from 'next/link';
import { deletePostAction } from '@/services/server/posts';

export default function PostItem({ post }) {
  // We bind the post.id to the action, so it knows which post to delete.
  const deleteActionWithId = deletePostAction.bind(null, post.id);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link href={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'white' }}>
        <p>{post.title}</p>
      </Link>
      <form action={deleteActionWithId}>
        <button type="submit" style={{ background: 'red', color: 'white' }}>
          Delete
        </button>
      </form>
    </div>
  );
}