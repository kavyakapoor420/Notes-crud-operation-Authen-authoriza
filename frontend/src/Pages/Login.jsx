import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-4 font-sans">
      <div className="bg-white border-4 border-black p-8 w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#FFDE59] border-4 border-black rounded-full flex items-center justify-center">
                <User size={32} strokeWidth={3} />
            </div>
        </div>
        <h2 className="text-4xl font-black mb-6 text-center">LOGIN</h2>
        
        {error && (
          <div className="bg-red-100 border-2 border-red-500 text-red-700 p-2 mb-4 font-bold text-center shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-bold block mb-1 text-lg">Email</label>
            <input 
              type="email" 
              className="w-full border-2 border-black p-3 font-bold focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#F3F4F6] transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label className="font-bold block mb-1 text-lg">Password</label>
            <input 
              type="password" 
              className="w-full border-2 border-black p-3 font-bold focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#F3F4F6] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-[#8B5CF6] text-white font-black text-xl py-3 mt-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-[#7C3AED] transition-all disabled:opacity-50"
          >
            {isLoading ? 'ENTERING...' : 'ENTER VAULT'}
          </button>
        </form>
        <p className="mt-4 text-center font-bold">
            No Access Pass? <Link to="/register" className="underline cursor-pointer hover:text-blue-600">Mint One</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;