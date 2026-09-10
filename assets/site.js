const menuButton=document.querySelector('.menu');
const nav=document.querySelector('.navlinks');
if(menuButton&&nav){
  menuButton.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
    document.body.classList.toggle('menu-open',open);
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');document.body.classList.remove('menu-open');menuButton.setAttribute('aria-expanded','false');
  }));
}

const zoomables=[...document.querySelectorAll('.zoomable')];
if(zoomables.length){
  const box=document.createElement('div');
  box.className='lightbox';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-label','Imagem ampliada');
  box.innerHTML='<div class="lightbox-panel"><button class="lightbox-close" aria-label="Fechar imagem">×</button><img alt=""></div>';
  document.body.appendChild(box);
  const image=box.querySelector('img');const close=box.querySelector('.lightbox-close');let lastFocus=null;
  const shut=()=>{box.classList.remove('open');document.body.style.overflow='';if(lastFocus)lastFocus.focus()};
  zoomables.forEach(el=>{el.setAttribute('tabindex','0');el.setAttribute('role','button');el.setAttribute('aria-label','Ampliar imagem');
    const open=()=>{lastFocus=el;image.src=el.currentSrc||el.src;image.alt=el.alt||'Imagem ampliada';box.classList.add('open');document.body.style.overflow='hidden';close.focus()};
    el.addEventListener('click',open);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
  });
  close.addEventListener('click',shut);box.addEventListener('click',e=>{if(e.target===box)shut()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&box.classList.contains('open'))shut()});
}
