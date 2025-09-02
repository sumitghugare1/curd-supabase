import { getAllPosts } from '@/services/db';
import CreatePostForm from '@/components/CreatePostForm'

import PostItem from '@/components/PostItem';

// export const revalidate = 0;

export default async function HomePage() {
    const posts = await getAllPosts();

  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>CRUD with Supabase</h1>
      
      {/* Client component for creating posts */}
      <CreatePostForm />

      <h2 style={{ marginTop: '40px' }}>Posts</h2>
      <div>
        {posts?.map((post) => (
          // Pass post data to a client component to handle delete
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}