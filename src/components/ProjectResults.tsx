import { useEffect, useMemo, useState } from "react";
import SeverityPill from "./SeverityPill";
import type { ResultsDoc, Severity } from "../types/hivex";
import { getResults } from "../lib/data";

export default function ProjectResults({ resultsUrl }:{ resultsUrl:string }) {
  const [doc,setDoc]=useState<ResultsDoc|null>(null);
  const [err,setErr]=useState("");
  const [filter,setFilter]=useState<Severity|"">("");

  useEffect(()=>{ getResults(resultsUrl).then(setDoc).catch(e=>setErr(e.message)); },[resultsUrl]);
  const list=useMemo(()=> doc ? doc.results.filter(r=>!filter||r.severity===filter) : [],[doc,filter]);

  if(err) return <div className="text-red-600">Failed to load results.</div>;
  if(!doc) return <div>Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="font-medium">Filter:</span>
        {(["","Critical","High","Medium","Low"] as const).map(s=>(
          <button key={s} onClick={()=>setFilter(s as any)}
            className={`px-2 py-1 text-sm rounded border ${filter===s?"bg-gray-900 text-white":"bg-white"}`}>{s||"All"}</button>
        ))}
      </div>
      <table className="w-full text-sm">
        <thead><tr className="text-left border-b"><th>ID</th><th>Severity</th><th>Author</th><th>Impact</th><th>PR</th></tr></thead>
        <tbody>
          {list.map(r=>(
            <tr key={r.id} className="border-b">
              <td className="py-2">{r.id}</td>
              <td><SeverityPill s={r.severity} /></td>
              <td><a className="underline" href={`https://github.com/${r.author_github}`} target="_blank">{r.author_github}</a></td>
              <td className="max-w-xl">{r.impact}</td>
              <td>{r.pr?.url ? <a className="underline" href={r.pr.url} target="_blank">PR #{r.pr.number}</a> : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
