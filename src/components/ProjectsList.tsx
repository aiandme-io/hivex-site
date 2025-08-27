import { useEffect, useState } from "react";
import type { ProjectsIndex } from "../types/hivex";
import { getProjectsIndex } from "../lib/data";

export default function ProjectsList(){
  const [data,setData]=useState<ProjectsIndex|null>(null);
  const [err,setErr]=useState<string>("");
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{ 
    getProjectsIndex()
      .then(setData)
      .catch(e=>setErr(e.message))
      .finally(() => setLoading(false));
  },[]);
  
  const handleProjectClick = (slug: string) => {
    window.location.href = `/p/${slug}`;
  };
  
  if(loading) return <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading projects...</div>;
  if(err) return <div className="text-red-600 text-center py-8">Failed to load projects: {err}</div>;
  if(!data) return <div className="text-center py-8 text-gray-600 dark:text-gray-400">No projects found.</div>;
  
  const active=data.projects.filter(p=>p.status==="active");
  const past=data.projects.filter(p=>p.status==="published"||p.status==="archived");
  
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
          Active Projects ({active.length})
        </h2>
        {active.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No active projects at the moment.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {active.map(p=>(
              <button 
                key={p.slug} 
                onClick={() => handleProjectClick(p.slug)} 
                className="text-left bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-lg transition-all hover:scale-105 hover:border-blue-300 dark:hover:border-blue-500"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{p.title}</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p><span className="font-medium">Status:</span> <span className="capitalize">{p.status}</span></p>
                  <p><span className="font-medium">Branch:</span> {p.branch}</p>
                  <p><span className="font-medium">Results:</span> {p.stats.total_results}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {Object.entries(p.stats.by_severity).map(([severity, count]) => (
                      <span key={severity} className={`px-2 py-1 rounded text-xs font-medium ${
                        severity === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                        severity === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                        severity === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {severity}: {count}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
          <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
          Past Projects ({past.length})
        </h2>
        {past.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No completed projects yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.map(p=>(
              <button 
                key={p.slug} 
                onClick={() => handleProjectClick(p.slug)} 
                className="text-left bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-lg transition-all hover:scale-105 hover:border-gray-300 dark:hover:border-gray-500"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{p.title}</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p><span className="font-medium">Status:</span> <span className="capitalize">{p.status}</span></p>
                  <p><span className="font-medium">Branch:</span> {p.branch}</p>
                  <p><span className="font-medium">Results:</span> {p.stats.total_results}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
