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
    return <p>Post not found.</p>;
  }

  // --- Create the BlogPosting (Article) Schema ---
  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.content ? post.content.substring(0, 155) + '...' : `Read the post titled: ${post.title}`,
    "datePublished": post.created_at,
    "dateModified": post.created_at,
    "author": {
      "@type": "Organization",
      "name": "supabase curd app"
    },
    "publisher": {
        "@type": "Organization",
        "name": "supabase curd app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://curd-supabase.vercel.app/logo.png"
        }
    },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://curd-supabase.vercel.app/posts/${post.id}`
    },
    "image": {
        "@type": "ImageObject",
        "url": "https://curd-supabase.vercel.app/default-post-image.png",
        "height": 800,
        "width": 1200
    }
  };

  // --- Create the Breadcrumb Schema ---
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://curd-supabase.vercel.app/"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Posts",
      "item": "https://curd-supabase.vercel.app/"
    },{
      "@type": "ListItem",
      "position": 3,
      "name": post.title,
      "item": `https://curd-supabase.vercel.app/posts/${post.id}`
    }]
  };

  // --- Create the Q&A Schema ---
  const qaSchema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
      "@type": "Question",
      "name": "Can I edit this post?",
      "answerCount": 1,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can edit this post by clicking the 'Edit Post' button at the top of the page."
      }
    }
  };

  // --- Create the Video Schema ---
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Getting Started with Supabase",
    "description": "A quick tutorial on how to get started with Supabase.",
    "thumbnailUrl": "https://curd-supabase.vercel.app/default-post-image.png",
    "uploadDate": "2025-01-01",
    "duration": "PT5M30S",
    "contentUrl": "https://www.youtube.com/watch?v=some-video-id", // Replace with actual video URL
    "embedUrl": "https://www.youtube.com/embed/some-video-id" // Replace with actual embed URL
  };


  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      {/* Inject all schemas into the page */}
      <JsonLd data={postSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={qaSchema} />
      <JsonLd data={videoSchema} />

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

      {/* Embedded Video Section */}
      <div style={{ marginTop: '40px' }}>
        <h2>Related Video</h2>
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/some-video-id" // Replace with actual embed URL
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>
    </main>
  );
}