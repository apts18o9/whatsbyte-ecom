"use client";

import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import productsData from '@/data/productsData';
import Link from 'next/link';
import { ChevronLeft, ShoppingCart } from 'lucide-react';

// Define the Product Detail Page component
export default function ProductDetailPage() {
    const { id } = useParams(); // Get the dynamic ID from the URL
    const { addToCart } = useCart();
    const router = useRouter();

    // Find the product in our mock data based on the URL ID
    const product = productsData.find(p => p.id === parseInt(id));

    // Handle the case where the product is not found
    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Product Not Found</h1>
                <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
                <Link href="/" className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    <ChevronLeft size={20} />
                    Back to products
                </Link>
            </div>
        );
    }

    // Handler for adding the product to the cart
    const handleAddToCart = () => {
        addToCart(product);
        // Optional: Redirect to the cart page after adding
        router.push('/cart');
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans p-4 md:p-8">
            <header className="flex items-center justify-between p-4 bg-blue-900 text-white mb-8 rounded-lg shadow-md">
                <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition">
                    <ChevronLeft size={20} />
                    Back to products
                </Link>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <Link href="/cart">
                    <ShoppingCart size={24} className="text-white hover:text-gray-300" />
                </Link>
            </header>

            <main className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6">
                    {/* Product Image Section */}
                    <div className="flex justify-center items-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full max-w-lg rounded-xl shadow-lg object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/600x400/A0A0A0/FFFFFF?text=Image+Not+Found";
                            }}
                        />
                    </div>

                    {/* Product Details Section */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-4xl font-bold mb-2 text-gray-900">{product.name}</h2>
                        <p className="text-blue-600 text-2xl font-semibold mb-4">${product.price}</p>
                        
                        <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
                        
                        <div className="mb-6">
                            <span className="font-semibold text-gray-800">Category: </span>
                            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{product.category}</span>
                        </div>
                        
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
                        >
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}