/**
 * game.js - ESL 視訊單字泡泡遊戲 核心遊戲邏輯 (Lesson 2 V2 專用)
 * 適用教材：Page 15 Word List (Words to Remember)
 * 涵蓋：21 個完整單字庫、左欄 8 單字指定篩選、狀態機、泡泡排布、碰撞反饋、補換泡泡、愛心扣血、計時器、排行榜
 */

// 課本 Page 15 單字資料庫 (21 個單字完整配置)
const VOCABULARY = [
  // ─── 左欄核心單字 (8 個) ───
  { id: 'wake up',    word: 'wake up',    col: 'left',   type: 'action',  zh: '起床',      img: 'V2_flashcards_images/V2_wake up.webp',    audio: 'V2_flashcards_audios/V2_wake up.mp3', audioZh: 'V2_flashcards_audios/V2_wake up_zh.mp3' },
  { id: 'eat',        word: 'eat',        col: 'left',   type: 'action',  zh: '吃',        img: 'V2_flashcards_images/V2_eat.webp',        audio: 'V2_flashcards_audios/V2_eat.mp3', audioZh: 'V2_flashcards_audios/V2_eat_zh.mp3' },
  { id: 'comb',       word: 'comb',       col: 'left',   type: 'action',  zh: '梳頭',      img: 'V2_flashcards_images/V2_comb.webp',       audio: 'V2_flashcards_audios/V2_comb.mp3', audioZh: 'V2_flashcards_audios/V2_comb_zh.mp3' },
  { id: 'hand',       word: 'hand',       col: 'left',   type: 'routine', zh: '手',        img: 'V2_flashcards_images/V2_hand.webp',       audio: 'V2_flashcards_audios/V2_hand.mp3', audioZh: 'V2_flashcards_audios/V2_hand_zh.mp3' },
  { id: 'home',       word: 'home',       col: 'left',   type: 'routine', zh: '家',        img: 'V2_flashcards_images/V2_home.webp',       audio: 'V2_flashcards_audios/V2_home.mp3', audioZh: 'V2_flashcards_audios/V2_home_zh.mp3' },
  { id: 'bath',       word: 'bath',       col: 'left',   type: 'routine', zh: '洗澡/澡盆',  img: 'V2_flashcards_images/V2_bath.webp',       audio: 'V2_flashcards_audios/V2_bath.mp3', audioZh: 'V2_flashcards_audios/V2_bath_zh.mp3' },
  { id: 'run',        word: 'run',        col: 'left',   type: 'action',  zh: '跑步',      img: 'V2_flashcards_images/V2_run.webp',        audio: 'V2_flashcards_audios/V2_run.mp3', audioZh: 'V2_flashcards_audios/V2_run_zh.mp3' },
  { id: 'do',         word: 'do',         col: 'left',   type: 'action',  zh: '做',        img: 'V2_flashcards_images/V2_do.webp',         audio: 'V2_flashcards_audios/V2_do.mp3', audioZh: 'V2_flashcards_audios/V2_do_zh.mp3' },

  // ─── 中欄單字 (7 個) ───
  { id: 'sleep',      word: 'sleep',      col: 'middle', type: 'action',  zh: '睡覺',      img: 'V2_flashcards_images/V2_sleep.webp',      audio: 'V2_flashcards_audios/V2_sleep.mp3', audioZh: 'V2_flashcards_audios/V2_sleep_zh.mp3' },
  { id: 'take',       word: 'take',       col: 'middle', type: 'action',  zh: '拿/搭乘',   img: 'V2_flashcards_images/V2_take.webp',       audio: 'V2_flashcards_audios/V2_take.mp3', audioZh: 'V2_flashcards_audios/V2_take_zh.mp3' },
  { id: 'teeth',      word: 'teeth',      col: 'middle', type: 'routine', zh: '牙齒',      img: 'V2_flashcards_images/V2_teeth.webp',      audio: 'V2_flashcards_audios/V2_teeth.mp3', audioZh: 'V2_flashcards_audios/V2_teeth_zh.mp3' },
  { id: 'breakfast',  word: 'breakfast',  col: 'middle', type: 'routine', zh: '早餐',      img: 'V2_flashcards_images/V2_breakfast.webp',  audio: 'V2_flashcards_audios/V2_breakfast.mp3', audioZh: 'V2_flashcards_audios/V2_breakfast_zh.mp3' },
  { id: 'homework',   word: 'homework',   col: 'middle', type: 'routine', zh: '作業',      img: 'V2_flashcards_images/V2_homework.webp',   audio: 'V2_flashcards_audios/V2_homework.mp3', audioZh: 'V2_flashcards_audios/V2_homework_zh.mp3' },
  { id: 'school',     word: 'school',     col: 'middle', type: 'routine', zh: '學校',      img: 'V2_flashcards_images/V2_school.webp',     audio: 'V2_flashcards_audios/V2_school.mp3', audioZh: 'V2_flashcards_audios/V2_school_zh.mp3' },
  { id: 'go',         word: 'go',         col: 'middle', type: 'action',  zh: '去',        img: 'V2_flashcards_images/V2_go.webp',         audio: 'V2_flashcards_audios/V2_go.mp3', audioZh: 'V2_flashcards_audios/V2_go_zh.mp3' },

  // ─── 右欄單字 (6 個) ───
  { id: 'brush',      word: 'brush',      col: 'right',  type: 'action',  zh: '刷',        img: 'V2_flashcards_images/V2_brush.webp',      audio: 'V2_flashcards_audios/V2_brush.mp3', audioZh: 'V2_flashcards_audios/V2_brush_zh.mp3' },
  { id: 'wash',       word: 'wash',       col: 'right',  type: 'action',  zh: '洗',        img: 'V2_flashcards_images/V2_wash.webp',       audio: 'V2_flashcards_audios/V2_wash.mp3', audioZh: 'V2_flashcards_audios/V2_wash_zh.mp3' },
  { id: 'bed',        word: 'bed',        col: 'right',  type: 'routine', zh: '床',        img: 'V2_flashcards_images/V2_bed.webp',        audio: 'V2_flashcards_audios/V2_bed.mp3', audioZh: 'V2_flashcards_audios/V2_bed_zh.mp3' },
  { id: 'dinner',     word: 'dinner',     col: 'right',  type: 'routine', zh: '晚餐',      img: 'V2_flashcards_images/V2_dinner.webp',     audio: 'V2_flashcards_audios/V2_dinner.mp3', audioZh: 'V2_flashcards_audios/V2_dinner_zh.mp3' },
  { id: 'hair',       word: 'hair',       col: 'right',  type: 'routine', zh: '頭髮',      img: 'V2_flashcards_images/V2_hair.webp',       audio: 'V2_flashcards_audios/V2_hair.mp3', audioZh: 'V2_flashcards_audios/V2_hair_zh.mp3' },
  { id: 'shower',     word: 'shower',     col: 'right',  type: 'routine', zh: '淋浴',      img: 'V2_flashcards_images/V2_shower.webp',     audio: 'V2_flashcards_audios/V2_shower.mp3', audioZh: 'V2_flashcards_audios/V2_shower_zh.mp3' }
];

