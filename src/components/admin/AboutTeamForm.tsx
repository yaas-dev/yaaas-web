"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Save, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { updateSettings } from "@/actions/settingsActions";
type Member = { id: string; name: string; role: string; bio: string; image: string; visible: boolean };
export default function AboutTeamForm({ initialTeam }: { initialTeam: Member[] }) {
 const [team,setTeam]=useState<Member[]>(initialTeam||[]),[saving,setSaving]=useState(false),[notice,setNotice]=useState("");
 const router=useRouter();
 const update=(i:number,key:keyof Member,value:string|boolean)=>{setTeam(old=>old.map((p,n)=>n===i?{...p,[key]:value}:p));setNotice("");};
 const move=(i:number,d:-1|1)=>{const next=[...team],j=i+d;if(j<0||j>=next.length)return;[next[i],next[j]]=[next[j],next[i]];setTeam(next);};
 const add=()=>setTeam(old=>[...old,{id:`member-${Date.now()}`,name:"",role:"",bio:"",image:"",visible:true}]);
 const remove=(i:number)=>{if(window.confirm("Remove this person from the About page?"))setTeam(old=>old.filter((_,n)=>n!==i));};
 const save=async()=>{setSaving(true);setNotice("");try{await updateSettings({aboutTeam:team});router.refresh();setNotice("Team section saved.");}catch{setNotice("Could not save. Please try again.");}finally{setSaving(false);}};
 const field="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#B59431]";
 const label="text-[10px] uppercase tracking-widest font-bold text-white/50";
 return <div className="flex flex-col gap-8">
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4"><div><p className="text-[#B59431] text-[10px] uppercase tracking-[0.25em] font-bold mb-3">About page</p><h1 className="text-3xl md:text-4xl font-bold text-white">Meet the Team</h1><p className="text-sm text-white/40 mt-3 max-w-2xl">Edit names, roles, bios and portraits. Reorder profiles or hide someone without deleting their details.</p></div><button type="button" onClick={add} className="inline-flex items-center gap-2 border border-[#B59431]/50 text-[#B59431] px-5 py-3 text-xs font-bold uppercase tracking-widest"><Plus size={15}/> Add team member</button></div>
  {team.map((person,i)=><section key={person.id} className="bg-[#0a0a0a] border border-white/10 p-5 md:p-7 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-7">
   <div><ImageUpload value={person.image||""} onChange={url=>update(i,"image",url)} label="Team portrait" folder="yaaas/team"/><p className="text-[10px] text-white/30 mt-3">Portraits are uploaded to the YAAAS media library.</p></div>
   <div className="flex flex-col gap-5"><div className="flex items-center justify-between"><p className="text-[10px] text-[#B59431] uppercase tracking-widest font-bold">Team member {i+1}</p><div className="flex gap-2">
    <button type="button" onClick={()=>move(i,-1)} disabled={!i} aria-label="Move up" className="p-2 border border-white/10 text-white/60 disabled:opacity-20"><ArrowUp size={14}/></button>
    <button type="button" onClick={()=>move(i,1)} disabled={i===team.length-1} aria-label="Move down" className="p-2 border border-white/10 text-white/60 disabled:opacity-20"><ArrowDown size={14}/></button>
    <button type="button" onClick={()=>update(i,"visible",!person.visible)} aria-label={person.visible?"Hide profile":"Show profile"} className="p-2 border border-white/10 text-white/60">{person.visible?<Eye size={14}/>:<EyeOff size={14}/>}</button>
    <button type="button" onClick={()=>remove(i)} aria-label="Remove profile" className="p-2 border border-red-500/20 text-red-400"><Trash2 size={14}/></button>
   </div></div>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><label className="flex flex-col gap-2"><span className={label}>Name</span><input className={field} value={person.name} onChange={e=>update(i,"name",e.target.value)} placeholder="Full name"/></label><label className="flex flex-col gap-2"><span className={label}>Role / title</span><input className={field} value={person.role} onChange={e=>update(i,"role",e.target.value)} placeholder="Role at YAAAS"/></label></div>
   <label className="flex flex-col gap-2"><span className={label}>Short bio</span><textarea className={field} rows={4} value={person.bio} onChange={e=>update(i,"bio",e.target.value)} placeholder="A short introduction..."/></label><p className="text-[10px] text-white/30">{person.visible?"Visible on the About page":"Hidden from the About page"}</p></div>
  </section>)}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-6"><p role="status" className="text-xs text-white/50">{notice}</p><button type="button" onClick={save} disabled={saving} className="inline-flex items-center justify-center gap-2 bg-[#B59431] text-black px-8 py-4 text-xs font-bold uppercase tracking-widest disabled:opacity-50"><Save size={15}/>{saving?"Saving...":"Save team section"}</button></div>
 </div>;
}