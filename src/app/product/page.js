import JsonLd from '@/components/JsonLd';
import Link from 'next/link';

// This is the main page component for the product page
export default function ProductPage() {

  // --- Create the Product Schema ---
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Supabase T-Shirt",
    "image": [
      "https://curd-supabase.vercel.app/default-post-image.png"
     ],
    "description": "A high-quality, comfortable t-shirt for developers who love Supabase.",
    "sku": "Supa-T-01",
    "brand": {
      "@type": "Brand",
      "name": "Supabase"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://curd-supabase.vercel.app/product",
      "priceCurrency": "USD",
      "price": "25.00",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      {/* This script tag injects the structured data into the page */}
      <JsonLd data={productSchema} />

      <Link href="/">&larr; Back to home</Link>
      <h1 style={{ marginTop: '20px' }}>Supabase T-Shirt</h1>
      <img src="https://curd-supabase.vercel.app/default-post-image.png" alt="Product Image" style={{width: '100%', marginTop: '20px'}}/>
      <p style={{ marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>$25.00</p>
      <p style={{ marginTop: '10px' }}>Show your support for Supabase with this comfortable and stylish t-shirt. Perfect for conferences, meetups, or coding sessions.</p>
      <button style={{ marginTop: '20px', padding: '10px', background: 'green', color: 'white' }}>Add to Cart</button>
    </main>
  );
}