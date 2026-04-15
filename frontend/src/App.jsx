import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link, useNavigate, NavLink
} from 'react-router-dom';
import axios from 'axios';
import {
  Briefcase, LogOut, Sparkles, AlertCircle, Building,
  CheckCircle2, ChevronRight, Search
} from 'lucide-react';
import BrowseJobs from './pages/BrowseJobs';
import JobDetail from './pages/JobDetail';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

const API_URL = 'http://localhost:8000';

function App() {
  const [user, setUser] = useState('demo');

  return (
    <Router>
      <div className="min-h-screen bg-[#f7f6f3]">
        {/* Nav */}
        <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-5 flex items-center justify-between h-14">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2 font-semibold text-stone-900">
              <div className="w-7 h-7 bg-stone-900 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              JobMatch
            </Link>

            {/* Centre links */}
            <nav className="flex items-center gap-6 text-sm">
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  isActive ? 'text-stone-900 font-medium' : 'text-stone-500 hover:text-stone-800 transition-colors'
                }
              >
                Jobs
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'text-stone-900 font-medium' : 'text-stone-500 hover:text-stone-800 transition-colors'
                }
              >
                About
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? 'text-stone-900 font-medium' : 'text-stone-500 hover:text-stone-800 transition-colors'
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/recommendations"
                    className={({ isActive }) =>
                      isActive ? 'text-stone-900 font-medium' : 'text-stone-500 hover:text-stone-800 transition-colors'
                    }
                  >
                    Matches
                  </NavLink>
                </>
              )}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3 text-sm">
              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? 'text-stone-900 font-medium' : 'text-stone-500 hover:text-stone-800 transition-colors'
                    }
                  >
                    {user.username}
                  </NavLink>
                  <button
                    onClick={() => setUser(null)}
                    title="Sign out"
                    className="text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-stone-600 hover:text-stone-900 transition-colors">
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary px-4 py-1.5 text-sm"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-5 py-10">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route
              path="/profile"
              element={user ? <Profile user={user} setUser={setUser} /> : <Login setUser={setUser} />}
            />
            <Route
              path="/recommendations"
              element={user ? <Recommendations user={user} /> : <Login setUser={setUser} />}
            />
            <Route path="/jobs" element={<BrowseJobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard user={user} /> : <Login setUser={setUser} />}
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

