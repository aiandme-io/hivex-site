import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

export default function MarkdownRemote({ src }:{src:string}) {
  const [html,setHtml]=useState<string>("Loading…");
  useEffect(()=>{ (async()=>{
    try{
      const txt=await (await fetch(src,{cache:"no-store"})).text();
      setHtml(DOMPurify.sanitize(marked.parse(txt) as string));
    }catch{ setHtml("Failed to load README.md"); }
  })(); },[src]);
  return <div className="prose max-w-none" dangerouslySetInnerHTML={{__html:html}} />;
}
