/*** EDIT BELOW ***/
const wishTitleText = "Happy Birthday Ali!";
const wishMessageText = "Dear Sharjeel, may your Life be filled with laughter, surprises, and countless blessings. You deserve all the happiness in the world today and always!";
const wishFromText = "— From Farhan";

const media = [
  { type: 'image', src: './data/pic1.jpg' },
  { type: 'image', src: './data/pic2.jpg' },
  { type: 'image', src: './data/pc3.jpg' },
  { type: 'image', src: './data/pic4.jpg' },
  { type: 'image', src: './data/pic5.jpg' },
  { type: 'video', src: './data/video1.mp4' },
  { type: 'video', src: './data/video2.mp4' },
  { type: 'video', src: './data/video3.mp4' },
  { type: 'video', src: './data/video4.mp4' },
  { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' }
];
/*** STOP EDITING ***/

const previewArea = document.getElementById('previewArea');
const titleEl = document.getElementById('wishTitle');
const messageEl = document.getElementById('wishMessage');
const fromEl = document.getElementById('wishFrom');
const thumbs = document.getElementById('thumbs');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playBtn = document.getElementById('playBtn');

let idx = 0;
let currentMediaEl = null;

function renderText(){
  titleEl.textContent = wishTitleText;
  messageEl.textContent = wishMessageText;
  fromEl.textContent = wishFromText;
}

function makeThumbItem(item, i){
  const div = document.createElement('div');
  div.className = 'thumb';
  if(item.type === 'image'){
    const img = document.createElement('img'); img.src = item.src; div.appendChild(img);
  } else if(item.type === 'video'){
    const v = document.createElement('video'); v.src = item.src; v.muted=true; div.appendChild(v);
  }
  div.onclick = ()=>{ idx=i; showMedia(); };
  return div;
}

function renderThumbs(){
  thumbs.innerHTML = '';
  media.forEach((m,i)=>{
    const t = makeThumbItem(m,i);
    if(i===idx) t.classList.add('active');
    thumbs.appendChild(t);
  });
}

function showMedia(){
  previewArea.innerHTML = '';
  currentMediaEl = null;
  if(media.length === 0){ previewArea.textContent='No media added'; return; }
  const item = media[idx];
  if(item.type==='image'){
    const img = document.createElement('img'); img.src=item.src; previewArea.appendChild(img); currentMediaEl=img;
  } else if(item.type==='video'){
    const v = document.createElement('video'); v.src=item.src; v.controls=true; v.playsInline=true; previewArea.appendChild(v); currentMediaEl=v;
  }
  renderThumbs();
}

prevBtn.onclick=()=>{ if(media.length===0) return; idx=(idx-1+media.length)%media.length; showMedia(); };
nextBtn.onclick=()=>{ if(media.length===0) return; idx=(idx+1)%media.length; showMedia(); };
playBtn.onclick=()=>{ if(currentMediaEl && currentMediaEl.tagName==='VIDEO'){ currentMediaEl.paused? currentMediaEl.play(): currentMediaEl.pause(); } };

window.addEventListener('keydown',(e)=>{ if(e.key==='ArrowLeft') prevBtn.click(); if(e.key==='ArrowRight') nextBtn.click(); });

renderText();
showMedia();