'use strict';
const D=window.AUDIMAX_DATA;
const {WorkState,leaves}=window.AudimaxState;
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=()=>new Date().toLocaleDateString('sv-SE',{timeZone:'Europe/Berlin'});
let day=today(),filter='all',onlyOpen=false,query='',toastTimer;
const openLists=new Set(),visibleNodes=new Map();
const {selectLists}=window.AudimaxSearch;
const state=new WorkState({getItem:k=>localStorage.getItem(k),setItem:(k,v)=>localStorage.setItem(k,v)},'audimax-workdays-v2-local',false);
const taskMap=new Map();
function indexTasks(nodes,list){for(const n of nodes){taskMap.set(n.id,{node:n,list});if(n.children)indexTasks(n.children,list);}}
D.checklists.forEach(c=>indexTasks(c.tasks,c));
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),5000);}
function status(){$('#storage-error').textContent=state.error?'Der Browser konnte den Arbeitsstand nicht speichern. Bitte die Browser-Speichereinstellungen prüfen.':'';}
function progress(c){const s=state.stats(day,c.tasks);return `<div class="list-meta"><div class="progress-track"><div class="progress-fill" style="width:${s.total?s.done/s.total*100:0}%"></div></div><span class="progress-label">${s.done} / ${s.total} erledigt</span></div>`;}
function tree(nodes){return nodes.map(n=>{visibleNodes.set(n.id,n);const stats=state.stats(day,[n]);return `<div class="branch"><div class="task-line">${n.order?`<span class="task-order" aria-hidden="true">${String(n.order).padStart(2,'0')}</span>`:''}<label class="task-label"><input type="checkbox" data-task="${n.id}" ${stats.done===stats.total?'checked':''}><span class="task-copy"><span class="${n.children?'parent-label':''}">${esc(n.label)}</span>${n.condition?`<span class="condition">${esc(n.condition)}</span>`:''}</span></label><button class="info-button" data-info-task="${n.id}" aria-label="Information zu: ${esc(n.label)}"><span aria-hidden="true">i</span></button></div>${n.children?tree(n.children):''}</div>`;}).join('');}
function listNotes(c){return c.notes?.length?`<aside class="list-notes"><p class="eyebrow">${c.group==='close'?'ABBAUHINWEISE':'AUFBAUHINWEISE'}</p>${(c.conditions||[]).map(condition=>`<span class="condition">${esc(condition)}</span>`).join('')}${c.notes.map(note=>`<p>${esc(note)}</p>`).join('')}</aside>`:'';}
function finalPhotos(c){return !query&&!onlyOpen&&c.finalPhotos?.length?`<section class="list-target"><p class="eyebrow">ZUM ABSCHLUSS · SOLLZUSTAND</p>${c.finalPhotos.map(id=>{const p=D.photos.find(p=>p.id===id);return `<button class="photo-link" data-photo="${id}">${photoHTML(p)}<div class="photo-caption"><strong>${esc(p.title)}</strong><span>${esc(p.state)}</span></div></button>`;}).join('')}</section>`:'';}
function renderLists(){
 const lists=selectLists(D.checklists,{query,group:filter,onlyOpen,isDone:id=>state.done(day,id)});
 const count=lists.flatMap(c=>leaves(c.tasks)).length;
 visibleNodes.clear();
 $('#clear-search').hidden=!query;
 $('#results-status').textContent=query?`${count} ${count===1?'passende Aufgabe':'passende Aufgaben'} in ${lists.length} ${lists.length===1?'Checkliste':'Checklisten'}${filter!=='all'?' · '+D.groups.find(g=>g.id===filter).title:''}. Oberpunkte wirken auf die angezeigten Unterpunkte.`:onlyOpen?`${count} ${count===1?'offene Aufgabe':'offene Aufgaben'} in ${lists.length} ${lists.length===1?'Checkliste':'Checklisten'}.`:'';
 $('#checklist-list').innerHTML=lists.length?D.groups.filter(g=>lists.some(c=>c.group===g.id)).map(g=>`<div class="group-label"><h3>${g.title}</h3><span class="group-line"></span><span class="small">${g.subtitle}</span></div><div class="checklist-grid">${lists.filter(c=>c.group===g.id).map(c=>`<details class="checklist" data-list="${c.id}" ${query||openLists.has(c.id)?'open':''}><summary><span class="list-symbol" aria-hidden="true">${g.id==='setup'?'↗':g.id==='close'?'↙':'☷'}</span><div class="list-heading"><h3>${esc(c.title)}</h3><div data-progress="${c.id}">${progress(D.checklists.find(original=>original.id===c.id))}</div></div><span class="chevron" aria-hidden="true">›</span></summary><div class="check-body">${listNotes(c)}${tree(c.tasks)}${finalPhotos(c)}</div></details>`).join('')}</div>`).join(''):`<div class="empty-results"><strong>${query?'Keine passenden Aufgaben gefunden.':'Keine Aufgaben für diese Auswahl.'}</strong><p>${query?'Anderen Suchbegriff verwenden oder die Filter zurücksetzen.':'Alle Aufgaben sind erledigt oder durch den Filter ausgeblendet.'}</p><button class="btn secondary" id="reset-filters">Auswahl zurücksetzen</button></div>`;
 updateChecks();
}
function updateChecks(){document.querySelectorAll('[data-task]').forEach(input=>{const node=visibleNodes.get(input.dataset.task);if(!node)return;const stats=state.stats(day,[node]);input.checked=stats.done===stats.total;input.indeterminate=stats.done>0&&stats.done<stats.total;});document.querySelectorAll('[data-progress]').forEach(el=>el.innerHTML=progress(D.checklists.find(c=>c.id===el.dataset.progress)));}
function refreshChecks(){if(onlyOpen){const active=document.activeElement?.dataset.task;renderLists();if(active)document.querySelector(`[data-task="${active}"]`)?.focus({preventScroll:true});}else updateChecks();}
function placeholder(){return `<div class="photo-placeholder"><span aria-hidden="true">▧</span><p>Originalfoto noch ergänzen</p></div>`;}
function photoHTML(p,large=false){return p.src?`<img class="${large?'target-img':''}" src="${esc(p.src)}" alt="${esc(p.title+' · '+p.state)}" loading="lazy">`:placeholder();}
function renderResources(){$('#guide-count').textContent=D.guides.length+' Anleitungen';$('#guide-list').innerHTML=D.guides.map(g=>`<button class="guide-link" data-guide="${g.id}"><span class="guide-icon" aria-hidden="true">▤</span><div><h3>${esc(g.title)}</h3><p>${esc(g.subtitle)}</p></div><span class="arrow" aria-hidden="true">↗</span></button>`).join('');$('#photo-count').textContent=D.photos.length+' Ansichten';$('#photo-list').innerHTML=D.photos.map(p=>`<button class="photo-link" data-photo="${p.id}">${photoHTML(p)}<div class="photo-caption"><strong>${esc(p.title)}</strong><span>${esc(p.state)}</span></div></button>`).join('');}
function guideHTML(g){return `<section class="help-section"><p class="eyebrow">ANLEITUNG · ${esc(g.tag)}</p><h3>${esc(g.title)}</h3>${g.condition?`<p class="condition">${esc(g.condition)}</p>`:''}${g.warning?`<div class="notice">${esc(g.warning)}</div>`:''}<div class="steps">${g.steps.map(([title,text])=>`<div class="step"><h4>${esc(title)}</h4><p>${esc(text)}</p></div>`).join('')}</div></section>`;}
function targetHTML(p){return `<section class="help-section"><p class="eyebrow">ZIELBILD</p><h3>${esc(p.title)} · ${esc(p.state)}</h3>${photoHTML(p,true)}${!p.src?'<p class="small" style="margin-top:12px">Das betriebliche Originalfoto ist noch nicht hinterlegt.</p>':''}</section>`;}
function taskNotes(task){return `${task.condition?`<p class="condition info-condition">${esc(task.condition)}</p>`:''}${task.info?.length?`<ul class="task-notes">${task.info.map(text=>`<li>${esc(text)}</li>`).join('')}</ul>`:''}${task.children?task.children.map(child=>`<section class="child-note"><h3>${esc(child.label)}</h3>${taskNotes(child)}</section>`).join(''):''}`;}
function openInfo({task,guide,photo,returnTask}){let html='';if(task){html=`<h2 class="info-task">${esc(task.label)}</h2>${taskNotes(task)}`;if(task.guide){const g=D.guides.find(g=>g.id===task.guide);html+=`<button class="btn secondary help-link" data-guide="${g.id}" data-return-task="${task.id}">Anleitung: ${esc(g.title)} ↗</button>`;}if(task.links)html+=task.links.map(link=>`<a class="btn secondary help-link" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(link.label)} ↗</a>`).join('');for(const id of task.photos||(task.photo?[task.photo]:[])){const p=D.photos.find(p=>p.id===id);if(p)html+=targetHTML(p);}}else{if(returnTask)html+=`<button class="text-button return-link" data-info-task="${returnTask}">← Zurück zum Arbeitsschritt</button>`;if(guide){const g=D.guides.find(g=>g.id===guide);if(g)html+=guideHTML(g);}if(photo){const p=D.photos.find(p=>p.id===photo);if(p)html+=targetHTML(p);}}$('#info-content').innerHTML=html;$('#dialog-eyebrow').textContent=task?'ZUM ARBEITSSCHRITT':guide?'ANLEITUNG':'ZIELBILD';if(!$('#info-dialog').open)$('#info-dialog').showModal();else $('#info-dialog').scrollTop=0;}
function applyFilters(){for(const id of ['all-tasks','only-open']){const active=id==='only-open'?onlyOpen:!onlyOpen;$('#'+id).classList.toggle('active',active);$('#'+id).setAttribute('aria-pressed',active);}document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter===filter;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});renderLists();}
document.addEventListener('toggle',e=>{if(e.target.matches?.('details.checklist')&&e.target.isConnected&&!query){if(e.target.open)openLists.add(e.target.dataset.list);else openLists.delete(e.target.dataset.list);}},true);
document.addEventListener('input',e=>{if(e.target.id==='task-search'){query=e.target.value.trim();renderLists();}});
document.addEventListener('click',e=>{
 const route=e.target.closest('a[data-view]');if(route){e.preventDefault();showView(route.dataset.view,true);return;}
 const button=e.target.closest('button');if(!button)return;
 if(button.dataset.close)$('#'+button.dataset.close).close();
 if(button.dataset.filter){filter=filter===button.dataset.filter?'all':button.dataset.filter;applyFilters();}
 if(button.id==='all-tasks'||button.id==='only-open'){onlyOpen=button.id==='only-open';applyFilters();}
 if(button.dataset.infoTask)openInfo({task:taskMap.get(button.dataset.infoTask).node});
 if(button.dataset.guide)openInfo({guide:button.dataset.guide,returnTask:button.dataset.returnTask});
 if(button.dataset.photo)openInfo({photo:button.dataset.photo});
 if(button.id==='clear-search'){query='';$('#task-search').value='';renderLists();$('#task-search').focus();}
 if(button.id==='reset-filters'){query='';filter='all';onlyOpen=false;$('#task-search').value='';applyFilters();}
 if(button.id==='skip-content')$('#main').focus();
});
document.addEventListener('change',async e=>{
 const t=e.target;


 if(t.dataset.task){state.set(day,[visibleNodes.get(t.dataset.task)||taskMap.get(t.dataset.task).node],t.checked);refreshChecks();status();if(state.error)toast('Nicht gespeichert. Die Änderung gilt nur bis zum Neuladen.');}
});
const viewNames={checklists:'Checklisten',guides:'Anleitungen',photos:'Zielbilder'};
function viewFromURL(){return new URL(location.href).searchParams.get('view')||'checklists';}
let currentView=null;
function showView(requested,push=false){const view=Object.hasOwn(viewNames,requested)?requested:'checklists';const changed=view!==currentView;currentView=view;document.querySelectorAll('[data-page]').forEach(section=>section.hidden=section.dataset.page!==view);$('#storage-error').hidden=view!=='checklists';document.querySelectorAll('.bottom-nav [data-view]').forEach(a=>{const active=a.dataset.view===view;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});document.title='audimax events · '+viewNames[view];if(push){const url=new URL(location.href);url.searchParams.set('view',view);url.hash='';if(url.href!==location.href){try{history.pushState({view},'',url);}catch{}}}if(changed){window.scrollTo(0,0);if(push)document.querySelector(`[data-page="${view}"] h2`).focus({preventScroll:true});}}
window.addEventListener('popstate',()=>showView(viewFromURL()));
window.addEventListener('storage',e=>{if(e.key!==state.key||!e.newValue)return;try{const fresh=JSON.parse(e.newValue);if(state.valid(fresh)){state.data=fresh;refreshChecks();status();}}catch{}});
renderLists();renderResources();status();
if(location.hash){try{const url=new URL(location.href);url.hash='';history.replaceState(null,'',url);}catch{}}
showView(viewFromURL());
