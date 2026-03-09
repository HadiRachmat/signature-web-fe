import React, { useState } from 'react';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (value: string) => {
    // simple email regex
    return /\S+@\S+\.\S+/.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // TODO: call register API/service
    console.log('register', { fullName, email, password });
    setSuccess('Registration successful (mock).');
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 ">
        {/* Left / Illustration */}
        <div className="hidden md:flex text-center items-center bg-amber-600 overflow-hidden shadow-lg rounded-l-3xl">
          <div className=" p-8 rounded-md text-white">
            <h1 className="text-5xl font-semibold">Create account</h1>
            <p className="mt-2 text-sm">Join us and start using your account today.</p>
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
            <h2 className="text-2xl font-semibold mt-3">Create your account</h2>
            <p className="text-sm text-gray-500">Register to get access to the application</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-red-600">{error}</div>}
            {success && <div className="text-sm text-green-600">{success}</div>}

            <label className="block text-left">
              <span className="text-sm font-medium text-gray-700">Full name</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
            </label>

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
                  placeholder="Choose a password"
                />
              </div>
            </label>

            <label className="block text-left">
              <span className="text-sm font-medium text-gray-700">Confirm password</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Repeat your password"
                />
              </div>
            </label>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create account
            </button>

            <div className="pt-4 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <a className="text-blue-600 hover:underline" href="#">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
