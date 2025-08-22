import { useEffect, useState } from "react";
import type { Leaderboard } from "../types/hivex";
import { getLeaderboard } from "../lib/data";

export default function Leaderboard(){
  const [lb,setLb]=useState<Leaderboard|null>(null);
  const [err,setErr]=useState("");
  useEffect(()=>{ getLeaderboard().then(setLb).catch(e=>setErr(e.message)); },[]);
  if(err) return <div className="text-red-600">Failed to load leaderboard.</div>;
  if(!lb) return <div>Loading…</div>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left border-b"><th>User</th><th>Points</th><th>Reports</th><th>Critical</th><th>High</th><th>Medium</th><th>Low</th></tr></thead>
        <tbody>
          {lb.contributors.map(c=>(
            <tr key={c.github} className="border-b">
              <td><a className="underline" href={`https://github.com/${c.github}`} target="_blank">{c.github}</a></td>
              <td>{c.points}</td><td>{c.reports}</td>
              <td>{c.by_severity.Critical}</td><td>{c.by_severity.High}</td><td>{c.by_severity.Medium}</td><td>{c.by_severity.Low}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
