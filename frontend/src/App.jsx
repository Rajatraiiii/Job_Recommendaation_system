import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, User, MapPin, Building, LogOut, Sparkles, AlertCircle, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

const API_URL = 'http://localhost:8000';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-2">
                  <div className="bg-indigo-600 p-2 rounded-lg">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-xl text-slate-900">JobMatch AI</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                {user ? (
                  <>
                    <Link to="/recommendations" className="text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium">Matches</Link>
                    <Link to="/profile" className="text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium">Profile</Link>
                    <button 
                      onClick={() => setUser(null)}
                      className="text-slate-500 hover:text-red-600 transition-colors text-sm font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-slate-600 hover:text-indigo-600 text-sm font-medium transition-colors">Sign In</Link>
                    <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Login setUser={setUser} />} />
            <Route path="/recommendations" element={user ? <Recommendations user={user} /> : <Login setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home({ user }) {
  return (
    <div className="flex flex-col items-center justify-center pt-16 pb-24 text-center px-4">
      <h1 className="text-5xl font-bold text-slate-900 mb-4">
        Find Jobs That Match <br />
        <span className="text-indigo-600">Your Skills</span>
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-2xl">
        AI-powered job recommendations based on your skills and experience. Get matched with the best opportunities instantly.
      </p>
      
      {!user ? (
        <div className="flex gap-4">
          <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Get Started
          </Link>
          <Link to="/login" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-3 rounded-lg font-medium transition-colors">
            Sign In
          </Link>
        </div>
      ) : (
        <Link to="/recommendations" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
          View Matches <Sparkles className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
}

function Login({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post(`${API_URL}/users/login`, { username, password });
      setUser(res.data);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Sign In</h2>
        <p className="text-slate-500 mt-1">Welcome back! Please enter your details.</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-start gap-2 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input 
            type="password" 
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm text-slate-600">
        Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">Sign up</Link>
      </div>
    </div>
  );
}

function Register({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    
    try {
      const res = await axios.post(`${API_URL}/users/register`, { username, password });
      setUser(res.data);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Username may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
        <p className="text-slate-500 mt-1">Sign up to get started with job matching.</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-start gap-2 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Choose a username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input 
            type="password" 
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password (min 6 chars)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
          <input 
            type="password" 
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm text-slate-600">
        Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Sign in</Link>
      </div>
    </div>
  );
}

function Profile({ user, setUser }) {
  const [skills, setSkills] = useState(user?.skills || '');
  const [experience, setExperience] = useState(user?.experience || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    try {
      const res = await axios.put(`${API_URL}/users/${user.id}/profile`, {
        skills,
        experience
      });
      setUser(res.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900">Your Profile</h2>
        <p className="text-slate-600 mt-2">Update your skills and experience for better job recommendations.</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        {success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile updated successfully!</span>
          </div>
        )}
        
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Skills</label>
            <textarea 
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-h-[100px]"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Python, Machine Learning, Communication..."
            />
            <p className="text-xs text-slate-500 mt-1">Enter your key skills, separated by commas</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
            <textarea 
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-h-[150px]"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Describe your work experience, education, and achievements..."
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Profile'} 
          </button>
        </form>
      </div>
    </div>
  );
}

function Recommendations({ user }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await axios.get(`${API_URL}/recommendations/${user.id}`);
        setRecommendations(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (user.id) fetchRecs();
  }, [user.id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500">Finding your matches...</p>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900">Job Matches</h2>
        <p className="text-slate-600 mt-2">Based on your skills and experience ({recommendations.length} jobs found)</p>
      </div>

      {(!user.skills && !user.experience) ? (
        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 text-center">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-amber-900 mb-2">Profile Incomplete</h3>
          <p className="text-amber-700 mb-4">Please complete your profile to get job recommendations.</p>
          <Link to="/profile" className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Complete Profile
          </Link>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="bg-slate-50 rounded-lg p-8 border border-slate-200 text-center">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-600">No matches found</h3>
          <p className="text-slate-500 mt-2">Try updating your profile with more details.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="bg-white rounded-lg p-5 shadow border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{rec.job.title}</h3>
                  <div className="flex items-center gap-2 text-slate-600 text-sm mt-1">
                    <Building className="w-4 h-4" /> {rec.job.company}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${rec.match_score > 70 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {rec.match_score}%
                </div>
              </div>
              
              <p className="text-slate-600 text-sm line-clamp-2 mb-4">{rec.job.description}</p>
              
              <div className="pt-3 border-t border-slate-100">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
