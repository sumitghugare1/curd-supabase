import Link from 'next/link';
import { getPostById } from '@/services/db';
import JsonLd from '@/components/JsonLd';

// This function now uses the service to get data for the post's title
export async function generateMetadata({ params }) {
  const post = await getPostById(params.id);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | My Blog`,
    description: `Read the post titled: ${post.title}`,
  };
}


export default async function PostDetailPage({ params }) {
  const post = await getPostById(params.id);

  if (!post) {
    return <p>Post not found.</p>;
  }

  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.created_at,
    "author": {
      "@type": "Organization",
      "name": "supabase curd app"
    },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://curd-supabase.vercel.app/posts/${post.id}`
      }
  };


  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <JsonLd data={postSchema} />
      <Link href="/">&larr; Back to all posts</Link>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ marginTop: '20px' }}>{post.title}</h1>
        <Link href={`/posts/${post.id}/edit`} style={{background: 'gray', color: 'white', padding: '8px', textDecoration: 'none'}}>
          Edit Post
        </Link>
      </div>
      <p>Created at: {new Date(post.created_at).toLocaleString()}</p>
      <div style={{ marginTop: '30px' }}>
        <p>{post.content || "This post doesn't have content yet."}</p>
      </div>
    </main>
  );
}