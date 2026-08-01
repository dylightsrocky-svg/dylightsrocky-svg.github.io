(function(){
  function addDaliCard(){
    var grid=document.querySelector('.product-grid');
    if(!grid||document.querySelector('[data-dali-card]'))return;
    var card=document.createElement('a');
    card.className='product-card blue';
    card.href='/series/dali-series/';
    card.setAttribute('data-dali-card','true');
    card.innerHTML='<div class="card-top"><span>Indoor · DALI / DT6</span><b>↗</b></div><div class="series-card-image native-angle"><img src="/products/dali/dali-400w.webp" alt="DALI Series representative LED power supply" style="width:100%;height:100%;object-fit:contain;transform:none"></div><h3>DALI Series</h3><p>60–400W · 7 models</p><small>Professional digital dimming for controlled indoor LED projects</small><div class="spec-list"><div><span>Output</span><b>DC 12V / 24V / 48V</b></div><div><span>Models</span><b>60 / 100 / 150 / 200 / 250 / 300 / 400W</b></div><div><span>Power factor</span><b>≥0.6</b></div></div><span class="series-inquiry">View all wattages &amp; data <span>→</span></span>';
    grid.appendChild(card);
  }
  document.addEventListener('DOMContentLoaded',addDaliCard);
  window.addEventListener('load',function(){addDaliCard();setTimeout(addDaliCard,500);setTimeout(addDaliCard,1500)});
  new MutationObserver(addDaliCard).observe(document.documentElement,{childList:true,subtree:true});
})();
