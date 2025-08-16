
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, ChevronRight } from 'lucide-react';
import products from '../data/products';
import { useCart } from './context/CartContext';

// Define the Header component
function Header() {
    const { cart } = useCart();
    const [cartCount, setCartCount] = useState(0);

    // Update the cart count whenever the cart state changes
    useEffect(() => {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
    }, [cart]);

    return (
        <header className="flex items-center justify-between p-4 bg-blue-900 text-white">
            <div className="flex items-center gap-x-2">
                <div className="text-2xl font-bold">Logo</div>
            </div>
            <div className="flex-1 max-w-lg mx-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full pl-10 pr-4 py-2 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="flex items-center gap-x-4">
                <Link href="/cart" className="relative cursor-pointer">
                    <ShoppingCart size={24} />
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">
                        {cartCount}
                    </span>
                </Link>
                <div className="flex items-center gap-x-2 cursor-pointer">
                    <User size={24} />
                </div>
            </div>
        </header>
    );
}

// Define the Sidebar component (no changes needed yet)
function Sidebar() {
    const categories = ["All", "Electronics", "Clothing", "Home"];
    const minPrice = 0;
    const maxPrice = 1000;

    return (
        <aside className="p-6 bg-blue-800 text-white w-full md:w-64 space-y-6">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            
            <div className="space-y-2">
                <h3 className="font-semibold">Category</h3>
                {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                        <input type="radio" id={category} name="category" value={category} className="form-radio text-blue-500" />
                        <label htmlFor={category}>{category}</label>
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold">Price</h3>
                <div className="flex items-center space-x-2">
                    <input type="number" placeholder="0" className="w-1/2 p-2 rounded-lg text-gray-900" />
                    <span className="text-gray-400">to</span>
                    <input type="number" placeholder="1000" className="w-1/2 p-2 rounded-lg text-gray-900" />
                </div>
            </div>
        </aside>
    );
}

// Define the Product Card component
function ProductCard({ product }) {
    const { addToCart } = useCart();
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4">
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-md mb-4"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400/A0A0A0/FFFFFF?text=Image+Not+Found";
                }}
            />
            <h3 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h3>
            <p className="text-blue-600 font-bold my-2">${product.price}</p>
            <button 
                onClick={() => addToCart(product)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Add to Cart
            </button>
        </div>
    );
}

// Main Page Component
export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Header />
            <main className="flex flex-col md:flex-row gap-4 p-4">
                <Sidebar />
                <section className="flex-1 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Listing</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </main>
            <footer className="bg-blue-900 text-white p-6 mt-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-4 md:mb-0">
                        <h4 className="font-bold text-xl">Filters</h4>
                        <ul className="space-y-2 mt-2">
                            <li>All</li>
                            <li>Electronics</li>
                            <li>Clothing</li>
                            <li>Home</li>
                        </ul>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h4 className="font-bold text-xl">About Us</h4>
                        <ul className="space-y-2 mt-2">
                            <li>About Us</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h4 className="font-bold text-xl">Follow Us</h4>
                        <div className="flex justify-center md:justify-start space-x-4 mt-2">
                            <a href="#" className="text-white hover:text-gray-400">F</a>
                            <a href="#" className="text-white hover:text-gray-400">in</a>
                            <a href="#" className="text-white hover:text-gray-400">O</a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-6 text-gray-400">
                    &copy; 2024 American
                </div>
            </footer>
        </div>
    );
}
