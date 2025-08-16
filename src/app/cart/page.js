'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ChevronLeft, Trash2 } from 'lucide-react';

// Define the CartItem component for a single product in the cart
function CartItem({ item }) {
    const { removeFromCart, updateQuantity } = useCart();
    
    // Handler for removing an item from the cart
    const handleRemove = () => {
        removeFromCart(item.id);
    };

    // Handler for updating the quantity of an item
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        updateQuantity(item.id, newQuantity);
    };
    
    return (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center gap-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/A0A0A0/FFFFFF?text=Image+Not+Found";
                    }}
                />
                <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <input
                    type="number"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="w-16 text-center border rounded-md"
                />
                <button 
                    onClick={handleRemove}
                    className="text-red-500 hover:text-red-700 transition"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
}

// Main Cart Page Component
export default function CartPage() {
    const { cart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);

    // Calculate the total price whenever the cart changes
    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [cart]);

    return (
        <div className="min-h-screen bg-gray-100 font-sans p-4">
            <header className="flex items-center justify-between p-4 bg-blue-900 text-white mb-4 rounded-lg shadow-md">
                <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition">
                    <ChevronLeft size={20} />
                    Back to products
                </Link>
                <h1 className="text-3xl font-bold">Your Cart</h1>
                <div></div> {/* Spacer for alignment */}
            </header>

            <main className="container mx-auto">
                {cart.length === 0 ? (
                    <div className="text-center p-8 bg-white rounded-lg shadow-md">
                        <p className="text-xl text-gray-700">Your cart is empty.</p>
                        <Link href="/" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Cart Items List */}
                        <div className="md:col-span-2">
                            {cart.map(item => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                        
                        {/* Order Summary */}
                        <aside className="bg-white rounded-lg shadow-md p-6 h-fit">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="flex justify-between items-center text-lg mb-2">
                                <span>Subtotal:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-bold border-t pt-4 mt-4">
                                <span>Total:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition">
                                Checkout
                            </button>
                        </aside>
                    </div>
                )}
            </main>
        </div>
    );
}
