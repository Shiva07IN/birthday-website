// Photo data - Devi Ji
const photos = [
  {src:'WhatsApp Image 2026-08-26 at 9.13.34 PM (1).jpeg', caption:'That smile 🥹', title:'Photo 1'},
  {src:'WhatsApp Image 2026-08-26 at 9.13.34 PM.jpeg', caption:'Too cute 💗', title:'Photo 2'},
  {src:'WhatsApp Image 2026-08-26 at 9.13.35 PM (1).jpeg', caption:'A moment worth remembering ✨', title:'Photo 3'},
  {src:'WhatsApp Image 2026-08-26 at 9.13.35 PM.jpeg', caption:'Pretty as always 🌷', title:'Photo 4'},
  {src:'WhatsApp Image 2026-08-26 at 9.13.36 PM (1).jpeg', caption:'Pure joy 🌸', title:'Photo 5'},
  {src:'WhatsApp Image 2026-08-26 at 9.13.36 PM (2).jpeg', caption:'Effortlessly beautiful 💫', title:'Photo 6'},
  {src:'WhatsApp Image 2026-08-26 at 9.13.36 PM.jpeg', caption:'Glowing 🌟', title:'Photo 7'},
  {src:'WhatsApp Image 2026-08-26 at 9.13.37 PM (1).jpeg', caption:'Sunshine 🌸', title:'Photo 8'},
  {src:'WhatsApp Image 2026-08-26 at 9.13.37 PM (2).jpeg', caption:'Heart full of love 💗', title:'Photo 9'},
  {src:'WhatsApp Image 2026-08-26 at 9.13.37 PM.jpeg', caption:'Forever cherished ✨', title:'Photo 10'}
];

function imgSrc(filename) { return encodeURIComponent(filename); }

// ====== AOS INIT ======
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 900, once: true, offset: 60 });
  }
});

// ====== CUSTOM CURSOR ======
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  createSparkle(mouseX, mouseY);
});
document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// ====== SPARKLES ======
let sparkTh = 0;
const sparkEmojis = ['✨', '💗', '🌸', '⭐', '💫', '🌷', '♥', '♡'];
function createSparkle(x, y) {
  const now = Date.now();
  if (now - sparkTh < 80) return;
  sparkTh = now;
  const el = document.createElement('div');
  el.className = 'sparkle';
  el.textContent = sparkEmojis[Math.floor(Math.random() * sparkEmojis.length)];
  el.style.left = (x + (Math.random() - .5) * 20) + 'px';
  el.style.top = (y + (Math.random() - .5) * 20) + 'px';
  el.style.setProperty('--tx', (Math.random() - .5) * 60 + 'px');
  el.style.setProperty('--ty', (-(Math.random() * 60 + 20)) + 'px');
  document.getElementById('sparkle-container').appendChild(el);
  setTimeout(() => el.remove(), 900);
}
document.addEventListener('touchmove', e => { const t = e.touches[0]; createSparkle(t.clientX, t.clientY); }, { passive: true });
document.addEventListener('touchstart', e => { const t = e.touches[0]; createSparkle(t.clientX, t.clientY); createHeartShower(t.clientX, t.clientY, 3); }, { passive: true });

// ====== FLOATING HEARTS ======
const hBg = document.getElementById('floating-hearts-bg');
const hEmojis = ['💗', '💕', '🌸', '🌷', '✨', '💫', '🌺', '🎀'];
function spawnFH() {
  const el = document.createElement('div'); el.className = 'float-heart';
  el.textContent = hEmojis[Math.floor(Math.random() * hEmojis.length)];
  el.style.left = Math.random() * 100 + '%';
  el.style.fontSize = (Math.random() * 14 + 10) + 'px';
  const dur = (Math.random() * 8 + 8) + 's';
  el.style.animationDuration = dur;
  el.style.animationDelay = (Math.random() * 2) + 's';
  hBg.appendChild(el);
  setTimeout(() => el.remove(), parseFloat(dur) * 1000 + 2000);
}
setInterval(spawnFH, 1800);
for (let i = 0; i < 5; i++) setTimeout(spawnFH, i * 500);

// ====== BG STARS ======
const starE = ['✨', '⭐', '💫', '🌟'];
for (let i = 0; i < 20; i++) {
  const s = document.createElement('div'); s.className = 'bg-star';
  s.textContent = starE[Math.floor(Math.random() * starE.length)];
  s.style.left = Math.random() * 100 + 'vw';
  s.style.top = Math.random() * 100 + 'vh';
  s.style.animationDuration = (Math.random() * 3 + 2) + 's';
  s.style.animationDelay = (Math.random() * 3) + 's';
  document.body.appendChild(s);
}

