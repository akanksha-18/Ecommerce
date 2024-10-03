import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [location.search]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/blog?page=${pageNumber}`); 
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="space-y-4">
        {currentPosts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <Link to={`/blog/${post.id}`} className="text-xl font-semibold hover:text-blue-600">
              {post.title}
            </Link>
            <p className="mt-2">{post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Blog;
