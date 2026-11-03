'use strict';
/* Suche und Filter ohne DOM-Zugriff. Übergeordnete Aufgaben liefern den Kontext. */
(() => {
 const normalize=value=>String(value??'').toLocaleLowerCase('de-DE').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ß/g,'ss');
 function selectLists(checklists,{query='',group='all',onlyOpen=false,isDone=()=>false}={}){
  const terms=normalize(query).trim().split(/\s+/).filter(Boolean);
  const prune=(nodes,path)=>nodes.flatMap(node=>{
   const context=path+' '+normalize([node.label,node.condition,...(node.info||[])].filter(Boolean).join(' '));
   if(node.children){const children=prune(node.children,context);return children.length?[{...node,children}]:[];}
   return terms.every(term=>context.includes(term))&&(!onlyOpen||!isDone(node.id))?[node]:[];
  });
  return checklists.filter(list=>group==='all'||list.group===group).flatMap(list=>{
   const tasks=prune(list.tasks,normalize(list.title));
   return tasks.length?[{...list,tasks}]:[];
  });
 }
 window.AudimaxSearch={normalize,selectLists};
})();