// ====== SAKURA CANVAS (from Happy-Birthday repo) ======
(function initSakura() {
  const canvas = document.getElementById('sakura-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let petals = [];
  const numPetals = 55;

  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Petal() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 2 - canvas.height;
    this.w = 20 + Math.random() * 14;
    this.h = 16 + Math.random() * 10;
    this.opacity = 0.35 + Math.random() * 0.35;
    this.flip = Math.random();
    this.xSpeed = 1 + Math.random() * 1.8;
    this.ySpeed = 0.8 + Math.random() * 0.9;
    this.flipSpeed = Math.random() * 0.03;
    // Pink / lavender palette
    const colors = ['#FFB7C5', '#f9a8d4', '#e8b4f8', '#fca5c5', '#f0abfc'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  Petal.prototype.draw = function () {
    if (this.y > canvas.height || this.x > canvas.width) {
      this.x = -this.w;
      this.y = Math.random() * canvas.height * 2 - canvas.height;
      this.xSpeed = 1 + Math.random() * 1.8;
      this.ySpeed = 0.8 + Math.random() * 0.9;
      this.flip = Math.random();
    }
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
    ctx.bezierCurveTo(this.x, this.y + this.h, this.x - this.w / 2, this.y, this.x, this.y);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  };
  Petal.prototype.update = function () {
    this.x += this.xSpeed; this.y += this.ySpeed; this.flip += this.flipSpeed;
    this.draw();
  };
  for (let i = 0; i < numPetals; i++) petals.push(new Petal());
  (function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); petals.forEach(p => p.update()); requestAnimationFrame(animate); })();
})();

// ====== LIVE AGE COUNTER (from Happy-Birthday repo, adapted for Devi Ji) ======
(function initAgeCounter() {
  // Birthday: 7 September (using 2002 as assumed year - adjust if needed)
  const birthDate = new Date('2002-09-07T00:00:00');
  const ageEl = document.getElementById('age-display');
  if (!ageEl) return;

  function updateAge() {
    const now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    let hours = now.getHours() - birthDate.getHours();
    let mins = now.getMinutes() - birthDate.getMinutes();
    let secs = now.getSeconds() - birthDate.getSeconds();
    if (secs < 0) { secs += 60; mins--; }
    if (mins < 0) { mins += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) { const prev = new Date(now.getFullYear(), now.getMonth(), 0); days += prev.getDate(); months--; }
    if (months < 0) { months += 12; years--; }
    ageEl.innerHTML = years + 'y &nbsp; ' + months + 'm &nbsp; ' + days + 'd<br>' + hours + 'h &nbsp; ' + mins + 'm &nbsp; ' + secs + 's';
  }
  setInterval(updateAge, 1000);
  updateAge();
})();

// ====== AUTO-INIT ON PAGE LOAD ======
document.addEventListener('DOMContentLoaded', () => {
  observeSections();
  startCountdown();
  buildFilmstrip();
  buildHallOfFame();
  buildScrapbook();
  buildMemories();
  setTimeout(spawnButterfly, 2000);
  setTimeout(spawnButterfly, 5000);
});

// ====== INTERSECTION OBSERVER ======
function observeSections() {
  const secs = document.querySelectorAll('.reveal-section');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); spawnScrollPetals(); } });
  }, { threshold: 0.1 });
  secs.forEach(s => obs.observe(s));
}

// ====== COUNTDOWN ======
function startCountdown() {
  const now = new Date();
  const isToday = (now.getMonth() === 8 && now.getDate() === 7);
  if (isToday) {
    document.getElementById('countdown-section').style.display = 'none';
    document.getElementById('bday-today').style.display = 'block';
    launchCelebration(); return;
  }
  let bday = new Date(now.getFullYear(), 8, 7, 0, 0, 0);
  if (bday < now) bday = new Date(now.getFullYear() + 1, 8, 7, 0, 0, 0);
  function upd() {
    const diff = bday - new Date();
    if (diff <= 0) { document.getElementById('countdown-section').style.display = 'none'; document.getElementById('bday-today').style.display = 'block'; return; }
    document.getElementById('cd-days').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }
  upd(); setInterval(upd, 1000);
}

