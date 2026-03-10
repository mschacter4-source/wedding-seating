import { useState, useRef, useCallback } from "react";

const INIT = [
  { id:"head",name:"Head Table",label:"The Wedding Party",shape:"circle",seats:8,guests:[
    {id:"g1",name:"Anna",note:"Bride",group:"bride"},{id:"g2",name:"Matt",note:"Groom",group:"groom"},
    {id:"g3",name:"Mike",note:"Groom's Brother",group:"groom-fam"},{id:"g4",name:"Danie",note:"Groom's SIL",group:"groom-fam"},
    {id:"g5",name:"Alex",note:"Bride's Brother",group:"bride-fam"},{id:"g6",name:"Alex +1",note:"Brother's +1",group:"bride-fam"},
    {id:"g7",name:"Nick",note:"Bride's Brother",group:"bride-fam"},{id:"g8",name:"Sierra",note:"Groom's Family",group:"groom-fam"},
  ]},
  { id:"t1",name:"Table 1",label:"Bride's Immediate Family",shape:"round",seats:6,guests:[
    {id:"g9",name:"Dave",note:"Father of Bride",group:"bride-fam"},{id:"g10",name:"Leslie",note:"Mother of Bride",group:"bride-fam"},
    {id:"g11",name:"Nana",note:"Grandma",group:"bride-fam"},{id:"g12",name:"Poppy",note:"Grandpa",group:"bride-fam"},
    {id:"g13",name:"Ossia Mom",note:"Family Friend",group:"bride-fr"},{id:"g14",name:"Ossia Dad",note:"Family Friend",group:"bride-fr"},
  ]},
  { id:"t2",name:"Table 2",label:"Groom's Immediate Family",shape:"round",seats:7,guests:[
    {id:"g15",name:"Sherri",note:"Mother of Groom",group:"groom-fam"},{id:"g16",name:"Alan",note:"Father of Groom",group:"groom-fam"},
    {id:"g17",name:"Grandma",note:"Groom's Grandma",group:"groom-fam"},{id:"g18",name:"Jackson",note:"Groom's Family",group:"groom-fam"},
    {id:"g19",name:"Kristen Chapman",note:"Family Friend",group:"bride-fr"},{id:"g20",name:"Ginny Stone",note:"Family Friend",group:"bride-fr"},
    {id:"g21",name:"Phyllis",note:"Groom's Friend",group:"groom-fr"},
  ]},
  { id:"t3",name:"Table 3",label:"The Reeds — Adults",shape:"rect",seats:8,guests:[
    {id:"g22",name:"Shawn",group:"bride-fam"},{id:"g23",name:"Nikki",group:"bride-fam"},
    {id:"g24",name:"Missy",group:"bride-fam"},{id:"g25",name:"Ray",group:"bride-fam"},
    {id:"g26",name:"Dan",note:"Renchs",group:"bride-fam"},{id:"g27",name:"Mary",note:"Renchs",group:"bride-fam"},
    {id:"g28",name:"Kara",note:"Renchs",group:"bride-fam"},{id:"g29",name:"Lexy",group:"bride-fam"},
  ]},
  { id:"t4",name:"Table 4",label:"The Reeds — Next Gen",shape:"round",seats:6,guests:[
    {id:"g30",name:"Sydney",group:"bride-fam"},{id:"g31",name:"Matt",note:"Reeds",group:"bride-fam"},
    {id:"g32",name:"Bryton",group:"bride-fam"},{id:"g33",name:"Braxton",group:"bride-fam"},
    {id:"g34",name:"Max",group:"bride-fam"},{id:"g35",name:"Hammy",note:"Groom's Friend",group:"groom-fr"},
  ]},
  { id:"t5",name:"Table 5",label:"Coopers & Schacters",shape:"round",seats:7,guests:[
    {id:"g36",name:"Debbie",note:"Cooper",group:"groom-fam"},{id:"g37",name:"Pete",note:"Cooper",group:"groom-fam"},
    {id:"g38",name:"Wendy",note:"Cooper",group:"groom-fam"},{id:"g39",name:"Eric",note:"Cooper",group:"groom-fam"},
    {id:"g40",name:"Howie",note:"Schacters",group:"groom-fam"},{id:"g41",name:"Deena",note:"Schacters",group:"groom-fam"},
    {id:"g42",name:"Hayden",note:"Schacters",group:"groom-fam"},
  ]},
  { id:"t6",name:"Table 6",label:"Cooper Cousins A",shape:"round",seats:6,guests:[
    {id:"g43",name:"Russ",group:"groom-fam"},{id:"g44",name:"Gina",group:"groom-fam"},
    {id:"g45",name:"Ben",group:"groom-fam"},{id:"g46",name:"Kaycie",group:"groom-fam"},
    {id:"g47",name:"Pete",note:"Cousin",group:"groom-fam"},{id:"g48",name:"Laura",group:"groom-fam"},
  ]},
  { id:"t7",name:"Table 7",label:"Cooper Cousins B",shape:"round",seats:6,guests:[
    {id:"g49",name:"Jessie",group:"groom-fam"},{id:"g50",name:"Jake",group:"groom-fam"},
    {id:"g51",name:"Jake",note:"2",group:"groom-fam"},{id:"g52",name:"Maria",group:"groom-fam"},
    {id:"g53",name:"Jason",group:"groom-fam"},{id:"g54",name:"Ella",group:"groom-fam"},
  ]},
  { id:"t8",name:"Table 8",label:"Groom's Core Crew",shape:"rect",seats:8,guests:[
    {id:"g55",name:"Connor",group:"groom-fr"},{id:"g56",name:"Andreina",group:"groom-fr"},
    {id:"g57",name:"Shady",group:"groom-fr"},{id:"g58",name:"Natalie",group:"groom-fr"},
    {id:"g59",name:"Margy",group:"groom-fr"},{id:"g60",name:"Nikki",group:"groom-fr"},
    {id:"g61",name:"Shapiro",group:"groom-fr"},{id:"g62",name:"Jamie",group:"groom-fr"},
  ]},
  { id:"t9",name:"Table 9",label:"Boston Friends A",shape:"round",seats:7,guests:[
    {id:"g63",name:"Anna",note:"Boston",group:"groom-fr"},{id:"g64",name:"Eric",note:"Boston",group:"groom-fr"},
    {id:"g65",name:"Lauren",group:"groom-fr"},{id:"g66",name:"Brad",group:"groom-fr"},
    {id:"g67",name:"Brad O",group:"groom-fr"},{id:"g68",name:"Jenny",group:"groom-fr"},
    {id:"g69",name:"Randy",group:"groom-fr"},
  ]},
  { id:"t10",name:"Table 10",label:"Boston Friends B",shape:"round",seats:7,guests:[
    {id:"g70",name:"Matt",note:"Boston",group:"groom-fr"},{id:"g71",name:"Becca",group:"groom-fr"},
    {id:"g72",name:"Tina",group:"groom-fr"},{id:"g73",name:"Red",group:"groom-fr"},
    {id:"g74",name:"Christine",group:"groom-fr"},{id:"g75",name:"Walker",group:"groom-fr"},
    {id:"g76",name:"Ty",note:"Joint",group:"joint"},
  ]},
  { id:"t11",name:"Table 11",label:"College Friends",shape:"rect",seats:8,guests:[
    {id:"g77",name:"Chu",group:"groom-fr"},{id:"g78",name:"Nancy",group:"groom-fr"},
    {id:"g79",name:"Neville",group:"groom-fr"},{id:"g80",name:"Rachel",group:"groom-fr"},
    {id:"g81",name:"Jesse",group:"groom-fr"},{id:"g82",name:"Staci",group:"groom-fr"},
    {id:"g83",name:"Blazeck",group:"groom-fr"},{id:"g84",name:"Vikk",group:"groom-fr"},
  ]},
  { id:"t12",name:"Table 12",label:"High School Friends",shape:"rect",seats:8,guests:[
    {id:"g85",name:"Kyle",group:"groom-fr"},{id:"g86",name:"Beegel",group:"groom-fr"},
    {id:"g87",name:"Sammi",group:"groom-fr"},{id:"g88",name:"Leiss",group:"groom-fr"},
    {id:"g89",name:"Joanna",group:"groom-fr"},{id:"g90",name:"Farrell",group:"groom-fr"},
    {id:"g91",name:"Alyssa",group:"groom-fr"},{id:"g92",name:"Kim",group:"groom-fr"},
  ]},
  { id:"t13",name:"Table 13",label:"Work Friends — Groom",shape:"round",seats:8,guests:[
    {id:"g93",name:"Libby",group:"groom-fr"},{id:"g94",name:"Ty",note:"Work",group:"groom-fr"},
    {id:"g95",name:"Marissa",group:"groom-fr"},{id:"g96",name:"Georgie",group:"groom-fr"},
    {id:"g97",name:"Georgie +1",group:"groom-fr"},{id:"g98",name:"Debbie",note:"Work",group:"groom-fr"},
    {id:"g99",name:"Debbie +1",group:"groom-fr"},{id:"g100",name:"Jordan",note:"HS",group:"groom-fr"},
  ]},
  { id:"t14",name:"Table 14",label:"Bride's Friends",shape:"round",seats:8,guests:[
    {id:"g101",name:"Kerns",group:"bride-fr"},{id:"g102",name:"Abigail",group:"bride-fr"},
    {id:"g103",name:"Ian",group:"bride-fr"},{id:"g104",name:"Ossia",group:"bride-fr"},
    {id:"g105",name:"Garrett",group:"bride-fr"},{id:"g106",name:"Megan",group:"bride-fr"},
    {id:"g107",name:"Logan",group:"bride-fr"},{id:"g108",name:"Molly",group:"bride-fr"},
  ]},
  { id:"t15",name:"Table 15",label:"Bride's College & Work",shape:"round",seats:8,guests:[
    {id:"g109",name:"Hayley (+1)",note:"College",group:"bride-fr"},{id:"g110",name:"Bobby (+1)",note:"College",group:"bride-fr"},
    {id:"g111",name:"Burf",note:"College",group:"bride-fr"},{id:"g112",name:"Lindsey",note:"College",group:"bride-fr"},
    {id:"g113",name:"Olivia",note:"Work",group:"bride-fr"},{id:"g114",name:"Matt",note:"Work",group:"bride-fr"},
    {id:"g115",name:"Erica",note:"Work",group:"bride-fr"},{id:"g116",name:"Molly +1",group:"bride-fr"},
  ]},
  { id:"t16",name:"Table 16",label:"Joint Friends & Co.",shape:"round",seats:7,guests:[
    {id:"g117",name:"River",note:"Joint",group:"joint"},{id:"g118",name:"Hayley",note:"Joint",group:"joint"},
    {id:"g119",name:"Robbie",note:"Joint",group:"joint"},{id:"g120",name:"Phil",note:"Bride Work",group:"bride-fr"},
    {id:"g121",name:"Meghan S",note:"Bride Work",group:"bride-fr"},
  ]},
];

