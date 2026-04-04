import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, MessageSquare, TrendingUp, BookOpen,
  ChevronDown, ChevronUp, ExternalLink, Lightbulb,
  Target, Award, Clock, Users, Zap, Star
} from 'lucide-react';

/* ── Data ─────────────────────────────────────────────────────── */
const tabs = [
  { id: 'resume',    icon: FileText,      label: 'Resume',    color: 'emerald' },
  { id: 'interview', icon: MessageSquare, label: 'Interview',  color: 'blue'    },
  { id: 'salary',    icon: TrendingUp,    label: 'Salary',     color: 'violet'  },
  { id: 'skills',    icon: BookOpen,      label: 'Skills',     color: 'amber'   },
];

const resumeTips = [
  {
    title: 'Tailor your resume to every job',
    body: 'Mirror the exact keywords from the job description. Applicant tracking systems (ATS) scan for keyword matches before a human ever reads your resume.',
    icon: Target,
  },
  {
    title: 'Lead with impact numbers',
    body: 'Replace vague duties with quantified achievements. "Reduced page load time by 40%" beats "worked on performance optimisation" every time.',
    icon: TrendingUp,
  },
  {
    title: 'Keep it to one page (mostly)',
    body: 'Unless you have 10+ years of highly relevant experience, one tight page signals confidence and clear thinking. Remove graduation year for roles unrelated to academia.',
    icon: FileText,
  },
  {
    title: 'Skills section placement matters',
    body: 'Put your skills section near the top if you are changing careers or are a recent grad. Mid-career professionals should place it after work experience.',
    icon: Award,
  },
  {
    title: 'Use action verbs, not passive voice',
    body: '"Built", "launched", "led", "reduced", "increased" — start every bullet with a strong past-tense verb. Avoid "responsible for" or "duties included".',
    icon: Zap,
  },
  {
    title: 'Save as PDF with a clean file name',
    body: 'Submit as "FirstName_LastName_Role.pdf". Never send .docx files unless explicitly asked — formatting breaks across Word versions.',
    icon: FileText,
  },
];

const interviewFAQ = [
  {
    q: 'Tell me about yourself.',
    a: 'Use the Past–Present–Future framework. Briefly cover your background, what you are doing now, and why you are excited about this specific role. Keep it under 90 seconds.',
  },
  {
    q: 'What is your greatest weakness?',
    a: 'Pick a real weakness you have already been working on. Describe the steps you are taking to improve it. Avoid clichés like "I work too hard".',
  },
  {
    q: 'Why do you want to work here?',
    a: 'Research the company\'s recent product launches, mission, and culture. Reference something specific — a blog post, a feature, or a company value — to show genuine interest.',
  },
  {
    q: 'Where do you see yourself in 5 years?',
    a: 'Align your ambition with the growth path the role offers. Show you want depth and responsibility in this field, not that you view this job as a stepping stone.',
  },
  {
    q: 'Do you have any questions for us?',
    a: 'Always prepare 3–5 questions. Ask about success metrics for the role, team dynamics, onboarding, or what the interviewer enjoys most about working there.',
  },
  {
    q: 'How do you handle conflict with a colleague?',
    a: 'Use the STAR method: Situation, Task, Action, Result. Focus on empathy, direct communication, and the positive outcome, not on who was right.',
  },
];

const salaryRanges = [
  { role: 'Frontend Developer',       entry: '₹4–7 L',  mid: '₹8–16 L',  senior: '₹18–35 L' },
  { role: 'Backend Developer',         entry: '₹4–8 L',  mid: '₹9–18 L',  senior: '₹20–40 L' },
  { role: 'Full-Stack Developer',      entry: '₹5–9 L',  mid: '₹10–20 L', senior: '₹22–45 L' },
  { role: 'Data Analyst',              entry: '₹3–6 L',  mid: '₹7–14 L',  senior: '₹15–28 L' },
  { role: 'Data Scientist',            entry: '₹6–10 L', mid: '₹12–22 L', senior: '₹24–50 L' },
  { role: 'DevOps Engineer',           entry: '₹5–9 L',  mid: '₹10–20 L', senior: '₹22–42 L' },
  { role: 'Product Manager',           entry: '₹6–11 L', mid: '₹12–24 L', senior: '₹26–55 L' },
  { role: 'UI/UX Designer',            entry: '₹3–6 L',  mid: '₹7–14 L',  senior: '₹15–30 L' },
  { role: 'Machine Learning Engineer', entry: '₹7–12 L', mid: '₹14–26 L', senior: '₹28–60 L' },
];