// ====== FILMSTRIP ======
function buildFilmstrip() {
  const track = document.getElementById('filmstrip-track');
  if (!track) return;
  photos.forEach(photo => {
    const frame = document.createElement('div'); frame.className = 'film-frame';
    const hl = document.createElement('div'); hl.className = 'film-holes left';
    const hr = document.createElement('div'); hr.className = 'film-holes right';
    for (let h = 0; h < 6; h++) {
      const hL = document.createElement('div'); hL.className = 'film-hole'; hl.appendChild(hL);
      const hR = document.createElement('div'); hR.className = 'film-hole'; hr.appendChild(hR);
    }
    const wrap = document.createElement('div'); wrap.className = 'film-img-wrap';
    const img = document.createElement('img');
    img.src = imgSrc(photo.src); img.alt = photo.title; img.loading = 'lazy';
    wrap.appendChild(img);
    const cap = document.createElement('div'); cap.className = 'film-caption'; cap.textContent = photo.caption;
    frame.appendChild(hl); frame.appendChild(hr); frame.appendChild(wrap); frame.appendChild(cap);
    frame.addEventListener('click', () => openLightbox(imgSrc(photo.src), photo.caption));
    track.appendChild(frame);
  });
}



// ====== SCRAPBOOK ======
const scrapD = [
  { idx: 0, cls: 'tall', ov: 'That glow ✨' },
  { idx: 1, cls: '', ov: 'So cute 💗' },
  { idx: 2, cls: '', ov: 'Precious 🌸' },
  { idx: 3, cls: 'wide', ov: 'Pure happiness 🌷' },
  { idx: 4, cls: '', ov: 'Effortless 💫' },
  { idx: 5, cls: 'tall', ov: 'Radiant 🌺' },
  { idx: 6, cls: '', ov: 'Joy 🎀' },
];
function buildScrapbook() {
  const grid = document.getElementById('scrapbook-grid');
  if (!grid) return;
  scrapD.forEach(item => {
    const card = document.createElement('div'); card.className = 'scrap-card ' + item.cls;
    const img = document.createElement('img');
    img.src = imgSrc(photos[item.idx].src); img.alt = photos[item.idx].title; img.loading = 'lazy';
    const ov = document.createElement('div'); ov.className = 'scrap-overlay';
    const txt = document.createElement('div'); txt.className = 'scrap-overlay-text'; txt.textContent = item.ov;
    ov.appendChild(txt); card.appendChild(img); card.appendChild(ov);
    card.addEventListener('click', () => openLightbox(imgSrc(photos[item.idx].src), photos[item.idx].caption));
    grid.appendChild(card);
  });
}

// ====== MEMORIES / LIGHTGALLERY ======
const mCaptions = [
  'That smile 🥹', 'Too cute 💗', 'A moment worth remembering ✨',
  'Pretty as always 🌷', 'Pure joy 🌸', 'Effortlessly beautiful 💫',
  'Glowing 🌟', 'Sunshine 🌸', 'Heart full of love 💗', 'Forever cherished ✨'
];
function buildMemories() {
  const container = document.getElementById('lightgallery');
  if (!container) return;
  photos.forEach((photo, i) => {
    const a = document.createElement('a');
    a.href = imgSrc(photo.src);
    a.className = 'memory-card';
    a.setAttribute('data-sub-html', '<h4>' + photo.caption + '</h4>');
    const img = document.createElement('img');
    img.src = imgSrc(photo.src); img.alt = photo.title; img.loading = 'lazy';
    const cap = document.createElement('div'); cap.className = 'memory-caption'; cap.textContent = mCaptions[i];
    a.appendChild(img); a.appendChild(cap);
    a.addEventListener('click', e => { e.preventDefault(); createHeartShower(a.getBoundingClientRect().left + a.offsetWidth / 2, a.getBoundingClientRect().top, 6); });
    container.appendChild(a);
  });

  // Init LightGallery after populating
  if (typeof lightGallery !== 'undefined') {
    lightGallery(container, { speed: 500, download: false, counter: true });
  } else {
    // Fallback to custom lightbox
    container.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', e => { e.preventDefault(); openLightbox(a.href, a.getAttribute('data-sub-html').replace(/<[^>]+>/g, '')); });
    });
  }
}