const GC={bride:"#D4856A",groom:"#8B9E7E","bride-fam":"#D4A5A5","groom-fam":"#9AB49E","bride-fr":"#C4A8C4","groom-fr":"#8CB8D4",joint:"#C6A96C"};
const GL={bride:"Bride",groom:"Groom","bride-fam":"Bride's Family","groom-fam":"Groom's Family","bride-fr":"Bride's Friends","groom-fr":"Groom's Friends",joint:"Joint"};

/* ═══════ FLOOR PLAN ═══════ */
function FloorPlan({tables}){
  const half=Math.ceil(tables.length/2);
  const left=tables.slice(0,half), right=tables.slice(half);
  return(
    <div style={{
      background:"linear-gradient(160deg, #F0E8D8 0%, #EDE4D2 40%, #E8DFCF 100%)",
      borderRadius:24,padding:"32px 20px 28px",margin:"0 auto",maxWidth:1000,
      position:"relative",overflow:"hidden",
      boxShadow:"0 4px 20px rgba(139,158,126,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
      border:"1px solid #DDD4C4",
    }}>
      {/* Soft texture */}
      <div style={{position:"absolute",inset:0,opacity:0.04,
        backgroundImage:"radial-gradient(circle at 25% 25%, #8B9E7E 0.5px, transparent 0.5px), radial-gradient(circle at 75% 60%, #C6A96C 0.4px, transparent 0.4px)",
        backgroundSize:"50px 50px, 70px 70px",
      }}/>
      {/* Warm glow */}
      <div style={{position:"absolute",top:"-15%",left:"50%",transform:"translateX(-50%)",width:"60%",height:"50%",borderRadius:"50%",background:"radial-gradient(ellipse, rgba(198,169,108,0.06), transparent 70%)"}}/>

      {/* Title */}
      <div style={{textAlign:"center",marginBottom:20,position:"relative",zIndex:2}}>
        <div style={{fontFamily:"Georgia, serif",fontSize:14,color:"#8B9E7E",fontWeight:400,letterSpacing:3,textTransform:"uppercase"}}>Reception Layout</div>
        <div style={{width:40,height:1,background:"#C6A96C55",margin:"8px auto 0"}}/>
      </div>

      {/* Layout */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,position:"relative",zIndex:2}}>
        <div style={{display:"flex",flexDirection:"column",gap:14,alignItems:"center",flex:"0 0 auto",width:200}}>
          {left.map(t=><FPT key={t.id} table={t}/>)}
        </div>

        {/* Dance floor */}
        <div style={{
          flex:"0 0 auto",width:240,height:240,borderRadius:"50%",
          background:"radial-gradient(ellipse at 45% 40%, rgba(198,169,108,0.1), rgba(139,158,126,0.04) 60%, transparent 80%)",
          border:"1.5px solid #C6CDB8",
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          position:"relative",
          boxShadow:"inset 0 0 30px rgba(139,158,126,0.04)",
        }}>
          <div style={{position:"absolute",inset:14,borderRadius:"50%",border:"1px dashed #C6CDB880"}}/>
          <div style={{fontFamily:"Georgia, serif",fontSize:11,color:"#8B9E7E",letterSpacing:4,textTransform:"uppercase",marginBottom:4,opacity:0.6}}>Dance</div>
          <div style={{fontFamily:"Georgia, serif",fontSize:11,color:"#8B9E7E",letterSpacing:4,textTransform:"uppercase",opacity:0.6}}>Floor</div>
          <div style={{position:"absolute",top:10,left:"50%",transform:"translateX(-50%)",fontSize:10,opacity:0.15}}>🍂</div>
          <div style={{position:"absolute",bottom:10,left:"50%",transform:"translateX(-50%)",fontSize:10,opacity:0.15}}>🌿</div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:14,alignItems:"center",flex:"0 0 auto",width:200}}>
          {right.map(t=><FPT key={t.id} table={t}/>)}
        </div>
      </div>

      {/* Bottom */}
      <div style={{display:"flex",justifyContent:"center",gap:40,marginTop:22,position:"relative",zIndex:2}}>
        <div style={{textAlign:"center"}}>
          <div style={{width:40,height:1,background:"#B8C4A830",margin:"0 auto 6px"}}/>
          <span style={{fontSize:8,color:"#8B9E7E80",letterSpacing:3,textTransform:"uppercase"}}>Bar</span>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{width:50,height:1,background:"#B8C4A830",margin:"0 auto 6px"}}/>
          <span style={{fontSize:8,color:"#8B9E7E80",letterSpacing:3,textTransform:"uppercase"}}>Entrance</span>
        </div>
      </div>
    </div>
  );
}

