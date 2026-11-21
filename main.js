(function(){
  // Mobile nav
  var toggle=document.querySelector('.nav-toggle'), nav=document.getElementById('nav');
  toggle.addEventListener('click',function(){
    var open=nav.classList.toggle('open'); toggle.setAttribute('aria-expanded',open);
  });
  nav.addEventListener('click',function(){nav.classList.remove('open');toggle.setAttribute('aria-expanded',false)});

  // String lights
  var lights=document.querySelector('.lights'), n=window.innerWidth<600?9:18;
  for(var i=0;i<n;i++){
    var t=(i+.5)/n, b=document.createElement('span'); b.className='bulb';
    b.style.left=(t*100)+'%'; b.style.top=(8+Math.sin(Math.PI*t)*40)+'px';
    b.style.animationDelay=(i*0.37%3)+'s'; lights.appendChild(b);
  }

  // Menu tabs
  var tabs=document.querySelector('.tabs'), list=document.getElementById('items');
  function show(cat){
    list.innerHTML=MENU[cat].map(function(m){
      return '<li class="item"><div class="item-head"><span>'+m.name+'</span><span>'+m.price+'</span></div><p>'+m.desc+'</p></li>';
    }).join('');
    tabs.querySelectorAll('.tab').forEach(function(b){b.setAttribute('aria-selected',b.dataset.cat===cat)});
  }
  Object.keys(MENU).forEach(function(cat){
    var b=document.createElement('button'); b.className='tab'; b.type='button';
    b.setAttribute('role','tab'); b.dataset.cat=cat; b.textContent=cat;
    b.addEventListener('click',function(){show(cat)}); tabs.appendChild(b);
  });
  show(Object.keys(MENU)[0]);

  // Open now (Philippine time, 12:00 to 24:00)
  var status=document.getElementById('status');
  var h=(new Date().getUTCHours()+8)%24;
  if(h>=12){status.textContent='Open now · until 12mn, last call 11pm';status.classList.add('is-open')}
  else{status.textContent='Closed now · opens 12nn daily'}
  document.getElementById('year').textContent=new Date().getFullYear();
})();
