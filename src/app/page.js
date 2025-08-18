"use client"
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from './context/CartContext';
import { Search, ShoppingCart } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import productsData from '@/data/productsData';

// Placeholder components for a complete, runnable app
function Header({ searchQuery, setSearchQuery }) {
    const { cart } = useCart();
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-blue-900 text-white p-4 sticky top-0 z-10 shadow-md">
            <div className="container mx-auto flex items-center justify-between">

                <Link href="/" className="text-2xl font-bold">Whatbytes</Link>


                <div className="flex-grow max-w-lg mx-4 relative">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                {/* Cart Icon */}
                <Link href="/cart" className="relative">
                    <ShoppingCart size={24} className="text-white" />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer className="bg-blue-900 text-white py-8 mt-12">
            <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-8 px-4">
                {/* About Us Section */}
                <div className="flex flex-col items-center">
                    <h3 className="font-bold text-lg mb-3">About Us</h3>
                    <div className="flex flex-col gap-1 justify-center">
                        <a href="#" className="hover:underline">About Us</a>
                        <a href="#" className="hover:underline">Contact</a>
                    </div>
                </div>
                {/* Social Section */}
                <div className="flex flex-col items-center ml-0 md:ml-12">
                    <h3 className="font-bold text-lg mb-3">Follow Us</h3>
                    <div className="flex gap-6 mt-2">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook className="text-white hover:text-blue-500 bg-blue-800 rounded-full p-1" size={32} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <Twitter className="text-white hover:text-blue-400 bg-blue-800 rounded-full p-1" size={32} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram className="text-white hover:text-pink-500 bg-blue-800 rounded-full p-1" size={32} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm text-gray-300 mt-6">
                &copy; {new Date().getFullYear()} Whatbytes. All rights reserved.
            </div>
        </footer>

    )
}
function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <Link href={`/product/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/A0A0A0/FFFFFF?text=Image+Not+Found";
                    }}
                />
            </Link>
            <div className="p-4">
                <h3 className="font-semibold text-lg truncate text-gray-900">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <button
                    onClick={handleAddToCart}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

// Main Page Component
export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State for filters, synced with URL
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 1000]);

    // Available categories from our product data
    const categories = ['All', ...new Set(productsData.map(p => p.category))];

    // Read URL query parameters and update local state
    useEffect(() => {
        const search = searchParams.get('search') || '';
        const cat = searchParams.get('category') || 'All';
        const price = searchParams.get('price');

        setSearchQuery(search);
        setCategory(cat);
        if (price) {
            setPriceRange(price.split('-').map(Number));
        }
    }, [searchParams]);

    // Update URL query parameters when local state changes
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (category !== 'All') params.set('category', category);
        if (priceRange[0] !== 0 || priceRange[1] !== 1000) params.set('price', priceRange.join('-'));

        router.push(`/?${params.toString()}`, { scroll: false });
    }, [searchQuery, category, priceRange, router]);

    // Filter products based on search and selected filters
    const filteredProducts = productsData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = category === 'All' || product.category === category;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

        return matchesSearch && matchesCategory && matchesPrice;
    });



    return (

        <div className="bg-gray-100 min-h-screen font-sans">
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <div className="container mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* filter sidebar*/}
                <aside className="md:col-span-1 bg-blue-600  p-6 rounded-lg shadow-md h-fit text-gray-900">
                    <h2 className="text-2xl font-bold mb-6">Filters</h2>

                    {/* Category Filter */}
                    <div className="mb-6" >
                        <h3 className="font-semibold text-white mb-3">Category</h3>
                        {categories.map(cat => (
                            <div key={cat} className="flex items-center mb-2 text-white">
                                <input
                                    type="radio"
                                    id={`cat-${cat}`}
                                    name="category"
                                    value={cat}
                                    checked={category === cat}
                                    onChange={() => setCategory(cat)}
                                    className="accent-blue-600 h-4 w-4 text-white"
                                />
                                <label htmlFor={`cat-${cat}`} className="ml-2 text-white">{cat}</label>
                            </div>
                        ))}
                    </div>

                    {/* Price Filter */}
                    <div>
                        <h3 className="font-semibold text-white mb-3">Price</h3>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-white">${priceRange[0]}</span>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([parseInt(e.target.value, 10), priceRange[1]])}
                                className="w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-white">${priceRange[1]}</span>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
                                className="w-full"
                            />
                        </div>
                        <div className="flex justify-between text-sm text-white mt-2">
                            <span>Min: $0</span>
                            <span>Max: $1000</span>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="md:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="md:col-span-3 text-center p-8 bg-white rounded-lg shadow-md text-gray-900">
                                <p className="text-xl text-gray-700">No products found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
