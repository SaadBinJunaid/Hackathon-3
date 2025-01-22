import { NextResponse } from 'next/server.js';
import client from '../../../../sanityClient.js';

export async function GET() {
    const query = `*[_type == "product"]{
    _id,
    name,
    imagePath,
    price,
    description,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category
    }`;
    const products = await client.fetch(query);
    return NextResponse.json(products);
}