function FPT({table}){
  const n=table.guests.length,isR=table.shape==="rect";
  const sz=Math.max(28+n*3.5,36);
  const rW=24+n*5.5,rH=18;
  const gc={};table.guests.forEach(g=>{gc[g.group]=(gc[g.group]||0)+1;});
  const dom=Object.entries(gc).sort((a,b)=>b[1]-a[1])[0];
  const c=dom?GC[dom[0]]:"#8B9E7E";
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
      <div style={{position:"relative"}}>
        <div style={{width:isR?rW:sz,height:isR?rH:sz,borderRadius:isR?4:"50%",
          background:`${c}18`,border:`1.5px solid ${c}40`,
          boxShadow:`0 1px 6px ${c}10`,
          display:"flex",alignItems:"center",justifyContent:"center",position:"relative",
        }}>
          {!isR&&table.guests.map((g,i)=>{const a=(2*Math.PI*i)/Math.max(n,1)-Math.PI/2;const r=sz/2+3;
            return(<div key={g.id} style={{position:"absolute",left:`calc(50% + ${Math.cos(a)*r}px)`,top:`calc(50% + ${Math.sin(a)*r}px)`,transform:"translate(-50%,-50%)",width:4,height:4,borderRadius:"50%",background:GC[g.group]||c,opacity:0.7}}/>);
          })}
          {isR&&table.guests.map((g,i)=>{const top=i<Math.ceil(n/2);const idx=top?i:i-Math.ceil(n/2);const cnt=top?Math.ceil(n/2):n-Math.ceil(n/2);if(!cnt)return null;const sp=rW/(cnt+1);
            return(<div key={g.id} style={{position:"absolute",left:sp*(idx+1),top:top?-4:rH,transform:"translate(-50%,-50%)",width:4,height:4,borderRadius:"50%",background:GC[g.group]||c,opacity:0.7}}/>);
          })}
        </div>
      </div>
      <div style={{fontSize:7,color:"#7A8B6E",textAlign:"center",maxWidth:90,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:400,letterSpacing:0.3}}>{table.label}</div>
    </div>
  );
}

