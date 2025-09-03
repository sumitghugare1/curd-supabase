import Link from 'next/link';
import { getPostById } from '@/services/db';
import JsonLd from '@/components/JsonLd';

// This function generates the page's standard metadata (for the <head> tag)
export async function generateMetadata({ params }) {
  const post = await getPostById(params.id);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // Create a short description for the metadata
  const description = post.content
    ? post.content.substring(0, 155) + '...'
    : `Read the post titled: ${post.title}`;

  return {
    title: `${post.title} | My Blog`,
    description: description,
  };
}


// This is the main page component
export default async function PostDetailPage({ params }) {
  const post = await getPostById(params.id);

  if (!post) {
    // This will be caught by the notFound() mechanism if you implement it,
    // or simply render this paragraph.
    return <p>Post not found.</p>;
  }

  // --- Create the Structured Data Schema ---
  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    // Add a description using the post's content
    "description": post.content ? post.content.substring(0, 155) + '...' : `Read the post titled: ${post.title}`,
    "datePublished": post.created_at,
    "dateModified": post.created_at, // Use a last_updated field if you have one
    "author": {
      "@type": "Organization",
      "name": "supabase curd app"
    },
    "publisher": {
        "@type": "Organization",
        "name": "supabase curd app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://curd-supabase.vercel.app/logo.png" // Ensure this logo exists
        }
    },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://curd-supabase.vercel.app/posts/${post.id}`
    },
    // Adding an image is highly recommended for rich results
    "image": {
        "@type": "ImageObject",
        "url": "https://curd-supabase.vercel.app/default-post-image.png", // Use a relevant image for the post if available
        "height": 800,
        "width": 1200
    }
  };

  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      {/* This script tag injects the structured data into the page */}
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