/* ==========================================================================
   1. INJEÇÃO DINÂMICA DE FONTES E ESTILOS CSS (100% JS)
   ========================================================================== */
(function injectStyles() {
    // Importar fontes do Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;700&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.textContent = `
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
        }

        body, html {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #020106;
            font-family: 'Orbitron', sans-serif;
            color: #ffffff;
        }

        #game-container {
            position: relative;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: radial-gradient(circle at center, #0f0a1c 0%, #020106 100%);
        }

        canvas {
            display: block;
            box-shadow: 0 0 60px rgba(255, 0, 85, 0.3);
            border-left: 2px solid rgba(0, 243, 255, 0.4);
            border-right: 2px solid rgba(0, 243, 255, 0.4);
            background: #030308;
        }

        .ui-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px;
            z-index: 10;
        }

        .hud-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            pointer-events: auto;
        }

        .hud-card {
            background: rgba(6, 6, 20, 0.88);
            border: 1px solid rgba(0, 243, 255, 0.4);
            border-radius: 8px;
            padding: 12px 18px;
            box-shadow: 0 0 20px rgba(0, 243, 255, 0.15);
            backdrop-filter: blur(8px);
        }

        .bar-container {
            width: 180px;
            height: 12px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.2);
            margin-top: 4px;
        }

        .bar-fill {
            height: 100%;
            width: 100%;
            transition: width 0.1s linear;
        }

        #hp-fill { background: linear-gradient(90deg, #ff0055, #ff5500); }
        #shield-fill { background: linear-gradient(90deg, #00f3ff, #0066ff); }

        .hud-label {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.5px;
            color: #8a8ab0;
            text-transform: uppercase;
        }

        .hud-value {
            font-size: 22px;
            font-weight: 900;
            color: #00f3ff;
            text-shadow: 0 0 10px rgba(0, 243, 255, 0.6);
        }

        #boss-hud {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 85%;
            max-width: 500px;
            background: rgba(30, 0, 15, 0.92);
            border: 2px solid #ff0055;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 0 35px rgba(255, 0, 85, 0.7);
            text-align: center;
            display: none;
            z-index: 12;
            animation: bossPulse 0.8s infinite alternate;
        }

        @keyframes bossPulse {
            0% { border-color: #ff0055; box-shadow: 0 0 20px rgba(255, 0, 85, 0.5); }
            100% { border-color: #ff0033; box-shadow: 0 0 40px rgba(255, 0, 0, 0.9); }
        }

        #boss-hp-fill {
            height: 10px;
            background: linear-gradient(90deg, #ff0055, #ff00cc);
            width: 100%;
            border-radius: 5px;
            transition: width 0.1s linear;
        }

        #powerup-badges {
            display: flex;
            gap: 6px;
            margin-top: 8px;
            flex-wrap: wrap;
        }

        .badge {
            font-size: 9px;
            font-weight: 900;
            padding: 3px 6px;
            border-radius: 4px;
            background: rgba(0, 243, 255, 0.2);
            border: 1px solid #00f3ff;
            color: #fff;
            animation: pulseBadge 0.8s infinite alternate;
        }

        @keyframes pulseBadge {
            0% { opacity: 0.7; }
            100% { opacity: 1; box-shadow: 0 0 10px #00f3ff; }
        }

        .screen-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(3, 3, 10, 0.95);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 20;
            backdrop-filter: blur(10px);
            padding: 20px;
            text-align: center;
        }

        .game-title {
            font-size: clamp(28px, 5.5vw, 56px);
            font-weight: 900;
            font-family: 'Orbitron', sans-serif;
            background: linear-gradient(135deg, #00f3ff, #ff0055);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(0, 243, 255, 0.5);
            margin-bottom: 4px;
            letter-spacing: 2px;
        }

        .game-subtitle {
            font-family: 'Rajdhani', sans-serif;
            font-size: clamp(14px, 2.2vw, 22px);
            color: #ff0055;
            letter-spacing: 5px;
            text-transform: uppercase;
            margin-bottom: 25px;
            text-shadow: 0 0 12px rgba(255, 0, 85, 0.8);
            font-weight: 700;
        }

        .btn-neon {
            background: linear-gradient(135deg, #ff0055, #ff5500);
            border: none;
            color: #ffffff;
            font-family: 'Orbitron', sans-serif;
            font-size: 18px;
            font-weight: 900;
            padding: 18px 48px;
            border-radius: 30px;
            cursor: pointer;
            box-shadow: 0 0 25px rgba(255, 0, 85, 0.6);
            transition: all 0.2s ease;
            letter-spacing: 2px;
            pointer-events: auto;
            margin: 10px;
        }

        .btn-neon:hover {
            transform: scale(1.06);
            box-shadow: 0 0 40px rgba(255, 0, 85, 0.9);
            background: linear-gradient(135deg, #ff0077, #ff3300);
        }

        .controls-panel {
            background: rgba(12, 12, 30, 0.85);
            border: 1px solid rgba(255, 0, 85, 0.4);
            border-radius: 12px;
            padding: 20px;
            max-width: 480px;
            width: 90%;
            margin-top: 20px;
            text-align: left;
            box-shadow: 0 0 20px rgba(255, 0, 85, 0.15);
        }

        .controls-panel h3 {
            font-size: 13px;
            color: #ff0055;
            margin-bottom: 12px;
            border-bottom: 1px solid rgba(255, 0, 85, 0.3);
            padding-bottom: 6px;
            letter-spacing: 1px;
        }

        .control-row {
            display: flex;
            justify-content: space-between;
            font-family: 'Rajdhani', sans-serif;
            font-size: 16px;
            margin-bottom: 8px;
            color: #cbd5e1;
        }

        .key-badge {
            background: rgba(255, 255, 255, 0.12);
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 2px 8px;
            border-radius: 4px;
            color: #00f3ff;
            font-weight: 700;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            width: 100%;
            max-width: 440px;
            margin: 25px 0;
        }

        .stat-card {
            background: rgba(18, 18, 40, 0.85);
            border: 1px solid rgba(255, 0, 85, 0.4);
            border-radius: 8px;
            padding: 12px;
            text-align: center;
        }

        .stat-card .value {
            font-size: 24px;
            font-weight: 900;
            color: #ff0055;
            text-shadow: 0 0 12px rgba(255, 0, 85, 0.6);
            margin-top: 4px;
        }

        #sound-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(10, 10, 25, 0.85);
            border: 1px solid #00f3ff;
            color: #00f3ff;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 18px;
            z-index: 30;
            pointer-events: auto;
        }

        #touch-controls {
            position: absolute;
            bottom: 20px;
            left: 0;
            width: 100%;
            display: none;
            justify-content: space-around;
            padding: 0 20px;
            pointer-events: auto;
            z-index: 15;
        }

        .touch-btn {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            background: rgba(0, 243, 255, 0.2);
            border: 2px solid #00f3ff;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            font-weight: 900;
            touch-action: manipulation;
        }

        @media (max-width: 768px) {
            #touch-controls { display: flex; }
            .bar-container { width: 110px; }
            .hud-value { font-size: 17px; }
        }
    `;
    document.head.appendChild(style);
})();

/* ==========================================================================
   2. INJEÇÃO DINÂMICA DE ELEMENTOS HTML DA INTERFACE (100% JS)
   ========================================================================== */
function initGameDOM() {
    if (document.getElementById('game-container')) return;

    const container = document.createElement('div');
    container.id = 'game-container';

    const canvas = document.createElement('canvas');
    canvas.id = 'gameCanvas';
    container.appendChild(canvas);

    const soundBtn = document.createElement('button');
    soundBtn.id = 'sound-toggle';
    soundBtn.title = 'Alternar Som';
    soundBtn.innerText = '🔊';
    container.appendChild(soundBtn);

    // Overlay do HUD
    const hudLayer = document.createElement('div');
    hudLayer.className = 'ui-layer';
    hudLayer.id = 'hud-layer';
    hudLayer.innerHTML = `
        <div class="hud-top">
            <div class="hud-card">
                <div class="hud-label">SISTEMA VITAL</div>
                <div class="bar-container"><div class="bar-fill" id="hp-fill"></div></div>
                <div class="hud-label" style="margin-top: 6px;">ESCUDO DEFENSIVO</div>
                <div class="bar-container"><div class="bar-fill" id="shield-fill"></div></div>
                <div id="powerup-badges"></div>
            </div>
            <div class="hud-card" style="text-align: center;">
                <div class="hud-label">ONDA ATUAL</div>
                <div class="hud-value" id="wave-display" style="font-size: 28px; color: #ffe600;">1</div>
                <div class="hud-label" style="margin-top: 4px;">COMBO DE ABATES</div>
                <div id="combo-display" style="font-size: 16px; font-weight: 900; color: #ff0055;">x1.0</div>
            </div>
            <div class="hud-card" style="text-align: right;">
                <div class="hud-label">PONTUAÇÃO</div>
                <div class="hud-value" id="score-display">000000</div>
                <div class="hud-label" style="margin-top: 6px;">BOMBAS EMP</div>
                <div class="hud-value" id="emp-display" style="color: #ff00cc;">💣 x2</div>
            </div>
        </div>
        <div id="boss-hud">
            <div class="hud-label" id="boss-name" style="color: #ff0055; font-size: 13px; margin-bottom: 4px; letter-spacing: 2px;">⚡ ALERTA: CHEFÃO NEON INVASOR ⚡</div>
            <div class="bar-container" style="width: 100%; height: 10px;"><div id="boss-hp-fill"></div></div>
        </div>
    `;
    container.appendChild(hudLayer);

    // Menu Principal
    const mainMenu = document.createElement('div');
    mainMenu.className = 'screen-overlay';
    mainMenu.id = 'main-menu';
    mainMenu.innerHTML = `
        <div class="game-title">NEON CYBER STRIKE</div>
        <div class="game-subtitle">PESADELO ULTRA</div>
        <button class="btn-neon" id="start-btn">INICIAR MISSÃO</button>
        <div class="controls-panel">
            <h3>CONTROLES DE PILOTAGEM DE ELITE</h3>
            <div class="control-row"><span>Movimentar Nave:</span><span class="key-badge">WASD / Setas</span></div>
            <div class="control-row"><span>Disparo Automático:</span><span class="key-badge">Espaço / Clique</span></div>
            <div class="control-row"><span>Bomba EMP Devastadora:</span><span class="key-badge">E / Shift</span></div>
            <div class="control-row"><span>Pausar Simulação:</span><span class="key-badge">P / ESC</span></div>
        </div>
    `;
    container.appendChild(mainMenu);

    // Menu Game Over
    const gameOverMenu = document.createElement('div');
    gameOverMenu.className = 'screen-overlay';
    gameOverMenu.id = 'gameover-menu';
    gameOverMenu.style.display = 'none';
    gameOverMenu.innerHTML = `
        <div class="game-title" style="background: linear-gradient(135deg, #ff0055, #ff5500); -webkit-background-clip: text;">SISTEMA DESTRUÍDO</div>
        <div class="game-subtitle">NAVE DESTRUÍDA EM COMBATE</div>
        <div class="stats-grid">
            <div class="stat-card"><div class="hud-label">PONTUAÇÃO TOTAL</div><div class="value" id="final-score">0</div></div>
            <div class="stat-card"><div class="hud-label">ONDAS SOBREVIVIDAS</div><div class="value" id="final-wave" style="color: #ffe600;">0</div></div>
            <div class="stat-card"><div class="hud-label">INIMIGOS ABATIDOS</div><div class="value" id="final-kills" style="color: #00f3ff;">0</div></div>
            <div class="stat-card"><div class="hud-label">MAIOR COMBO</div><div class="value" id="final-combo" style="color: #ff00cc;">x1.0</div></div>
        </div>
        <button class="btn-neon" id="restart-btn">NOVA TENTATIVA</button>
    `;
    container.appendChild(gameOverMenu);

    // Menu Pausa
    const pauseMenu = document.createElement('div');
    pauseMenu.className = 'screen-overlay';
    pauseMenu.id = 'pause-menu';
    pauseMenu.style.display = 'none';
    pauseMenu.innerHTML = `
        <div class="game-title">SIMULAÇÃO PAUSADA</div>
        <div class="game-subtitle" style="color: #00f3ff;">SISTEMAS EM ESPERA</div>
        <button class="btn-neon" id="resume-btn" style="background: linear-gradient(135deg, #00f3ff, #0066ff);">CONTINUAR SIMULAÇÃO</button>
    `;
    container.appendChild(pauseMenu);

    // Controles Virtuais Touch
    const touchControls = document.createElement('div');
    touchControls.id = 'touch-controls';
    touchControls.innerHTML = `
        <div class="touch-btn" id="btn-emp-touch">💣</div>
        <div class="touch-btn" id="btn-fire-touch" style="background: rgba(255,0,85,0.3); border-color: #ff0055;">🔥</div>
    `;
    container.appendChild(touchControls);

    document.body.appendChild(container);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGameDOM);
} else {
    initGameDOM();
}

/* ==========================================================================
   3. SINTETIZADOR DE ÁUDIO PROCEDURAL WEB AUDIO API
   ========================================================================== */
class AudioEngine {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    playLaser() {
        if (this.muted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(850, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
    }

    playExplosion(isBoss = false) {
        if (this.muted || !this.ctx) return;
        const duration = isBoss ? 0.9 : 0.35;
        const now = this.ctx.currentTime;

        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(isBoss ? 350 : 800, now);
        filter.frequency.exponentialRampToValueAtTime(20, now + duration);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(isBoss ? 0.55 : 0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        whiteNoise.start(now);
    }

    playPowerup() {
        if (this.muted || !this.ctx) return;
        const now = this.ctx.currentTime;
        [450, 650, 950, 1300].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.04);
            gain.gain.setValueAtTime(0.1, now + idx * 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.09);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.04);
            osc.stop(now + idx * 0.04 + 0.09);
        });
    }

    playEMP() {
        if (this.muted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(20, now + 0.75);
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.75);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.75);
    }

    playBossWarning() {
        if (this.muted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.linearRampToValueAtTime(260, now + 0.25);
        osc.frequency.linearRampToValueAtTime(130, now + 0.5);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
    }
}

const audio = new AudioEngine();

/* ==========================================================================
   4. CONFIGURAÇÃO DE CANVAS E PREVENÇÃO TOTAL DE BUGS DE MOVIMENTO
   ========================================================================== */
let canvas, ctx;

function setupCanvas() {
    canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = Math.min(800, window.innerWidth);
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

const keys = {};

function resetAllInputKeys() {
    for (let k in keys) {
        keys[k] = false;
    }
}

window.addEventListener('keydown', (e) => {
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyE', 'ShiftLeft', 'ShiftRight', 'KeyP', 'Escape'].includes(e.code)) {
        e.preventDefault();
    }
    keys[e.code] = true;

    if (e.code === 'KeyP' || e.code === 'Escape') {
        togglePause();
    }
});

window.addEventListener('keyup', (e) => {
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyE', 'ShiftLeft', 'ShiftRight'].includes(e.code)) {
        e.preventDefault();
    }
    keys[e.code] = false;
});

// Eventos adicionais para zerar teclas e prevenir movimento indesejado
window.addEventListener('blur', resetAllInputKeys);
window.addEventListener('focus', resetAllInputKeys);
window.addEventListener('pointerup', resetAllInputKeys);
document.addEventListener('visibilitychange', resetAllInputKeys);

// Suporte Mouse e Touch
let isTouching = false;

function bindInputEvents() {
    if (!canvas) return;
    canvas.addEventListener('mousemove', (e) => {
        if (gameState === 'PLAYING') {
            const rect = canvas.getBoundingClientRect();
            player.x = e.clientX - rect.left;
            player.y = e.clientY - rect.top;
        }
    });

    canvas.addEventListener('mousedown', () => { if (gameState === 'PLAYING') keys['Space'] = true; });
    canvas.addEventListener('mouseup', () => { if (gameState === 'PLAYING') keys['Space'] = false; });

    canvas.addEventListener('touchstart', (e) => {
        if (gameState === 'PLAYING') {
            isTouching = true;
            const rect = canvas.getBoundingClientRect();
            player.x = e.touches[0].clientX - rect.left;
            player.y = e.touches[0].clientY - rect.top;
            keys['Space'] = true;
        }
    });

    canvas.addEventListener('touchmove', (e) => {
        if (gameState === 'PLAYING' && isTouching) {
            const rect = canvas.getBoundingClientRect();
            player.x = e.touches[0].clientX - rect.left;
            player.y = e.touches[0].clientY - rect.top;
        }
    });

    canvas.addEventListener('touchend', () => { isTouching = false; keys['Space'] = false; });
}

/* ==========================================================================
   5. ALGORITMO DE CORES ÚNICAS POR INIMIGO ATIVO
   ========================================================================== */
class UniqueColorManager {
    static updateEnemyColors(enemiesList) {
        const total = enemiesList.length;
        if (total === 0) return;

        const timeShift = (performance.now() * 0.04) % 360;
        const step = 360 / Math.max(total, 1);

        enemiesList.forEach((enemy, index) => {
            if (enemy.isBoss) {
                enemy.hue = (timeShift + 320) % 360;
                enemy.color = `hsl(${enemy.hue}, 100%, 55%)`;
            } else {
                const enemyHue = Math.floor((index * step + timeShift) % 360);
                enemy.hue = enemyHue;
                enemy.color = `hsl(${enemyHue}, 100%, 60%)`;
            }
        });
    }
}

/* ==========================================================================
   6. CENÁRIO SYNTHWAVE & RETROGRID
   ========================================================================== */
class StarfieldAndGrid {
    constructor() {
        this.stars = [];
        const w = canvas ? canvas.width : window.innerWidth;
        const h = canvas ? canvas.height : window.innerHeight;
        for (let i = 0; i < 120; i++) {
            this.stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 5 + 1.5,
                alpha: Math.random()
            });
        }
        this.gridOffset = 0;
    }

    update() {
        if (!canvas) return;
        this.stars.forEach(s => {
            s.y += s.speed;
            if (s.y > canvas.height) {
                s.y = 0;
                s.x = Math.random() * canvas.width;
            }
        });
        this.gridOffset = (this.gridOffset + 3) % 40;
    }

    draw() {
        if (!ctx || !canvas) return;
        ctx.save();
        this.stars.forEach(s => {
            ctx.fillStyle = `rgba(0, 243, 255, ${s.alpha})`;
            ctx.fillRect(s.x, s.y, s.size, s.size);
        });

        ctx.strokeStyle = 'rgba(255, 0, 85, 0.12)';
        ctx.lineWidth = 1;

        for (let x = 0; x <= canvas.width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        for (let y = this.gridOffset; y <= canvas.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        ctx.restore();
    }
}

/* ==========================================================================
   7. JOGADOR ULTRA PESADELO
   ========================================================================== */
class Player {
    constructor() {
        this.width = 36;
        this.height = 40;
        this.x = (canvas ? canvas.width : 400) / 2;
        this.y = (canvas ? canvas.height : 600) - 100;
        this.speed = 7.5;

        this.maxHp = 100;
        this.hp = 100;
        this.maxShield = 50;
        this.shield = 50;
        this.emps = 2;

        this.lastShotTime = 0;
        this.shootCooldown = 90;

        this.powerups = {
            tripleShot: 0,
            laserBeam: 0,
            speedBoost: 0,
            shieldBuff: 0
        };
    }

    reset() {
        if (canvas) {
            this.x = canvas.width / 2;
            this.y = canvas.height - 100;
        }
        this.hp = this.maxHp;
        this.shield = this.maxShield;
        this.emps = 2;
        this.powerups = { tripleShot: 0, laserBeam: 0, speedBoost: 0, shieldBuff: 0 };
    }

    update(deltaTime) {
        for (let key in this.powerups) {
            if (this.powerups[key] > 0) {
                this.powerups[key] -= deltaTime;
                if (this.powerups[key] < 0) this.powerups[key] = 0;
            }
        }

        let currentSpeed = this.speed * (this.powerups.speedBoost > 0 ? 1.35 : 1.0);

        if (keys['KeyW'] || keys['ArrowUp']) this.y -= currentSpeed;
        if (keys['KeyS'] || keys['ArrowDown']) this.y += currentSpeed;
        if (keys['KeyA'] || keys['ArrowLeft']) this.x -= currentSpeed;
        if (keys['KeyD'] || keys['ArrowRight']) this.x += currentSpeed;

        if (canvas) {
            this.x = Math.max(this.width / 2, Math.min(canvas.width - this.width / 2, this.x));
            this.y = Math.max(this.height / 2, Math.min(canvas.height - this.height / 2, this.y));
        }

        if (keys['Space']) this.shoot();

        if ((keys['KeyE'] || keys['ShiftLeft'] || keys['ShiftRight']) && this.emps > 0) {
            this.triggerEMP();
            keys['KeyE'] = false;
            keys['ShiftLeft'] = false;
            keys['ShiftRight'] = false;
        }
    }

    shoot() {
        const now = Date.now();
        if (now - this.lastShotTime < this.shootCooldown) return;
        this.lastShotTime = now;

        audio.playLaser();

        if (this.powerups.laserBeam > 0) {
            playerBullets.push(new Bullet(this.x, this.y - 20, 0, -22, '#ff0055', true, 10));
        } else if (this.powerups.tripleShot > 0) {
            playerBullets.push(new Bullet(this.x, this.y - 15, 0, -18, '#00f3ff'));
            playerBullets.push(new Bullet(this.x - 14, this.y - 10, -4, -17, '#00f3ff'));
            playerBullets.push(new Bullet(this.x + 14, this.y - 10, 4, -17, '#00f3ff'));
        } else {
            playerBullets.push(new Bullet(this.x - 12, this.y - 10, 0, -18, '#00f3ff'));
            playerBullets.push(new Bullet(this.x + 12, this.y - 10, 0, -18, '#00f3ff'));
        }

        particles.push(new Particle(this.x, this.y + 18, (Math.random() - 0.5) * 2, Math.random() * 4 + 2, '#00f3ff', 10));
    }

    triggerEMP() {
        this.emps--;
        audio.playEMP();
        createScreenShake(24);

        empEffects.push(new EMPEffect(this.x, this.y));
        enemyBullets.length = 0;
        homingMissiles.length = 0;

        enemies.forEach(enemy => { enemy.takeDamage(250); });
        addFloatingText(this.x, this.y - 30, "ONDA EMP DESLECHADA!", "#ff0055");
    }

    takeDamage(amount) {
        createScreenShake(15);
        if (this.powerups.shieldBuff > 0) amount *= 0.3;

        if (this.shield > 0) {
            if (this.shield >= amount) {
                this.shield -= amount;
            } else {
                const remaining = amount - this.shield;
                this.shield = 0;
                this.hp -= remaining;
            }
        } else {
            this.hp -= amount;
        }

        if (this.hp <= 0) {
            this.hp = 0;
            triggerGameOver();
        }
    }

    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#00f3ff';
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 2.5;
        ctx.fillStyle = '#080d1a';

        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 22);
        ctx.lineTo(this.x + 18, this.y + 16);
        ctx.lineTo(this.x + 8, this.y + 10);
        ctx.lineTo(this.x - 8, this.y + 10);
        ctx.lineTo(this.x - 18, this.y + 16);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ff0055';
        ctx.shadowColor = '#ff0055';
        ctx.beginPath();
        ctx.arc(this.x, this.y - 4, 4, 0, Math.PI * 2);
        ctx.fill();

        if (this.shield > 0 || this.powerups.shieldBuff > 0) {
            ctx.strokeStyle = this.powerups.shieldBuff > 0 ? '#ffe600' : 'rgba(0, 243, 255, 0.5)';
            ctx.shadowColor = ctx.strokeStyle;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 25, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();
    }
}

/* ==========================================================================
   8. PROJÉTEIS & MÍSSEIS PERSEGUIDORES
   ========================================================================== */
class Bullet {
    constructor(x, y, vx, vy, color, isLaser = false, width = 4) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.isLaser = isLaser;
        this.width = width;
        this.height = isLaser ? 32 : 12;
        this.active = true;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (!canvas) return;
        if (this.x < -30 || this.x > canvas.width + 30 || this.y < -30 || this.y > canvas.height + 30) {
            this.active = false;
        }
    }

    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
        ctx.restore();
    }
}

class HomingMissile {
    constructor(x, y, target) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.speed = 5.2;
        this.angle = Math.PI / 2;
        this.active = true;
        this.color = '#ff0033';
    }

    update() {
        if (this.target) {
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            const targetAngle = Math.atan2(dy, dx);
            let diff = targetAngle - this.angle;

            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;
            this.angle += Math.max(-0.08, Math.min(0.08, diff));
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        particles.push(new Particle(this.x, this.y, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, '#ff5500', 8));

        if (!canvas) return;
        if (this.x < -40 || this.x > canvas.width + 40 || this.y < -40 || this.y > canvas.height + 40) {
            this.active = false;
        }
    }

    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff0033';
        ctx.fillStyle = '#ff0033';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

/* ==========================================================================
   9. PERIGOS AMBIENTAIS (LASERS DE AVISO VERMELHOS)
   ========================================================================== */
class LaserHazard {
    constructor() {
        this.isVertical = Math.random() < 0.5;
        const w = canvas ? canvas.width : 800;
        const h = canvas ? canvas.height : 600;
        this.pos = this.isVertical ? Math.random() * (w - 120) + 60 : Math.random() * (h - 240) + 120;
        this.state = 'WARNING'; // WARNING -> ACTIVE -> EXPIRED
        this.warningTimer = 1100;
        this.activeTimer = 750;
        this.active = true;
        this.width = 28;
    }

    update(dt) {
        if (this.state === 'WARNING') {
            this.warningTimer -= dt;
            if (this.warningTimer <= 0) this.state = 'ACTIVE';
        } else if (this.state === 'ACTIVE') {
            this.activeTimer -= dt;
            if (this.activeTimer <= 0) this.active = false;

            // Teste de Dano no Jogador
            if (this.isVertical) {
                if (Math.abs(player.x - this.pos) < this.width / 2 + player.width / 2) player.takeDamage(1.8);
            } else {
                if (Math.abs(player.y - this.pos) < this.width / 2 + player.height / 2) player.takeDamage(1.8);
            }
        }
    }

    draw() {
        if (!ctx || !canvas) return;
        ctx.save();
        if (this.state === 'WARNING') {
            ctx.strokeStyle = 'rgba(255, 0, 50, 0.7)';
            ctx.lineWidth = 3;
            ctx.setLineDash([12, 12]);
            ctx.beginPath();
            if (this.isVertical) {
                ctx.moveTo(this.pos, 0); ctx.lineTo(this.pos, canvas.height);
            } else {
                ctx.moveTo(0, this.pos); ctx.lineTo(canvas.width, this.pos);
            }
            ctx.stroke();
        } else if (this.state === 'ACTIVE') {
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#ff0000';
            ctx.fillStyle = 'rgba(255, 0, 50, 0.85)';
            if (this.isVertical) {
                ctx.fillRect(this.pos - this.width / 2, 0, this.width, canvas.height);
            } else {
                ctx.fillRect(0, this.pos - this.width / 2, canvas.width, this.width);
            }
        }
        ctx.restore();
    }
}

/* ==========================================================================
   10. INIMIGOS E CHEFÕES BULLET-HELL (ULTRA PESADELO)
   ========================================================================== */
class Enemy {
    constructor(type, waveMultiplier) {
        this.type = type;
        const w = canvas ? canvas.width : 800;
        this.x = Math.random() * (w - 60) + 30;
        this.y = -50;
        this.active = true;
        this.hue = 0;
        this.color = '#ff0055';
        this.isBoss = (type === 'boss');

        this.lastShot = Date.now();
        this.angle = 0;

        if (type === 'scout') {
            this.hp = 35 * waveMultiplier;
            this.maxHp = this.hp;
            this.speedY = 4.5;
            this.scoreValue = 150;
            this.radius = 16;
            this.shootInterval = 900;
        } else if (type === 'striker') {
            this.hp = 50 * waveMultiplier;
            this.maxHp = this.hp;
            this.speedY = 6.2;
            this.scoreValue = 250;
            this.radius = 18;
            this.shootInterval = 1000;
            const dx = player.x - this.x;
            this.vx = (dx / w) * 5;
        } else if (type === 'cruiser') {
            this.hp = 130 * waveMultiplier;
            this.maxHp = this.hp;
            this.speedY = 1.9;
            this.scoreValue = 450;
            this.radius = 30;
            this.shootInterval = 1100;
        } else if (type === 'sniper') {
            this.hp = 70 * waveMultiplier;
            this.maxHp = this.hp;
            this.speedY = 3.2;
            this.scoreValue = 380;
            this.radius = 22;
            this.shootInterval = 1300;
            this.targetY = 90 + Math.random() * 160;
        } else if (type === 'boss') {
            this.x = w / 2;
            this.y = -100;
            this.hp = 1100 * (1 + (waveNumber / 5 - 1) * 1.1);
            this.maxHp = this.hp;
            this.speedY = 1.4;
            this.scoreValue = 5000;
            this.radius = 62;
            this.shootInterval = 180;
            this.bossAngle = 0;
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0 && this.active) {
            this.active = false;
            onEnemyKilled(this);
        }
    }

    update() {
        this.angle += 0.06;

        if (this.type === 'scout') {
            this.y += this.speedY;
            this.x += Math.sin(this.angle * 1.8) * 5.5;
        } else if (this.type === 'striker') {
            this.y += this.speedY;
            this.x += this.vx;
        } else if (this.type === 'cruiser') {
            this.y += this.speedY;
            this.x += Math.cos(this.angle * 0.9) * 2.8;
        } else if (this.type === 'sniper') {
            if (this.y < this.targetY) this.y += this.speedY;
        } else if (this.type === 'boss') {
            if (this.y < 130) {
                this.y += this.speedY;
            } else {
                this.x += Math.sin(this.angle) * 4.0;
            }
        }

        const now = Date.now();
        if (now - this.lastShot > this.shootInterval && this.y > 0) {
            this.lastShot = now;
            this.shoot();
        }

        if (canvas && this.y > canvas.height + 60 && !this.isBoss) this.active = false;
    }

    shoot() {
        if (this.type === 'scout') {
            enemyBullets.push(new Bullet(this.x - 10, this.y + 15, 0, 8.5, this.color));
            enemyBullets.push(new Bullet(this.x + 10, this.y + 15, 0, 8.5, this.color));
        } else if (this.type === 'striker') {
            const ang = Math.atan2(player.y - this.y, player.x - this.x);
            enemyBullets.push(new Bullet(this.x, this.y + 15, Math.cos(ang) * 8.5, Math.sin(ang) * 8.5, this.color));
        } else if (this.type === 'cruiser') {
            const angles = [-0.6, -0.3, 0, 0.3, 0.6];
            angles.forEach(ang => {
                enemyBullets.push(new Bullet(this.x, this.y + 20, Math.sin(ang) * 7.5, Math.cos(ang) * 7.5, this.color));
            });
            if (Math.random() < 0.45) {
                homingMissiles.push(new HomingMissile(this.x, this.y + 20, player));
            }
        } else if (this.type === 'sniper') {
            const ang = Math.atan2(player.y - this.y, player.x - this.x);
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    if (this.active) {
                        enemyBullets.push(new Bullet(this.x, this.y + 15, Math.cos(ang) * 12, Math.sin(ang) * 12, this.color, true, 6));
                    }
                }, i * 80);
            }
        } else if (this.type === 'boss') {
            this.bossAngle += 0.4;
            enemyBullets.push(new Bullet(this.x, this.y + 20, Math.cos(this.bossAngle) * 6.5, Math.sin(this.bossAngle) * 6.5, this.color));
            enemyBullets.push(new Bullet(this.x, this.y + 20, Math.cos(this.bossAngle + Math.PI) * 6.5, Math.sin(this.bossAngle + Math.PI) * 6.5, this.color));

            if (Math.random() < 0.3) {
                homingMissiles.push(new HomingMissile(this.x, this.y + 30, player));
            }
        }
    }

    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.shadowBlur = 16;
        ctx.shadowColor = this.color;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = '#0b0616';
        ctx.lineWidth = 2.5;

        if (this.type === 'boss') {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + 50);
            ctx.lineTo(this.x + 60, this.y - 15);
            ctx.lineTo(this.x + 40, this.y - 55);
            ctx.lineTo(this.x - 40, this.y - 55);
            ctx.lineTo(this.x - 60, this.y - 15);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 18, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.45, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}

/* ==========================================================================
   11. POWER-UPS E EFEITOS VISUAIS
   ========================================================================== */
class PowerUp {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 2.2;
        this.active = true;

        const types = ['shield', 'triple', 'laser', 'repair', 'speed', 'emp'];
        this.type = types[Math.floor(Math.random() * types.length)];

        switch(this.type) {
            case 'shield': this.color = '#00f3ff'; this.label = '🛡️'; break;
            case 'triple': this.color = '#ffe600'; this.label = '⚡'; break;
            case 'laser': this.color = '#ff0055'; this.label = '💥'; break;
            case 'repair': this.color = '#00ff66'; this.label = '❤️'; break;
            case 'speed': this.color = '#00ccff'; this.label = '🚀'; break;
            case 'emp': this.color = '#ff00cc'; this.label = '💣'; break;
        }
    }

    update() {
        this.y += this.speedY;
        if (canvas && this.y > canvas.height + 30) this.active = false;
    }

    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fillStyle = 'rgba(12, 12, 35, 0.95)';
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.font = '12px Orbitron';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.label, this.x, this.y);
        ctx.restore();
    }
}

class Particle {
    constructor(x, y, vx, vy, color, life = 20) {
        this.x = x; this.y = y; this.vx = vx; this.vy = vy;
        this.color = color; this.maxLife = life; this.life = life;
    }
    update() { this.x += this.vx; this.y += this.vy; this.life--; }
    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class EMPEffect {
    constructor(x, y) {
        this.x = x; this.y = y; this.radius = 10;
        const w = canvas ? canvas.width : 800;
        const h = canvas ? canvas.height : 600;
        this.maxRadius = Math.max(w, h) * 1.4;
        this.active = true;
    }
    update() {
        this.radius += 28;
        if (this.radius > this.maxRadius) this.active = false;
    }
    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.strokeStyle = '#ff0055';
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#ff0055';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

class FloatingText {
    constructor(x, y, text, color) {
        this.x = x; this.y = y; this.text = text;
        this.color = color; this.life = 40;
    }
    update() { this.y -= 1.4; this.life--; }
    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.life / 40;
        ctx.font = 'bold 14px Orbitron';
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

/* ==========================================================================
   12. ESTADO E ENGINE DO JOGO INFINITO
   ========================================================================== */
let gameState = 'MENU';
let score = 0;
let waveNumber = 1;
let enemiesKilled = 0;
let comboCount = 0;
let maxCombo = 0;

let screenShakeTime = 0;
let screenShakeIntensity = 0;

let starfield;
let player;

const enemies = [];
const playerBullets = [];
const enemyBullets = [];
const homingMissiles = [];
const powerups = [];
const particles = [];
const empEffects = [];
const floatingTexts = [];
const laserHazards = [];

let waveEnemiesToSpawn = 0;
let waveSpawnTimer = 0;
let hazardTimer = 0;
let isBossActive = false;

function createScreenShake(intensity) {
    screenShakeTime = 14;
    screenShakeIntensity = intensity;
}

function addFloatingText(x, y, text, color = '#00f3ff') {
    floatingTexts.push(new FloatingText(x, y, text, color));
}

function startNextWave() {
    waveNumber++;
    comboCount = 0;

    const waveDisplay = document.getElementById('wave-display');
    if (waveDisplay) waveDisplay.innerText = waveNumber;

    const center = canvas ? canvas.width / 2 - 90 : 250;
    const centerY = canvas ? canvas.height / 2 : 300;

    if (waveNumber % 5 === 0) {
        isBossActive = true;
        audio.playBossWarning();
        enemies.push(new Enemy('boss', waveNumber));

        const bossHud = document.getElementById('boss-hud');
        const bossName = document.getElementById('boss-name');
        if (bossHud && bossName) {
            bossName.innerText = `⚡ ALERTA: CHEFÃO NEON - NÍVEL ${waveNumber / 5} ⚡`;
            bossHud.style.display = 'block';
        }
        addFloatingText(center, centerY, "ALERTA: CHEFÃO NEON INVASOR!", "#ff0055");
    } else {
        isBossActive = false;
        waveEnemiesToSpawn = 16 + waveNumber * 6;
        addFloatingText(center, centerY, `ONDA PESADELO ${waveNumber}`, "#ffe600");
    }
}

function handleSpawnsAndHazards(deltaTime) {
    hazardTimer += deltaTime;
    if (hazardTimer > Math.max(3500, 9000 - waveNumber * 400)) {
        hazardTimer = 0;
        laserHazards.push(new LaserHazard());
        const center = canvas ? canvas.width / 2 - 70 : 250;
        addFloatingText(center, 100, "⚠️ ALERTA DE LASER AMBIENTAL ⚠️", "#ff0033");
    }

    if (isBossActive) return;

    if (waveEnemiesToSpawn > 0) {
        waveSpawnTimer += deltaTime;
        const spawnInterval = Math.max(120, 650 - waveNumber * 45);

        if (waveSpawnTimer >= spawnInterval) {
            waveSpawnTimer = 0;
            waveEnemiesToSpawn--;

            const types = ['scout', 'scout', 'striker', 'striker', 'cruiser', 'sniper'];
            const selectedType = types[Math.floor(Math.random() * types.length)];
            enemies.push(new Enemy(selectedType, 1 + (waveNumber - 1) * 0.32));
        }
    } else if (enemies.length === 0) {
        startNextWave();
    }
}

function onEnemyKilled(enemy) {
    audio.playExplosion(enemy.isBoss);
    createScreenShake(enemy.isBoss ? 26 : 9);

    enemiesKilled++;
    comboCount++;
    if (comboCount > maxCombo) maxCombo = comboCount;

    const comboMultiplier = 1 + Math.floor(comboCount / 5) * 0.2;
    const pointsGained = Math.round(enemy.scoreValue * comboMultiplier);
    score += pointsGained;

    addFloatingText(enemy.x, enemy.y, `+${pointsGained}`, '#ffe600');

    for (let i = 0; i < (enemy.isBoss ? 55 : 20); i++) {
        particles.push(new Particle(
            enemy.x, enemy.y,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            enemy.color,
            32
        ));
    }

    if (Math.random() < 0.04 || enemy.isBoss) {
        powerups.push(new PowerUp(enemy.x, enemy.y));
    }

    if (enemy.isBoss) {
        const bossHud = document.getElementById('boss-hud');
        if (bossHud) bossHud.style.display = 'none';
        isBossActive = false;
    }
}

function applyPowerup(type) {
    audio.playPowerup();
    switch(type) {
        case 'shield':
            player.powerups.shieldBuff = 3500;
            addFloatingText(player.x, player.y - 20, "ESCUDO REFORÇADO!", "#00f3ff");
            break;
        case 'triple':
            player.powerups.tripleShot = 3500;
            addFloatingText(player.x, player.y - 20, "TIRO TRIPLO!", "#ffe600");
            break;
        case 'laser':
            player.powerups.laserBeam = 3500;
            addFloatingText(player.x, player.y - 20, "LASER DEVASTADOR!", "#ff0055");
            break;
        case 'repair':
            player.hp = Math.min(player.maxHp, player.hp + 20);
            addFloatingText(player.x, player.y - 20, "REPARO RÁPIDO!", "#00ff66");
            break;
        case 'speed':
            player.powerups.speedBoost = 3500;
            addFloatingText(player.x, player.y - 20, "TURBO EXTREMO!", "#00ccff");
            break;
        case 'emp':
            player.emps = Math.min(5, player.emps + 1);
            addFloatingText(player.x, player.y - 20, "+1 BOMBA EMP!", "#ff00cc");
            break;
    }
}

/* ==========================================================================
   13. DETECÇÃO DE COLISÕES
   ========================================================================== */
function checkCollisions() {
    playerBullets.forEach(b => {
        if (!b.active) return;
        enemies.forEach(e => {
            if (!e.active) return;
            const dist = Math.hypot(b.x - e.x, b.y - e.y);
            if (dist < e.radius + b.width) {
                if (!b.isLaser) b.active = false;
                e.takeDamage(b.isLaser ? 18 : 30);
                particles.push(new Particle(b.x, b.y, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, b.color, 10));
            }
        });
    });

    enemyBullets.forEach(b => {
        if (!b.active) return;
        const dist = Math.hypot(b.x - player.x, b.y - player.y);
        if (dist < player.width / 2 + b.width) {
            b.active = false;
            player.takeDamage(26);
        }
    });

    homingMissiles.forEach(m => {
        if (!m.active) return;
        const dist = Math.hypot(m.x - player.x, m.y - player.y);
        if (dist < player.width / 2 + 6) {
            m.active = false;
            player.takeDamage(35);
        }
    });

    enemies.forEach(e => {
        if (!e.active) return;
        const dist = Math.hypot(e.x - player.x, e.y - player.y);
        if (dist < e.radius + player.width / 2) {
            if (!e.isBoss) e.active = false;
            player.takeDamage(e.isBoss ? 60 : 70);
        }
    });

    powerups.forEach(p => {
        if (!p.active) return;
        const dist = Math.hypot(p.x - player.x, p.y - player.y);
        if (dist < player.width / 2 + 18) {
            p.active = false;
            applyPowerup(p.type);
        }
    });
}

/* ==========================================================================
   14. LAÇO PRINCIPAL (GAME LOOP)
   ========================================================================== */
let lastTime = performance.now();

function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        if (screenShakeTime > 0) {
            screenShakeTime--;
            const offsetX = (Math.random() - 0.5) * screenShakeIntensity;
            const offsetY = (Math.random() - 0.5) * screenShakeIntensity;
            ctx.translate(offsetX, offsetY);
        }

        if (starfield) {
            starfield.update();
            starfield.draw();
        }

        if (gameState === 'PLAYING' && player) {
            UniqueColorManager.updateEnemyColors(enemies);

            handleSpawnsAndHazards(deltaTime);

            player.update(deltaTime);
            player.draw();

            updateAndDrawEntities(laserHazards, deltaTime);
            updateAndDrawEntities(playerBullets);
            updateAndDrawEntities(enemies);
            updateAndDrawEntities(enemyBullets);
            updateAndDrawEntities(homingMissiles);
            updateAndDrawEntities(powerups);
            updateAndDrawEntities(particles);
            updateAndDrawEntities(empEffects);
            updateAndDrawEntities(floatingTexts);

            checkCollisions();
            updateHUD();
        }

        ctx.restore();
    }

    requestAnimationFrame(gameLoop);
}

function updateAndDrawEntities(list, dt = 0) {
    for (let i = list.length - 1; i >= 0; i--) {
        const item = list[i];
        item.update(dt);
        item.draw();
        if (item.active === false || item.life <= 0) {
            list.splice(i, 1);
        }
    }
}

/* ==========================================================================
   15. INTERFACE HUD EM PORTUGUÊS
   ========================================================================== */
function updateHUD() {
    if (!player) return;

    const hpFill = document.getElementById('hp-fill');
    const shieldFill = document.getElementById('shield-fill');
    if (hpFill) hpFill.style.width = `${Math.max(0, (player.hp / player.maxHp) * 100)}%`;
    if (shieldFill) shieldFill.style.width = `${Math.max(0, (player.shield / player.maxShield) * 100)}%`;

    const scoreDisplay = document.getElementById('score-display');
    const empDisplay = document.getElementById('emp-display');
    const comboDisplay = document.getElementById('combo-display');

    if (scoreDisplay) scoreDisplay.innerText = score.toString().padStart(6, '0');
    if (empDisplay) empDisplay.innerText = `💣 x${player.emps}`;
    if (comboDisplay) comboDisplay.innerText = `x${(1 + Math.floor(comboCount / 5) * 0.2).toFixed(1)}`;

    if (isBossActive) {
        const boss = enemies.find(e => e.isBoss);
        if (boss) {
            const bossHpFill = document.getElementById('boss-hp-fill');
            if (bossHpFill) bossHpFill.style.width = `${Math.max(0, (boss.hp / boss.maxHp) * 100)}%`;
        }
    }

    const badgesContainer = document.getElementById('powerup-badges');
    if (badgesContainer) {
        badgesContainer.innerHTML = '';
        if (player.powerups.tripleShot > 0) badgesContainer.innerHTML += `<span class="badge">TIRO TRIPLO</span>`;
        if (player.powerups.laserBeam > 0) badgesContainer.innerHTML += `<span class="badge" style="border-color:#ff0055;">LASER</span>`;
        if (player.powerups.speedBoost > 0) badgesContainer.innerHTML += `<span class="badge" style="border-color:#00ccff;">TURBO</span>`;
        if (player.powerups.shieldBuff > 0) badgesContainer.innerHTML += `<span class="badge" style="border-color:#ffe600;">ESCUDO+</span>`;
    }
}

/* ==========================================================================
   16. GERENCIAMENTO DE MENUS E INICIALIZAÇÃO
   ========================================================================== */
function startGame() {
    audio.init();
    score = 0;
    waveNumber = 1;
    enemiesKilled = 0;
    comboCount = 0;
    maxCombo = 0;

    enemies.length = 0;
    playerBullets.length = 0;
    enemyBullets.length = 0;
    homingMissiles.length = 0;
    powerups.length = 0;
    particles.length = 0;
    empEffects.length = 0;
    laserHazards.length = 0;

    if (player) player.reset();

    waveEnemiesToSpawn = 16;
    hazardTimer = 0;
    isBossActive = false;

    const mMenu = document.getElementById('main-menu');
    const goMenu = document.getElementById('gameover-menu');
    const pMenu = document.getElementById('pause-menu');
    const bHud = document.getElementById('boss-hud');

    if (mMenu) mMenu.style.display = 'none';
    if (goMenu) goMenu.style.display = 'none';
    if (pMenu) pMenu.style.display = 'none';
    if (bHud) bHud.style.display = 'none';

    resetAllInputKeys();
    gameState = 'PLAYING';
}

function triggerGameOver() {
    gameState = 'GAMEOVER';
    audio.playExplosion(true);

    const fScore = document.getElementById('final-score');
    const fWave = document.getElementById('final-wave');
    const fKills = document.getElementById('final-kills');
    const fCombo = document.getElementById('final-combo');
    const goMenu = document.getElementById('gameover-menu');

    if (fScore) fScore.innerText = score;
    if (fWave) fWave.innerText = waveNumber;
    if (fKills) fKills.innerText = enemiesKilled;
    if (fCombo) fCombo.innerText = `x${(1 + Math.floor(maxCombo / 5) * 0.2).toFixed(1)}`;
    if (goMenu) goMenu.style.display = 'flex';
}

function togglePause() {
    const pMenu = document.getElementById('pause-menu');
    if (gameState === 'PLAYING') {
        gameState = 'PAUSED';
        if (pMenu) pMenu.style.display = 'flex';
    } else if (gameState === 'PAUSED') {
        gameState = 'PLAYING';
        if (pMenu) pMenu.style.display = 'none';
        resetAllInputKeys();
    }
}

function initGame() {
    setupCanvas();
    bindInputEvents();

    starfield = new StarfieldAndGrid();
    player = new Player();

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const resumeBtn = document.getElementById('resume-btn');
    const soundToggle = document.getElementById('sound-toggle');

    if (startBtn) startBtn.addEventListener('click', startGame);
    if (restartBtn) restartBtn.addEventListener('click', startGame);
    if (resumeBtn) resumeBtn.addEventListener('click', togglePause);

    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            const isMuted = audio.toggleMute();
            soundToggle.innerText = isMuted ? '🔇' : '🔊';
        });
    }

    const empTouch = document.getElementById('btn-emp-touch');
    const fireTouch = document.getElementById('btn-fire-touch');

    if (empTouch) {
        empTouch.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (gameState === 'PLAYING' && player && player.emps > 0) player.triggerEMP();
        });
    }

    if (fireTouch) {
        fireTouch.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keys['Space'] = true;
        });
        fireTouch.addEventListener('touchend', (e) => {
            e.preventDefault();
            keys['Space'] = false;
        });
    }

    requestAnimationFrame(gameLoop);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
