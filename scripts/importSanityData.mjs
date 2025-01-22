import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.token,
  apiVersion: '2025-01-18',
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error.message);
    return null;
  }
}

async function importData() {
  try {
    console.log('Migrating data, please wait...');

    // API endpoint containing car data
    const response = await axios.get('https://template-0-beta.vercel.app/api/product');
console.log('API Response:', response.data);

const products = Array.isArray(response.data) ? response.data : response.data?.data;
if (!Array.isArray(products)) {
  throw new Error('Invalid data: products must be an array.');
}

console.log('Products:', products);
    for (const product of products) {
      let imageRef = null;
      if (product.image) {
        imageRef = await uploadImageToSanity(product.image);
      }

      const sanityProduct = {
        _type: 'product',
        id: product.id,
        name: product.name,
        imagePath: product.imagePath,
        price: parseFloat(product.price),
        description: product.description,
        discountPercentage: product.discountPercentage || null, // Handle optional fields
        isFeaturedProduct: product.isFeaturedProduct || false, // Default value
        stockLevel: product.stockLevel || 0, // Default value
        category: product.category || 'Uncategorized', // Default value
      };

      try {
        await client.create(sanityProduct);
        console.log(`Product created: ${sanityProduct.name}`);
      } catch (createError) {
        console.error(`Failed to create product: ${sanityProduct.name}`, createError.message);
      }
    }

    console.log('Data migrated successfully!');
  } catch (error) {
    console.error('Error in migrating data ==>>', error.message);
  }
}

importData();
