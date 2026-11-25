/* ===================================================
   ROMANTIC CONFESSION INTERACTIVE ENGINE
   - Magnificent Multi-Canopy Love Tree (Cây Tình Yêu Đa Tán)
   - 6 Distinct Lush Heart Canopies with 3D Depth Layering
   - Organic Cherry Tree Trunk, Root Base & Weaving Branches
   - Fairy Lights & Fireflies hovering around the tree
   - Falling Sakura Petals & Breathing Foliage
   - Dynamic Viewport Scroll Anchor for Mobile & Desktop
   - 3D Envelope Opening & Particle Burst
   - Typewriter Confession & 7 Promises
   - Bounded Playful Dodge Button & Heart Fireworks Confetti
   - Web Audio API Romantic Ambient Chords
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const treeCanvas = document.getElementById('treeCanvas');
  const treeCtx = treeCanvas.getContext('2d');
  const confettiCanvas = document.getElementById('confettiCanvas');
  const confettiCtx = confettiCanvas.getContext('2d');

  const envelopeSection = document.getElementById('envelopeSection');
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const envelope = document.getElementById('envelope');

  const mainContent = document.getElementById('mainContent');
  const letterCard = document.getElementById('letterCard');
  const typewriterText = document.getElementById('typewriterText');
  const cursor = document.getElementById('cursor');
  const letterSignatureBox = document.getElementById('letterSignatureBox');
  const letterDate = document.getElementById('letterDate');
  const musicToggle = document.getElementById('musicToggle');
  const bgAudio = document.getElementById('bgAudio');
  const treeSpacer = document.querySelector('.tree-spacer');

  // Set Current Date in Vietnamese
  const today = new Date();
  const dateStr = `Bắc Ninh, Ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`;
  if (letterDate) letterDate.textContent = dateStr;

  // Canvas Dimensions
  let width, height;
  function resizeCanvases() {
    width = treeCanvas.width = confettiCanvas.width = window.innerWidth;
    height = treeCanvas.height = confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvases);
  resizeCanvases();

  /* ===================================================
     1. AUDIO SYSTEM (Supports audio.mp3 + Web Audio fallback)
     =================================================== */
  let audioCtx = null;
  let isPlayingMusic = false;
  let melodyInterval = null;
  let hasCustomMp3 = false;

  function initAudio() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass && !audioCtx) {
        audioCtx = new AudioContextClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    } catch (err) {
      console.warn('AudioContext init error:', err);
    }
  }

  // Attempt playing MP3, fallback to synthesized piano chords if unavailable
  function playMusicTrack() {
    if (bgAudio) {
      bgAudio.volume = 0.85;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          hasCustomMp3 = true;
          isPlayingMusic = true;
          musicToggle.classList.add('playing');
        }).catch(() => {
          // Fallback to Web Audio synthesis
          hasCustomMp3 = false;
          isPlayingMusic = true;
          musicToggle.classList.add('playing');
          startRomanticMelody();
        });
        return;
      }
    }
    // No bgAudio element
    isPlayingMusic = true;
    musicToggle.classList.add('playing');
    startRomanticMelody();
  }

  function pauseMusicTrack() {
    isPlayingMusic = false;
    musicToggle.classList.remove('playing');
    if (bgAudio && !bgAudio.paused) {
      try { bgAudio.pause(); } catch(e){}
    }
    if (melodyInterval) {
      clearInterval(melodyInterval);
      melodyInterval = null;
    }
  }

  // Ensure AudioContext is unlocked on ANY first user interaction (touch/click/key)
  function unlockAudioOnFirstInteraction() {
    initAudio();
    if (bgAudio) {
      bgAudio.load();
    }
    ['click', 'touchstart', 'touchend', 'keydown'].forEach(evt => {
      window.removeEventListener(evt, unlockAudioOnFirstInteraction, true);
    });
  }
  ['click', 'touchstart', 'touchend', 'keydown'].forEach(evt => {
    window.addEventListener(evt, unlockAudioOnFirstInteraction, { capture: true, passive: true });
  });

  function playSoftTone(freq, duration = 1.8, gainLevel = 0.12) {
    initAudio();
    if (!audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'triangle'; // Richer, warmer tone on mobile speakers
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(gainLevel, audioCtx.currentTime + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn(e);
    }
  }

  const romanticMelodyNotes = [
    523.25, 659.25, 783.99, 1046.50, // C5, E5, G5, C6
    440.00, 523.25, 659.25, 880.00,  // A4, C5, E5, A5
    349.23, 440.00, 523.25, 698.46,  // F4, A4, C5, F5
    392.00, 493.88, 587.33, 783.99   // G4, B4, D5, G5
  ];
  let noteIndex = 0;

  function startRomanticMelody() {
    if (melodyInterval) clearInterval(melodyInterval);
    // Play first note immediately
    const firstFreq = romanticMelodyNotes[0];
    playSoftTone(firstFreq, 2.2, 0.16);

    melodyInterval = setInterval(() => {
      if (isPlayingMusic && !hasCustomMp3) {
        const baseFreq = romanticMelodyNotes[noteIndex % romanticMelodyNotes.length];
        playSoftTone(baseFreq, 2.2, 0.16);
        if (noteIndex % 2 === 0) {
          setTimeout(() => {
            if (isPlayingMusic && !hasCustomMp3) playSoftTone(baseFreq * 1.5, 1.8, 0.08);
          }, 350);
        }
        noteIndex++;
      }
    }, 950);
  }

  function toggleMusic(e) {
    if (e) {
      e.stopPropagation();
    }
    initAudio();
    if (isPlayingMusic) {
      pauseMusicTrack();
    } else {
      playMusicTrack();
      playSoftTone(659.25, 1.5, 0.18);
    }
  }

  musicToggle.addEventListener('click', toggleMusic);
  musicToggle.addEventListener('touchstart', toggleMusic, { passive: true });

  /* ===================================================
     2. MAGNIFICENT MULTI-CANOPY LOVE TREE ENGINE
     =================================================== */
  let treeGrowthProgress = 0; // 0 to 1
  let treeState = 'waiting';  // 'waiting', 'growing', 'assembled'

  const heartParticles = [];
  const TOTAL_HEARTS = window.innerWidth < 768 ? 650 : 920;
  const fallingPetals = [];
  const fireflies = [];

  // Heart curve parametric formula
  function getHeartParametric(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x, y };
  }

  // Calculate dynamic tree position: smoothly follows document scroll on mobile!
  function getTreeMetrics() {
    const isDesktop = window.innerWidth >= 992;
    let treeCenterX, treeCenterY, treeScale, rootY;

    if (treeSpacer && !mainContent.classList.contains('hidden')) {
      const rect = treeSpacer.getBoundingClientRect();
      treeCenterX = rect.left + rect.width / 2;
      rootY = rect.bottom;

      if (isDesktop) {
        treeScale = Math.min(rect.width * 0.44, rect.height * 0.5) / 16;
        treeScale = Math.max(7.5, Math.min(treeScale, 11));
        treeCenterY = rect.top + rect.height * 0.46;
      } else {
        // Mobile layout
        treeScale = Math.min(rect.width * 0.62, rect.height * 0.54) / 16;
        treeScale = Math.max(5.2, Math.min(treeScale, 7.8));
        treeCenterY = rect.top + rect.height * 0.4;
      }
    } else {
      treeCenterX = isDesktop ? width * 0.26 : width * 0.5;
      treeCenterY = isDesktop ? height * 0.48 : height * 0.3;
      rootY = isDesktop ? height : height * 0.52;
      treeScale = isDesktop ? 9 : 6.5;
    }

    return { treeCenterX, treeCenterY, treeScale, rootY, isDesktop };
  }

  /* 
     6 DISTINCT LUSH CANOPIES (TÁN LÁ TÌNH YÊU):
     - Cluster 0: Tán đỉnh (Crown Top Heart)
     - Cluster 1: Tán xòe trên bên trái (Upper Left Canopy)
     - Cluster 2: Tán xòe trên bên phải (Upper Right Canopy)
     - Cluster 3: Tán vươn thấp bên trái (Lower Left Cascading Canopy)
     - Cluster 4: Tán vươn thấp bên phải (Lower Right Cascading Canopy)
     - Cluster 5: Tán ôm trung tâm (Heart Core Canopy)
  */
  const canopiesConfig = [
    { id: 0, relX: 0, relY: -10.5, radius: 6.2, weight: 0.22, name: 'crown' },
    { id: 1, relX: -8.0, relY: -5.0, radius: 5.5, weight: 0.18, name: 'upper-left' },
    { id: 2, relX: 8.0, relY: -5.0, radius: 5.5, weight: 0.18, name: 'upper-right' },
    { id: 3, relX: -10.8, relY: 1.8, radius: 4.8, weight: 0.15, name: 'lower-left' },
    { id: 4, relX: 10.8, relY: 1.8, radius: 4.8, weight: 0.15, name: 'lower-right' },
    { id: 5, relX: 0, relY: -0.5, radius: 5.0, weight: 0.12, name: 'center-core' }
  ];

  // Pre-generate target coordinates for the hearts across multiple canopies
  function generateTreeTargets() {
    heartParticles.length = 0;

    // Palette with distinct depth tones
    const backColors = ['#9e1a4d', '#c2185b', '#ad1457', '#880e4f'];
    const midColors = ['#ff4081', '#f50057', '#ff6b8b', '#ff758c', '#ff5252'];
    const frontColors = ['#ff8da1', '#ffb6c1', '#ffa4b6', '#ffffff', '#ffe4e8', '#ffd700'];

    for (let i = 0; i < TOTAL_HEARTS; i++) {
      // Pick a canopy based on weights
      const rand = Math.random();
      let acc = 0;
      let cluster = canopiesConfig[0];
      for (const c of canopiesConfig) {
        acc += c.weight;
        if (rand <= acc) {
          cluster = c;
          break;
        }
      }

      // Generate heart point inside this specific canopy
      const t = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.58);
      const rawPos = getHeartParametric(t);

      // Relative to canopy center
      const localScale = cluster.radius / 16;
      const normX = cluster.relX + (rawPos.x * localScale * r);
      const normY = cluster.relY + (rawPos.y * localScale * r);

      // Layer: 0 = back, 1 = mid, 2 = front
      const layerRand = Math.random();
      let layer = 1;
      let color;
      let size;

      if (layerRand < 0.25) {
        layer = 0; // Back layer
        color = backColors[Math.floor(Math.random() * backColors.length)];
        size = Math.random() * 4 + 4;
      } else if (layerRand < 0.8) {
        layer = 1; // Mid layer
        color = midColors[Math.floor(Math.random() * midColors.length)];
        size = Math.random() * 6 + 6;
      } else {
        layer = 2; // Front highlight layer
        color = frontColors[Math.floor(Math.random() * frontColors.length)];
        size = Math.random() * 8 + 7;
      }

      // Start particles bursting outwards initially
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.max(width, height) * 0.55 + 50;
      const startX = width / 2 + Math.cos(angle) * dist;
      const startY = height / 2 + Math.sin(angle) * dist;

      heartParticles.push({
        currentX: startX,
        currentY: startY,
        normX: normX,
        normY: normY,
        jitterX: (Math.random() - 0.5) * 8,
        jitterY: (Math.random() - 0.5) * 8,
        layer: layer,
        size: size,
        color: color,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.035,
        pulseOffset: Math.random() * Math.PI * 2,
        speedFactor: Math.random() * 0.026 + 0.02,
        settled: false,
        alpha: layer === 0 ? 0.65 : (layer === 1 ? 0.88 : 0.98)
      });
    }

    // Sort hearts so back layer draws first, front layer draws on top
    heartParticles.sort((a, b) => a.layer - b.layer);

    // Initialize Fairy Lights / Fireflies around tree
    fireflies.length = 0;
    const fireflyCount = window.innerWidth < 768 ? 16 : 28;
    for (let f = 0; f < fireflyCount; f++) {
      fireflies.push({
        relX: (Math.random() - 0.5) * 26,
        relY: (Math.random() - 0.5) * 22 - 3,
        size: Math.random() * 2.5 + 1.5,
        speedX: (Math.random() - 0.5) * 0.04,
        speedY: (Math.random() - 0.5) * 0.04,
        pulseSpeed: Math.random() * 3 + 2,
        pulseOffset: Math.random() * Math.PI * 2,
        color: ['#ffd700', '#fff3a8', '#ff8da1', '#7bf1a8', '#ff70a6'][Math.floor(Math.random() * 5)]
      });
    }
  }

  // Draw Heart Shape on Canvas
  function drawHeart(ctx, x, y, size, color, alpha = 1, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(size / 15, size / 15);
    ctx.fillStyle = color;
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -10, -15, 5, 0, 15);
    ctx.bezierCurveTo(15, 5, 10, -10, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /* 
     ORGANIC CHERRY TREE TRUNK & WEAVING BRANCH SKELETON:
     - Root anchors with fallen petal mound.
     - Strong main trunk with organic ancient curve.
     - Primary limbs extending smoothly into each of the 6 canopies.
     - Secondary curved twigs supporting foliage.
  */
  function drawOrganicTreeSkeleton(ctx, progress, metrics) {
    if (progress <= 0) return;

    const { treeCenterX, treeCenterY, treeScale, rootY } = metrics;
    const trunkMainSplitY = treeCenterY + 7 * treeScale;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Rich cherry bark gradient: deep dark burgundy to warm rosewood
    const barkGrad = ctx.createLinearGradient(treeCenterX, rootY, treeCenterX, treeCenterY - 10 * treeScale);
    barkGrad.addColorStop(0, '#1c0712');
    barkGrad.addColorStop(0.35, '#3b1225');
    barkGrad.addColorStop(0.75, '#691e42');
    barkGrad.addColorStop(1, '#942b5c');
    ctx.strokeStyle = barkGrad;

    // 1. Draw Root Mound & Flare at ground
    const moundWidth = treeScale * 8;
    ctx.fillStyle = 'rgba(158, 26, 77, 0.25)';
    ctx.beginPath();
    ctx.ellipse(treeCenterX, rootY, moundWidth, treeScale * 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Draw Main Trunk (With organic root roots)
    const trunkProgress = Math.min(1, progress * 1.4);
    const currentTrunkEndY = rootY - (rootY - trunkMainSplitY) * trunkProgress;

    // Left root flare
    ctx.beginPath();
    ctx.lineWidth = Math.max(6, treeScale * 1.2);
    ctx.moveTo(treeCenterX - treeScale * 1.8, rootY);
    ctx.quadraticCurveTo(treeCenterX - treeScale * 0.8, rootY - treeScale * 2.5, treeCenterX, rootY - treeScale * 4);
    ctx.stroke();

    // Right root flare
    ctx.beginPath();
    ctx.lineWidth = Math.max(6, treeScale * 1.2);
    ctx.moveTo(treeCenterX + treeScale * 1.8, rootY);
    ctx.quadraticCurveTo(treeCenterX + treeScale * 0.8, rootY - treeScale * 2.5, treeCenterX, rootY - treeScale * 4);
    ctx.stroke();

    // Main central trunk
    ctx.beginPath();
    ctx.lineWidth = Math.max(12, treeScale * 2.4);
    ctx.moveTo(treeCenterX, rootY);
    // Sweeping romantic gentle curve
    ctx.quadraticCurveTo(treeCenterX - 12, (rootY + currentTrunkEndY) * 0.52, treeCenterX, currentTrunkEndY);
    ctx.stroke();

    // 3. Draw Limbs reaching towards the 6 canopies
    if (progress > 0.35) {
      const branchProgress = Math.min(1, (progress - 0.35) / 0.65);

      // Dedicated limb for each canopy
      const limbs = [
        // Limb to Cluster 3: Tán vươn thấp bên trái
        {
          from: [treeCenterX, trunkMainSplitY],
          ctrl: [treeCenterX - 5 * treeScale, treeCenterY + 5 * treeScale],
          to: [treeCenterX - 10.5 * treeScale, treeCenterY + 2 * treeScale],
          width: treeScale * 1.1
        },
        // Limb to Cluster 4: Tán vươn thấp bên phải
        {
          from: [treeCenterX, trunkMainSplitY],
          ctrl: [treeCenterX + 5 * treeScale, treeCenterY + 5 * treeScale],
          to: [treeCenterX + 10.5 * treeScale, treeCenterY + 2 * treeScale],
          width: treeScale * 1.1
        },
        // Limb to Cluster 1: Tán xòe trên bên trái
        {
          from: [treeCenterX - 1 * treeScale, trunkMainSplitY - 1 * treeScale],
          ctrl: [treeCenterX - 5 * treeScale, treeCenterY - 1 * treeScale],
          to: [treeCenterX - 8 * treeScale, treeCenterY - 4.8 * treeScale],
          width: treeScale * 1.2
        },
        // Twig of left limb
        {
          from: [treeCenterX - 4.5 * treeScale, treeCenterY - 1 * treeScale],
          ctrl: [treeCenterX - 7 * treeScale, treeCenterY - 1.5 * treeScale],
          to: [treeCenterX - 9 * treeScale, treeCenterY - 3 * treeScale],
          width: treeScale * 0.6
        },
        // Limb to Cluster 2: Tán xòe trên bên phải
        {
          from: [treeCenterX + 1 * treeScale, trunkMainSplitY - 1 * treeScale],
          ctrl: [treeCenterX + 5 * treeScale, treeCenterY - 1 * treeScale],
          to: [treeCenterX + 8 * treeScale, treeCenterY - 4.8 * treeScale],
          width: treeScale * 1.2
        },
        // Twig of right limb
        {
          from: [treeCenterX + 4.5 * treeScale, treeCenterY - 1 * treeScale],
          ctrl: [treeCenterX + 7 * treeScale, treeCenterY - 1.5 * treeScale],
          to: [treeCenterX + 9 * treeScale, treeCenterY - 3 * treeScale],
          width: treeScale * 0.6
        },
        // Limb to Cluster 0 & 5: Tán đỉnh & Tán trung tâm
        {
          from: [treeCenterX, trunkMainSplitY],
          ctrl: [treeCenterX + 0.8 * treeScale, treeCenterY + 2 * treeScale],
          to: [treeCenterX, treeCenterY - 3.5 * treeScale],
          width: treeScale * 1.3
        },
        // Fork up to crown peak
        {
          from: [treeCenterX, treeCenterY - 3.5 * treeScale],
          ctrl: [treeCenterX - 1.5 * treeScale, treeCenterY - 6.5 * treeScale],
          to: [treeCenterX - 2 * treeScale, treeCenterY - 9 * treeScale],
          width: treeScale * 0.8
        },
        {
          from: [treeCenterX, treeCenterY - 3.5 * treeScale],
          ctrl: [treeCenterX + 1.5 * treeScale, treeCenterY - 6.5 * treeScale],
          to: [treeCenterX + 2 * treeScale, treeCenterY - 9 * treeScale],
          width: treeScale * 0.8
        }
      ];

      for (const limb of limbs) {
        ctx.beginPath();
        ctx.lineWidth = limb.width;
        ctx.moveTo(limb.from[0], limb.from[1]);

        const p = branchProgress;
        const currentCtrlX = limb.from[0] + (limb.ctrl[0] - limb.from[0]) * p;
        const currentCtrlY = limb.from[1] + (limb.ctrl[1] - limb.from[1]) * p;
        const currentEndX = limb.from[0] + 2 * (limb.ctrl[0] - limb.from[0]) * p + (limb.to[0] - 2 * limb.ctrl[0] + limb.from[0]) * p * p;
        const currentEndY = limb.from[1] + 2 * (limb.ctrl[1] - limb.from[1]) * p + (limb.to[1] - 2 * limb.ctrl[1] + limb.from[1]) * p * p;

        ctx.quadraticCurveTo(currentCtrlX, currentCtrlY, currentEndX, currentEndY);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // Draw magical fairy lights & fireflies drifting around the tree
  function updateAndDrawFireflies(ctx, t, metrics) {
    if (treeState !== 'assembled') return;

    const { treeCenterX, treeCenterY, treeScale } = metrics;
    ctx.save();

    for (let i = 0; i < fireflies.length; i++) {
      const f = fireflies[i];
      f.relX += f.speedX + Math.sin(t * 1.5 + f.pulseOffset) * 0.05;
      f.relY += f.speedY + Math.cos(t * 1.5 + f.pulseOffset) * 0.05;

      const px = treeCenterX + f.relX * treeScale;
      const py = treeCenterY + f.relY * treeScale;

      const alpha = 0.4 + Math.sin(t * f.pulseSpeed + f.pulseOffset) * 0.35;
      ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
      ctx.fillStyle = f.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = f.color;

      ctx.beginPath();
      ctx.arc(px, py, f.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // Falling sakura petals
  function updateAndDrawFallingPetals(ctx, metrics) {
    const { treeCenterX, treeCenterY, treeScale } = metrics;
    const isMobile = window.innerWidth < 768;

    if (treeState === 'assembled' && Math.random() < (isMobile ? 0.18 : 0.25)) {
      // Pick random canopy to spawn petal from
      const randomCanopy = canopiesConfig[Math.floor(Math.random() * canopiesConfig.length)];
      fallingPetals.push({
        x: treeCenterX + (randomCanopy.relX + (Math.random() - 0.5) * randomCanopy.radius) * treeScale,
        y: treeCenterY + (randomCanopy.relY + (Math.random() - 0.5) * randomCanopy.radius) * treeScale,
        size: Math.random() * (isMobile ? 5 : 6) + 4,
        color: ['#ff8da1', '#ff6b8b', '#ffb6c1', '#ffd1dc', '#ffffff', '#ffd700'][Math.floor(Math.random() * 6)],
        vx: (Math.random() - 0.5) * 1.6 + 0.6,
        vy: Math.random() * 1.4 + 1.1,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        alpha: Math.random() * 0.5 + 0.5
      });
    }

    for (let i = fallingPetals.length - 1; i >= 0; i--) {
      const p = fallingPetals[i];
      p.x += p.vx + Math.sin(p.y * 0.02) * 0.7;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        fallingPetals.splice(i, 1);
        continue;
      }

      drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
    }
  }

  // Twinkling background stars
  const stars = [];
  const starCount = window.innerWidth < 768 ? 70 : 130;
  for (let s = 0; s < starCount; s++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.6 + 0.5,
      baseAlpha: Math.random() * 0.6 + 0.3,
      twinkleSpeed: Math.random() * 2 + 1
    });
  }

  function drawTwinklingStars(ctx, t) {
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      const alpha = star.baseAlpha + Math.sin(t * star.twinkleSpeed) * 0.3;
      ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Main Canvas Render Loop
  let animationTime = 0;
  function renderTreeScene() {
    animationTime += 0.02;
    treeCtx.clearRect(0, 0, width, height);

    // 1. Stars
    drawTwinklingStars(treeCtx, animationTime);

    if (treeState !== 'waiting') {
      const metrics = getTreeMetrics();

      if (treeGrowthProgress < 1) {
        treeGrowthProgress += 0.01;
      }

      // 2. Step 1: Draw Back Layer hearts (Layer 0) first
      for (let i = 0; i < heartParticles.length; i++) {
        const hp = heartParticles[i];
        if (hp.layer !== 0) continue;

        const targetX = metrics.treeCenterX + hp.normX * metrics.treeScale + hp.jitterX;
        const targetY = metrics.treeCenterY + hp.normY * metrics.treeScale + hp.jitterY;

        if (treeGrowthProgress > 0.2) {
          const dx = targetX - hp.currentX;
          const dy = targetY - hp.currentY;
          hp.currentX += dx * hp.speedFactor;
          hp.currentY += dy * hp.speedFactor;
        }

        const pulse = Math.sin(animationTime * 2.2 + hp.pulseOffset) * 1.1;
        drawHeart(treeCtx, hp.currentX, hp.currentY, hp.size + pulse, hp.color, hp.alpha, hp.angle);
      }

      // 3. Step 2: Draw Organic Trunk & Limbs (Weaves in between layers!)
      drawOrganicTreeSkeleton(treeCtx, treeGrowthProgress, metrics);

      // 4. Step 3: Draw Mid & Front Layer hearts (Layer 1 & 2)
      let allSettled = true;
      for (let i = 0; i < heartParticles.length; i++) {
        const hp = heartParticles[i];
        if (hp.layer === 0) continue;

        const targetX = metrics.treeCenterX + hp.normX * metrics.treeScale + hp.jitterX;
        const targetY = metrics.treeCenterY + hp.normY * metrics.treeScale + hp.jitterY;

        if (treeGrowthProgress > 0.2) {
          const dx = targetX - hp.currentX;
          const dy = targetY - hp.currentY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 1.2) {
            hp.currentX += dx * hp.speedFactor;
            hp.currentY += dy * hp.speedFactor;
            allSettled = false;
          } else {
            hp.currentX = targetX;
            hp.currentY = targetY;
            hp.settled = true;
          }
        }

        const pulse = Math.sin(animationTime * 2.2 + hp.pulseOffset) * (hp.layer === 2 ? 1.5 : 1.2);
        const currentSize = hp.size + (hp.settled ? pulse : 0);
        hp.angle += hp.rotationSpeed;

        drawHeart(
          treeCtx,
          hp.currentX,
          hp.currentY,
          currentSize,
          hp.color,
          hp.alpha,
          hp.angle
        );
      }

      if (allSettled && treeGrowthProgress >= 1) {
        treeState = 'assembled';
      }

      // 5. Magical Fairy Lights & Fireflies
      updateAndDrawFireflies(treeCtx, animationTime, metrics);

      // 6. Falling sakura petals
      updateAndDrawFallingPetals(treeCtx, metrics);
    }

    requestAnimationFrame(renderTreeScene);
  }

  // Start Canvas Loop
  generateTreeTargets();
  renderTreeScene();

  /* ===================================================
     3. ENVELOPE OPENING & TRANSITION TO LOVE TREE
     =================================================== */
  let envelopeOpened = false;
  function openEnvelope(e) {
    if (envelopeOpened) return;
    envelopeOpened = true;
    if (e && e.cancelable) e.preventDefault();

    // Ensure audio playback starts
    initAudio();
    if (!isPlayingMusic) {
      playMusicTrack();
    }

    // Play sparkling chime chord
    playSoftTone(523.25, 1.2, 0.12);
    setTimeout(() => playSoftTone(659.25, 1.2, 0.12), 150);
    setTimeout(() => playSoftTone(783.99, 1.5, 0.15), 300);
    setTimeout(() => playSoftTone(1046.50, 2.0, 0.18), 450);

    envelope.classList.add('open');
    spawnEnvelopeHearts();

    setTimeout(() => {
      envelopeSection.classList.add('fade-out');

      setTimeout(() => {
        envelopeSection.style.display = 'none';
        mainContent.classList.remove('hidden');

        treeState = 'growing';
        generateTreeTargets();
        startTypewriter();
      }, 700);
    }, 1200);
  }

  envelopeWrapper.addEventListener('click', openEnvelope);
  envelopeWrapper.addEventListener('touchend', openEnvelope, { passive: false });

  function spawnEnvelopeHearts() {
    const rect = envelopeWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 30; i++) {
      const span = document.createElement('span');
      span.innerHTML = ['❤️', '💖', '💕', '✨', '🌸'][Math.floor(Math.random() * 5)];
      span.style.position = 'fixed';
      span.style.left = `${centerX}px`;
      span.style.top = `${centerY}px`;
      span.style.fontSize = `${Math.random() * 16 + 14}px`;
      span.style.pointerEvents = 'none';
      span.style.zIndex = '999';
      span.style.transition = `all ${Math.random() * 1.5 + 1}s cubic-bezier(0.25, 1, 0.5, 1)`;

      document.body.appendChild(span);

      const angle = (Math.random() * Math.PI) + Math.PI;
      const dist = Math.random() * 180 + 70;
      const targetX = centerX + Math.cos(angle) * dist;
      const targetY = centerY + Math.sin(angle) * dist;

      requestAnimationFrame(() => {
        span.style.transform = `translate(${targetX - centerX}px, ${targetY - centerY}px) scale(${Math.random() * 0.8 + 0.6})`;
        span.style.opacity = '0';
      });

      setTimeout(() => span.remove(), 2500);
    }
  }

  /* ===================================================
     4. TYPEWRITER EFFECT (ONE COMPLETE ROMANTIC LETTER)
     =================================================== */
  const loveLetterText =
    `Gửi Hương à...\n\n` +
    `Người ta thường bảo thế giới này rộng lớn vô cùng, với hơn tám tỷ người và muôn vạn ngã rẽ cuộc đời. Nhưng anh không muốn chúng ta chỉ là hai người vô tình lướt qua nhau, hay chỉ tình cờ chạm mặt rồi thôi. Kể từ giây phút nhìn thấy nụ cười của em, anh nhận ra trái tim mình đã không còn thuộc về sự tình cờ nào nữa, mà là một sự lựa chọn nghiêm túc và tha thiết nhất.\n\n` +
    `Anh biết trong cuộc đời này, ai cũng từng đi qua những tháng ngày đổ vỡ, ai cũng mang trong mình những ký ức, những vết thương và một quá khứ không trọn vẹn. Bản thân anh cũng vậy, và em cũng vậy. Nhưng quá khứ là để khép lại, anh không đến để gợi lại những đau buồn cũ, mà anh muốn là người đến để xoa dịu những tổn thương, ôm lấy những yếu mềm trong lòng em, cùng em vun đắp một tương lai ngập tràn bình yên và tiếng cười.\n\n` +
    `Anh biết bản thân mình không hoàn hảo, nhiều lúc còn vụng về, hậu đậu, chưa đủ tinh tế và cũng chẳng có ngoại hình nổi bật. Nhưng anh có một trái tim chân thành, nguyên vẹn và duy nhất dành trọn cho em. Thật lòng mà nói, ngày nào trôi qua anh cũng vậy, tâm trí anh đều ngập tràn hình bóng của em — nghĩ đến nụ cười rạng rỡ của em, nghĩ đến từng thanh âm giọng nói dịu dàng của em, và nhớ tất cả những điều nhỏ bé thuộc về em.\n\n` +
    `Điều anh chắc chắn nhất là trái tim này thật lòng khao khát có được em. Anh không chỉ muốn đi cạnh em những ngày thanh xuân rực rỡ, mà ước mơ lớn nhất đời anh là một ngày nào đó, tên của hai ta sẽ được viết chung trên một tờ giấy kết hôn.\n\n` +
    `Anh muốn những bộ quần áo của hai đứa sau này phơi cạnh nhau trên cùng một dây phơi, muốn mỗi bữa cơm chiều hai ta cùng ngồi ăn chung một mâm, ríu rít kể nhau nghe những chuyện buồn vui vụn vặt. Và sau những ngày dài mỏi mệt ngoài kia, ta sẽ được trở về chung một mái ấm, nằm chung một chiếc giường, được ôm em vào lòng ru em ngủ mỗi đêm và thức dậy thấy nụ cười của em mỗi sớm mai.\n\n` +
    `Anh không vội vàng đâu, anh chỉ muốn giãi bày hết những suy nghĩ thật sự từ tận đáy lòng mình. Nếu người đó là em, thì có phải đợi bao lâu anh vẫn sẽ kiên nhẫn đợi. Đợi em sẵn sàng mở lòng, đợi em tin tưởng và chấp nhận anh, chấp nhận sự hiện diện thực sự của anh bằng da bằng thịt trong cuộc sống của em — chứ không phải chỉ là một người con trai chỉ biết nói lời thương, lời yêu qua những dòng tin nhắn này.\n\n` +
    `Anh không hứa đường đời lúc nào cũng trải đầy hoa hồng, nhưng anh hứa dẫu phong ba bão táp, anh sẽ luôn là người đứng trước che chở và chưa từng một lần nghĩ đến việc buông tay em. Anh muốn tìm hiểu em thật sâu, chăm sóc em thật nhiều và cùng em đi đến trọn vẹn kiếp này...`;

  let charIndex = 0;
  function startTypewriter() {
    typewriterText.textContent = '';
    charIndex = 0;

    function typeNextChar() {
      if (charIndex < loveLetterText.length) {
        const char = loveLetterText.charAt(charIndex);
        typewriterText.textContent += char;
        charIndex++;

        // Spawn a subtle floating heart sparkle at cursor
        if (charIndex % 25 === 0 || char === '!' || char === '—') {
          spawnCursorHeart();
        }

        // Natural, comfortable reading pacing
        let delay = 65;
        if (char === '\n') {
          delay = 650;
        } else if (char === '.' || char === '!' || char === '?') {
          delay = 500;
        } else if (char === ',' || char === '—' || char === ':') {
          delay = 300;
        } else {
          delay = Math.random() * 20 + 55; // ~55-75ms per character
        }

        // Auto scroll smoothly to keep cursor in view while typing
        if (cursor) {
          const rect = cursor.getBoundingClientRect();
          if (rect.bottom > window.innerHeight - 100) {
            window.scrollBy({
              top: rect.bottom - (window.innerHeight - 120),
              behavior: 'smooth'
            });
          }
        }

        setTimeout(typeNextChar, delay);
      } else {
        cursor.style.display = 'none';

        // Prose finished -> Reveal signature & launch celebration fireworks!
        setTimeout(() => {
          if (letterSignatureBox) {
            letterSignatureBox.classList.remove('hidden');
            letterSignatureBox.classList.add('show');
            // Ensure signature is visible
            letterSignatureBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
          launchGrandConfetti();
        }, 800);
      }
    }

    setTimeout(typeNextChar, 800);
  }

  // Floating heart sparkle from typewriter cursor
  function spawnCursorHeart() {
    if (!cursor) return;
    const rect = cursor.getBoundingClientRect();
    const span = document.createElement('span');
    span.innerHTML = ['💖', '✨', '🌸', '💕'][Math.floor(Math.random() * 4)];
    span.style.position = 'fixed';
    span.style.left = `${rect.left}px`;
    span.style.top = `${rect.top}px`;
    span.style.fontSize = '14px';
    span.style.pointerEvents = 'none';
    span.style.zIndex = '999';
    span.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
    document.body.appendChild(span);

    requestAnimationFrame(() => {
      span.style.transform = `translate(${(Math.random() - 0.5) * 35}px, -45px) scale(1.2)`;
      span.style.opacity = '0';
    });

    setTimeout(() => span.remove(), 1200);
  }

  /* ===================================================
     5. GRAND HEART FIREWORKS CONFETTI
     =================================================== */
  const confettiParticles = [];
  function launchGrandConfetti() {
    const colors = ['#ff4b72', '#ff758c', '#ffd700', '#ff0055', '#ff9cb3', '#ffffff', '#00e5ff'];
    const count = window.innerWidth < 768 ? 120 : 180;

    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: width / 2,
        y: height * 0.65,
        vx: (Math.random() - 0.5) * (window.innerWidth < 768 ? 14 : 18),
        vy: (Math.random() - 0.9) * (window.innerWidth < 768 ? 18 : 22),
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        isHeart: Math.random() > 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        alpha: 1,
        gravity: 0.38
      });
    }

    renderConfetti();
  }

  function renderConfetti() {
    confettiCtx.clearRect(0, 0, width, height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.alpha -= 0.006;

      if (p.alpha <= 0 || p.y > height + 40) {
        confettiParticles.splice(i, 1);
        continue;
      }

      if (p.isHeart) {
        drawHeart(confettiCtx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
      } else {
        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate(p.rotation);
        confettiCtx.fillStyle = p.color;
        confettiCtx.globalAlpha = p.alpha;
        confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        confettiCtx.restore();
      }
    }

    if (confettiParticles.length > 0) {
      requestAnimationFrame(renderConfetti);
    }
  }

  // Floating heart on tap/click
  window.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('.envelope-wrapper')) return;

    const span = document.createElement('span');
    span.innerHTML = ['❤️', '💖', '💕', '💗', '✨'][Math.floor(Math.random() * 5)];
    span.style.position = 'fixed';
    span.style.left = `${e.clientX - 10}px`;
    span.style.top = `${e.clientY - 10}px`;
    span.style.fontSize = `${Math.random() * 14 + 16}px`;
    span.style.pointerEvents = 'none';
    span.style.zIndex = '999';
    span.style.transition = 'all 1.4s ease-out';
    document.body.appendChild(span);

    requestAnimationFrame(() => {
      span.style.transform = `translate(${(Math.random() - 0.5) * 50}px, -90px) scale(1.3)`;
      span.style.opacity = '0';
    });

    setTimeout(() => span.remove(), 1400);
  });
});