const skillResources = [
  {
    category: 'Programming & CS',
    color: 'blue',
    links: [
      { name: 'freeCodeCamp',        url: 'https://www.freecodecamp.org',        free: true  },
      { name: 'CS50 by Harvard',     url: 'https://cs50.harvard.edu',            free: true  },
      { name: 'The Odin Project',    url: 'https://www.theodinproject.com',      free: true  },
      { name: 'Coursera — Meta iOS', url: 'https://www.coursera.org',            free: false },
    ],
  },
  {
    category: 'Data & AI',
    color: 'violet',
    links: [
      { name: 'Kaggle Learn',         url: 'https://www.kaggle.com/learn',        free: true  },
      { name: 'Fast.ai',              url: 'https://www.fast.ai',                 free: true  },
      { name: 'Google ML Crash Course',url: 'https://developers.google.com/machine-learning/crash-course', free: true },
      { name: 'DeepLearning.AI',      url: 'https://www.deeplearning.ai',         free: false },
    ],
  },
  {
    category: 'System Design & Architecture',
    color: 'emerald',
    links: [
      { name: 'ByteByteGo Blog',     url: 'https://blog.bytebytego.com',         free: true  },
      { name: 'Grokking System Design',url:'https://www.designgurus.io',          free: false },
      { name: 'System Design Primer',url: 'https://github.com/donnemartin/system-design-primer', free: true },
    ],
  },
  {
    category: 'Interview Prep',
    color: 'amber',
    links: [
      { name: 'LeetCode',            url: 'https://leetcode.com',                free: true  },
      { name: 'NeetCode',            url: 'https://neetcode.io',                 free: true  },
      { name: 'InterviewBit',        url: 'https://www.interviewbit.com',        free: true  },
      { name: 'Pramp (mock interviews)',url:'https://www.pramp.com',              free: true  },
    ],
  },
];

/* ── Color map ────────────────────────────────────────────────── */
const colMap = {
  emerald: { pill: 'bg-emerald-100 text-emerald-800', ring: 'bg-emerald-50 text-emerald-700', icon: 'text-emerald-600', dot: 'bg-emerald-500' },
  blue:    { pill: 'bg-blue-100 text-blue-800',       ring: 'bg-blue-50 text-blue-700',       icon: 'text-blue-600',    dot: 'bg-blue-500'    },
  violet:  { pill: 'bg-violet-100 text-violet-800',   ring: 'bg-violet-50 text-violet-700',   icon: 'text-violet-600',  dot: 'bg-violet-500'  },
  amber:   { pill: 'bg-amber-100 text-amber-800',     ring: 'bg-amber-50 text-amber-700',     icon: 'text-amber-600',   dot: 'bg-amber-500'   },
};

