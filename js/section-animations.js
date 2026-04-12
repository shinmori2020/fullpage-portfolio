/* ========================================
   section-animations.js — セクション別アニメーション
   ======================================== */

(function () {
  "use strict";

  /* ---------- リセット ---------- */
  function resetSectionAnim(panel) {
    // .anim-hidden 要素をリセット
    panel.querySelectorAll(".anim-hidden").forEach(function (el) {
      gsap.set(el, { opacity: 0, x: 0, y: 0, scale: 1, clearProps: "transform" });
    });

    // スキルバーのリセット（将来用）
    panel.querySelectorAll("[data-bar]").forEach(function (bar) {
      gsap.set(bar, { width: "0%" });
    });

    // カウンターのリセット（将来用）
    panel.querySelectorAll("[data-count]").forEach(function (el) {
      el.textContent = "0";
    });
  }

  /* ---------- 振り分け ---------- */
  function playSectionAnim(idx) {
    var p = document.querySelectorAll(".panel")[idx];
    if (!p) return;

    switch (idx) {
      case 0: slide1Anim(p); break;
      case 1: slide2Anim(p); break;
      case 2: slide3Anim(p); break;
      case 3: slide4Anim(p); break;
      case 4: slide5Anim(p); break;
      case 5: slide6Anim(p); break;
      case 6: slide7Anim(p); break;
      case 7: slide8Anim(p); break;
      case 8: slide9Anim(p); break;
      case 9: slide10Anim(p); break;
      case 10: slide11Anim(p); break;
      case 11: slide12Anim(p); break;
      case 12: slide13Anim(p); break;
      case 13: slide14Anim(p); break;
      case 14: slide9Anim(p); break;
      case 15: slide16Anim(p); break;
      case 16: slide17Anim(p); break;
      case 17: slide18Anim(p); break;
      case 18: slide19Anim(p); break;
      case 19: slide20Anim(p); break;
      case 20: slide22Anim(p); break;
      case 21: slide23Anim(p); break;
      case 22: slide24Anim(p); break;
      // 新しいスライドはここに追加
    }
  }

  /* ---------- スライド1: カバー / Hero ---------- */
  function slide1Anim(p) {
    var tl = gsap.timeline();
    var title    = p.querySelector(".slide-1__title");
    var subtitle = p.querySelector(".slide-1__subtitle");

    // タイトル
    if (title) {
      gsap.set(title, { y: 40 });
      tl.to(title, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    }

    // サブテキスト
    if (subtitle) {
      gsap.set(subtitle, { y: 20 });
      tl.to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }
  }

  /* ---------- スライド2: 目次 / Contents ---------- */
  function slide2Anim(p) {
    var tl = gsap.timeline();
    var photo = p.querySelector(".slide-2__left");
    var title = p.querySelector(".slide-2__title");
    var items = p.querySelectorAll(".slide-2__item");

    // 左: 写真エリア
    if (photo) {
      gsap.set(photo, { x: -60 });
      tl.to(photo, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" });
    }

    // 中央: 縦書きタイトル
    if (title) {
      gsap.set(title, { y: 30 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
    }

    // 右: 目次リスト（スタガー）
    items.forEach(function (item, i) {
      gsap.set(item, { x: 40 });
      tl.to(item, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "-=0.35");
    });
  }

  /* ---------- スライド3: パート区切り + About導入 ---------- */
  function slide3Anim(p) {
    var tl = gsap.timeline();
    var part  = p.querySelector(".slide-3__part");
    var icon  = p.querySelector(".slide-3__icon");
    var title = p.querySelector(".slide-3__title");
    var desc  = p.querySelector(".slide-3__desc");
    var btn   = p.querySelector(".slide-3__btn");
    var photo = p.querySelector(".slide-3__right");

    // PART ONE
    if (part) {
      gsap.set(part, { y: 30 });
      tl.to(part, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    }

    // ▶ アイコン
    if (icon) {
      tl.to(icon, { opacity: 1, duration: 0.4, ease: "power3.out" }, "-=0.4");
    }

    // タイトル
    if (title) {
      gsap.set(title, { y: 30 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3");
    }

    // 説明文
    if (desc) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }

    // ボタン
    if (btn) {
      gsap.set(btn, { y: 15 });
      tl.to(btn, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    }

    // 右の写真
    if (photo) {
      gsap.set(photo, { x: 60 });
      tl.to(photo, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" }, "-=0.6");
    }
  }

  /* ---------- スライド24: ステップ / 番号付きリスト ---------- */
  function slide24Anim(p) {
    var tl = gsap.timeline();
    var photo = p.querySelector(".slide-24__left");
    var steps = p.querySelectorAll(".slide-24__step");

    if (photo) {
      gsap.set(photo, { x: -60 });
      tl.to(photo, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" });
    }
    steps.forEach(function (step) {
      gsap.set(step, { x: 30 });
      tl.to(step, { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" }, "-=0.35");
    });
  }

  /* ---------- スライド23: Analysis Slide ---------- */
  function slide23Anim(p) {
    var tl = gsap.timeline();
    var steps  = p.querySelectorAll(".slide-23__step");
    var circle = p.querySelector(".slide-23__circle");

    steps.forEach(function (step) {
      gsap.set(step, { x: -30 });
      tl.to(step, { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" }, "-=0.3");
    });
    if (circle) {
      gsap.set(circle, { scale: 0.85 });
      tl.to(circle, { opacity: 1, scale: 1, duration: 0.85, ease: "power3.out" }, "-=0.5");
    }
  }

  /* ---------- スライド22: Image Gallery ---------- */
  function slide22Anim(p) {
    var tl = gsap.timeline();
    var tall   = p.querySelector(".slide-22__photo-tall");
    var smalls = p.querySelectorAll(".slide-22__photo-small");
    var title  = p.querySelector(".slide-22__title");
    var desc   = p.querySelector(".slide-22__desc");
    var icons  = p.querySelector(".slide-22__icons");

    if (tall) {
      gsap.set(tall, { x: -40 });
      tl.to(tall, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
    }
    smalls.forEach(function (s) {
      gsap.set(s, { y: 30 });
      tl.to(s, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    });
    if (title) {
      gsap.set(title, { y: 25 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.4");
    }
    if (desc) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35");
    }
    if (icons) {
      gsap.set(icons, { y: 15 });
      tl.to(icons, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    }
  }

  /* ---------- スライド20: Mockups Slide / スマホモックアップ ---------- */
  function slide20Anim(p) {
    var tl = gsap.timeline();
    var title  = p.querySelector(".slide-20__title");
    var desc   = p.querySelector(".slide-20__desc");
    var stats  = p.querySelector(".slide-20__stats");
    var back   = p.querySelector(".slide-20__phone--back");
    var front  = p.querySelector(".slide-20__phone--front");

    if (title) {
      gsap.set(title, { y: 25 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    }
    if (desc) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }
    if (stats) {
      gsap.set(stats, { y: 15 });
      tl.to(stats, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    }
    if (back) {
      gsap.set(back, { x: -40 });
      tl.to(back, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
    }
    if (front) {
      gsap.set(front, { x: 40 });
      tl.to(front, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
    }
  }

  /* ---------- スライド19: Our Business / 3カラム ---------- */
  function slide19Anim(p) {
    var tl = gsap.timeline();
    var title    = p.querySelector(".slide-19__title");
    var desc     = p.querySelector(".slide-19__desc");
    var leftCol  = p.querySelector(".slide-19__col:first-child .slide-19__feature");
    var photo    = p.querySelector(".slide-19__photo");
    var rightCol = p.querySelector(".slide-19__col:last-child .slide-19__feature");

    if (title) {
      gsap.set(title, { y: 20 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    }
    if (desc) {
      gsap.set(desc, { y: 15 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }
    if (leftCol) {
      gsap.set(leftCol, { x: -30 });
      tl.to(leftCol, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "-=0.2");
    }
    if (photo) {
      gsap.set(photo, { y: 20 });
      tl.to(photo, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
    }
    if (rightCol) {
      gsap.set(rightCol, { x: 30 });
      tl.to(rightCol, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
    }
  }

  /* ---------- スライド18: Chart Slide / データカード ---------- */
  function slide18Anim(p) {
    var tl = gsap.timeline();
    var photo  = p.querySelector(".slide-18__left");
    var blueBg = p.querySelector(".slide-18__left-bg");
    var title  = p.querySelector(".slide-18__title");
    var desc   = p.querySelector(".slide-18__desc");
    var charts = p.querySelectorAll(".slide-18__chart");

    if (photo) {
      gsap.set(photo, { x: -60 });
      tl.to(photo, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" });
    }
    if (blueBg) {
      gsap.set(blueBg, { x: 30 });
      tl.to(blueBg, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
    }
    if (title) {
      gsap.set(title, { y: 25 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
    }
    if (desc) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35");
    }
    charts.forEach(function (chart) {
      gsap.set(chart, { y: 20 });
      tl.to(chart, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    });
  }

  /* ---------- スライド17: Chart Slide ---------- */
  function slide17Anim(p) {
    var tl = gsap.timeline();
    var title    = p.querySelector(".slide-17__title");
    var desc     = p.querySelector(".slide-17__desc");
    var items    = p.querySelectorAll(".slide-17__item");
    var decos    = p.querySelectorAll(".slide-17__diamond-deco");
    var diamond  = p.querySelector(".slide-17__diamond");

    if (title) {
      gsap.set(title, { y: 25 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    }
    if (desc) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }
    items.forEach(function (item) {
      gsap.set(item, { x: -20 });
      tl.to(item, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    });
    decos.forEach(function (deco) {
      gsap.set(deco, { scale: 0.8 });
      tl.to(deco, { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }, "-=0.6");
    });
    if (diamond) {
      gsap.set(diamond, { scale: 0.8 });
      tl.to(diamond, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.1)" }, "-=0.5");
    }
  }

  /* ---------- スライド16: Our Business ---------- */
  function slide16Anim(p) {
    var tl = gsap.timeline();
    var title = p.querySelector(".slide-16__title");
    var desc  = p.querySelector(".slide-16__desc");
    var items = p.querySelectorAll(".slide-16__item");

    if (title) {
      gsap.set(title, { y: -20 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    }
    if (desc) {
      gsap.set(desc, { y: 15 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }
    items.forEach(function (item) {
      gsap.set(item, { y: 30 });
      tl.to(item, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.1)" }, "-=0.3");
    });
  }

  /* ---------- スライド14: Workflow Slide ---------- */
  function slide14Anim(p) {
    var tl = gsap.timeline();
    var title = p.querySelector(".slide-14__title");
    var desc  = p.querySelector(".slide-14__desc");
    var photo = p.querySelector(".slide-14__photo-right");

    if (title) {
      gsap.set(title, { y: 25 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    }
    if (desc) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35");
    }
    if (photo) {
      gsap.set(photo, { x: 60 });
      tl.to(photo, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" }, "-=0.6");
    }
  }

  /* ---------- スライド13: Mockups Slide（スライド4流用） ---------- */
  function slide13Anim(p) {
    var tl = gsap.timeline();
    var photo = p.querySelector(".slide-13__left");
    var title = p.querySelector(".slide-13__title");
    var desc  = p.querySelector(".slide-13__desc");

    if (photo) {
      gsap.set(photo, { x: -60 });
      tl.to(photo, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" });
    }
    if (title) {
      gsap.set(title, { y: 30 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
    }
    if (desc) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35");
    }
  }

  /* ---------- スライド12: Our Business Table ---------- */
  function slide12Anim(p) {
    var tl = gsap.timeline();
    var title = p.querySelector(".slide-12__title");
    var desc  = p.querySelector(".slide-12__desc");
    var cards = p.querySelectorAll(".slide-12__card");

    if (title) {
      gsap.set(title, { y: 25 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    }
    if (desc) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }
    cards.forEach(function (card) {
      gsap.set(card, { y: 40, scale: 0.96 });
      tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.1)" }, "-=0.3");
    });
  }

  /* ---------- スライド11: Image Gallery ---------- */
  function slide11Anim(p) {
    var tl = gsap.timeline();
    var back  = p.querySelector(".slide-11__photo-back");
    var front = p.querySelector(".slide-11__photo-front");
    var title = p.querySelector(".slide-11__title");
    var desc  = p.querySelector(".slide-11__desc");
    var items = p.querySelectorAll(".slide-11__item");

    // 後ろの写真
    if (back) {
      gsap.set(back, { x: -40 });
      tl.to(back, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
    }
    // 手前の写真
    if (front) {
      gsap.set(front, { x: -20, y: 20 });
      tl.to(front, { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
    }
    // タイトル
    if (title) {
      gsap.set(title, { y: 25 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.5");
    }
    // 説明文
    if (desc) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35");
    }
    // アイテム（スタガー）
    items.forEach(function (item) {
      gsap.set(item, { x: 30 });
      tl.to(item, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    });
  }

  /* ---------- スライド10: About Our CEO ---------- */
  function slide10Anim(p) {
    var tl = gsap.timeline();
    var title    = p.querySelector(".slide-10__title");
    var desc     = p.querySelector(".slide-10__desc");
    var features = p.querySelectorAll(".slide-10__feature");
    var photo    = p.querySelector(".slide-10__right");

    if (title) {
      gsap.set(title, { y: 30 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    }
    if (desc) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }
    features.forEach(function (f) {
      gsap.set(f, { y: 20 });
      tl.to(f, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    });
    if (photo) {
      gsap.set(photo, { x: 60 });
      tl.to(photo, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" }, "-=0.6");
    }
  }

  /* ---------- スライド9: PART TWO + Our Works ---------- */
  function slide9Anim(p) {
    var tl = gsap.timeline();
    var part  = p.querySelector(".slide-9__part");
    var icon  = p.querySelector(".slide-9__icon");
    var title = p.querySelector(".slide-9__title");
    var desc  = p.querySelector(".slide-9__desc");
    var btn   = p.querySelector(".slide-9__btn");
    var photo = p.querySelector(".slide-9__right");

    if (part) {
      gsap.set(part, { y: 30 });
      tl.to(part, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    }
    if (icon) {
      tl.to(icon, { opacity: 1, duration: 0.4, ease: "power3.out" }, "-=0.4");
    }
    if (title) {
      gsap.set(title, { y: 30 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3");
    }
    if (desc) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }
    if (btn) {
      gsap.set(btn, { y: 15 });
      tl.to(btn, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    }
    if (photo) {
      gsap.set(photo, { x: 60 });
      tl.to(photo, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" }, "-=0.6");
    }
  }

  /* ---------- スライド8: Business Slide ---------- */
  function slide8Anim(p) {
    var tl = gsap.timeline();
    var title = p.querySelector(".slide-8__title");
    var desc  = p.querySelector(".slide-8__desc");
    var stats = p.querySelectorAll(".slide-8__stat");
    var photo = p.querySelector(".slide-8__photo");
    var name  = p.querySelector(".slide-8__name");
    var pDesc = p.querySelector(".slide-8__person-desc");

    // 左: タイトル
    if (title) {
      gsap.set(title, { y: 30 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    }

    // 左: 説明文
    if (desc) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }

    // 左: 数値アイコン（スタガー）
    stats.forEach(function (stat, i) {
      gsap.set(stat, { y: 20 });
      tl.to(stat, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, "-=0.25");
    });

    // 右: 写真
    if (photo) {
      gsap.set(photo, { scale: 0.9 });
      tl.to(photo, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.1)" }, "-=0.5");
    }

    // 右: 名前
    if (name) {
      gsap.set(name, { y: 15 });
      tl.to(name, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    }

    // 右: 説明文
    if (pDesc) {
      gsap.set(pDesc, { y: 15 });
      tl.to(pDesc, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    }
  }

  /* ---------- スライド7: Our Service ---------- */
  function slide7Anim(p) {
    var tl = gsap.timeline();
    var part     = p.querySelector(".slide-7__part");
    var photo    = p.querySelector(".slide-7__photo");
    var services = p.querySelectorAll(".slide-7__service");

    // PART テキスト
    if (part) {
      gsap.set(part, { y: 30 });
      tl.to(part, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    }

    // 写真
    if (photo) {
      gsap.set(photo, { y: -30 });
      tl.to(photo, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
    }

    // サービスアイテム（スタガー）
    services.forEach(function (item, i) {
      gsap.set(item, { y: 30 });
      tl.to(item, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    });
  }

  /* ---------- スライド6: チームメンバー紹介 ---------- */
  function slide6Anim(p) {
    var tl = gsap.timeline();
    var title = p.querySelector(".slide-6__title");
    var cards = p.querySelectorAll(".slide-6__card");

    // タイトル
    if (title) {
      gsap.set(title, { y: -20 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    }

    // カード（スタガー、下から）
    cards.forEach(function (card, i) {
      gsap.set(card, { y: 40, scale: 0.96 });
      tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.1)" }, "-=0.35");
    });
  }

  /* ---------- スライド5: サービス紹介 ---------- */
  function slide5Anim(p) {
    var tl = gsap.timeline();
    var items = p.querySelectorAll(".slide-5__item");
    var photo = p.querySelector(".slide-5__right");

    // 左: サービスアイテム（スタガー）
    items.forEach(function (item, i) {
      gsap.set(item, { x: -30 });
      tl.to(item, { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" }, i === 0 ? "0" : "-=0.3");
    });

    // 右: 写真
    if (photo) {
      gsap.set(photo, { x: 60 });
      tl.to(photo, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" }, "-=0.6");
    }
  }

  /* ---------- スライド4: Welcome / 左画像+右テキスト ---------- */
  function slide4Anim(p) {
    var tl = gsap.timeline();
    var photo = p.querySelector(".slide-4__left");
    var title = p.querySelector(".slide-4__title");
    var descs = p.querySelectorAll(".slide-4__desc");

    // 左: 写真
    if (photo) {
      gsap.set(photo, { x: -60 });
      tl.to(photo, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" });
    }

    // タイトル
    if (title) {
      gsap.set(title, { y: 30 });
      tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
    }

    // 説明文（スタガー）
    descs.forEach(function (desc, i) {
      gsap.set(desc, { y: 20 });
      tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35");
    });
  }

  /* ---------- グローバルに公開 ---------- */
  window.resetSectionAnim = resetSectionAnim;
  window.playSectionAnim  = playSectionAnim;
})();
