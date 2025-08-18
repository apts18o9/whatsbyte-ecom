"use client"

import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';

// Define the Cart Page component
export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    // Calculate the total price of all items in the cart
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="min-h-screen bg-gray-100 font-sans p-4 md:p-8">
            <header className="flex items-center justify-between p-4 bg-blue-900 text-white mb-8 rounded-lg shadow-md">
                <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition">
                    <ArrowLeft size={20} />
                    Back to products
                </Link>
                <h1 className="text-3xl font-bold">Your Cart</h1>
                <ShoppingCart size={24} />
            </header>

            <main className="container mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {cart.length === 0 ? (
                        <div className="text-center py-10 text-gray-700">
                            <p className="text-xl font-semibold mb-2">Your cart is empty.</p>
                            <p>Add some products to get started!</p>
                        </div>
                    ) : (
                        <div>
                            {/* List of cart items */}
                            <ul className="divide-y divide-gray-200">
                                {cart.map(item => (
                                    <li key={item.id} className="py-4 flex flex-col sm:flex-row items-center justify-between">
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-md"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://placehold.co/80x80/A0A0A0/FFFFFF?text=Image";
                                                }}
                                            />
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mt-4 sm:mt-0">
                                            {/* Quantity controls */}
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-3 py-1 bg-red-500 rounded-l-md hover:bg-red-400 transition"
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 text-gray-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-3 py-1 bg-blue-500 rounded-r-md hover:bg-blue-300 transition"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {/* Remove button */}
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-red-500 hover:text-red-700 transition"
                                            >
                                                <Trash2 size={24} />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Cart total and checkout button */}
                            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900">Total</h2>
                                <span className="text-2xl font-bold text-gray-900">${cartTotal}</span>
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => alert("Checkout not implemented.")}
                                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
