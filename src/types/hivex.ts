export type Severity = "Critical"|"High"|"Medium"|"Low";
export type Project = {
  slug:string; title:string; status:"planned"|"active"|"published"|"archived";
  branch:string; github_branch_url:string; readme_raw_url:string;
  results_url:string; stats:{ total_results:number; by_severity:Record<Severity,number> }
};
export type ProjectsIndex = { version:string; last_updated:string; projects:Project[] };
export type Result = {
  id:string; author_github:string; co_authors?:string[]; type:"manual"|"automated";
  taxonomy?:any; severity:Severity; cvss_vector?:string|null; impact:string;
  steps?:string[]; prompt_chain?:string[]; model_info?:any; repro_cmds?:string[];
  artifacts?:{path:string; sha256?:string}[]; duplicate_of?:string|null;
  submitted_at:string; pr?:{number:number; url:string}
};
export type ResultsDoc = {
  project:{ slug:string; title:string; status:string; target_url?:string; branch:string; commit?:string; last_updated:string };
  stats:{ total_results:number; by_severity:Record<Severity,number> };
  results:Result[];
};
export type Leaderboard = {
  last_updated:string; period:string;
  scoring:Record<string,number>;
  contributors:{ github:string; display?:string; points:number; reports:number;
    by_severity:Record<Severity,number>; bonuses?:Record<string,number>; by_project:Record<string,number> }[];
  totals:{ contributors:number; reports:number; points:number };
};