// ====== LIGHTBOX (fallback) ======
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCap = document.getElementById('lightbox-caption');
const lbClose = document.getElementById('lightbox-close');
function openLightbox(src, cap) { lbImg.src = src; lbCap.textContent = cap; lightbox.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeLightbox() { lightbox.classList.remove('active'); document.body.style.overflow = ''; setTimeout(() => { lbImg.src = ''; }, 400); }
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ====== LAST SURPRISE ======
document.getElementById('last-surprise-btn').addEventListener('click', function () {
  const r = this.getBoundingClientRect();
  createHeartShower(r.left + r.width / 2, r.top, 20);
  showPopup('Here it comes! 🎉', r.left + r.width / 2, r.top - 20);
  setTimeout(launchCelebration, 600);
});

// ====== CELEBRATION ======
function launchCelebration() {
  document.getElementById('celebration').classList.add('active');
  document.body.style.overflow = 'hidden';
  for (let i = 0; i < 6; i++) setTimeout(spawnConfetti, i * 250);
  spawnButterfly(); spawnButterfly();
}
document.getElementById('close-celebration-btn').addEventListener('click', () => {
  document.getElementById('celebration').classList.remove('active');
  document.body.style.overflow = '';
});
function spawnConfetti() {
  const colors = ['#f472b6', '#c084fc', '#60a5fa', '#34d399', '#fbbf24', '#fb923c', '#a78bfa', '#f9a8d4'];
  const shapes = ['💗', '🌸', '✨', '💫', '🎊', '🎉', '🌷', '⭐', '🎀'];
  for (let i = 0; i < 55; i++) {
    setTimeout(() => {
      const isE = Math.random() > .4;
      const p = document.createElement('div'); p.className = 'confetti-piece';
      if (isE) { p.textContent = shapes[Math.floor(Math.random() * shapes.length)]; p.style.width = 'auto'; p.style.height = 'auto'; p.style.background = 'none'; p.style.fontSize = (Math.random() * 16 + 10) + 'px'; }
      else { p.style.width = '10px'; p.style.height = '14px'; p.style.background = colors[Math.floor(Math.random() * colors.length)]; if (Math.random() > .5) p.style.borderRadius = '50%'; }
      p.style.left = Math.random() * 100 + 'vw';
      const dur = (Math.random() * 2 + 2) + 's';
      p.style.animationDuration = dur; p.style.animationDelay = (Math.random() * .5) + 's';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), parseFloat(dur) * 1000 + 600);
    }, i * 35);
  }
}

// ====== HEART SHOWER ======
const hParticles = ['💗', '💕', '🌸', '✨', '💫', '🌷', '💖', '🌹', '❤️', '🌺'];
function createHeartShower(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div'); el.className = 'sparkle-p';
      el.textContent = hParticles[Math.floor(Math.random() * hParticles.length)];
      el.style.left = (x + (Math.random() - .5) * 60) + 'px'; el.style.top = y + 'px';
      el.style.fontSize = (Math.random() * 12 + 12) + 'px';
      el.style.setProperty('--hy', (-(Math.random() * 150 + 80)) + 'px');
      el.style.setProperty('--hr', (Math.random() - .5) * 360 + 'deg');
      const dur = (Math.random() * .8 + .6) + 's'; el.style.animationDuration = dur;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), parseFloat(dur) * 1000 + 100);
    }, i * 55);
  }
}

// ====== POPUP ======
const pmsgs = [
  '🌸 You’re so pretty!', '💗 This was made with love',
  'Happy Birthday beautiful! 🎂', 'You deserve the world 🌷',
  'Shine bright today ✨', 'Sending you all the love 💕',
  'You make everything better 🌺'
];
let lastP = 0;
function showPopup(msg, x, y) {
  const el = document.createElement('div'); el.className = 'popup-msg'; el.textContent = msg;
  el.style.left = Math.min(Math.max(x - 100, 10), window.innerWidth - 260) + 'px';
  el.style.top = Math.max(y - 60, 10) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}
window.addEventListener('scroll', () => {
  const now = Date.now();
  if (now - lastP > 8000 && Math.random() > .6) { lastP = now; showPopup(pmsgs[Math.floor(Math.random() * pmsgs.length)], Math.random() * (window.innerWidth - 220) + 110, Math.random() * (window.innerHeight - 120) + 60); }
  if (Math.random() > .88) spawnScrollPetals();
}, { passive: true });

// ====== SCROLL PETALS ======
const petals = ['🌸', '🌷', '🌺', '🌹', '💐'];
let lastPetal = 0;
function spawnScrollPetals() {
  const now = Date.now();
  if (now - lastPetal < 600) return; lastPetal = now;
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const el = document.createElement('div'); el.className = 'scroll-petal';
      el.textContent = petals[Math.floor(Math.random() * petals.length)];
      el.style.left = Math.random() * 100 + 'vw'; el.style.top = (Math.random() * 60 + 20) + 'vh';
      el.style.fontSize = (Math.random() * 12 + 10) + 'px';
      el.style.setProperty('--px', (Math.random() - .5) * 60 + 'px');
      const dur = (Math.random() + 1.5) + 's'; el.style.animationDuration = dur;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), parseFloat(dur) * 1000 + 100);
    }, i * 200);
  }
}

