"use client";

import { createProductAction } from '@/services/server/products';

export default function CreateProductForm() {
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await createProductAction(formData);
    event.target.reset();
    alert('Product created successfully!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
      <div>
        <label htmlFor="name">Product Name</label>
        <input id="name" name="name" type="text" style={{ width: '100%', padding: '8px' }} required />
      </div>
       <div>
        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number" step="0.01" style={{ width: '100%', padding: '8px' }} required />
      </div>
      <div>
        <label htmlFor="sku">SKU</label>
        <input id="sku" name="sku" type="text" style={{ width: '100%', padding: '8px' }} />
      </div>
       <div>
        <label htmlFor="brand_name">Brand Name</label>
        <input id="brand_name" name="brand_name" type="text" style={{ width: '100%', padding: '8px' }} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={5} style={{ width: '100%', padding: '8px' }} />
      </div>
      <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white' }}>Create Product</button>
    </form>
  );
}