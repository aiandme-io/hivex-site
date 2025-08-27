import { useEffect, useState } from "react";
import type { Project } from "../types/hivex";
import { getProjectsIndex } from "../lib/data";
import MarkdownRemote from "./MarkdownRemote";
import ProjectResults from "./ProjectResults";

export default function ProjectDetail({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    console.log("ProjectDetail: Looking for project with slug:", slug);
    
    getProjectsIndex()
      .then((index) => {
        console.log("ProjectDetail: Fetched projects index:", index);
        console.log("ProjectDetail: Available project slugs:", index.projects.map(p => p.slug));
        
        const found = index.projects.find(p => p.slug === slug);
        if (found) {
          console.log("ProjectDetail: Found project:", found);
          setProject(found);
        } else {
          console.log("ProjectDetail: Project not found. Available slugs:", index.projects.map(p => p.slug));
          setErr(`Project "${slug}" not found. Available projects: ${index.projects.map(p => p.slug).join(", ")}`);
          setDebugInfo(`Available projects: ${index.projects.map(p => p.slug).join(", ")}`);
        }
      })
      .catch(e => {
        console.error("ProjectDetail: Error fetching projects:", e);
        setErr(`Failed to fetch projects: ${e.message}`);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading project details...</div>;
  
  if (err) return (
    <div className="space-y-4">
      <div className="text-red-600 text-center py-8">Error: {err}</div>
      {debugInfo && (
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Debug Information:</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{debugInfo}</p>
        </div>
      )}
    </div>
  );
  
  if (!project) return <div className="text-center py-8 text-gray-600 dark:text-gray-400">Project not found</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Status:</span> {project.status}
          </div>
          <div>
            <span className="font-medium">Branch:</span> {project.branch}
          </div>
          <div>
            <span className="font-medium">Total Results:</span> {project.stats.total_results}
          </div>
          <div>
            <span className="font-medium">GitHub:</span>{" "}
            <a href={project.github_branch_url} target="_blank" className="text-blue-600 hover:underline">
              View Branch
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">README</h2>
        <MarkdownRemote src={project.readme_raw_url} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">Results</h2>
        <ProjectResults resultsUrl={project.results_url} />
      </div>
    </div>
  );
}
