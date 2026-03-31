import { useLocation, useNavigate } from 'react-router-dom';
import { Building, ArrowLeft, CheckCircle2, Briefcase } from 'lucide-react';

export default function JobDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const job = state?.job;

  if (!job) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <Briefcase className="w-10 h-10 text-stone-200 mx-auto mb-3" />
        <p className="text-stone-400 mb-4">Job not found.</p>
        <button onClick={() => navigate('/jobs')} className="text-stone-600 text-sm underline">
          Back to jobs
        </button>
      </div>
    );
  }

  const requirements = job.requirements.split(',').map((r) => r.trim()).filter(Boolean);

  return (
    <div className="max-w-xl mx-auto py-2">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-stone-400 hover:text-stone-700 text-sm mb-7 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Title block */}
      <div className="mb-6">
        <p className="section-label mb-2">{job.company}</p>
        <h1 className="text-3xl font-bold text-stone-900 leading-tight">{job.title}</h1>
        <div className="flex items-center gap-1.5 text-stone-400 text-sm mt-2">
          <Building className="w-4 h-4" />
          {job.company} · Full-time
        </div>
      </div>

      <hr className="border-stone-200 mb-6" />

      {/* Description */}
      <div className="mb-7">
        <p className="section-label mb-3">About the role</p>
        <p className="text-stone-600 leading-relaxed text-[15px]">{job.description}</p>
      </div>

      {/* Requirements */}
      <div className="mb-8">
        <p className="section-label mb-3">What you'll need</p>
        <ul className="space-y-2">
          {requirements.map((req) => (
            <li key={req} className="flex items-start gap-2.5 text-stone-700 text-sm">
              <CheckCircle2 className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <button
          className="btn-primary px-6 py-2.5 text-sm"
          onClick={() => alert('Application feature coming soon!')}
        >
          Apply for this role
        </button>
        <button
          onClick={() => navigate(-1)}
          className="btn-ghost px-5 py-2.5 text-sm"
        >
          Back
        </button>
      </div>
    </div>
  );
}
