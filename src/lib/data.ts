const BASE = import.meta.env.PUBLIC_DATA_BASE_URL;
export const nocache = () => ({ cache: "no-store" as const, headers:{"Cache-Control":"no-cache"} });

export async function getProjectsIndex(): Promise<import("../types/hivex").ProjectsIndex> {
  console.log("getProjectsIndex: BASE URL:", BASE);
  console.log("getProjectsIndex: Full URL:", `${BASE}/index.json?ts=${Date.now()}`);
  
  if (!BASE) {
    console.error("getProjectsIndex: PUBLIC_DATA_BASE_URL is not set!");
    throw new Error("PUBLIC_DATA_BASE_URL environment variable is not set");
  }
  
  try {
    const res = await fetch(`${BASE}/index.json?ts=${Date.now()}`, nocache());
    console.log("getProjectsIndex: Response status:", res.status);
    console.log("getProjectsIndex: Response ok:", res.ok);
    
    if (!res.ok) {
      console.error("getProjectsIndex: Fetch failed with status:", res.status);
      throw new Error(`projects index fetch failed: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log("getProjectsIndex: Fetched data:", data);
    return data;
  } catch (error) {
    console.error("getProjectsIndex: Error during fetch:", error);
    throw error;
  }
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