/* ═══════ SEAT ═══════ */
function Seat({guest,dim,hl,search,onDragStart,onDragEnd,onRemove}){
  const [hover,setHover]=useState(false);
  return(
    <div draggable onDragStart={onDragStart} onDragEnd={onDragEnd}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{textAlign:"center",cursor:"grab",opacity:dim?0.18:1,transition:"opacity 0.2s",width:52,position:"relative"}}
      title={`${guest.name}${guest.note?` (${guest.note})`:""}`}>
      {hover&&onRemove&&(
        <button onClick={e=>{e.stopPropagation();onRemove(guest);}}
          style={{position:"absolute",top:-4,right:-2,width:16,height:16,borderRadius:"50%",background:"#D4856A",border:"2px solid #FEFCF8",color:"#fff",fontSize:9,lineHeight:"10px",cursor:"pointer",zIndex:10,display:"flex",alignItems:"center",justifyContent:"center",padding:0,fontWeight:700}}
          title="Remove guest">×</button>
      )}
      <div style={{
        width:34,height:34,borderRadius:"50%",
        background:`linear-gradient(135deg, ${GC[guest.group]||"#ccc"}, ${GC[guest.group]||"#ccc"}bb)`,
        margin:"0 auto 3px",
        border:hl&&search?"3px solid #C6A96C":"2.5px solid #FEFCF8",
        boxShadow:"0 2px 8px rgba(0,0,0,0.08)",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:10,color:"#fff",fontWeight:700,letterSpacing:-0.3,
      }}>{guest.name.slice(0,2).toUpperCase()}</div>
      <div style={{fontSize:9,fontWeight:600,color:"#4a5440",maxWidth:56,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.15}}>{guest.name}</div>
      {guest.note&&<div style={{fontSize:7,color:"#8B9E7E",fontStyle:"italic",maxWidth:56,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.1,marginTop:1}}>{guest.note}</div>}
    </div>
  );
}

/* ═══════ TABLE VIS ═══════ */
function RoundVis({guests,isDim,isHl,search,mkD,tid,onRemove}){
  const n=Math.max(guests.length,1);const r=Math.min(40+n*7.5,105);const tR=r-26;const sz=(r+42)*2;
  return(
    <div style={{position:"relative",width:sz,height:sz,margin:"6px auto",flexShrink:0}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:tR*2,height:tR*2,borderRadius:"50%",background:"radial-gradient(ellipse at 40% 35%, #f3ede2, #e8e0d2)",border:"1.5px solid #d8d0c2",boxShadow:"inset 0 2px 8px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.03)"}}/>
      {guests.map((g,i)=>{const a=(2*Math.PI*i)/n-Math.PI/2;return(
        <div key={g.id} style={{position:"absolute",left:"50%",top:"50%",transform:`translate(calc(-50% + ${Math.cos(a)*r}px), calc(-50% + ${Math.sin(a)*r}px))`,zIndex:2}}>
          <Seat guest={g} dim={isDim(g)} hl={isHl(g)} search={search} onDragStart={e=>mkD(tid).onDS(e,g)} onDragEnd={mkD(tid).onDE} onRemove={onRemove}/>
        </div>
      );})}
      {guests.length===0&&<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:11,color:"#B8C4A8",fontStyle:"italic"}}>Drop here</div>}
    </div>
  );
}

