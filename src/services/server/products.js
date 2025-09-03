'use server'; 

import { revalidatePath } from 'next/cache';
import { createProduct } from '@/services/db';
import { PRODUCT_FIELDS } from '@/lib/schema';

// Server Action to create a new product
export async function createProductAction(formData) {
  const productData = {
    [PRODUCT_FIELDS.NAME]: formData.get('name'),
    [PRODUCT_FIELDS.DESCRIPTION]: formData.get('description'),
    [PRODUCT_FIELDS.PRICE]: parseFloat(formData.get('price')),
    [PRODUCT_FIELDS.SKU]: formData.get('sku'),
    [PRODUCT_FIELDS.BRAND_NAME]: formData.get('brand_name'),
  };

  await createProduct(productData);

  // Revalidate the public product page to show the new product
  revalidatePath('/product');
}