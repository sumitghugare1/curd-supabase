import Link from 'next/link';
import { getPostById } from '@/services/db';
import JsonLd from '@/components/JsonLd';

// This function now generates rich, dynamic metadata for each post
export async function generateMetadata({ params }) {
  const post = await getPostById(params.id);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const pageUrl = `https://curd-supabase.vercel.app/posts/${post.id}`;

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || (post.content ? post.content.substring(0, 155) : ''),
    keywords: post.meta_keywords ? post.meta_keywords.split(',').map(k => k.trim()) : [],
    alternates: {
      canonical: post.canonical_url || pageUrl,
    },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || '',
      url: pageUrl,
      siteName: 'Supabase Curd App',
      images: [
        {
          url: post.og_image_url || 'https://curd-supabase.vercel.app/default-post-image.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || '',
      images: [post.og_image_url || 'https://curd-supabase.vercel.app/default-post-image.png'],
    },
  };
}


// This is the main page component
export default async function PostDetailPage({ params }) {
  const post = await getPostById(params.id);

  if (!post) {
    return <p>Post not found.</p>;
  }

  const schemas = [];

  // --- Create BlogPosting Schema (already dynamic) ---
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
  schemas.push(postSchema);
  
  // --- Create Breadcrumb Schema (already dynamic) ---
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
  schemas.push(breadcrumbSchema);

  // --- Create Q&A Schema from Dynamic Data (if it exists) ---
  if (post.qa_question && post.qa_answer) {
    const qaSchema = {
      "@context": "https://schema.org",
      "@type": "QAPage",
      "mainEntity": {
        "@type": "Question",
        "name": post.qa_question,
        "answerCount": 1,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": post.qa_answer
        }
      }
    };
    schemas.push(qaSchema);
  }

  // --- Create Video Schema from Dynamic Data (if it exists) ---
  if (post.video_url && post.video_name) {
    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": post.video_name,
      "description": post.video_description || `A video about ${post.title}`,
      "thumbnailUrl": "https://curd-supabase.vercel.app/default-post-image.png",
      "uploadDate": post.created_at,
      "embedUrl": post.video_url
    };
    schemas.push(videoSchema);
  }

  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      {/* Inject all relevant schemas into the page */}
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}

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

      {/* Dynamically render Video Section */}
      {post.video_url && (
        <div style={{ marginTop: '40px' }}>
          <h2>{post.video_name || 'Related Video'}</h2>
          <iframe 
            width="560" 
            height="315" 
            src={post.video_url}
            title={post.video_name || 'YouTube video player'}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      )}

      {/* Dynamically render Q&A Section */}
      {post.qa_question && (
        <div style={{ marginTop: '40px' }}>
          <h2>Q&A</h2>
          <h3>{post.qa_question}</h3>
          <p>{post.qa_answer}</p>
        </div>
      )}
    </main>
  );
}