// 6 個泡泡環繞位置（相應於草圖配置：上方、下方、左上、左下、右上、右下）
const BUBBLE_SLOT_CLASSES = [
  'slot-top',
  'slot-bottom',
  'slot-top-left',
  'slot-bottom-left',
  'slot-top-right',
  'slot-bottom-right'
];

class ESLBubbleGame {
  constructor() {
    // 遊戲狀態機
    this.state = {
      mode: 'menu',           // menu, playing, paused, gameover
      gameMode: 'timed',      // endless, timed
      customTimeLimit: 60,    // 秒
      remainingTime: 60,      // 秒
      elapsedTime: 0,         // 秒
      lives: 5,               // 初始 5 顆心
      maxLives: 5,
      score: 0,
      combo: 0,
      maxCombo: 0,
      correctCount: 0,
      wrongCount: 0,
      replaceOnWrong: true,   // 答錯時是否補換新泡泡
      targetItem: null,       // 當前出題的單字物件
      currentBubbleWords: [], // 當前場上的 6 個單字 ID
      questionHistory: [],    // 出題防連跳
      isTransitioning: false
    };

    // 粒子系統 Canvas
    this.fxCanvas = document.getElementById('fx-canvas');
    this.fxCtx = this.fxCanvas.getContext('2d');
    this.particles = [];
    this.handTrails = [];

    // 定時器
    this.gameTimer = null;
    this.lastTimestamp = performance.now();

    // DOM 快取
    this.dom = {
      stage: document.getElementById('game-stage'),
      bubblesContainer: document.getElementById('bubbles-container'),
      centerCard: document.getElementById('center-card'),
      cardImage: document.getElementById('card-image'),
      cardWordZh: document.getElementById('card-word-zh'),
      cardRepeatBtn: document.getElementById('card-repeat-btn'),
      cardRepeatZhBtn: document.getElementById('card-repeat-zh-btn'),
      heartsContainer: document.getElementById('hearts-container'),
      timerDisplay: document.getElementById('timer-display'),
      scoreDisplay: document.getElementById('score-display'),
      comboDisplay: document.getElementById('combo-display'),
      statusNotice: document.getElementById('status-notice'),
      
      // 彈跳視窗
      startModal: document.getElementById('start-modal'),
      leaderboardModal: document.getElementById('leaderboard-modal'),
      gameoverModal: document.getElementById('gameover-modal'),
      pauseModal: document.getElementById('pause-modal'),

      // 按鈕與輸入
      startBtn: document.getElementById('start-btn'),
      showLeaderboardBtn: document.getElementById('show-leaderboard-btn'),
      closeLeaderboardBtn: document.getElementById('close-leaderboard-btn'),
      pauseBtn: document.getElementById('pause-btn'),
      topHomeBtn: document.getElementById('top-home-btn'),
      resumeBtn: document.getElementById('resume-btn'),
      restartBtn: document.getElementById('restart-btn'),
      homeBtn: document.getElementById('home-btn'),
      submitScoreBtn: document.getElementById('submit-score-btn'),
      playerNameInput: document.getElementById('player-name-input'),

      // 設定項目
      gameModeSelect: document.getElementById('game-mode-select'),
      wrongBubbleBehavior: document.getElementById('wrong-bubble-behavior'),
      timeSelectGroup: document.getElementById('time-select-group'),
      customTimeInput: document.getElementById('custom-time-input'),
      cameraToggle: document.getElementById('camera-toggle'),
      mirrorToggle: document.getElementById('mirror-toggle'),
      audioToggle: document.getElementById('audio-toggle'),
      bgmToggle: document.getElementById('bgm-toggle')
    };

    // 建立 HandTracker 實例 (雙重安全檢查 window.HandTracker 與全域 HandTracker)
    const TrackerClass = (typeof HandTracker !== 'undefined' ? HandTracker : (window.HandTracker || null));
    if (TrackerClass) {
      this.handTracker = new TrackerClass({
        videoElement: document.getElementById('webcam-video'),
        stageElement: this.dom.stage,
        onHandMove: (hands) => this.onHandMove(hands),
        onBubbleHit: (wordId, x, y) => this.onBubbleHit(wordId, x, y),
        onStatusChange: (text) => this.showNotice(text)
      });
    } else {
      console.warn('HandTracker 尚未就緒，啟用純滑鼠/觸控備援模式');
      this.handTracker = {
        cameraReady: false,
        isMirrored: true,
        bindMouseAndTouch: (stage) => {
          stage.addEventListener('pointerdown', (e) => {
            const target = e.target.closest('.word-bubble');
            if (target && !target.classList.contains('popping')) {
              this.onBubbleHit(target.dataset.wordId, e.clientX, e.clientY);
            }
          });
        },
        initCamera: async () => false,
        stop: () => {}
      };
    }

    this.init();
  }