/* ─── Home ─────────────────────────────────────────────────── */
function Home({ user }) {
  const stats = [
    { label: 'Jobs listed', value: '30+' },
    { label: 'Companies', value: '20+' },
    { label: 'AI-matched', value: '100%' },
  ];

  return (
    <div className="pt-12 pb-24">
      {/* Hero */}
      <div className="max-w-3xl mb-16">
        <p className="section-label mb-4">AI Job Matching</p>
        <h1 className="text-5xl font-bold text-stone-900 leading-tight mb-5">
          Jobs that fit <span className="serif italic">your</span> skills,<br />
          not the other way around.
        </h1>
        <p className="text-stone-500 text-lg leading-relaxed mb-8 max-w-xl">
          Paste in your skills and experience. Our TF-IDF engine scores every listing and surfaces the ones you'll actually land.
        </p>
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/register" className="btn-primary px-5 py-2.5 text-sm">
                Create free account
              </Link>
              <Link to="/jobs" className="btn-ghost px-5 py-2.5 text-sm">
                Browse jobs
              </Link>
            </>
          ) : (
            <>
              <Link to="/recommendations" className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> See my matches
              </Link>
              <Link to="/jobs" className="btn-ghost px-5 py-2.5 text-sm">
                Browse all jobs
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Stats strip */}
      <div className="flex items-start gap-12 mb-16 border-t border-b border-stone-200 py-6">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold text-stone-900">{s.value}</p>
            <p className="text-stone-400 text-sm mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div>
        <p className="section-label mb-6">How it works</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { n: '01', title: 'Sign up', body: 'Create an account in under a minute.' },
            { n: '02', title: 'Add your profile', body: 'List your skills and a bit of experience.' },
            { n: '03', title: 'Get matches', body: 'We rank every job by how well it fits you.' },
          ].map((step) => (
            <div key={step.n} className="bg-white rounded-2xl p-5 border border-stone-200">
              <p className="text-xs font-mono text-stone-300 mb-3">{step.n}</p>
              <p className="font-semibold text-stone-800 mb-1">{step.title}</p>
              <p className="text-stone-500 text-sm">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Auth forms ────────────────────────────────────────────── */
function AuthShell({ title, sub, error, onSubmit, loading, btnLabel, footer, children }) {
  return (
    <div className="max-w-sm mx-auto mt-10">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-stone-900">{title}</h1>
        <p className="text-stone-400 text-sm mt-1">{sub}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-5 flex items-start gap-2 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-2.5 text-sm mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '...' : btnLabel}
        </button>
      </form>

      <p className="text-center text-stone-400 text-sm mt-6">{footer}</p>
    </div>
  );
}

function FieldGroup({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
      {children}
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
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      sub="Sign in to your account."
      error={error}
      onSubmit={handleLogin}
      loading={loading}
      btnLabel="Sign in"
      footer={<>No account? <Link to="/register" className="text-stone-900 font-medium underline">Sign up</Link></>}
    >
      <FieldGroup label="Username">
        <input className="input-base" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="your_username" />
      </FieldGroup>
      <FieldGroup label="Password">
        <input className="input-base" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
      </FieldGroup>
    </AuthShell>
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
    if (password !== confirmPassword) { setError('Passwords do not match'); setLoading(false); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); setLoading(false); return; }
    try {
      const res = await axios.post(`${API_URL}/users/register`, { username, password });
      setUser(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Username may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create account"
      sub="Get matched with jobs in minutes."
      error={error}
      onSubmit={handleRegister}
      loading={loading}
      btnLabel="Create account"
      footer={<>Already have one? <Link to="/login" className="text-stone-900 font-medium underline">Sign in</Link></>}
    >
      <FieldGroup label="Username">
        <input className="input-base" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="choose a username" />
      </FieldGroup>
      <FieldGroup label="Password">
        <input className="input-base" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="min 6 characters" />
      </FieldGroup>
      <FieldGroup label="Confirm password">
        <input className="input-base" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="••••••••" />
      </FieldGroup>
    </AuthShell>
  );
}

/* ─── Profile ───────────────────────────────────────────────── */
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
      const res = await axios.put(`${API_URL}/users/${user.id}/profile`, { skills, experience });
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
    <div className="max-w-xl mx-auto py-2">
      <h1 className="text-2xl font-bold text-stone-900 mb-1">Profile</h1>
      <p className="text-stone-400 text-sm mb-7">The more detail you add, the better your matches.</p>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl mb-5 flex items-center gap-2 text-sm">
          <CheckCircle2 className="w-4 h-4" /> Saved.
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-5">
        <FieldGroup label="Skills">
          <textarea
            className="input-base min-h-[90px] resize-none"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="React, Python, SQL, Communication…"
          />
          <p className="text-xs text-stone-400 mt-1">Comma-separated list</p>
        </FieldGroup>

        <FieldGroup label="Experience">
          <textarea
            className="input-base min-h-[130px] resize-none"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="2 years as a frontend dev at a startup, BSc CS, built 3 side projects…"
          />
        </FieldGroup>

        <button type="submit" disabled={loading} className="btn-primary px-5 py-2.5 text-sm disabled:opacity-50">
          {loading ? 'Saving…' : 'Save profile'}
        </button>
      </form>
    </div>
  );
}

/* ─── Recommendations ───────────────────────────────────────── */
function Recommendations({ user }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.id) {
      axios.get(`${API_URL}/recommendations/${user.id}`)
        .then((r) => setRecommendations(r.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user.id]);

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <p className="section-label mb-2">AI Recommendations</p>
        <h1 className="text-2xl font-bold text-stone-900">Your matches</h1>
        <p className="text-stone-400 text-sm mt-1">{recommendations.length} jobs ranked by fit</p>
      </div>

      {(!user.skills && !user.experience) ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <p className="font-semibold text-amber-900 mb-1">Your profile is empty</p>
          <p className="text-amber-700 text-sm mb-4">Add skills and experience so we can rank jobs for you.</p>
          <Link to="/profile" className="btn-primary px-4 py-2 text-sm inline-block">Complete profile</Link>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center">
          <Briefcase className="w-10 h-10 text-stone-200 mx-auto mb-3" />
          <p className="text-stone-500 font-medium">No matches yet</p>
          <p className="text-stone-400 text-sm mt-1">Try adding more detail to your profile.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <Link
              key={idx}
              to={`/jobs/${rec.job.id}`}
              state={{ job: rec.job }}
              className="job-card flex items-start justify-between p-4 gap-4 group"
            >
              <div className="min-w-0">
                <p className="font-semibold text-stone-900 group-hover:text-stone-700 truncate">{rec.job.title}</p>
                <div className="flex items-center gap-1.5 text-stone-400 text-sm mt-0.5">
                  <Building className="w-3.5 h-3.5 shrink-0" />
                  {rec.job.company}
                </div>
                <p className="text-stone-500 text-sm mt-2 line-clamp-1">{rec.job.description}</p>
              </div>
              <span className={`pill shrink-0 mt-1 ${rec.match_score > 70 ? 'score-high' : 'score-med'}`}>
                {rec.match_score}%
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
