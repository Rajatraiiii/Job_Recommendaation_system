import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Sparkles, Briefcase, User, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const API_URL = 'http://localhost:8000';

export default function Dashboard({ user }) {
  const [matchCount, setMatchCount] = useState(null);
  const [topMatch, setTopMatch] = useState(null);

  useEffect(() => {
    if (user?.id) {
      axios.get(`${API_URL}/recommendations/${user.id}`)
        .then((r) => {
          setMatchCount(r.data.length);
          if (r.data.length > 0) setTopMatch(r.data[0]);
        })
        .catch(() => setMatchCount(0));
    }
  }, [user?.id]);

  const profileComplete = !!(user?.skills && user?.experience);
  const profilePartial = !!(user?.skills || user?.experience);

  const actions = [
    {
      to: '/recommendations',
      icon: <Sparkles className="w-4 h-4" />,
      label: 'View job matches',
      meta: matchCount === null ? 'Loading…' : `${matchCount} matches`,
    },
    {
      to: '/profile',
      icon: <User className="w-4 h-4" />,
      label: profileComplete ? 'Update profile' : 'Complete your profile',
      meta: profileComplete ? 'Profile complete' : 'Needed for matches',
      warn: !profileComplete,
    },
    {
      to: '/jobs',
      icon: <Briefcase className="w-4 h-4" />,
      label: 'Browse all jobs',
      meta: '30 open roles',
    },
  ];

  return (
    <div className="max-w-lg mx-auto py-2">
      {/* Greeting */}
      <div className="mb-8">
        <p className="section-label mb-2">Dashboard</p>
        <h1 className="text-2xl font-bold text-stone-900">
          Hey, {user?.username} 👋
        </h1>
        <p className="text-stone-400 text-sm mt-1">
          {profileComplete
            ? 'Your profile is set up. Here are your quick links.'
            : 'Finish your profile to unlock personalised job matches.'}
        </p>
      </div>

      {/* Profile incomplete notice */}
      {!profilePartial && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 items-start mb-6">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">Profile empty</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Add your skills so we can rank jobs for you.
            </p>
          </div>
        </div>
      )}

      {/* Top match callout */}
      {topMatch && (
        <Link
          to={`/jobs/${topMatch.job.id}`}
          state={{ job: topMatch.job }}
          className="block bg-stone-900 text-white rounded-2xl p-5 mb-5 hover:bg-stone-800 transition-colors"
        >
          <p className="section-label text-stone-400 mb-2">Top match</p>
          <p className="font-semibold text-lg leading-tight">{topMatch.job.title}</p>
          <p className="text-stone-400 text-sm mt-0.5">{topMatch.job.company}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs bg-emerald-500 text-white px-2.5 py-1 rounded-full font-medium">
              {topMatch.match_score}% match
            </span>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </div>
        </Link>
      )}

      {/* Action list */}
      <div className="space-y-2">
        {actions.map(({ to, icon, label, meta, warn }) => (
          <Link
            key={to}
            to={to}
            className="job-card flex items-center justify-between px-4 py-3.5 group"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${warn ? 'bg-amber-100 text-amber-600' : 'bg-stone-100 text-stone-500'}`}>
                {icon}
              </div>
              <div>
                <p className="text-sm font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                  {label}
                </p>
                <p className={`text-xs mt-0.5 ${warn ? 'text-amber-500' : 'text-stone-400'}`}>{meta}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-500 transition-colors" />
          </Link>
        ))}
      </div>

      {profileComplete && (
        <div className="flex items-center gap-2 text-emerald-700 text-xs mt-5">
          <CheckCircle2 className="w-4 h-4" />
          Profile complete — matches are live.
        </div>
      )}
    </div>
  );
}
