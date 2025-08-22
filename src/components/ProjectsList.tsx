import { useEffect, useState } from "react";
import type { ProjectsIndex } from "../types/hivex";
import { getProjectsIndex } from "../lib/data";

export default function ProjectsList({ onProjectClick }: { onProjectClick: (slug: string) => void }){
  const [data,setData]=useState<ProjectsIndex|null>(null);
  const [err,setErr]=useState<string>("");
  useEffect(()=>{ getProjectsIndex().then(setData).catch(e=>setErr(e.message)); },[]);
  if(err) return <div className="text-red-600">Failed to load projects.</div>;
  if(!data) return <div className="text-text">Loading…</div>;
  const active=data.projects.filter(p=>p.status==="active");
  const past=data.projects.filter(p=>p.status==="published"||p.status==="archived");
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-text">Active Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {active.map(p=>(
            <button key={p.slug} onClick={() => onProjectClick(p.slug)} className="text-left bg-bg border border-border rounded-lg p-5 hover:shadow-lg transition-all hover:scale-105">
              <h3 className="font-semibold text-text">{p.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{p.stats.total_results} results • {Object.entries(p.stats.by_severity).map(([k,v])=>`${k}:${v}`).join("  ")}</p>
            </button>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4 text-text">Past Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {past.map(p=>(
            <button key={p.slug} onClick={() => onProjectClick(p.slug)} className="text-left bg-bg border border-border rounded-lg p-5 hover:shadow-lg transition-all hover:scale-105">
              <h3 className="font-semibold text-text">{p.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{p.stats.total_results} results</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
