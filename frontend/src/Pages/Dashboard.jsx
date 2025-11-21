import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { apiCall } from '../utils/api';
import { Trash2, Edit3, LogOut, Plus, Search } from 'lucide-react';
import Navbar from '../Components/Navbar';

const Dashboard = () => {
  const { logout, user, token } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [error, setError] = useState('');

  // Neubrutalism Palette
  const cardColors = ['bg-[#C4B5FD]', 'bg-[#FDE047]', 'bg-[#93C5FD]', 'bg-[#86EFAC]', 'bg-[#F9A8D4]'];

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token]);

  const fetchNotes = async () => {
    try {
      const data = await apiCall('/notes', 'GET', null, token);
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (error.message === 'Token is not valid' || error.message === 'No token, authorization denied') {
        logout();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = form.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    try {
      if (isEditing) {
        const updatedNote = await apiCall(`/notes/${isEditing}`, 'PUT', { ...form, tags: tagsArray }, token);
        setNotes(prev => prev.map(n => n._id === isEditing ? updatedNote : n));
        setIsEditing(null);
      } else {
        const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];
        const newNote = await apiCall('/notes', 'POST', { ...form, tags: tagsArray, color: randomColor }, token);
        setNotes([newNote, ...notes]);
      }
      setForm({ title: '', content: '', tags: '' });
      setError('');
    } catch (err) {
      setError('Failed to save note. Ensure backend is running.');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Burn this note?")) {
      try {
        await apiCall(`/notes/${id}`, 'DELETE', null, token);
        setNotes(notes.filter(n => n._id !== id));
      } catch (err) {
        alert('Failed to delete note');
      }
    }
  };

  const handleEdit = (note) => {
    setIsEditing(note._id);
    setForm({ title: note.title, content: note.content, tags: note.tags ? note.tags.join(', ') : '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(search.toLowerCase()) || 
    note.content.toLowerCase().includes(search.toLowerCase()) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-[#FFFDF5] font-sans text-black selection:bg-[#FDE047] selection:text-black">
      
      {/* Navbar */}

      <Navbar/>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Input Form */}
            <div className="lg:col-span-4 xl:col-span-3">
                <div className="bg-[#FFDE59] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm sticky top-24">
                    <h2 className="text-2xl font-black mb-4 leading-tight flex items-center gap-2">
                        {isEditing ? <Edit3 className="w-6 h-6"/> : <Plus className="w-6 h-6"/>}
                        {isEditing ? 'EDIT NOTE' : 'NEW NOTE'}
                    </h2>

                    {error && (
                      <div className="mb-4 p-2 bg-red-100 border-2 border-red-500 font-bold text-xs text-red-600">
                        {error}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input 
                        type="text" 
                        placeholder="Title..." 
                        className="w-full p-3 border-2 border-black font-bold text-lg focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-black/50"
                        value={form.title}
                        onChange={e => setForm({...form, title: e.target.value})}
                        required
                        />
                        <textarea 
                        placeholder="Write something brilliant..." 
                        className="w-full p-3 border-2 border-black font-medium h-40 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-black/50 resize-none"
                        value={form.content}
                        onChange={e => setForm({...form, content: e.target.value})}
                        required
                        ></textarea>
                        <input 
                            type="text" 
                            placeholder="Tags (comma separated)" 
                            className="w-full p-3 border-2 border-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-black/50"
                            value={form.tags}
                            onChange={e => setForm({...form, tags: e.target.value})}
                        />
                        
                        <div className="flex gap-2">
                             {isEditing && (
                                <button 
                                    type="button" 
                                    onClick={() => {setIsEditing(null); setForm({title:'', content:'', tags:''}); setError('');}}
                                    className="flex-1 bg-white text-black font-bold py-3 border-2 border-black hover:bg-gray-100 transition-all"
                                >
                                    CANCEL
                                </button>
                            )}
                            <button 
                                type="submit" 
                                className="flex-1 bg-black text-white font-bold py-3 border-2 border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                            >
                                {isEditing ? 'Update' : 'create Note'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Column: List */}
            <div className="lg:col-span-8 xl:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredNotes.map(note => (
                    <div 
                        key={note._id} 
                        className={`relative group flex flex-col border-4 border-black p-5 ${note.color || 'bg-white'} shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 rounded-sm min-h-[250px]`}
                    >
                        <div className="flex justify-between items-start mb-3 gap-2">
                            <h3 className="text-xl font-black uppercase leading-tight break-words">{note.title}</h3>
                            <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => handleEdit(note)} 
                                    className="bg-white border-2 border-black p-1 hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    title="Edit"
                                >
                                    <Edit3 size={16} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(note._id)} 
                                    className="bg-white border-2 border-black p-1 hover:bg-red-500 hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="flex-grow overflow-hidden mb-4">
                            <p className="font-medium text-gray-900 whitespace-pre-wrap text-sm leading-relaxed line-clamp-6">
                                {note.content}
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t-2 border-black/10 flex flex-col gap-2">
                             <div className="flex flex-wrap gap-1">
                                {note.tags && note.tags.map((tag, index) => (
                                    <span key={index} className="bg-black text-white text-[10px] uppercase font-bold px-2 py-1 border border-black rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <div className="text-[10px] font-bold text-black/40 text-right uppercase tracking-widest">
                                {new Date(note.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
                </div>

                {filteredNotes.length === 0 && (
                    <div className="flex flex-col items-center justify-center mt-12 opacity-50">
                        <div className="w-24 h-24 border-4 border-black rounded-full flex items-center justify-center bg-gray-200 mb-4">
                            <Search size={40} />
                        </div>
                        <p className="text-2xl font-black uppercase">No blocks found</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;