function RectVis({guests,isDim,isHl,search,mkD,tid,onRemove}){
  const half=Math.ceil(guests.length/2);const top=guests.slice(0,half),bot=guests.slice(half);
  const w=Math.max(Math.max(top.length,bot.length)*58+16,140);
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"6px auto",gap:0}}>
      <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:5}}>
        {top.map(g=><Seat key={g.id} guest={g} dim={isDim(g)} hl={isHl(g)} search={search} onDragStart={e=>mkD(tid).onDS(e,g)} onDragEnd={mkD(tid).onDE} onRemove={onRemove}/>)}
      </div>
      <div style={{width:w,height:26,borderRadius:7,background:"linear-gradient(145deg, #f3ede2, #e8e0d2)",border:"1.5px solid #d8d0c2",boxShadow:"inset 0 2px 8px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.03)"}}/>
      <div style={{display:"flex",justifyContent:"center",gap:4,marginTop:5}}>
        {bot.map(g=><Seat key={g.id} guest={g} dim={isDim(g)} hl={isHl(g)} search={search} onDragStart={e=>mkD(tid).onDS(e,g)} onDragEnd={mkD(tid).onDE} onRemove={onRemove}/>)}
      </div>
      {guests.length===0&&<div style={{fontSize:11,color:"#B8C4A8",fontStyle:"italic",padding:12}}>Drop here</div>}
    </div>
  );
}

