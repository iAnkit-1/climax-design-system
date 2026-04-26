import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  location: { state: string };
  credits: number;
  pricePerCredit: number;
  status: string;
  documents: { url: string }[];
}

const statusStyles: Record<string, string> = {
  active:   "bg-green-100 text-green-800 border border-green-300",
  verified: "bg-emerald-100 text-emerald-800 border border-emerald-300",
  pending:  "bg-amber-50 text-amber-700 border border-amber-200",
  inactive: "bg-gray-100 text-gray-500 border border-gray-200",
};

const statusDot: Record<string, string> = {
  active:   "bg-green-600",
  verified: "bg-emerald-600",
  pending:  "bg-amber-500",
  inactive: "bg-gray-400",
};

const MyProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/projects/myprojects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching my projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyProjects();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-4 border-green-100" />
            <div className="absolute inset-0 rounded-full border-4 border-t-green-700 animate-spin" />
            <div className="absolute inset-2 rounded-full bg-green-50 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 19.4L5.71 21l1-2.3A4.49 4.49 0 008 19c8 0 10-8 10-8" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-400 tracking-widest uppercase font-medium">Loading projects…</p>
        </div>
      </div>
    );

  const totalCredits = projects.reduce((s, p) => s + p.credits, 0);
  const totalValue = projects.reduce((s, p) => s + p.credits * p.pricePerCredit, 0);

  return (
    <div className="min-h-screen bg-gray-50/80">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="px-8 py-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-5 bg-green-700 rounded-full" />
                <p className="text-[11px] font-bold tracking-[0.2em] text-green-700 uppercase">
                  Carbon Portfolio
                </p>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Projects</h1>
            </div>

            {/* Summary chips */}
            <div className="flex gap-3">
              <div className="bg-green-700 text-white rounded-2xl px-5 py-3 text-center shadow-lg shadow-green-200">
                <p className="text-lg font-bold leading-none">{projects.length}</p>
                <p className="text-[10px] mt-1 opacity-80 tracking-wider uppercase">Projects</p>
              </div>
              <div className="bg-white border-2 border-green-100 rounded-2xl px-5 py-3 text-center">
                <p className="text-lg font-bold text-gray-800 leading-none">{totalCredits.toLocaleString()}</p>
                <p className="text-[10px] mt-1 text-green-700 tracking-wider uppercase font-semibold">Credits</p>
              </div>
              <div className="bg-white border-2 border-green-100 rounded-2xl px-5 py-3 text-center">
                <p className="text-lg font-bold text-gray-800 leading-none">₹{(totalValue / 100000).toFixed(1)}L</p>
                <p className="text-[10px] mt-1 text-green-700 tracking-wider uppercase font-semibold">Est. Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative green bar */}
        <div className="h-1 bg-gradient-to-r from-green-700 via-emerald-500 to-green-300" />
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 border-2 border-dashed border-green-200 rounded-3xl bg-white">
            <div className="w-16 h-16 rounded-2xl bg-green-50 border-2 border-green-100 flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m-8-8h16" />
              </svg>
            </div>
            <p className="text-gray-700 font-semibold text-lg">No projects yet</p>
            <p className="text-sm text-gray-400 mt-1">Your submitted carbon projects will appear here.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const key = project.status?.toLowerCase();
              const badgeClass = statusStyles[key] ?? statusStyles.inactive;
              const dotClass = statusDot[key] ?? statusDot.inactive;

              return (
                <div
                  key={project._id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-green-50 overflow-hidden">
                    <img
                      src={`http://localhost:5000${project.documents?.[0]?.url}`}
                      alt={project.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Status badge */}
                    <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md bg-white/90 flex items-center gap-1.5 ${badgeClass}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                      {project.status}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <svg className="w-2.5 h-2.5 text-green-700" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-400 font-medium tracking-wide">
                        {project.location?.state}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-bold text-gray-900 text-base leading-snug mb-4 group-hover:text-green-800 transition-colors">
                      {project.title}
                    </h2>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-green-100 via-gray-100 to-transparent mb-4" />

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl px-3.5 py-3">
                        <p className="text-[9px] uppercase tracking-widest text-green-700 font-bold mb-1">
                          Credits
                        </p>
                        <p className="text-sm font-extrabold text-gray-900">
                          {Number(project.credits).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-3">
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                          Per Credit
                        </p>
                        <p className="text-sm font-extrabold text-gray-900">
                          ₹{project.pricePerCredit}
                        </p>
                      </div>
                    </div>

                    {/* Total value row */}
                    <div className="mt-3 flex items-center justify-between bg-green-700 rounded-xl px-3.5 py-2.5">
                      <p className="text-[10px] uppercase tracking-widest text-green-200 font-semibold">Total Value</p>
                      <p className="text-sm font-extrabold text-white">
                        ₹{(project.credits * project.pricePerCredit).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;