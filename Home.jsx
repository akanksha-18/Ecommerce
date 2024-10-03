
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLoaderData } from 'react-router-dom'
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart, cart, removeFromCart, updateQuantity } = useCart();
  const featuredProducts = useLoaderData();
  const carouselItems = [
    { id: 1, image: 'https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg', text: 'Summer Sale' },
    { id: 2, image: 'https://www.zilliondesigns.com/blog/wp-content/uploads/Perfect-Ecommerce-Sales-Banner.jpg', text: 'New Arrivals' },
    { id: 3, image: 'https://static.vecteezy.com/system/resources/thumbnails/004/299/835/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg', text: 'Special Offers' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="relative h-96 mb-8"> 
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={item.image} alt={item.text} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-2xl font-bold">{item.text}</h2>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          &#10095;
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {featuredProducts.map((product) => {
          const isInCart = cart.find(item => item.id === product.id);
          const quantity = isInCart ? isInCart.quantity : 0;

          return (
            <div key={product.id} className="border p-4 rounded-lg">
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>

              {quantity > 0 ? (
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

export default Home;