/* ═══════ ADD GUEST MODAL ═══════ */
function AddGuestModal({tables,onAdd,onClose}){
  const [name,setName]=useState("");const [note,setNote]=useState("");const [group,setGroup]=useState("bride-fr");const [tableId,setTableId]=useState(tables[0]?.id||"head");
  const submit=()=>{if(!name.trim())return;onAdd(tableId,{id:"g_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),name:name.trim(),note:note.trim()||undefined,group});onClose();};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(74,84,64,0.35)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#FAF6EF",borderRadius:20,padding:"28px 28px 24px",width:"100%",maxWidth:420,boxShadow:"0 20px 60px rgba(74,84,64,0.15)",border:"1px solid #E0D8C8"}}>
        <div style={{fontFamily:"Georgia, serif",fontSize:20,fontWeight:400,color:"#4a5440",marginBottom:4}}>Add Guest</div>
        <div style={{fontSize:11,color:"#8B9E7E",marginBottom:18}}>Add a new guest and assign them to a table</div>
        <label style={{fontSize:10,fontWeight:600,color:"#8B9E7E",letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:4}}>Name *</label>
        <input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Guest name" onKeyDown={e=>{if(e.key==="Enter")submit();}}
          style={{width:"100%",padding:"9px 14px",borderRadius:10,border:"1px solid #D4CBB8",fontSize:13,fontFamily:"inherit",outline:"none",marginBottom:14,boxSizing:"border-box",background:"#fff"}}/>
        <label style={{fontSize:10,fontWeight:600,color:"#8B9E7E",letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:4}}>Note (optional)</label>
        <input value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g. College friend, +1"
          style={{width:"100%",padding:"9px 14px",borderRadius:10,border:"1px solid #D4CBB8",fontSize:13,fontFamily:"inherit",outline:"none",marginBottom:14,boxSizing:"border-box",background:"#fff"}}/>
        <label style={{fontSize:10,fontWeight:600,color:"#8B9E7E",letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:4}}>Group</label>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
          {Object.entries(GL).map(([k,l])=>(
            <button key={k} onClick={()=>setGroup(k)} style={{padding:"4px 10px",borderRadius:12,fontSize:10,cursor:"pointer",fontFamily:"inherit",fontWeight:500,transition:"all 0.15s",border:group===k?`2px solid ${GC[k]}`:"1px solid #D4CBB8",background:group===k?`${GC[k]}18`:"#fff",color:group===k?GC[k]:"#8B9E7E"}}>
              <span style={{display:"inline-block",width:7,height:7,borderRadius:"50%",background:GC[k],marginRight:4,verticalAlign:"middle"}}/>{l}
            </button>
          ))}
        </div>
        <label style={{fontSize:10,fontWeight:600,color:"#8B9E7E",letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:4}}>Assign to Table</label>
        <select value={tableId} onChange={e=>setTableId(e.target.value)}
          style={{width:"100%",padding:"9px 14px",borderRadius:10,border:"1px solid #D4CBB8",fontSize:13,fontFamily:"inherit",outline:"none",marginBottom:20,background:"#fff",boxSizing:"border-box"}}>
          {tables.map(t=><option key={t.id} value={t.id}>{t.label} ({t.guests.length}/{t.seats})</option>)}
        </select>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{padding:"8px 20px",borderRadius:10,border:"1px solid #D4CBB8",background:"#fff",fontSize:12,cursor:"pointer",fontFamily:"inherit",color:"#8B9E7E"}}>Cancel</button>
          <button onClick={submit} style={{padding:"8px 24px",borderRadius:10,border:"none",background:"#8B9E7E",fontSize:12,cursor:"pointer",fontFamily:"inherit",color:"#fff",fontWeight:600,opacity:name.trim()?1:0.4}}>Add Guest</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════ MAIN ═══════ */
export default function App(){
  const [tables,setTables]=useState(INIT);
  const [removed,setRemoved]=useState([]);
  const [drag,setDrag]=useState(null);
  const [overTbl,setOverTbl]=useState(null);
  const [search,setSearch]=useState("");
  const [hlGroup,setHlGroup]=useState(null);
  const [toast,setToast]=useState(null);
  const [editingLabel,setEditingLabel]=useState(null);
  const [showAddModal,setShowAddModal]=useState(false);
  const [showRemoved,setShowRemoved]=useState(false);
  const ghostRef=useRef(null);

  const flash=useCallback(m=>{setToast(m);setTimeout(()=>setToast(null),2200);},[]);
  const total=tables.reduce((s,t)=>s+t.guests.length,0);

  const match=g=>{if(!search)return true;const t=search.toLowerCase();return g.name.toLowerCase().includes(t)||(g.note||"").toLowerCase().includes(t);};
  const isDim=g=>(search&&!match(g))||(hlGroup&&g.group!==hlGroup);
  const isHl=g=>(!hlGroup||g.group===hlGroup)&&match(g);

  const mkD=tid=>({
    onDS:(e,g)=>{setDrag({guest:g,from:tid});e.dataTransfer.effectAllowed="move";e.dataTransfer.setData("text/plain",g.id);if(ghostRef.current){ghostRef.current.textContent=g.name;e.dataTransfer.setDragImage(ghostRef.current,40,18);}},
    onDE:()=>{setDrag(null);setOverTbl(null);},
  });
  const onDOver=(e,id)=>{e.preventDefault();e.dataTransfer.dropEffect="move";setOverTbl(id);};
  const onDrop=(e,toId)=>{
    e.preventDefault();setOverTbl(null);if(!drag||drag.from===toId)return;
    const{guest,from}=drag;
    setTables(p=>p.map(t=>{if(t.id===from)return{...t,guests:t.guests.filter(g=>g.id!==guest.id)};if(t.id===toId)return{...t,guests:[...t.guests,guest]};return t;}));
    flash(`${guest.name} → ${tables.find(t=>t.id===toId)?.label}`);setDrag(null);
  };
  const removeGuest=guest=>{setTables(p=>p.map(t=>({...t,guests:t.guests.filter(g=>g.id!==guest.id)})));setRemoved(p=>[...p,guest]);flash(`${guest.name} removed`);};
  const restoreGuest=(guest,toId)=>{setRemoved(p=>p.filter(g=>g.id!==guest.id));setTables(p=>p.map(t=>t.id===toId?{...t,guests:[...t.guests,guest]}:t));flash(`${guest.name} restored`);};
  const addGuest=(tid,guest)=>{setTables(p=>p.map(t=>t.id===tid?{...t,guests:[...t.guests,guest]}:t));flash(`${guest.name} added`);};
  const toggleShape=tid=>{setTables(p=>p.map(t=>{if(t.id!==tid)return t;return{...t,shape:t.shape==="round"?"rect":"round"};}));};
  const updateLabel=(tid,val)=>{setTables(p=>p.map(t=>t.id===tid?{...t,label:val}:t));};
  const onDropRemoved=e=>{e.preventDefault();setOverTbl(null);if(!drag)return;const{guest,from}=drag;setTables(p=>p.map(t=>t.id===from?{...t,guests:t.guests.filter(g=>g.id!==guest.id)}:t));setRemoved(p=>[...p,guest]);flash(`${guest.name} removed`);setDrag(null);setShowRemoved(true);};

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(180deg, #FAF6EF 0%, #F3EDE2 100%)",fontFamily:"'Segoe UI', system-ui, -apple-system, sans-serif",color:"#4a5440"}}>
      <div ref={ghostRef} style={{position:"fixed",top:-100,left:-100,background:"#fff",padding:"5px 14px",borderRadius:18,fontSize:12,fontWeight:600,boxShadow:"0 4px 16px rgba(0,0,0,0.1)",border:"2px solid #B8C4A8",pointerEvents:"none",zIndex:9999}}/>
      {toast&&<div style={{position:"fixed",top:18,left:"50%",transform:"translateX(-50%)",background:"#8B9E7E",color:"#fff",padding:"9px 22px",borderRadius:12,fontSize:12,fontWeight:500,zIndex:9999,boxShadow:"0 4px 20px rgba(139,158,126,0.2)",animation:"toastIn 0.25s ease"}}>{toast}</div>}
      {showAddModal&&<AddGuestModal tables={tables} onAdd={addGuest} onClose={()=>setShowAddModal(false)}/>}

      {/* Header */}
      <div style={{textAlign:"center",padding:"36px 20px 6px"}}>
        <h1 style={{fontFamily:"Georgia, 'Times New Roman', serif",fontWeight:300,fontSize:40,letterSpacing:1,margin:0,color:"#5a6a4e"}}>
          Matt <span style={{fontStyle:"italic",color:"#8B9E7E"}}>&</span> Anna
        </h1>
        <p style={{fontSize:10,color:"#8B9E7E",letterSpacing:3,textTransform:"uppercase",marginTop:5}}>Interactive Seating Chart</p>
        <div style={{width:50,height:1,background:"#C6A96C88",margin:"12px auto 0"}}/>
      </div>

      {/* Stats */}
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:28,padding:"12px 20px 14px",flexWrap:"wrap"}}>
        {[{n:total,l:"Attending",c:"#7A8B6E"},{n:tables.length,l:"Tables",c:"#7A8B6E"},{n:removed.length,l:"Not Attending",c:removed.length?"#D4856A":"#B8B0A0"}].map(s=>(
          <div key={s.l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"Georgia, serif",fontSize:26,fontWeight:300,color:s.c}}>{s.n}</div>
            <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#8B9E7E"}}>{s.l}</div>
          </div>
        ))}
        <button onClick={()=>setShowAddModal(true)}
          style={{padding:"8px 18px",borderRadius:12,border:"none",background:"#8B9E7E",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,transition:"all 0.15s",boxShadow:"0 2px 8px rgba(139,158,126,0.2)"}}
          onMouseEnter={e=>e.currentTarget.style.background="#7A8B6E"} onMouseLeave={e=>e.currentTarget.style.background="#8B9E7E"}>
          <span style={{fontSize:16,lineHeight:"14px"}}>+</span> Add Guest
        </button>
      </div>

      {/* Floor Plan */}
      <div style={{padding:"0 20px 20px",maxWidth:1040,margin:"0 auto"}}><FloorPlan tables={tables}/></div>

      {/* Controls */}
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:8,padding:"12px 16px 2px",flexWrap:"wrap"}}>
        <div style={{position:"relative"}}>
          <input type="text" placeholder="Search guests..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{padding:"7px 12px 7px 32px",borderRadius:22,border:"1px solid #D4CBB8",background:"#fff",fontSize:12,width:190,outline:"none",fontFamily:"inherit"}}/>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:12,color:"#B8B0A0"}}>🔍</span>
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center"}}>
          {Object.entries(GL).map(([k,l])=>(
            <button key={k} onClick={()=>setHlGroup(hlGroup===k?null:k)}
              style={{padding:"3px 9px",borderRadius:12,fontSize:9.5,border:hlGroup===k?`2px solid ${GC[k]}`:"1px solid #D4CBB8",background:hlGroup===k?`${GC[k]}18`:"#fff",cursor:"pointer",fontFamily:"inherit",fontWeight:500,color:hlGroup===k?GC[k]:"#8B9E7E",transition:"all 0.15s"}}>
              <span style={{display:"inline-block",width:7,height:7,borderRadius:"50%",background:GC[k],marginRight:4,verticalAlign:"middle"}}/>{l}
            </button>
          ))}
          {(hlGroup||search)&&<button onClick={()=>{setHlGroup(null);setSearch("");}} style={{padding:"3px 9px",borderRadius:12,fontSize:9.5,border:"1px solid #D4CBB8",background:"#F3EDE2",cursor:"pointer",fontFamily:"inherit",color:"#B8B0A0"}}>Clear</button>}
        </div>
      </div>
      <p style={{textAlign:"center",fontSize:10,color:"#B8B0A0",padding:"3px 20px 12px",fontStyle:"italic"}}>
        Drag guests between tables &nbsp;•&nbsp; Hover to remove &nbsp;•&nbsp; Click names to edit &nbsp;•&nbsp; Toggle ○/▭ shape
      </p>

      {/* Trash */}
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 12px"}}>
        <div onDragOver={e=>{e.preventDefault();e.dataTransfer.dropEffect="move";}} onDrop={onDropRemoved}
          style={{border:`2px dashed ${drag?"#D4A5A5":"#DDD4C4"}`,borderRadius:16,padding:"12px 18px",marginBottom:18,background:drag?"rgba(212,133,106,0.04)":"transparent",transition:"all 0.2s"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}} onClick={()=>setShowRemoved(!showRemoved)}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:14}}>🗑</span>
              <span style={{fontSize:13,fontWeight:600,color:"#D4856A"}}>Not Attending</span>
              <span style={{fontSize:11,color:"#D4856A",background:"#D4856A14",padding:"1px 8px",borderRadius:10}}>{removed.length}</span>
            </div>
            <span style={{fontSize:11,color:"#B8B0A0",transform:showRemoved?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▼</span>
          </div>
          {drag&&<div style={{textAlign:"center",fontSize:11,color:"#D4856A",padding:"6px 0 2px",fontStyle:"italic"}}>Drop here to remove</div>}
          {showRemoved&&removed.length>0&&(
            <div style={{marginTop:12,display:"flex",flexWrap:"wrap",gap:8}}>
              {removed.map(g=>(
                <div key={g.id} style={{display:"flex",alignItems:"center",gap:6,background:"#fff",border:"1px solid #E0D8C8",borderRadius:10,padding:"5px 10px"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:GC[g.group]||"#999"}}/>
                  <span style={{fontSize:12,fontWeight:500,color:"#4a5440"}}>{g.name}</span>
                  {g.note&&<span style={{fontSize:9,color:"#B8B0A0",fontStyle:"italic"}}>{g.note}</span>}
                  <select onChange={e=>{if(e.target.value)restoreGuest(g,e.target.value);e.target.value="";}} defaultValue=""
                    style={{fontSize:10,border:"1px solid #D4CBB8",borderRadius:6,padding:"2px 4px",color:"#7A8B6E",cursor:"pointer",background:"#f4f0e8",fontFamily:"inherit"}}>
                    <option value="" disabled>Restore →</option>
                    {tables.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                </div>
              ))}
            </div>
          )}
          {showRemoved&&removed.length===0&&<div style={{padding:"10px 0 4px",fontSize:11,color:"#C4BCA8",fontStyle:"italic",textAlign:"center"}}>No removed guests</div>}
        </div>
      </div>

      {/* Table cards */}
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 12px 50px",display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))",gap:16,alignItems:"start"}}>
        {tables.map(t=>{
          const isOver=overTbl===t.id&&drag?.from!==t.id;const overCap=t.guests.length>t.seats;
          return(
            <div key={t.id} onDragOver={e=>onDOver(e,t.id)} onDragLeave={()=>setOverTbl(null)} onDrop={e=>onDrop(e,t.id)}
              style={{
                background:isOver?"linear-gradient(135deg, #EEF2E8, #E6EBE0)":t.id==="head"?"linear-gradient(135deg, #FAF6EF, #F3EDE2)":"#FAF6EF",
                border:isOver?"2px dashed #9AB49E":t.id==="head"?"1.5px solid #C6A96C55":"1px solid #DDD4C4",
                borderRadius:18,padding:"16px 14px 12px",transition:"all 0.2s ease",transform:isOver?"scale(1.008)":"none",
                gridColumn:t.id==="head"?"1 / -1":"auto",minHeight:120,
              }}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:2,gap:8}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:t.id==="head"?"#C6A96C":"#9AB49E",fontWeight:600}}>{t.name}</div>
                  {editingLabel===t.id?(
                    <input autoFocus value={t.label} onChange={e=>updateLabel(t.id,e.target.value)}
                      onBlur={()=>setEditingLabel(null)} onKeyDown={e=>{if(e.key==="Enter")setEditingLabel(null);}}
                      style={{fontFamily:"Georgia, serif",fontSize:15,fontWeight:400,color:"#4a5440",border:"none",borderBottom:"2px solid #C6A96C88",background:"transparent",outline:"none",width:"100%",padding:"1px 0"}}/>
                  ):(
                    <div onClick={()=>setEditingLabel(t.id)}
                      style={{fontFamily:"Georgia, serif",fontSize:15,fontWeight:400,color:"#4a5440",lineHeight:1.2,cursor:"text",borderBottom:"1px dashed transparent",transition:"border 0.2s"}}
                      onMouseEnter={e=>e.currentTarget.style.borderBottom="1px dashed #C6A96C88"}
                      onMouseLeave={e=>e.currentTarget.style.borderBottom="1px dashed transparent"}>
                      {t.label}
                    </div>
                  )}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                  {t.id!=="head"&&(
                    <button onClick={()=>toggleShape(t.id)} title={t.shape==="round"?"Switch to rectangular":"Switch to round"}
                      style={{width:28,height:28,borderRadius:8,border:"1px solid #D4CBB8",background:"#FAF6EF",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",padding:0}}
                      onMouseEnter={e=>{e.currentTarget.style.background="#EEF2E8";e.currentTarget.style.borderColor="#9AB49E";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="#FAF6EF";e.currentTarget.style.borderColor="#D4CBB8";}}>
                      {t.shape==="rect"?<svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" fill="none" stroke="#8B9E7E" strokeWidth="1.5"/></svg>
                        :<svg width="14" height="14" viewBox="0 0 14 14"><rect x="1.5" y="3.5" width="11" height="7" rx="1.5" fill="none" stroke="#8B9E7E" strokeWidth="1.5"/></svg>}
                    </button>
                  )}
                  <div style={{fontSize:11,fontWeight:600,color:overCap?"#D4856A":"#9AB49E",background:overCap?"#D4856A10":"#9AB49E10",padding:"2px 9px",borderRadius:10,whiteSpace:"nowrap"}}>
                    {t.guests.length}/{t.seats}{overCap&&" ⚠"}
                  </div>
                </div>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:9,color:"#8B9E7E",background:"#9AB49E0A",padding:"2px 8px",borderRadius:10,marginBottom:2}}>
                <div style={{width:t.shape==="rect"?12:8,height:t.shape==="rect"?7:8,border:"1.5px solid #9AB49E",borderRadius:t.shape==="rect"?2:"50%"}}/>
                {t.shape==="circle"?"Circular":t.shape==="rect"?"Rectangular":"Round"}
              </div>
              {t.shape==="rect"?<RectVis guests={t.guests} isDim={isDim} isHl={isHl} search={search} mkD={mkD} tid={t.id} onRemove={removeGuest}/>
                :<RoundVis guests={t.guests} isDim={isDim} isHl={isHl} search={search} mkD={mkD} tid={t.id} onRemove={removeGuest}/>}
            </div>
          );
        })}
      </div>

      <div style={{textAlign:"center",padding:"0 20px 36px",fontSize:10,color:"#B8B0A0",letterSpacing:1}}>
        ✦ Hover seats to remove • Drag to trash zone • + Add Guest for new guests ✦
      </div>
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
    </div>
  );
}
