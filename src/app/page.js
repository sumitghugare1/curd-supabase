import { getAllPosts } from '@/services/db';
import CreatePostForm from '@/components/CreatePostForm'
import PostItem from '@/components/PostItem';
import JsonLd from '@/components/JsonLd';

export default async function HomePage() {
    const posts = await getAllPosts();

    // --- Create Carousel Schema ---
    const carouselSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": posts?.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://curd-supabase.vercel.app/posts/${post.id}`,
        "name": post.title
      }))
    };

    // --- Create FAQ Schema ---
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What is this app for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This is a simple CRUD (Create, Read, Update, Delete) application built with Next.js and Supabase, designed to demonstrate modern web development practices."
        }
      },{
        "@type": "Question",
        "name": "How do I create a new post?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply type a title into the input box on the homepage and click the 'Add Post' button. Your new post will appear in the list below."
        }
      }]
    };

    // --- Create Local Business Schema ---
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Supabase Curd App Services",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Supabase Way",
        "addressLocality": "San Francisco",
        "addressRegion": "CA",
        "postalCode": "94107",
        "addressCountry": "US"
      },
      "image": "https://curd-supabase.vercel.app/logo.png",
      "telephone": "+1-555-555-5555",
      "priceRange": "$$"
    };


  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <JsonLd data={carouselSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={localBusinessSchema} />

      <h1>CRUD with Supabase</h1>
      
      {/* Client component for creating posts */}
      <CreatePostForm />

      <h2 style={{ marginTop: '40px' }}>Posts (Carousel)</h2>
      <div>
        {posts?.map((post) => (
          // Pass post data to a client component to handle delete
          <PostItem key={post.id} post={post} />
        ))}
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Frequently Asked Questions</h2>
        <div>
          <h3>What is this app for?</h3>
          <p>This is a simple CRUD application built with Next.js and Supabase.</p>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h3>How do I create a post?</h3>
          <p>Simply type a title in the input box on the homepage and click 'Add Post'.</p>
        </div>
      </div>
    </main>
  );
}