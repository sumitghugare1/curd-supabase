import { getAllPosts, getAllActiveFaqs, getLocalBusinessSettings } from '@/services/db';
import CreatePostForm from '@/components/CreatePostForm'
import PostItem from '@/components/PostItem';
import JsonLd from '@/components/JsonLd';

export default async function HomePage() {
    const posts = await getAllPosts();
     const faqs = await getAllActiveFaqs();
     const businessSettings = await getLocalBusinessSettings();

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

    // --- Create FAQ Schema from Dynamic Data ---
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // --- Create Local Business Schema from Dynamic Data ---
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": businessSettings.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": businessSettings.streetAddress,
        "addressLocality": businessSettings.addressLocality,
        "addressRegion": businessSettings.addressRegion,
        "postalCode": businessSettings.postalCode,
        "addressCountry": "US" // Can also be made dynamic if needed
      },
      "image": "https://curd-supabase.vercel.app/logo.png",
      "telephone": businessSettings.telephone,
      "priceRange": businessSettings.priceRange
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

       {/* --- Dynamic FAQ Section --- */}
      <div style={{ marginTop: '40px' }}>
        <h2>Frequently Asked Questions</h2>
        {faqs.map(faq => (
            <div key={faq.id} style={{ marginTop: '20px' }}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
            </div>
        ))}
      </div>
    </main>
  );
}