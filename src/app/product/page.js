import { getAllProducts } from '@/services/db';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';

// This page will now display the latest product added
export default async function ProductPage() {
  const products = await getAllProducts();
  const latestProduct = products[0];

  if (!latestProduct) {
    return (
        <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h1>Products</h1>
            <p>No products are currently available.</p>
        </main>
    );
  }

  // --- Create the Product Schema from Dynamic Data ---
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": latestProduct.name,
    "image": [
      latestProduct.image_url || "https://curd-supabase.vercel.app/default-post-image.png"
     ],
    "description": latestProduct.description,
    "sku": latestProduct.sku,
    "brand": {
      "@type": "Brand",
      "name": latestProduct.brand_name || "supabase curd app"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://curd-supabase.vercel.app/product",
      "priceCurrency": "USD",
      "price": latestProduct.price,
      "availability": `https://schema.org/${latestProduct.availability}`,
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <JsonLd data={productSchema} />

      <Link href="/">&larr; Back to home</Link>
      <h1 style={{ marginTop: '20px' }}>{latestProduct.name}</h1>
      <img src={latestProduct.image_url || "https://curd-supabase.vercel.app/default-post-image.png"} alt="Product Image" style={{width: '100%', marginTop: '20px'}}/>
      <p style={{ marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>${latestProduct.price}</p>
      <p style={{ marginTop: '10px' }}>{latestProduct.description}</p>
      <button style={{ marginTop: '20px', padding: '10px', background: 'green', color: 'white' }}>Add to Cart</button>
    </main>
  );
}