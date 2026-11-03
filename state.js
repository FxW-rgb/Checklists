'use strict';
/* Reine Zustandsverwaltung, unabhängig von HTML und Server. */
(() => {
 const dateOK=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&!isNaN(Date.parse(v+'T12:00:00Z'))&&new Date(v+'T12:00:00Z').toISOString().slice(0,10)===v;
 const uuid=()=>{if(crypto.randomUUID)return crypto.randomUUID();const b=crypto.getRandomValues(new Uint8Array(16));b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=[...b].map(v=>v.toString(16).padStart(2,'0')).join('');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;};
 const leaves=nodes=>nodes.flatMap(n=>n.children?leaves(n.children):[n]);
 class WorkState{
  constructor(storage,key,shared=false){this.storage=storage;this.key=key;this.shared=shared;this.error=false;this.corrupt=false;this.data={version:2,days:{},pending:[]};try{const raw=storage.getItem(key);if(raw){const parsed=JSON.parse(raw);if(!this.valid(parsed))throw Error('Invalid saved state');this.data=parsed;}}catch{this.error=true;this.corrupt=true;}}
  valid(s){return s?.version===2&&s.days&&typeof s.days==='object'&&!Array.isArray(s.days)&&Object.entries(s.days).every(([d,v])=>dateOK(d)&&v&&v.checks&&typeof v.checks==='object'&&Object.entries(v.checks).every(([id,c])=>/^[a-z0-9-]{1,100}$/.test(id)&&typeof c.done==='boolean'&&typeof c.at==='string')&&Array.isArray(v.history)&&v.history.every(h=>h&&typeof h.task_id==='string'&&typeof h.done==='boolean'&&typeof h.at==='string'))&&Array.isArray(s.pending)&&s.pending.every(o=>dateOK(o.work_date)&&typeof o.task_id==='string'&&typeof o.done==='boolean'&&typeof o.operation_id==='string');}
  day(d){if(!dateOK(d))throw Error('Ungültiges Datum');return this.data.days[d]||(this.data.days[d]={checks:{},history:[]});}
  persist(){if(this.corrupt)return false;try{this.storage.setItem(this.key,JSON.stringify(this.data));this.error=false;return true;}catch{this.error=true;return false;}}
  done(d,id){return !!this.data.days[d]?.checks[id]?.done;}
  stats(d,nodes){const list=leaves(nodes);return {done:list.filter(n=>this.done(d,n.id)).length,total:list.length};}
  set(d,nodes,done){const day=this.day(d);for(const n of leaves(nodes)){if(this.done(d,n.id)===done)continue;const at=new Date().toISOString();day.checks[n.id]={done,at};const op={work_date:d,task_id:n.id,done,operation_id:uuid()};day.history.unshift({task_id:n.id,done,at,local:true});if(this.shared)this.data.pending.push(op);}day.history=day.history.slice(0,2000);this.persist();}
  merge(d,rows){const day=this.day(d);const pending=new Set(this.data.pending.filter(o=>o.work_date===d).map(o=>o.task_id));const checks={};for(const row of rows){if(typeof row.task_id==='string'&&typeof row.done==='boolean')checks[row.task_id]={done:row.done,at:row.updated_at};}for(const id of pending)checks[id]=day.checks[id];day.checks=checks;this.persist();}
  acknowledge(op){this.data.pending=this.data.pending.filter(x=>x.operation_id!==op.operation_id);this.persist();}
  export(d){return {version:2,date:d,day:this.day(d)};}
  import(payload,known){if(payload?.version!==2||!dateOK(payload.date)||!payload.day?.checks)throw Error('Ungültige Datei');const probe={version:2,days:{[payload.date]:payload.day},pending:[]};if(!this.valid(probe)||Object.keys(payload.day.checks).some(k=>!known.has(k)))throw Error('Unbekannte Aufgaben oder ungültiger Stand');this.data.days[payload.date]=payload.day;this.persist();return payload.date;}
 }
 window.AudimaxState={WorkState,leaves,dateOK};
})();