  // 初始化
  init() {
    this.bindEvents();
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // 啟動滑鼠/觸控點擊支援
    this.handTracker.bindMouseAndTouch(this.dom.stage);

    // 啟動 FX 粒子循環渲染
    requestAnimationFrame((ts) => this.renderFxLoop(ts));

    // 預先載入第一筆資料畫面
    this.renderHearts();
    this.updateScoreHUD();

    // 讓自動化測試可全域訪問
    window.eslGame = this;
    window.render_game_to_text = () => JSON.stringify({
      mode: this.state.mode,
      gameMode: this.state.gameMode,
      score: this.state.score,
      lives: this.state.lives,
      target: this.state.targetItem ? this.state.targetItem.word : null,
      bubbles: this.state.currentBubbleWords,
      correctCount: this.state.correctCount,
      wrongCount: this.state.wrongCount,
      combo: this.state.combo,
      remainingTime: this.state.remainingTime,
      replaceOnWrong: this.state.replaceOnWrong
    });

    window.simulateBubbleHit = (wordId) => {
      this.onBubbleHit(wordId, window.innerWidth / 2, window.innerHeight / 2);
    };
  }

  // 取得單字清單（固定全單元 21 個單字）
  getActiveVocabPool() {
    return VOCABULARY;
  }

  // 事件綁定
  bindEvents() {
    // 遊戲模式切換
    this.dom.gameModeSelect.addEventListener('change', (e) => {
      this.state.gameMode = e.target.value;
      this.dom.timeSelectGroup.style.display = (this.state.gameMode === 'timed') ? 'flex' : 'none';
    });

    // 泡泡答錯補位機制設定
    this.dom.wrongBubbleBehavior.addEventListener('change', (e) => {
      this.state.replaceOnWrong = (e.target.value === 'replace');
    });

    // 時間設定按鈕選取
    document.querySelectorAll('.time-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.time-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const seconds = parseInt(chip.dataset.time, 10);
        this.dom.customTimeInput.value = seconds;
        this.state.customTimeLimit = seconds;
      });
    });

    this.dom.customTimeInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (val > 0) this.state.customTimeLimit = val;
    });

    // 開始遊戲按鈕
    this.dom.startBtn.addEventListener('click', async () => {
      window.soundSystem.initAudioContext();
      if (this.dom.bgmToggle.checked) {
        window.soundSystem.startBgm();
      }
      this.dom.startModal.hidden = true;

      // 檢查是否需啟動鏡頭
      if (this.dom.cameraToggle.checked && !this.handTracker.cameraReady) {
        await this.handTracker.initCamera();
      }

      this.startGame();
    });

    // 鏡像開關
    this.dom.mirrorToggle.addEventListener('change', (e) => {
      const video = document.getElementById('webcam-video');
      this.handTracker.isMirrored = e.target.checked;
      video.style.transform = e.target.checked ? 'scaleX(-1)' : 'none';
    });

    // 音效開關
    this.dom.audioToggle.addEventListener('change', () => {
      window.soundSystem.toggleMute();
    });

    // 背景音樂開關
    this.dom.bgmToggle.addEventListener('change', (e) => {
      if (e.target.checked) window.soundSystem.startBgm();
      else window.soundSystem.stopBgm();
    });

    // 重聽題目英文發音按鈕
    this.dom.cardRepeatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.state.targetItem) {
        window.soundSystem.playWordAudio(this.state.targetItem.id);
        this.dom.cardRepeatBtn.classList.add('pulse');
        setTimeout(() => this.dom.cardRepeatBtn.classList.remove('pulse'), 400);
      }
    });

    // 重聽題目中文解說按鈕
    if (this.dom.cardRepeatZhBtn) {
      this.dom.cardRepeatZhBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.state.targetItem) {
          window.soundSystem.playZhAudio(this.state.targetItem.id);
          this.dom.cardRepeatZhBtn.classList.add('pulse');
          setTimeout(() => this.dom.cardRepeatZhBtn.classList.remove('pulse'), 400);
        }
      });
    }

    // 排行榜顯示與關閉
    this.dom.showLeaderboardBtn.addEventListener('click', () => this.showLeaderboard());
    this.dom.closeLeaderboardBtn.addEventListener('click', () => {
      this.dom.leaderboardModal.hidden = true;
    });

    // 排行榜分頁切換
    document.querySelectorAll('.lb-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderLeaderboardList(tab.dataset.tab);
      });
    });

    // 暫停與繼續
    this.dom.pauseBtn.addEventListener('click', () => this.pauseGame());
    this.dom.resumeBtn.addEventListener('click', () => this.resumeGame());

    // 回到首頁按鈕
    if (this.dom.topHomeBtn) {
      this.dom.topHomeBtn.addEventListener('click', () => this.returnToHome());
    }

    // 結算畫面按鈕
    this.dom.submitScoreBtn.addEventListener('click', () => this.submitScoreToLeaderboard());
    this.dom.restartBtn.addEventListener('click', () => {
      this.dom.gameoverModal.hidden = true;
      this.startGame();
    });
    this.dom.homeBtn.addEventListener('click', () => this.returnToHome());
  }

  // 重置與開始遊戲
  startGame() {
    this.state.mode = 'playing';
    this.state.score = 0;
    this.state.combo = 0;
    this.state.maxCombo = 0;
    this.state.correctCount = 0;
    this.state.wrongCount = 0;
    this.state.lives = this.state.maxLives;
    this.state.questionHistory = [];
    this.state.elapsedTime = 0;
    this.state.remainingTime = this.state.customTimeLimit;

    this.renderHearts();
    this.updateScoreHUD();
    this.updateTimerHUD();

    this.dom.gameoverModal.hidden = true;
    this.dom.pauseModal.hidden = true;

    // 啟動遊戲心跳計時器
    if (this.gameTimer) clearInterval(this.gameTimer);
    this.lastTimestamp = performance.now();
    this.gameTimer = setInterval(() => this.onTimerTick(), 1000);

    this.showNotice('遊戲開始！揮動雙手或點擊戳破正確的單字泡泡！');
    this.nextQuestion();
  }

  // 計時器每秒 Tick
  onTimerTick() {
    if (this.state.mode !== 'playing') return;

    this.state.elapsedTime++;

    if (this.state.gameMode === 'timed') {
      this.state.remainingTime--;
      this.updateTimerHUD();

      if (this.state.remainingTime <= 0) {
        this.gameOver('時限到達！挑戰結束');
      }
    } else {
      this.updateTimerHUD();
    }
  }

  // 更新計時器顯示
  updateTimerHUD() {
    const formatTime = (totalSec) => {
      const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
      const s = (totalSec % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    };

    if (this.state.gameMode === 'timed') {
      this.dom.timerDisplay.textContent = `⏱️ ${formatTime(Math.max(0, this.state.remainingTime))}`;
      if (this.state.remainingTime <= 10) {
        this.dom.timerDisplay.classList.add('urgent');
      } else {
        this.dom.timerDisplay.classList.remove('urgent');
      }
    } else {
      this.dom.timerDisplay.textContent = `⏱️ ${formatTime(this.state.elapsedTime)}`;
      this.dom.timerDisplay.classList.remove('urgent');
    }
  }

  // 更新分數與連擊 HUD
  updateScoreHUD() {
    this.dom.scoreDisplay.innerHTML = `<span class="star-icon">⭐</span> 分數: <b>${this.state.score}</b>`;
    if (this.state.combo > 1) {
      this.dom.comboDisplay.style.display = 'inline-block';
      this.dom.comboDisplay.textContent = `✦ 連擊 x${this.state.combo}`;
    } else {
      this.dom.comboDisplay.style.display = 'none';
    }
  }

  // 渲染 5 顆愛心血條
  renderHearts() {
    this.dom.heartsContainer.innerHTML = '';
    for (let i = 0; i < this.state.maxLives; i++) {
      const heart = document.createElement('span');
      heart.className = `heart-icon ${i < this.state.lives ? 'active' : 'lost'}`;
      heart.textContent = '❤️';
      this.dom.heartsContainer.appendChild(heart);
    }
  }

  // 出題：決定目標單字並分派 6 顆泡泡
  nextQuestion() {
    if (this.state.mode !== 'playing') return;

    const activePool = this.getActiveVocabPool();
    // 隨機選題（排除最近剛出過的 2 題）
    const availablePool = activePool.filter(item => !this.state.questionHistory.includes(item.id));
    const pool = availablePool.length >= 6 ? availablePool : activePool;
    const target = pool[Math.floor(Math.random() * pool.length)];

    this.state.targetItem = target;
    this.state.questionHistory.push(target.id);
    if (this.state.questionHistory.length > 4) this.state.questionHistory.shift();

    // 挑選 5 個不重複干擾項目
    // 優先從當前單字庫挑，若不足 6 字則由全域補齊
    let candidates = activePool.filter(i => i.id !== target.id);
    if (candidates.length < 5) {
      const remainingNeeded = 5 - candidates.length;
      const extras = VOCABULARY.filter(i => i.id !== target.id && !candidates.some(c => c.id === i.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, remainingNeeded);
      candidates = [...candidates, ...extras];
    }

    const distractors = candidates.sort(() => Math.random() - 0.5).slice(0, 5);

    // 混合正確答案與干擾項，隨機排序
    const questionChoices = [target, ...distractors].sort(() => Math.random() - 0.5);
    this.state.currentBubbleWords = questionChoices.map(c => c.id);

    // 渲染中央閃卡
    this.renderCenterCard(target);

    // 播放目標單字真人發音
    window.soundSystem.playWordAudio(target.id);

    // 渲染 6 顆環繞單字泡泡
    this.renderBubbles(questionChoices);

    this.state.isTransitioning = false;
  }

  // 渲染中央閃卡卡片
  renderCenterCard(target) {
    this.dom.cardImage.src = target.img;
    this.dom.cardImage.alt = target.word;
    this.dom.cardImage.onerror = () => {
      if (!this.dom.cardImage.src.includes('../')) {
        this.dom.cardImage.src = '../' + target.img;
      }
    };
    this.dom.cardWordZh.textContent = `(${target.zh})`;

    // 閃卡翻轉出現動畫
    this.dom.centerCard.classList.remove('flip-in');
    void this.dom.centerCard.offsetWidth; // 強制重繪
    this.dom.centerCard.classList.add('flip-in');
  }

  // 渲染 6 顆單字泡泡
  renderBubbles(choices) {
    this.dom.bubblesContainer.innerHTML = '';

    choices.forEach((item, index) => {
      const slotClass = BUBBLE_SLOT_CLASSES[index] || 'slot-top';
      const bubble = document.createElement('div');
      bubble.className = `word-bubble ${slotClass}`;
      bubble.dataset.wordId = item.id;
      bubble.dataset.slotIndex = index;

      // 泡泡內部結構 (含高光層與單字文字)
      bubble.innerHTML = `
        <div class="bubble-reflection"></div>
        <div class="bubble-word-content">
          <span class="bubble-en">${item.word}</span>
        </div>
        <div class="bubble-glow"></div>
      `;

      this.dom.bubblesContainer.appendChild(bubble);
    });
  }

  // 泡泡碰撞處理 (手勢碰觸或滑鼠點擊)
  onBubbleHit(wordId, hitX, hitY) {
    const now = performance.now();
    if (this.state.mode !== 'playing' || this.state.isTransitioning) return;
    if (now - (this.lastGlobalHitTime || 0) < 550) return; // 全局防連擊

    const bubbleEl = this.dom.bubblesContainer.querySelector(`.word-bubble[data-word-id="${wordId}"]`);
    if (!bubbleEl || bubbleEl.classList.contains('popping')) return;

    this.lastGlobalHitTime = now;
    bubbleEl.classList.add('popping');

    // 1. 播放泡泡爆破聲 + 播放該泡泡對應單字語音
    window.soundSystem.playBubblePop();
    window.soundSystem.playWordAudio(wordId);

    // 2. 觸發爆破粒子
    this.spawnBubblePopParticles(hitX, hitY);

    // 3. 判定答對或答錯
    const isCorrect = (wordId === this.state.targetItem.id);

    if (isCorrect) {
      this.handleCorrectAnswer(bubbleEl, hitX, hitY);
    } else {
      this.handleWrongAnswer(bubbleEl);
    }
  }

  // 答對邏輯處理
  handleCorrectAnswer(bubbleEl, hitX, hitY) {
    this.state.isTransitioning = true;
    this.state.correctCount++;
    this.state.combo++;
    if (this.state.combo > this.state.maxCombo) {
      this.state.maxCombo = this.state.combo;
    }

    // 計算得分（基礎分 100 + 連擊獎勵）
    const earnedScore = 100 + (this.state.combo - 1) * 20;
    this.state.score += earnedScore;

    // 視覺回饋：泡泡綠色光暈
    bubbleEl.classList.add('bubble-correct');

    // 播放答對琶音
    setTimeout(() => window.soundSystem.playCorrect(), 80);

    // 金色星光爆發
    this.spawnGoldenStarBurst(hitX, hitY);

    this.updateScoreHUD();
    this.showNotice(`太棒了！答對了！+${earnedScore} 分！✦ 連擊 x${this.state.combo}`);

    // 動畫延遲後進入下一題
    setTimeout(() => {
      this.nextQuestion();
    }, 650);
  }

  // 答錯邏輯處理
  handleWrongAnswer(bubbleEl) {
    this.state.wrongCount++;
    this.state.combo = 0; // 重置連擊

    // 視覺回饋：紅色震動光暈
    bubbleEl.classList.add('bubble-wrong');

    // 播放答錯提示音
    setTimeout(() => window.soundSystem.playWrong(), 60);

    // 扣除一顆心
    this.state.lives = Math.max(0, this.state.lives - 1);
    this.renderHearts();
    this.updateScoreHUD();

    this.showNotice(`噢噢，不是這個單字喔！再試一次！剩餘生命: ${this.state.lives}`);

    // 檢查生命值是否耗盡 (無盡模式下觸發 GameOver)
    if (this.state.gameMode === 'endless' && this.state.lives <= 0) {
      setTimeout(() => {
        this.gameOver('愛心用盡！挑戰結束');
      }, 500);
      return;
    }

    // 依據設定決定是否補換新泡泡
    const slotIndex = parseInt(bubbleEl.dataset.slotIndex, 10);
    setTimeout(() => {
      bubbleEl.remove();

      if (this.state.replaceOnWrong && this.state.mode === 'playing') {
        this.replaceSingleBubble(slotIndex);
      }
    }, 320);
  }

  // 動態替換單一顆泡泡
  replaceSingleBubble(slotIndex) {
    const activePool = this.getActiveVocabPool();
    // 找出尚未在場上的備選單字
    const unusedChoices = activePool.filter(item => 
      !this.state.currentBubbleWords.includes(item.id) && item.id !== this.state.targetItem.id
    );

    // 若當前範圍庫被用完，擴大至全域備選
    const poolToPick = unusedChoices.length > 0 ? unusedChoices : VOCABULARY.filter(item => 
      !this.state.currentBubbleWords.includes(item.id) && item.id !== this.state.targetItem.id
    );

    if (poolToPick.length === 0) return;

    const newItem = poolToPick[Math.floor(Math.random() * poolToPick.length)];
    this.state.currentBubbleWords[slotIndex] = newItem.id;

    const slotClass = BUBBLE_SLOT_CLASSES[slotIndex] || 'slot-top';
    const newBubble = document.createElement('div');
    newBubble.className = `word-bubble ${slotClass} bubble-spawn-in`;
    newBubble.dataset.wordId = newItem.id;
    newBubble.dataset.slotIndex = slotIndex;

    newBubble.innerHTML = `
      <div class="bubble-reflection"></div>
      <div class="bubble-word-content">
        <span class="bubble-en">${newItem.word}</span>
      </div>
      <div class="bubble-glow"></div>
    `;

    this.dom.bubblesContainer.appendChild(newBubble);
  }

  // 暫停遊戲
  pauseGame() {
    if (this.state.mode !== 'playing') return;
    this.state.mode = 'paused';
    this.dom.pauseModal.hidden = false;
  }

  // 繼續遊戲
  resumeGame() {
    if (this.state.mode !== 'paused') return;
    this.state.mode = 'playing';
    this.dom.pauseModal.hidden = true;
  }

  // 回到首頁主選單
  returnToHome() {
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
    this.state.mode = 'menu';
    this.dom.pauseModal.hidden = true;
    this.dom.gameoverModal.hidden = true;
    this.dom.startModal.hidden = false;
    this.dom.bubblesContainer.innerHTML = '';
    this.showNotice('揮動雙手戳破正確的單字泡泡！');
  }

  // 遊戲結束結算
  gameOver(reasonText) {
    this.state.mode = 'gameover';
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }

    window.soundSystem.playGameOver();

    // 填入結算資料
    document.getElementById('final-score-val').textContent = this.state.score;
    document.getElementById('final-correct-val').textContent = this.state.correctCount;
    document.getElementById('final-wrong-val').textContent = this.state.wrongCount;
    document.getElementById('final-combo-val').textContent = `x${this.state.maxCombo}`;
    document.getElementById('gameover-reason').textContent = reasonText;

    this.dom.gameoverModal.hidden = false;
  }

  // 儲存分數至本地排行榜
  submitScoreToLeaderboard() {
    const name = (this.dom.playerNameInput.value || '神秘小神射手').trim();
    const modeKey = this.state.gameMode;
    const record = {
      name,
      score: this.state.score,
      correct: this.state.correctCount,
      combo: this.state.maxCombo,
      date: new Date().toLocaleDateString()
    };

    const storageKey = `v2_bubble_pop_scores_${modeKey}`;
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch (e) {
      list = [];
    }

    list.push(record);
    list.sort((a, b) => b.score - a.score);
    list = list.slice(0, 15); // 保留前 15 名

    try {
      localStorage.setItem(storageKey, JSON.stringify(list));
    } catch (e) {
      console.warn('無法儲存分數至 localStorage');
    }

    this.dom.gameoverModal.hidden = true;
    this.showLeaderboard(modeKey);
  }

  // 顯示排行榜彈窗
  showLeaderboard(defaultTab = 'timed') {
    this.dom.leaderboardModal.hidden = false;
    document.querySelectorAll('.lb-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === defaultTab);
    });
    this.renderLeaderboardList(defaultTab);
  }

  // 渲染排行榜列表
  renderLeaderboardList(tabKey) {
    const listEl = document.getElementById('leaderboard-list');
    const storageKey = `v2_bubble_pop_scores_${tabKey}`;
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch (e) {
      list = [];
    }

    listEl.innerHTML = '';
    if (list.length === 0) {
      listEl.innerHTML = '<li class="lb-empty">尚無挑戰紀錄，快來爭取第一名！</li>';
      return;
    }

    list.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `lb-item rank-${index + 1}`;
      const medal = index === 0 ? '🥇 ' : index === 1 ? '🥈 ' : index === 2 ? '🥉 ' : `${index + 1}. `;
      li.innerHTML = `
        <span class="lb-rank">${medal}${item.name}</span>
        <span class="lb-stats">連擊 x${item.combo || 1} · 答對 ${item.correct || 0}</span>
        <span class="lb-score">⭐ ${item.score}</span>
      `;
      listEl.appendChild(li);
    });
  }

  // 底部狀態文字提示
  showNotice(msg) {
    if (this.dom.statusNotice) {
      this.dom.statusNotice.textContent = msg;
    }
  }

  // =========================================================
  // 視覺粒子系統與特效 Canvas
  // =========================================================

  resizeCanvas() {
    this.fxCanvas.width = window.innerWidth;
    this.fxCanvas.height = window.innerHeight;
  }

  onHandMove(hands) {
    // 記錄手勢指尖軌跡供星塵粒子拖尾渲染
    hands.forEach(h => {
      this.handTrails.push({
        x: h.x,
        y: h.y,
        life: 1.0,
        color: `hsl(${(Date.now() / 15) % 360}, 90%, 65%)`
      });
    });
  }

  // 泡泡破裂粒子 (水花飛濺)
  spawnBubblePopParticles(x, y) {
    const count = 18;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + Math.random() * 0.3;
      const speed = 3.5 + Math.random() * 4.5;
      this.particles.push({
        type: 'water',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 3 + Math.random() * 4,
        alpha: 1.0,
        decay: 0.035 + Math.random() * 0.02,
        color: `rgba(${180 + Math.floor(Math.random() * 70)}, ${220 + Math.floor(Math.random() * 35)}, 255,`
      });
    }
  }

  // 答對金色星光爆發
  spawnGoldenStarBurst(x, y) {
    const count = 24;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 6;
      this.particles.push({
        type: 'star',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 5 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.2,
        alpha: 1.0,
        decay: 0.025 + Math.random() * 0.02,
        color: Math.random() > 0.3 ? '#fcd34d' : '#ffffff'
      });
    }
  }

  // 渲染 FX 循環
  renderFxLoop(timestamp) {
    const ctx = this.fxCtx;
    ctx.clearRect(0, 0, this.fxCanvas.width, this.fxCanvas.height);

    // 1. 繪製手勢星塵光軌 (Magic Hand Trail)
    for (let i = this.handTrails.length - 1; i >= 0; i--) {
      const t = this.handTrails[i];
      t.life -= 0.045;
      if (t.life <= 0) {
        this.handTrails.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(t.x, t.y, 10 * t.life, 0, Math.PI * 2);
      ctx.fillStyle = t.color;
      ctx.shadowColor = t.color;
      ctx.shadowBlur = 14;
      ctx.globalAlpha = t.life * 0.85;
      ctx.fill();
      ctx.restore();
    }

    // 2. 繪製爆破與星星粒子
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // 重力微下墜
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);

      if (p.type === 'water') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.alpha, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.shadowColor = 'rgba(147, 197, 253, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();
      } else if (p.type === 'star') {
        p.rot += p.vRot;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 10;
        this.drawStarPath(ctx, 0, 0, 5, p.size, p.size * 0.45);
        ctx.fill();
      }

      ctx.restore();
    }

    requestAnimationFrame((ts) => this.renderFxLoop(ts));
  }

  // 輔助繪製五角星路徑
  drawStarPath(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }
}

// 當 DOM 載入後啟動遊戲主程式
window.addEventListener('DOMContentLoaded', () => {
  new ESLBubbleGame();
});
