(()=>{
  "use strict";

  const highlights=[
    {
      id:"company",
      title:"Company",
      cover:"/highlights/media/company.jpg",
      eyebrow:"DY LIGHTS · ENGINEERED POWER",
      heading:"Built for lighting professionals.",
      copy:"A focused LED power supply and lighting solutions company supporting partners with dependable engineering and responsive service.",
      media:"/highlights/media/company.jpg"
    },
    {
      id:"factory",
      title:"Factory",
      cover:"/media/dy-lights-factory-poster.jpg",
      eyebrow:"REAL PRODUCTION BASE",
      heading:"Made, tested and verified.",
      copy:"See the production environment behind DY LIGHTS products—from assembly and inspection to testing and shipment preparation.",
      media:"/media/dy-lights-factory.mp4",
      poster:"/media/dy-lights-factory-poster.jpg",
      type:"video",
      duration:15000
    },
    {
      id:"showrooms",
      title:"Showrooms",
      cover:"/highlights/media/showroom.jpg",
      eyebrow:"DY LIGHTS SHOWROOMS",
      heading:"Solutions customers can experience.",
      copy:"A professional setting to compare power supplies, lighting products and application solutions in person.",
      media:"/highlights/media/showroom.jpg"
    },
    {
      id:"exhibitions",
      title:"Exhibitions",
      cover:"/highlights/media/messe-frankfurt.jpg",
      eyebrow:"MESSE FRANKFURT",
      heading:"Meeting lighting partners worldwide.",
      copy:"DY LIGHTS connects with international customers through exhibitions, technical conversations and long-term cooperation.",
      media:"/highlights/media/messe-frankfurt.jpg",
      position:"50% 58%"
    },
    {
      id:"products",
      title:"Products",
      cover:"/approved/hp-400w.png",
      eyebrow:"DY LIGHTS POWER SOLUTIONS",
      heading:"Power for every lighting application.",
      copy:"Indoor, waterproof, compact and professional dimming solutions across the existing DY LIGHTS product range.",
      media:"/approved/hp-400w.png",
      fit:"contain",
      cta:{label:"EXPLORE PRODUCTS",href:"#products"}
    }
  ];

  const q=(selector,root=document)=>root.querySelector(selector);
  const make=(tag,className,attributes={})=>{
    const element=document.createElement(tag);
    if(className) element.className=className;
    Object.entries(attributes).forEach(([name,value])=>element.setAttribute(name,value));
    return element;
  };

  let activeIndex=0;
  let timer;
  let opener;
  let savedScrollY=0;
  let touchX=0;

  const row=make("div","dyhl-highlights",{"aria-label":"DY LIGHTS Highlights"});
  const viewport=make("div","dyhl-highlights__viewport");
  const list=make("ul","dyhl-highlights__list");

  highlights.forEach((item,index)=>{
    const listItem=make("li");
    const button=make("button","dyhl-highlights__button",{type:"button","aria-label":`Open ${item.title} Highlight`});
    const cover=make("span","dyhl-highlights__cover");
    const image=make("img","",{src:item.cover,alt:"",loading:"lazy",decoding:"async"});
    const initials=make("span","dyhl-highlights__initials");
    const label=make("span","dyhl-highlights__label");
    initials.textContent=item.title.slice(0,2).toUpperCase();
    label.textContent=item.title;
    cover.append(image,initials);
    button.append(cover,label);
    button.addEventListener("click",()=>open(index,button));
    listItem.append(button);
    list.append(listItem);
  });

  viewport.append(list);
  row.append(viewport);

  const modal=make("div","dyhl-story",{hidden:"",role:"dialog","aria-modal":"true","aria-label":"DY LIGHTS Highlight viewer"});
  modal.innerHTML=`
    <div class="dyhl-story__dialog">
      <div class="dyhl-story__media"></div>
      <div class="dyhl-story__shade"></div>
      <div class="dyhl-story__progress" aria-hidden="true"></div>
      <div class="dyhl-story__meta"><span></span></div>
      <button class="dyhl-story__close" type="button" aria-label="Close Highlights">×</button>
      <button class="dyhl-story__nav dyhl-story__nav--prev" type="button" aria-label="Previous Highlight">‹</button>
      <button class="dyhl-story__nav dyhl-story__nav--next" type="button" aria-label="Next Highlight">›</button>
      <div class="dyhl-story__content">
        <p class="dyhl-story__eyebrow"></p>
        <h2 class="dyhl-story__title"></h2>
        <p class="dyhl-story__copy"></p>
        <a class="dyhl-story__cta" hidden></a>
      </div>
    </div>`;

  function inject(){
    const sellers=q(".sellers");
    const grid=sellers&&q(".seller-grid",sellers);
    if(!sellers||!grid) return false;
    if(!q(".dyhl-highlights",sellers)) sellers.insertBefore(row,grid);
    if(!modal.isConnected) document.body.append(modal);
    return true;
  }

  function render(){
    clearTimeout(timer);
    const item=highlights[activeIndex];
    const mediaBox=q(".dyhl-story__media",modal);
    mediaBox.replaceChildren();
    mediaBox.classList.toggle("is-contained",item.fit==="contain");

    if(item.type==="video"){
      const video=make("video","",{src:item.media,poster:item.poster,muted:"",playsinline:"",preload:"metadata","aria-label":item.heading});
      video.muted=true;
      video.playsInline=true;
      video.addEventListener("ended",next,{once:true});
      mediaBox.append(video);
      video.play().catch(()=>{});
    }else{
      const image=make("img","",{src:item.media,alt:item.heading,decoding:"async",loading:"eager"});
      image.style.objectFit=item.fit||"cover";
      image.style.objectPosition=item.position||"center";
      mediaBox.append(image);
    }

    q(".dyhl-story__meta span",modal).textContent=item.title;
    q(".dyhl-story__eyebrow",modal).textContent=item.eyebrow;
    q(".dyhl-story__title",modal).textContent=item.heading;
    q(".dyhl-story__copy",modal).textContent=item.copy;

    const progress=q(".dyhl-story__progress",modal);
    progress.replaceChildren(...highlights.map((_,index)=>{
      const track=make("span",`dyhl-story__track${index<activeIndex?" is-complete":index===activeIndex?" is-active":""}`);
      track.style.setProperty("--dyhl-duration",`${item.duration||8000}ms`);
      track.append(make("span","dyhl-story__fill"));
      return track;
    }));

    const cta=q(".dyhl-story__cta",modal);
    if(item.cta){
      cta.hidden=false;
      cta.textContent=item.cta.label;
      cta.href=item.cta.href;
      cta.onclick=close;
    }else{
      cta.hidden=true;
      cta.removeAttribute("href");
      cta.onclick=null;
    }

    if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
      timer=setTimeout(next,item.duration||8000);
    }
  }

  function open(index,button){
    activeIndex=index;
    opener=button;
    savedScrollY=window.scrollY;
    document.body.style.position="fixed";
    document.body.style.top=`-${savedScrollY}px`;
    document.body.style.width="100%";
    document.body.classList.add("dyhl-story-open");
    modal.hidden=false;
    render();
    q(".dyhl-story__close",modal).focus();
  }

  function close(){
    clearTimeout(timer);
    const video=q("video",modal);
    if(video) video.pause();
    modal.hidden=true;
    document.body.classList.remove("dyhl-story-open");
    document.body.style.position="";
    document.body.style.top="";
    document.body.style.width="";
    window.scrollTo(0,savedScrollY);
    if(opener) opener.focus();
  }

  function next(){
    activeIndex=(activeIndex+1)%highlights.length;
    render();
  }

  function prev(){
    activeIndex=(activeIndex-1+highlights.length)%highlights.length;
    render();
  }

  q(".dyhl-story__close",modal).addEventListener("click",close);
  q(".dyhl-story__nav--prev",modal).addEventListener("click",prev);
  q(".dyhl-story__nav--next",modal).addEventListener("click",next);
  modal.addEventListener("click",event=>{if(event.target===modal) close()});
  modal.addEventListener("touchstart",event=>{touchX=event.changedTouches[0].clientX},{passive:true});
  modal.addEventListener("touchend",event=>{
    const distance=event.changedTouches[0].clientX-touchX;
    if(Math.abs(distance)>45) (distance<0?next:prev)();
  },{passive:true});

  document.addEventListener("keydown",event=>{
    if(modal.hidden) return;
    if(event.key==="Escape") close();
    else if(event.key==="ArrowRight") next();
    else if(event.key==="ArrowLeft") prev();
    else if(event.key==="Tab"){
      const focusable=[...modal.querySelectorAll("button:not([hidden]),a:not([hidden])")];
      const first=focusable[0];
      const last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }
  });

  let mountQueued=false;
  const mount=()=>{
    if(mountQueued) return;
    mountQueued=true;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      mountQueued=false;
      inject();
    }));
  };
  if(document.readyState==="complete") mount();
  else window.addEventListener("load",mount,{once:true});

  const observer=new MutationObserver(()=>{
    if(!q(".dyhl-highlights")||!modal.isConnected) mount();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();
