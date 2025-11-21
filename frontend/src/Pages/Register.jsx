import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E0E7FF] flex items-center justify-center p-4 font-sans">
      <div className="bg-white border-4 border-black p-8 w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#FFDE59] border-4 border-black rounded-full z-0 hidden md:block"></div>
        
        <h2 className="text-4xl font-black mb-6 text-center tracking-tight z-10 relative">JOIN Kavya<span className="text-[#8B5CF6]">Notes</span></h2>
        
        {error && (
          <div className="bg-red-100 border-2 border-red-500 text-red-700 p-2 mb-4 font-bold text-center shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 z-10 relative">
          <div>
            <label className="font-bold block mb-1 text-lg">Name</label>
            <input 
              type="text" 
              className="w-full border-2 border-black p-3 font-bold focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#FFFDF5] transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required
              placeholder="hello world"
            />
          </div>

          <div>
            <label className="font-bold block mb-1 text-lg">Email</label>
            <input 
              type="email" 
              className="w-full border-2 border-black p-3 font-bold focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#FFFDF5] transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
              placeholder="hello123@gmail.com"
            />
          </div>

          <div>
            <label className="font-bold block mb-1 text-lg">Password</label>
            <input 
              type="password" 
              className="w-full border-2 border-black p-3 font-bold focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#FFFDF5] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-[#22C55E] text-black font-black text-xl py-3 mt-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-[#16a34a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'MINTING ID...' : 'CREATE ACCOUNT'}
          </button>
        </form>
        
        <p className="mt-6 text-center font-bold">
            Already a member? <Link to="/login" className="underline hover:text-[#8B5CF6]">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;