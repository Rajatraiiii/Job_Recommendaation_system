import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-xl mx-auto py-2">
      <p className="section-label mb-4">About</p>

      <h1 className="text-4xl font-bold text-stone-900 leading-tight mb-6">
        A smarter way to find a job that <span className="serif italic">fits.</span>
      </h1>

      <p className="text-stone-500 leading-relaxed mb-5">
        Most job boards show you everything. JobMatch shows you what's relevant — using a TF-IDF similarity engine that scores every open role against your actual skills and experience.
      </p>
      <p className="text-stone-500 leading-relaxed mb-10">
        No black-box algorithms. No promoted listings. Just a ranked list of jobs that match what you bring to the table.
      </p>

      <hr className="border-stone-200 mb-10" />

      {/* Steps */}
      <div className="mb-10">
        <p className="section-label mb-5">How it works</p>
        <ol className="space-y-6">
          {[
            ['Sign up', 'Takes about 20 seconds. No email verification, no noise.'],
            ['Write your profile', 'List your skills and a few sentences about your experience. The more specific, the better your matches.'],
            ['Get your ranked list', 'We score every job listing against your profile and sort by fit. Highest match at the top.'],
          ].map(([title, body], i) => (
            <li key={i} className="flex gap-4">
              <span className="text-xs font-mono text-stone-300 pt-0.5 shrink-0 w-5">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-semibold text-stone-800 mb-0.5">{title}</p>
                <p className="text-stone-500 text-sm">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Tech */}
      <div className="mb-10">
        <p className="section-label mb-4">Built with</p>
        <div className="flex flex-wrap gap-2">
          {['FastAPI', 'SQLite', 'SQLAlchemy', 'scikit-learn', 'React', 'Vite', 'TailwindCSS'].map((t) => (
            <span key={t} className="pill bg-stone-100 text-stone-600">{t}</span>
          ))}
        </div>
      </div>

      <Link to="/register" className="btn-primary inline-block px-5 py-2.5 text-sm">
        Get started — it's free
      </Link>
    </div>
  );
}
