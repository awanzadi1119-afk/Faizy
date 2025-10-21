document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById('login-btn');
  const nameInput = document.getElementById('birthday-name');
  const loginScreen = document.getElementById('login-screen');
  const birthdayPage = document.getElementById('birthday-page');
  const nameDisplay = document.getElementById('name-display');
  const music = document.getElementById('birthday-music');

  // Login
  loginBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if(name){
      nameDisplay.textContent = name;
      loginScreen.classList.add('hidden');
      birthdayPage.classList.remove('hidden');
      music.play();
      triggerConfetti();
      startBalloons();
    } else alert("Please enter the birthday boy's name!");

    
  });


  
  // Surprise buttons
  document.querySelectorAll('.surprise-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      target.classList.toggle('hidden');
      triggerConfetti();
    });
  });

  // Sweet Memories Modal
  const memoriesBtn = document.getElementById('memories-btn');
  const sweetModal = document.getElementById('sweet-memories-modal');
  memoriesBtn.addEventListener('click', ()=> sweetModal.style.display='flex');

  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const modalId = btn.dataset.close;
      document.getElementById(modalId).style.display='none';
    });
  });

  sweetModal.addEventListener('click', e=>{
    if(e.target===sweetModal) sweetModal.style.display='none';
  });

  // Music controls
  const playlist = ['music/birthday2.mp3','music/song1.mp3','music/song2.mp3'];
  let currentSong = 0;
  document.getElementById('music-toggle').addEventListener('click', ()=>{
    music.paused ? music.play() : music.pause();
  });
  document.getElementById('next-song').addEventListener('click', ()=>{
    currentSong = (currentSong+1)%playlist.length;
    music.src = playlist[currentSong];
    music.play();
  });
  document.getElementById('prev-song').addEventListener('click', ()=>{
    currentSong = (currentSong-1+playlist.length)%playlist.length;
    music.src = playlist[currentSong];
    music.play();
  });

  // Balloons
  function startBalloons(){
    for(let i=0;i<10;i++){
      const balloon=document.createElement('div');
      balloon.className='balloon';
      balloon.style.left=Math.random()*90+'vw';
      balloon.style.animationDuration=(5+Math.random()*5)+'s';
      document.body.appendChild(balloon);
      setTimeout(()=> balloon.remove(),10000);
    }
  }

  // Confetti (simple)
  function triggerConfetti(){
    if(window.confetti) confetti({particleCount:80, spread:70, origin:{y:0.6}});
  }

  // Fireworks Canvas
  const canvas=document.createElement('canvas');
  canvas.id='fireworks';
  Object.assign(canvas.style,{position:'fixed',top:'0',left:'0',width:'100%',height:'100%',pointerEvents:'none',zIndex:9999});
  document.body.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  class Particle{
    constructor(x,y,color){this.x=x; this.y=y; this.vx=(Math.random()-0.5)*4; this.vy=(Math.random()-0.5)*4; this.alpha=1; this.color=color;}
    update(){this.x+=this.vx; this.y+=this.vy; this.alpha-=0.02;}
    draw(ctx){ctx.globalAlpha=this.alpha; ctx.fillStyle=this.color; ctx.beginPath(); ctx.arc(this.x,this.y,3,0,2*Math.PI); ctx.fill();}
  }
  const particles=[];
  function createFirework(){
    const x=Math.random()*canvas.width;
    const y=Math.random()*canvas.height/2;
    const colors=['#ff0040','#ffbf00','#40ff00','#00ffff','#ff00ff'];
    for(let i=0;i<50;i++) particles.push(new Particle(x,y,colors[Math.floor(Math.random()*colors.length)]));
  }
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach((p,i)=>{p.update();p.draw(ctx);if(p.alpha<=0) particles.splice(i,1);});
    requestAnimationFrame(animate);
  }
  animate(); setInterval(createFirework,2000);

  // Cake Modal
  const cake = document.getElementById('birthday-cake');
  const cakeModal = document.getElementById('cake-modal');
  if(cake && cakeModal){
    cake.addEventListener('click', ()=>{ cakeModal.style.display='flex'; triggerConfetti(); });
  }
  cakeModal.addEventListener('click', e=>{ if(e.target===cakeModal) cakeModal.style.display='none'; });
});


document.addEventListener("DOMContentLoaded", () => {
  // 💌 Show Letter Modal
  const letterBtn = document.getElementById("letter-btn");
  const letterModal = document.getElementById("letter-modal");
  const closeLetter = letterModal.querySelector(".close-modal");

  letterBtn.addEventListener("click", () => letterModal.style.display = "flex");
  closeLetter.addEventListener("click", () => letterModal.style.display = "none");
  letterModal.addEventListener("click", e => {
    if (e.target === letterModal) letterModal.style.display = "none";
  });

  // ✉️ Envelopes Setup
  function setupEnvelope(id, type = "gif") {
    const env = document.getElementById(id);
    if (!env) return;

    const letter = env.querySelector(".letter");
    const gif = letter.querySelector("img");
    const text = letter.querySelector("p");
    const video = letter.querySelector("video");

    env.addEventListener("click", () => {
      env.classList.toggle("open");

      if (env.classList.contains("open")) {
        if (video) {
          video.style.display = "block";
          video.currentTime = 0;
          video.play();
        }

        if (type === "text" && gif) {
          gif.style.display = "block";
          text.style.display = "none";
          setTimeout(() => {
            gif.style.display = "none";
            text.style.display = "block";
          }, 5000);
        } else if (type === "gif" && gif) {
          gif.style.display = "block";
        }
      } else {
        if (video) {
          video.pause();
          video.style.display = "none";
        }
        if (gif) gif.style.display = "none";
        if (text) text.style.display = "none";
      }
    });
  }

  // 🎥 Initialize all 3 envelopes
  setupEnvelope("envelope1", "gif");
  setupEnvelope("envelope2", "text");
  setupEnvelope("envelope3", "gif");
});



// 🎬 Mega Birthday Message Modal
const megaBtn = document.getElementById('mega-btn');
const megaModal = document.getElementById('mega-modal');

megaBtn.addEventListener('click', () => {
  megaModal.classList.add('show');
});

document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', e => {
    const modalId = e.target.getAttribute('data-close');
    document.getElementById(modalId).classList.remove('show');
  });
});

