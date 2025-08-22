export default function SeverityPill({ s }:{ s:"Critical"|"High"|"Medium"|"Low" }) {
  const map:any={Critical:"bg-red-600",High:"bg-orange-500",Medium:"bg-amber-400",Low:"bg-emerald-500"};
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-white text-xs ${map[s]}`}>{s}</span>;
}