/* ── Sub-components ───────────────────────────────────────────── */
function ResumeTipsPanel() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {resumeTips.map((tip) => {
        const Icon = tip.icon;
        return (
          <div key={tip.title} className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-md transition-all duration-150">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-stone-900 text-sm mb-1">{tip.title}</p>
                <p className="text-stone-500 text-sm leading-relaxed">{tip.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InterviewPanel() {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-2">
      {interviewFAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="bg-white border border-stone-200 rounded-2xl overflow-hidden transition-all duration-150 hover:border-stone-300"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium text-stone-900 text-sm pr-4">{item.q}</span>
              {isOpen
                ? <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                : <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
              }
            </button>
            {isOpen && (
              <div className="px-5 pb-4 border-t border-stone-100">
                <p className="text-stone-600 text-sm leading-relaxed pt-3">{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 mt-4">
        <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-blue-800 text-sm">
          <span className="font-semibold">Pro tip:</span> Record yourself answering questions in a mirror or on your phone. Most people are surprised by their filler words and pacing.
        </p>
      </div>
    </div>
  );
}

function SalaryPanel() {
  return (
    <div>
      <p className="text-stone-500 text-sm mb-5 leading-relaxed">
        Approximate annual salary ranges for tech roles in India (2025). Figures vary by city, company size, and skill depth.
      </p>
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50">
              <th className="text-left px-5 py-3 text-stone-600 font-semibold">Role</th>
              <th className="text-center px-4 py-3 text-stone-600 font-semibold">Entry</th>
              <th className="text-center px-4 py-3 text-stone-600 font-semibold">Mid</th>
              <th className="text-center px-4 py-3 text-stone-600 font-semibold">Senior</th>
            </tr>
          </thead>
          <tbody>
            {salaryRanges.map((row, i) => (
              <tr key={row.role} className={`border-b border-stone-100 last:border-none ${i % 2 === 0 ? '' : 'bg-stone-50/60'}`}>
                <td className="px-5 py-3 font-medium text-stone-800">{row.role}</td>
                <td className="px-4 py-3 text-center">
                  <span className="pill bg-stone-100 text-stone-600">{row.entry}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="pill bg-blue-100 text-blue-700">{row.mid}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="pill bg-violet-100 text-violet-700">{row.senior}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-stone-400 text-xs mt-3">
        Sources: Glassdoor, AmbitionBox, Levels.fyi (India edition). Always negotiate — offers are starting points.
      </p>
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {skillResources.map((cat) => {
        const c = colMap[cat.color];
        return (
          <div key={cat.category} className="bg-white border border-stone-200 rounded-2xl p-5">
            <p className={`section-label mb-4 ${c.icon}`}>{cat.category}</p>
            <ul className="space-y-2.5">
              {cat.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group"
                  >
                    <span className="text-sm text-stone-700 group-hover:text-stone-900 transition-colors font-medium flex items-center gap-2">
                      <ExternalLink className="w-3.5 h-3.5 text-stone-300 group-hover:text-stone-500 transition-colors" />
                      {link.name}
                    </span>
                    <span className={`pill text-xs ${link.free ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>
                      {link.free ? 'Free' : 'Paid'}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────── */
export default function CareerTips() {
  const [activeTab, setActiveTab] = useState('resume');

  const panels = {
    resume:    <ResumeTipsPanel />,
    interview: <InterviewPanel />,
    salary:    <SalaryPanel />,
    skills:    <SkillsPanel />,
  };

  const activeColor = tabs.find(t => t.id === activeTab)?.color ?? 'emerald';
  const c = colMap[activeColor];

  return (
    <div className="py-4">
      {/* Header */}
      <div className="max-w-2xl mb-10">
        <p className="section-label mb-3">Free resource hub</p>
        <h1 className="text-4xl font-bold text-stone-900 leading-tight mb-3">
          Career tips &amp; <span className="serif italic">resources</span>
        </h1>
        <p className="text-stone-500 text-base leading-relaxed">
          Everything you need to land your next role — from writing a standout resume to negotiating your salary. No sign-up required.
        </p>
      </div>

      {/* Quick-stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { icon: Star,   label: '6 resume tips',          sub: 'ATS-proof your CV'          },
          { icon: Users,  label: '6 interview answers',     sub: 'Real questions, real tactics' },
          { icon: TrendingUp, label: '9 salary benchmarks', sub: 'India 2025 figures'         },
          { icon: Clock,  label: '15+ free courses',        sub: 'Zero cost, real skills'      },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="bg-white border border-stone-200 rounded-2xl p-4">
            <Icon className="w-4 h-4 text-stone-400 mb-2" />
            <p className="font-semibold text-stone-900 text-sm">{label}</p>
            <p className="text-stone-400 text-xs mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const tc = colMap[tab.color];
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 border ${
                isActive
                  ? `${tc.ring} border-transparent shadow-sm`
                  : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300 hover:text-stone-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? tc.icon : 'text-stone-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="min-h-[400px]">
        {panels[activeTab]}
      </div>

      {/* CTA footer */}
      <div className="mt-12 bg-stone-900 rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-white font-bold text-xl mb-1">Ready to apply what you've learned?</p>
          <p className="text-stone-400 text-sm">Browse open roles and let our AI match you to the best fits.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link to="/jobs" className="bg-white text-stone-900 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-stone-100 transition-colors">
            Browse jobs
          </Link>
          <Link to="/register" className="bg-stone-700 hover:bg-stone-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
            Get matched
          </Link>
        </div>
      </div>
    </div>
  );
}
