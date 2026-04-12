/* ========================================
   scroll-controller.js — スナップスクロール制御
   ======================================== */

(function () {
  "use strict";

  /* ---------- GSAP プラグイン登録 ---------- */
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /* ---------- DOM取得 ---------- */
  const panels     = Array.from(document.querySelectorAll(".panel"));
  const dots       = Array.from(document.querySelectorAll(".nav-dot"));
  const counterEl  = document.getElementById("sectionCounter");
  const progressEl = document.getElementById("progressBar");

  const TOTAL = panels.length;
  let current = 0;
  let isAnimating = false;

  /* ---------- UI更新 ---------- */
  function updateUI(idx) {
    // ナビドット
    dots.forEach((d, i) => d.classList.toggle("active", i === idx));

    // カウンター
    if (counterEl) {
      const cur = counterEl.querySelector(".section-counter__current");
      const tot = counterEl.querySelector(".section-counter__total");
      if (cur) cur.textContent = String(idx + 1).padStart(2, "0");
      if (tot) tot.textContent = String(TOTAL).padStart(2, "0");
    }

    // プログレスバー
    if (progressEl) {
      const pct = TOTAL <= 1 ? 100 : (idx / (TOTAL - 1)) * 100;
      progressEl.style.width = pct + "%";
    }
  }

  /* ---------- セクション切り替え ---------- */
  function goTo(index) {
    if (index === current || index < 0 || index >= TOTAL || isAnimating) return;
    isAnimating = true;

    const dir = index > current ? 1 : -1;
    const fromPanel = panels[current];
    const toPanel   = panels[index];

    // アニメーション前にリセット（section-animations.js から参照）
    if (typeof window.resetSectionAnim === "function") {
      window.resetSectionAnim(toPanel);
    }

    // 次パネルを表示準備
    gsap.set(toPanel, { visibility: "visible", opacity: 0, yPercent: dir * 8, zIndex: 10 });

    const tl = gsap.timeline({
      onComplete: function () {
        fromPanel.classList.remove("is-active");
        gsap.set(fromPanel, { opacity: 0, visibility: "hidden", zIndex: 1, yPercent: 0 });
        toPanel.classList.add("is-active");
        current = index;
        updateUI(current);
        isAnimating = false;

        // セクション登場アニメーション
        if (typeof window.playSectionAnim === "function") {
          window.playSectionAnim(current);
        }
      }
    });

    // 現パネル退場
    tl.to(fromPanel, {
      opacity: 0,
      yPercent: dir * -6,
      duration: 0.55,
      ease: "power3.in"
    });

    // 次パネル登場
    tl.to(toPanel, {
      opacity: 1,
      yPercent: 0,
      duration: 0.65,
      ease: "power3.out"
    }, "-=0.35");
  }

  /* ---------- ホイール入力 ---------- */
  let wheelAcc = 0;
  let wheelTimer = null;

  window.addEventListener("wheel", function (e) {
    e.preventDefault();
    if (isAnimating) return;

    wheelAcc += e.deltaY;
    clearTimeout(wheelTimer);

    wheelTimer = setTimeout(function () {
      wheelAcc = 0;
    }, 250);

    if (Math.abs(wheelAcc) > 50) {
      goTo(current + (wheelAcc > 0 ? 1 : -1));
      wheelAcc = 0;
      clearTimeout(wheelTimer);
    }
  }, { passive: false });

  /* ---------- タッチ入力 ---------- */
  let touchStartY = 0;

  window.addEventListener("touchstart", function (e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchend", function (e) {
    if (isAnimating) return;
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      goTo(current + (diff > 0 ? 1 : -1));
    }
  }, { passive: true });

  /* ---------- キーボード入力 ---------- */
  window.addEventListener("keydown", function (e) {
    if (isAnimating) return;
    if (e.key === "ArrowDown" || e.key === " ") {
      e.preventDefault();
      goTo(current + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      goTo(current - 1);
    }
  });

  /* ---------- ナビドットクリック ---------- */
  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      const idx = parseInt(this.dataset.index, 10);
      if (!isNaN(idx)) goTo(idx);
    });
  });

  /* ---------- 初期化 ---------- */
  updateUI(current);

  // 初回アニメーション
  if (typeof window.playSectionAnim === "function") {
    window.playSectionAnim(current);
  }
})();
