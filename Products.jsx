/* eslint-disable react-hooks/rules-of-hooks */
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import CurrencySelector from '../components/CurrencySelector';

import { useLoaderData } from 'react-router-dom'
import { useEffect } from 'react';
const Products = () => {
  const { addToCart, cart, removeFromCart, updateQuantity } = useCart();
  const { formatPrice } = useCurrency();
  const products = useLoaderData();
  if (!products.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

 
  
  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <CurrencySelector />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          const isInCart = cart.find(item => item.id === product.id);
          const quantity = isInCart ? isInCart.quantity : 0;

          return (
            <div key={product.id} className="border p-4 rounded-lg">
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
            
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">{formatPrice(product.price)}</p>
              
              {quantity > 0 ? (
                <div className="flex items-center mt-2">
                   <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(product.id, -1)}
                    className="bg-blue-950 text-white px-4 py-2 rounded"
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, 1)}
                    className="bg-blue-950 text-white  px-4 py-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="ml-4 bg-yellow-300 px-4 py-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
