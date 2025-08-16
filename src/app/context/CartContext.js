'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a new context for the cart
export const CartContext = createContext();

// Define a provider component that will wrap your app
export const CartProvider = ({ children }) => {
    // State to hold the cart items
    const [cart, setCart] = useState([]);

    // Load cart from localStorage when the component mounts
    useEffect(() => {
        const localCart = localStorage.getItem('cart');
        if (localCart) {
            setCart(JSON.parse(localCart));
        }
    }, []);

    // Save cart to localStorage whenever the cart state changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Function to add a product to the cart
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                // If the item already exists, increment its quantity
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Otherwise, add the new item with a quantity of 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // Function to update the quantity of an item in the cart
    const updateQuantity = (productId, newQuantity) => {
        setCart(prevCart => {
            if (newQuantity <= 0) {
                // If new quantity is 0 or less, remove the item
                return prevCart.filter(item => item.id !== productId);
            }
            // Otherwise, update the quantity of the specific item
            return prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    // Value to be provided to the consuming components
    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to easily use the cart context
export const useCart = () => useContext(CartContext);