// ====== BUTTERFLIES ======
function spawnButterfly() {
  const el = document.createElement('div'); el.className = 'butterfly'; el.textContent = '🦋';
  const sx = Math.random() > .5 ? -50 : window.innerWidth + 50;
  el.style.left = sx + 'px'; el.style.top = (Math.random() * window.innerHeight * .5 + 100) + 'px';
  el.style.setProperty('--bx', (sx > 0 ? -(window.innerWidth + 100) : window.innerWidth + 100) + 'px');
  el.style.setProperty('--by', (Math.random() - .5) * 180 + 'px');
  const dur = (Math.random() * 5 + 8) + 's'; el.style.animationDuration = dur; el.style.animationFillMode = 'forwards';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), parseFloat(dur) * 1000);
}
setTimeout(spawnButterfly, 3000); setTimeout(spawnButterfly, 7000);
setInterval(() => { if (Math.random() > .4) spawnButterfly(); }, 15000);

// ====== SCROLL TO TOP ======
const stBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => { window.scrollY > 400 ? stBtn.classList.add('visible') : stBtn.classList.remove('visible'); }, { passive: true });
stBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// IMG CLICK HEARTS
document.addEventListener('click', e => { if (e.target.tagName === 'IMG') createHeartShower(e.clientX, e.clientY, 6); });

// MOBILE CURSOR
if ('ontouchstart' in window) { cursor.style.display = 'none'; cursorTrail.style.display = 'none'; document.body.style.cursor = 'auto'; }

// ====== BACKGROUND AUDIO (Mobile-friendly) ======
const bgAudio = document.getElementById('bg-audio');
const audioToggle = document.getElementById('audio-toggle');
let isAudioPlaying = false;
let audioStarted = false;

// Fade in volume smoothly
function fadeInAudio() {
  bgAudio.volume = 0;
  let vol = 0;
  const fadeInt = setInterval(() => {
    vol += 0.04;
    if (vol >= 0.6) { bgAudio.volume = 0.6; clearInterval(fadeInt); }
    else { bgAudio.volume = vol; }
  }, 200);
}

// Try to play audio — must be called from within a real user gesture
function tryPlayAudio() {
  if (audioStarted) return;
  audioStarted = true;

  // Remove the hint banner if present
  const hint = document.getElementById('music-hint');
  if (hint) hint.remove();

  bgAudio.volume = 0;
  const playPromise = bgAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isAudioPlaying = true;
      audioToggle.textContent = '🔊';
      audioToggle.classList.remove('muted');
      fadeInAudio();
    }).catch(() => {
      // Still blocked — leave toggle as 🔇, user can tap it manually
      audioStarted = false; // allow retry
      audioToggle.textContent = '🔇';
      audioToggle.classList.add('muted');
    });
  }
}

// Show a subtle "tap for music" hint on mobile
if ('ontouchstart' in window) {
  const hint = document.createElement('div');
  hint.id = 'music-hint';
  hint.textContent = '🎵 Tap anywhere for music';
  hint.style.cssText = 'position:fixed;bottom:70px;left:50%;transform:translateX(-50%);background:rgba(255,133,194,0.9);color:#fff;font-family:sans-serif;font-size:13px;padding:7px 16px;border-radius:20px;z-index:99999;pointer-events:none;animation:spulse 1.5s ease-in-out infinite;white-space:nowrap;box-shadow:0 2px 12px rgba(244,114,182,.4)';
  document.body.appendChild(hint);
  // Auto-remove after 8 seconds even if no interaction
  setTimeout(() => { if (hint.parentNode) hint.remove(); }, 8000);
}

// Listen for first user interaction — works on both mobile & desktop
['touchstart', 'touchend', 'click', 'keydown'].forEach(evt => {
  document.addEventListener(evt, function handler(e) {
    // Don't trigger from audio toggle itself (it has its own handler)
    if (e.target === audioToggle) return;
    tryPlayAudio();
    document.removeEventListener(evt, handler);
  }, { once: true, passive: true });
});

// Audio toggle button — always works regardless of autoplay state
audioToggle.addEventListener('click', (e) => {
  e.stopPropagation();

  if (!audioStarted) {
    // First tap on the button — start audio directly from this gesture
    tryPlayAudio();
    return;
  }

  if (isAudioPlaying) {
    bgAudio.pause();
    isAudioPlaying = false;
    audioToggle.textContent = '🔇';
    audioToggle.classList.add('muted');
  } else {
    bgAudio.play().then(() => {
      isAudioPlaying = true;
      audioToggle.textContent = '🔊';
      audioToggle.classList.remove('muted');
    });
  }
});
