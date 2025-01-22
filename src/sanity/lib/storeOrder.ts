// lib/storeOrder.ts
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  token:'skjytw1NDYrTX5pvHq7t8eV0rYhf0FGqVoXDnqYM5QrjyWEhMRxjBTD87ofw7nxfXtwD1eLUUf5VZrV7Fcy7l0Rv2bnwCBjFucMRtvcB0bSG1e6YUOFjN3IAUmOxYs0yXmJ4IJUmTgaN7mvBl3ocY6eBVG0Msb4oj6IS2bpyGzBYdQgdzKyw',
  useCdn: false,
});



// Function to save the order
export const storeOrder = async (orderData: any) => {
  try {
    const response = await client.create({
      _type: 'order',
      name: orderData.name,
      email: orderData.email,
      address: orderData.address,
      city: orderData.city,
      postalCode: orderData.postalCode,
      country: orderData.country,
      phoneNumber: orderData.phoneNumber,
      cartItems: orderData.cartItems,
      subtotal: orderData.subtotal,
    });
    console.log('Order saved:', response);
    return response;
  } catch (error) {
    console.error('Error storing order:', error);
    throw new Error('Failed to save the order');
  }
};
