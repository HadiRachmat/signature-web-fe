import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import LoginImage from '../../../../../assets/image-28.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // TODO: submit to API
    console.log('login', { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 ">
        {/* Left / Illustration */}
        <div className="hidden md:flex text-center items-center bg-[#41431B] overflow-hidden shadow-lg rounded-l-3xl">
          <div className=" p-8 rounded-md text-white">
            <h1 className="text-6xl font-semibold">Hi, Welcome</h1>
            <p className="mt-2 text-sm">Please log in using your registered account.</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white shadow-xl p-8 rounded-r-3xl">
          <div className="mb-6 text-center">
            <svg
              className="mx-auto h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM8 11a1 1 0 011-1h6a1 1 0 110 2H9a1 1 0 01-1-1zm1-3a1 1 0 010-2h6a1 1 0 010 2H9z" />
            </svg>
            <h2 className="text-2xl font-semibold mt-3">Welcome back</h2>
            <p className="text-sm text-gray-500">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-red-600">{error}</div>}

            <label className="block text-left">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
            </label>

            <label className="block text-left">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your password"
                />
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <span className="text-gray-600">Remember me</span>
              </label>

              <a className="text-blue-600 hover:underline" href="#">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign in
            </button>

            <div className="pt-4 text-center text-sm text-gray-500">
              Don’t have an account?{' '}
              <a
                className="text-blue-600 hover:underline"
                href="#"
                onClick={() => navigate('/home/register')}
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
