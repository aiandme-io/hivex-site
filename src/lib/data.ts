const BASE = import.meta.env.PUBLIC_DATA_BASE_URL;
export const nocache = () => ({ cache:"no-store", headers:{"Cache-Control":"no-cache"} });

export async function getProjectsIndex(): Promise<import("../types/hivex").ProjectsIndex> {
  const res = await fetch(`${BASE}/index.json?ts=${Date.now()}`, nocache());
  if (!res.ok) throw new Error("projects index fetch failed");
  return res.json();
}
export async function getResults(url:string) {
  const res = await fetch(`${url}?ts=${Date.now()}`, nocache());
  if (!res.ok) throw new Error("results fetch failed");
  return res.json() as Promise<import("../types/hivex").ResultsDoc>;
}
export async function getLeaderboard() {
  const res = await fetch(`${BASE}/leaderboard.json?ts=${Date.now()}`, nocache());
  if (!res.ok) throw new Error("leaderboard fetch failed");
  return res.json() as Promise<import("../types/hivex").Leaderboard>;
}
