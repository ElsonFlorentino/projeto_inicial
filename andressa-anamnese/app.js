const form=document.getElementById('f');
const fields=[...form.querySelectorAll('input,textarea,select')];
const fill=document.getElementById('fill');
const pct=document.getElementById('pct');
const out=document.getElementById('out');
const summary=document.getElementById('summary');
const toast=document.getElementById('toast');
const KEY='andressa_anamnese_v5';
const musculos=['Glúteos','Posterior de coxa','Quadríceps','Panturrilhas','Abdômen/core','Costas','Ombros','Braços','Peitoral','Corpo inteiro'];
document.querySelectorAll('[name^="p"]').forEach(s=>musculos.forEach(m=>s.add(new Option(m,m))));
function val(name){const el=form.elements[name];if(!el)return'';if(el instanceof RadioNodeList)return el.value||'';return (el.value||'').trim()}
function checked(name){return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(i=>i.value)}
function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1700)}
function toggle(){document.getElementById('dor-extra').classList.toggle('show',val('dor')==='Sim');document.getElementById('med-extra').classList.toggle('show',val('medica')==='Sim')}
function progress(){const sections=[...document.querySelectorAll('[data-s]')];let done=0;sections.forEach(sec=>{const controls=[...sec.querySelectorAll('input,textarea,select')];if(controls.some(c=>c.type==='radio'||c.type==='checkbox'?c.checked:(c.value||'').trim()))done++});const n=Math.round(done/sections.length*100);fill.style.width=n+'%';pct.textContent=n+'%'}
function save(){const data={};fields.forEach(f=>{if(f.type==='radio'){if(f.checked)data[f.name]=f.value}else if(f.type==='checkbox'){data[f.name]=(data[f.name]||[]);if(f.checked)data[f.name].push(f.value)}else data[f.name]=f.value});localStorage.setItem(KEY,JSON.stringify(data));toggle();progress()}
function load(){const raw=localStorage.getItem(KEY);if(!raw){toggle();progress();return}try{const data=JSON.parse(raw);fields.forEach(f=>{if(f.type==='radio')f.checked=data[f.name]===f.value;else if(f.type==='checkbox')f.checked=(data[f.name]||[]).includes(f.value);else if(data[f.name]!==undefined)f.value=data[f.name]})}catch(e){}toggle();progress()}
fields.forEach(f=>{f.addEventListener('change',save);f.addEventListener('input',save)});load();
const empty=v=>v||'Não informado';
function buildSummary(){const r=checked('regioes').join(', ');const d=checked('dias').join(', ');return `ANAMNESE DE TREINO DA ANDRESSA\n\n1. OBJETIVO\nObjetivo: ${empty(val('objetivo'))}\nO que espera do treino: ${empty(val('mudanca'))}\n\n2. PRIORIDADES\nRegiões: ${empty(r)}\n1ª prioridade: ${empty(val('p1'))}\n2ª prioridade: ${empty(val('p2'))}\n3ª prioridade: ${empty(val('p3'))}\nPonto forte: ${empty(val('forte'))}\nDesenvolver mais: ${empty(val('fraco'))}\n\n3. EXPERIÊNCIA\nTreina atualmente: ${empty(val('treina'))}\nTempo de treino: ${empty(val('tempo'))}\nNível: ${empty(val('nivel'))}\n\n4. ROTINA\nFrequência: ${empty(val('freq'))}\nTempo por treino: ${empty(val('tempoTreino'))}\nMelhores dias: ${empty(d)}\nDescanso preferido: ${empty(val('descanso'))}\n\n5. PREFERÊNCIAS\nExercícios de que gosta: ${empty(val('gosta'))}\nExercícios que evita ou não gosta: ${empty(val('naogosta'))}\nEstilo de treino: ${empty(val('estilo'))}\nTreinar próximo do limite: ${empty(val('limite'))}\nEquipamentos: ${empty(val('equip'))}\n\n6. ESTRUTURA\nLocal: ${empty(val('local'))}\nEquipamentos indisponíveis: ${empty(val('indisponivel'))}\n\n7. CONFORTO E LIMITAÇÕES\nDor ou limitação: ${empty(val('dor'))}\nDetalhes: ${empty(val('dorDetalhe'))}\nExercícios evitados: ${empty(val('evita'))}\nRecomendação médica ou profissional: ${empty(val('medica'))}\nDetalhes: ${empty(val('medicaDetalhe'))}\n\n8. TREINO IDEAL\nO que faria o treino parecer feito para você: ${empty(val('feito'))}\nO que gostaria de encontrar no treino: ${empty(val('naofalta'))}\nResultado desejado: ${empty(val('frase'))}\n`}
document.getElementById('finish').onclick=()=>{summary.textContent=buildSummary();out.showModal()};
document.getElementById('close').onclick=()=>out.close();
document.getElementById('copyBtn').onclick=async()=>{await navigator.clipboard.writeText(summary.textContent);showToast('Resumo copiado!')};
document.getElementById('downloadBtn').onclick=()=>{const blob=new Blob([summary.textContent],{type:'text/plain;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='anamnese-andressa.txt';a.click();URL.revokeObjectURL(a.href)};
document.getElementById('shareBtn').onclick=async()=>{try{if(navigator.share)await navigator.share({title:'Anamnese de Treino da Andressa',text:summary.textContent});else{await navigator.clipboard.writeText(summary.textContent);showToast('Resumo copiado!')}}catch(e){}};
document.getElementById('clear').onclick=()=>{if(!confirm('Deseja limpar todas as respostas?'))return;localStorage.removeItem(KEY);form.reset();toggle();progress();showToast('Respostas limpas.')};
