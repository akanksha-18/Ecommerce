import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="bg-blue-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Ecommerce</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white font-bold hover:text-blue-200">Home</Link>
          <Link to="/products" className="text-white font-bold hover:text-blue-200">Products</Link>
          <Link to="/blog" className="text-white font-bold hover:text-blue-200">Blog</Link>
          <Link to="/contact" className="text-white font-bold hover:text-blue-200">Contact</Link>
          <Link to="/cart" className="text-white font-bold hover:text-blue-200">
            Cart ({cart.length})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;