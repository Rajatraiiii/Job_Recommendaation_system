import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Building, Search, Briefcase, ChevronRight } from "lucide-react";

const API_URL = "http://localhost:8000";

const CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "ML / AI",
  "DevOps",
  "Mobile",
  "Design",
  "Data",
  "Other",
];

function getCategory(job) {
  const t = (job.title + " " + job.requirements).toLowerCase();
  if (
    t.includes("frontend") ||
    t.includes("react") ||
    t.includes("ui/ux") ||
    t.includes("designer")
  )
    return "Design";
  if (
    t.includes("machine learning") ||
    t.includes("nlp") ||
    t.includes("computer vision") ||
    t.includes("ml") ||
    t.includes("research scientist")
  )
    return "ML / AI";
  if (t.includes("android") || t.includes("ios")) return "Mobile";
  if (
    t.includes("devops") ||
    t.includes("sre") ||
    t.includes("infrastructure") ||
    t.includes("platform") ||
    t.includes("cloud")
  )
    return "DevOps";
  if (
    t.includes("data engineer") ||
    t.includes("data scientist") ||
    t.includes("analyst")
  )
    return "Data";
  if (
    t.includes("backend") ||
    t.includes("java") ||
    t.includes("node") ||
    t.includes("database") ||
    t.includes("blockchain") ||
    t.includes("security")
  )
    return "Backend";
  if (t.includes("frontend") || t.includes("react") || t.includes("typescript"))
    return "Frontend";
  return "Other";
}

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/jobs/`)
      .then((r) => setJobs(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = jobs.filter((j) => {
    const matchesQ =
      j.title.toLowerCase().includes(query.toLowerCase()) ||
      j.company.toLowerCase().includes(query.toLowerCase()) ||
      j.requirements.toLowerCase().includes(query.toLowerCase());
    const matchesCat = category === "All" || getCategory(j) === category;
    return matchesQ && matchesCat;
  });

  return (
    <div className="py-2">
      {/* Header */}
      <div className="mb-6">
        <p className="section-label mb-2">Open roles</p>
        <h1 className="text-2xl font-bold text-stone-900">Browse Jobs</h1>
        <p className="text-stone-400 text-sm mt-1">
          {jobs.length} positions across {CATEGORIES.length - 1} categories
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" /> */}
          <input
            type="text"
            placeholder="Search title, company, skill…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-base pl-9"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-7">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`pill transition-colors ${
              category === cat
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-stone-400 text-xs mb-4">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          {category !== "All" ? ` in ${category}` : ""}
          {query ? ` for "${query}"` : ""}
        </p>
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-7 h-7 border-4 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-300">
          <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-stone-400">No jobs match your search.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((job) => {
            const cat = getCategory(job);
            const tags = job.requirements
              .split(",")
              .map((r) => r.trim())
              .filter(Boolean)
              .slice(0, 3);

            return (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                state={{ job }}
                className="job-card flex items-start justify-between p-4 gap-4 group block"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                      {job.title}
                    </span>
                    <span className="pill bg-stone-100 text-stone-500">
                      {cat}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-400 text-sm mb-2">
                    <Building className="w-3.5 h-3.5 shrink-0" />
                    {job.company}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] bg-stone-50 border border-stone-200 text-stone-500 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-600 transition-colors shrink-0 mt-1" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
