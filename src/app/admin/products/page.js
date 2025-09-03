import CreateProductForm from '@/components/CreateProductForm';
import { getAllProducts } from '@/services/db';

export default async function ProductsAdminPage() {
  const products = await getAllProducts();

  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Manage Products</h1>
      
      <CreateProductForm />

      <h2 style={{ marginTop: '40px' }}>Existing Products</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <strong>{product.name}</strong> - ${product.price}
          </div>
        ))}
      </div>
    </main>
  );
}