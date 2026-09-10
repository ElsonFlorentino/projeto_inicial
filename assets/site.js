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
  const box=document.createElement('dialog');
  box.className='lightbox';
  box.setAttribute('aria-label','Imagem ampliada');
  box.innerHTML='<div class="lightbox-panel"><div class="lightbox-toolbar"><a class="lightbox-original" target="_blank" rel="noopener noreferrer">Abrir imagem original ↗</a><button class="lightbox-close" type="button" aria-label="Fechar imagem">×</button></div><img alt=""></div>';
  document.body.appendChild(box);
  const image=box.querySelector('img');
  const original=box.querySelector('.lightbox-original');
  const close=box.querySelector('.lightbox-close');
  let lastFocus=null;
  let previousOverflow='';
  box.addEventListener('close',()=>{
    document.body.style.overflow=previousOverflow;
    if(lastFocus)lastFocus.focus({preventScroll:true});
  });
  zoomables.forEach(el=>{
    el.setAttribute('tabindex','0');
    el.setAttribute('role','button');
    el.setAttribute('aria-haspopup','dialog');
    el.setAttribute('aria-label','Ampliar: '+el.alt);
    const open=()=>{
      lastFocus=el;
      image.src=el.currentSrc||el.src;
      image.alt=el.alt||'Imagem ampliada';
      original.href=image.src;
      previousOverflow=document.body.style.overflow;
      box.showModal();
      document.body.style.overflow='hidden';
      close.focus();
    };
    el.addEventListener('click',open);
    el.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}
    });
  });
  close.addEventListener('click',()=>box.close());
  box.addEventListener('click',e=>{if(e.target===box)box.close()});
}
