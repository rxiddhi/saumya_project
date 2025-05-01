import { useState } from 'react';
import { FaUser, FaTimes } from 'react-icons/fa';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      onClose();
    }, 3000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative">
        {showMessage && (
          <div className="absolute top-0 left-0 right-0 p-4 bg-purple-600 text-white text-center rounded-t-xl animate-fade-in">
            <p className="font-medium">Thank you for your interest!</p>
            <p className="text-sm mt-1">
              We're currently working on integrating our backend services. Your data will be securely saved once the integration is complete.
            </p>
          </div>
        )}
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-purple-100 rounded-full mb-2">
            <FaUser className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-purple-700">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mt-1">
            {isLogin ? 'Continue your wellness journey' : 'Begin your wellness journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 