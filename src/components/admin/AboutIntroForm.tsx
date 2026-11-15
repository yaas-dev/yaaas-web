"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { updateSettings } from "@/actions/settingsActions";
type Intro = { eyebrow:string; headline:string; paragraphOne:string; paragraphTwo:string; cardLabel:string; cardText:string };
const DEFAULTS:Intro = { eyebrow:"Yaa Asantewaa Agency", headline:"Unleashing the power of African creativity.", paragraphOne:"YAAAS is an independent creative agency working across art, music and culture. We represent artists, develop creative talent and bring cultural ideas to life.", paragraphTwo:"Rooted in Africa and connected to its diaspora, we work with creatives, brands and cultural partners to build meaningful projects, create new opportunities and take African creative expression further.", cardLabel:"YAAAS / The agency", cardText:"A creative agency built around the people, ideas and culture shaping Africa and its diaspora." };
export default function AboutIntroForm({initialIntro}:{initialIntro?:Partial<Intro>}) {
 const [intro,setIntro]=useState<Intro>({...DEFAULTS,...(initialIntro||{})});
 const [saving,setSaving]=useState(false),[notice,setNotice]=useState("");
 const router=useRouter();
 const update=(key:keyof Intro,value:string)=>{setIntro(old=>({...old,[key]:value}));setNotice("");};
 const field="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#B59431]";
 const label="text-[10px] uppercase tracking-widest font-bold text-white/50";
 const fields:[keyof Intro,string,string,boolean][]=[
 ["eyebrow","Small label","e.g. Yaa Asantewaa Agency",false],
 ["headline","Main headline","Main About page headline",false],
 ["paragraphOne","Introduction — paragraph 1","First paragraph",true],
 ["paragraphTwo","Introduction — paragraph 2","Second paragraph",true],
 ["cardLabel","Dark panel label","e.g. YAAAS / The agency",false],
 ["cardText","Dark panel text","Short supporting sentence",true]
 ];
 const save=async()=>{setSaving(true);setNotice("");try{await updateSettings({aboutIntro:intro});router.refresh();setNotice("About introduction saved.");}catch{setNotice("Could not save. Please try again.");}finally{setSaving(false);}};
 return <div className="max-w-4xl flex flex-col gap-7">
  <div><p className="text-[#B59431] text-[10px] uppercase tracking-[0.25em] font-bold mb-3">About page</p><h1 className="text-3xl md:text-4xl font-bold text-white">Edit introduction</h1><p className="text-sm text-white/40 mt-3">Update the headline and copy shown at the top of the About page.</p></div>
  {fields.map(([key,title,placeholder,multiline])=><label key={key} className="flex flex-col gap-2"><span className={label}>{title}</span>{multiline?<textarea className={field} rows={4} value={intro[key]} onChange={e=>update(key,e.target.value)} placeholder={placeholder}/>:<input className={field} value={intro[key]} onChange={e=>update(key,e.target.value)} placeholder={placeholder}/>}</label>)}
  <div className="flex items-center justify-between border-t border-white/10 pt-6"><p role="status" className="text-xs text-white/50">{notice}</p><button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 bg-[#B59431] text-black px-8 py-4 text-xs font-bold uppercase tracking-widest disabled:opacity-50"><Save size={15}/>{saving?"Saving...":"Save introduction"}</button></div>
 </div>;
}