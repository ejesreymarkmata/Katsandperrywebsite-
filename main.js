(function(){
  // Map links
  document.querySelectorAll('[data-maps]').forEach(function(a){a.href=MAPS_URL;a.target='_blank';a.rel='noopener'});

  // Mobile nav
  var toggle=document.querySelector('.nav-toggle'), nav=document.getElementById('nav');
  toggle.addEventListener('click',function(){var o=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',o)});
  nav.addEventListener('click',function(){nav.classList.remove('open');toggle.setAttribute('aria-expanded',false)});

  // String lights
  var lights=document.querySelector('.lights'), n=window.innerWidth<600?9:20;
  for(var i=0;i<n;i++){
    var t=(i+.5)/n, b=document.createElement('span'); b.className='bulb';
    b.style.left=(t*100)+'%'; b.style.top=(8+Math.sin(Math.PI*t)*40)+'px';
    b.style.animationDelay=(i*0.37%3)+'s'; lights.appendChild(b);
  }

  // Menu tabs
  var tabs=document.querySelector('.tabs'), list=document.getElementById('items');
  function show(cat){
    list.innerHTML=MENU[cat].map(function(m){
      return '<li class="item"><img src="'+m.img+'" alt="" loading="lazy"><div><h3>'+m.name+'</h3><p>'+m.desc+'</p></div></li>';
    }).join('');
    tabs.querySelectorAll('.tab').forEach(function(b){b.setAttribute('aria-selected',b.dataset.cat===cat)});
  }
  Object.keys(MENU).forEach(function(cat){
    var b=document.createElement('button'); b.className='tab'; b.type='button';
    b.setAttribute('role','tab'); b.dataset.cat=cat; b.textContent=cat;
    b.addEventListener('click',function(){show(cat)}); tabs.appendChild(b);
  });
  show(Object.keys(MENU)[0]);

  // Gallery + lightbox
  var grid=document.getElementById('grid'), box=document.getElementById('lightbox'), big=box.querySelector('img');
  GALLERY.forEach(function(g){
    var b=document.createElement('button'); b.type='button'; b.className='tile';
    b.innerHTML='<img src="'+g.src+'" alt="'+g.alt+'" loading="lazy">';
    b.addEventListener('click',function(){big.src=g.src;big.alt=g.alt;box.showModal()});
    grid.appendChild(b);
  });
  box.addEventListener('click',function(){box.close()});

  // Reviews
  document.getElementById('reviews-list').innerHTML=REVIEWS.map(function(r){
    return '<blockquote class="review"><p>'+r.text+'</p><footer><strong>'+r.name+'</strong><span>'+r.meta+'</span></footer></blockquote>';
  }).join('');

  // Open now (Philippine time, 12:00 to 24:00)
  var s=document.getElementById('status'), h=(new Date().getUTCHours()+8)%24;
  if(h>=12){s.textContent='Open now · until 12mn';s.classList.add('is-open')}
  else{s.textContent='Closed now · opens 12nn daily'}
  document.getElementById('year').textContent=new Date().getFullYear();
})();
