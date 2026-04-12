# snap-portfolio — プロジェクト指示書

フルページスナップスクロール方式のポートフォリオサイト。
1画面=1セクションで、スクロール操作ごとにセクションが切り替わる。

---

## フォルダ構造

```
snap-portfolio/
├── CLAUDE.md
├── .claude/
│   └── skills/                 # Claude Code用スキル（手動配置済み）
├── index.html                  # メインHTML（パネル構造のみ）
├── css/
│   ├── base.css                # リセット・CSS変数・共通スタイル
│   ├── components.css          # ナビドット・進捗バー・カウンター等のUI部品
│   └── sections.css            # 各セクション固有のレイアウト・装飾
├── js/
│   ├── scroll-controller.js    # スナップスクロール制御（goTo / 入力ハンドラ）
│   └── section-animations.js   # セクション別アニメーション（再生・リセット）
├── images/
│   ├── hero/
│   ├── about/
│   ├── works/
│   └── common/                 # ロゴ・ファビコン・OGP画像
└── docs/
    └── project-spec.md         # 人間用の仕様書フル版
```

---

## 技術スタック

- GSAP 3.12.5（アニメーション）
- ScrollTrigger（スクロール検知）
- ScrollToPlugin（ナビクリック時のスクロール）
- Google Fonts: Outfit / Noto Sans JP
- フレームワーク不使用（HTML / CSS / Vanilla JS）

### CDN（bodyの閉じタグ直前で読み込む）

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
```

### index.html の読み込み順序

```html
<head>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/sections.css">
</head>
<body>
  <!-- パネル群 -->
  <!-- GSAP CDN -->
  <script src="js/scroll-controller.js"></script>
  <script src="js/section-animations.js"></script>
</body>
```

---

## 各ファイルの責務

### css/base.css

- リセット: `*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }`
- CSS変数の定義（`:root { ... }`）— 配色・フォントはここに集約
- `html, body { overflow: hidden; height: 100vh; overscroll-behavior: none; }`
- `.panel` の基本スタイル（`position: fixed; top: 0; left: 0; width: 100%; height: 100vh; opacity: 0; visibility: hidden; z-index: 1;`）
- `.panel.is-active { opacity: 1; visibility: visible; z-index: 10; }`
- `.anim-hidden { opacity: 0; }` ヘルパー

### css/components.css

- `.nav` — ナビゲーションドット（固定右端中央）
- `.nav-dot` — 各ドット + `.active` 状態 + ホバーラベル
- `.progress-bar` — 上部進捗バー（高さ3px）
- `.section-counter` — 左下カウンター（「01 / 05」形式）
- `.section-label` — セクションラベルバッジ
- 共通ボタンスタイル

### css/sections.css

- セクション固有のスタイル（`.hero`, `.about`, `.works`, `.skills`, `.contact`）
- セクション追加時はこのファイルに追記する

### js/scroll-controller.js

- `gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)`
- DOM取得（panels, dots, counterEl）
- `goTo(index)` — セクション切り替えのコア関数
- `updateUI(idx)` — ナビ・カウンター・進捗バー更新
- 入力ハンドラ（wheel / touch / keyboard / dot click）
- `isAnimating` フラグによるロック制御
- このファイルからは `resetSectionAnim()` と `playSectionAnim()` を呼び出す

### js/section-animations.js

- `resetSectionAnim(panel)` — `.anim-hidden` 要素とスキルバー・カウンターの初期化
- `playSectionAnim(idx)` — switch で各セクションのアニメーション関数を振り分け
- セクション固有のアニメーション関数（`heroAnim()`, `aboutAnim()` 等）
- セクション追加時はアニメーション関数を追加し、switch に case を追記する

---

## デザイン仕様

### 方向性

コーポレート・フォーマル。企業サイトのような信頼感・誠実さ・清潔感。

### 配色（CSS変数）

```css
:root {
  --bg-white: #ffffff;
  --bg-light: #f6f7f9;
  --bg-card: #ffffff;
  --text-dark: #1a1e2c;
  --text-body: #4a4f63;
  --text-muted: #8b90a0;
  --border: #e2e4ea;
  --accent: #2c5fcc;
  --accent-light: #e8eefb;
  --accent-hover: #1e4baa;
  --font-en: 'Outfit', sans-serif;
  --font-jp: 'Noto Sans JP', sans-serif;
}
```

### タイポグラフィ

| 用途 | フォント | ウェイト |
|---|---|---|
| 英語見出し・ラベル | Outfit | 300 / 400 / 500 / 600 / 700 |
| 日本語全般 | Noto Sans JP | 300 / 400 / 500 / 700 |

### デザインルール

- 白ベース × ブルーアクセント
- 角丸: `border-radius: 8〜12px`
- カード: `border: 1px solid var(--border)` + 控えめなシャドウ
- セクション背景: `--bg-white` と `--bg-light` を交互に使用
- グレインテクスチャ等の装飾は使わない
- テキストはビジネス寄りの表現（感性的・詩的な言い回しは避ける）

---

## スクロール仕様

### 切り替え方式

- 全パネルを `position: fixed` で同位置に重ねる
- JS で `opacity` / `visibility` / `z-index` を制御して切り替える
- 1操作 = 1セクション切り替え

### 入力と発火条件

| 入力 | 条件 |
|---|---|
| ホイール | 累積 deltaY > 50px、250msデバウンス |
| タッチ | 移動量 > 50px |
| キーボード ↓ / Space | 次へ |
| キーボード ↑ | 前へ |
| ナビドットクリック | 指定セクションへ |

### トランジション

```
現パネル退場:
  opacity: 1 → 0, yPercent: 0 → (方向 * -6)
  duration: 0.55s, ease: power3.in

次パネル登場:
  opacity: 0 → 1, yPercent: (方向 * 8) → 0
  duration: 0.65s, ease: power3.out, delay: 0.2s

方向: index > current → 1（下）, index < current → -1（上）
アニメーション中はすべての入力をロック（isAnimating フラグ）
```

---

## セクション別アニメーション仕様

対象要素には `.anim-hidden`（`opacity: 0`）を付与。
`gsap.set()` で開始位置、`gsap.to()` で最終位置へアニメーション。
セクション再訪問時は `resetSectionAnim()` でリセットしてから再生。

### Hero

```
バッジ:          y: -20 → 0, fadeIn, 0.8s
見出し h1:       y: 40 → 0, fadeIn, 1s, delay: -0.5
サブテキスト:    y: 20 → 0, fadeIn, 0.8s, delay: -0.5
スクロールヒント: fadeIn, 0.6s, delay: -0.2
```

### About

```
左ビジュアル:    x: -60 → 0, fadeIn, 0.85s
右テキスト群:    x: 40 → 0, fadeIn, 0.6s, 0.12sスタガー
数値カウンター:  0 → 目標値, 2s, power2.out, snap: 1
```

### Works

```
ヘッダー:  y: 24 → 0, fadeIn, 0.65s
カード群:  y: 40 → 0, scale: 0.96 → 1, 0.5s, 0.07sスタガー, back.out(1.1)
```

### Skills

```
ヘッダー:    y: 20 → 0, fadeIn, 0.6s
各アイテム:  x: ±24（交互）→ 0, fadeIn, 0.45s, 0.09sスタガー
バー:        width: 0% → 目標%, 1s, 各アイテム完了後に発火
```

### Contact

```
全要素: y: 32 → 0, fadeIn, 0.7s, 0.13sスタガー
```

---

## セクション追加手順

新しいセクションを追加する場合、以下の4箇所を変更する。

### 1. index.html — パネル追加

```html
<section class="panel new-section" data-section="5">
  <h2 class="anim-hidden">タイトル</h2>
  <p class="anim-hidden">コンテンツ</p>
</section>
```

### 2. index.html — ナビドット追加

```html
<div class="nav-dot" data-index="5" data-label="New Section"></div>
```

### 3. css/sections.css — スタイル追記

```css
.new-section {
  background: var(--bg-light);
  flex-direction: column;
}
```

### 4. js/section-animations.js — アニメーション追加

```javascript
// 関数を追加
function newSectionAnim(p) {
  const els = p.querySelectorAll(".anim-hidden");
  els.forEach((el, i) => {
    gsap.set(el, { y: 32 });
    gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.13, ease: "power3.out" });
  });
}

// playSectionAnim() の switch に追記
case 5: newSectionAnim(p); break;
```

パネル総数（TOTAL）は `panels` 配列から自動計算されるため変更不要。
カウンター表示の「/ 05」部分は index.html 側で手動更新が必要。

---

## レスポンシブ

### ブレイクポイント

```css
@media (max-width: 900px)  { /* タブレット */ }
@media (max-width: 768px)  { /* スマートフォン */ }
@media (max-width: 600px)  { /* 小型スマートフォン */ }
```

### セクション別方針

| セクション | PC | 768px以下 | 600px以下 |
|---|---|---|---|
| About | 2カラム | 1カラム縦積み | 同左 |
| Works | 3列グリッド | 2列 | 1列 |
| Skills | 横並び | 横並び | バーが折り返し |
| ナビドット | 通常 | 小型化 | 小型化 |
| panel padding | 60px 80px | 40px 24px | 同左 |

---

## 画像ルール

- 形式: WebP 優先
- 実績サムネイル: 800×600px 目安
- OGP画像: 1200×630px
- ファビコン: .ico
- ロゴ: .svg
- ファイル名: ケバブケース（例: `work-01.webp`）

---

## 15枚以上のセクション対応

セクション数が15枚を超える場合、HTMLの分離を検討する。

```
sections/
├── 01-hero.html
├── 02-about.html
└── ...
```

JS で `fetch()` を使って各ファイルを読み込み、動的にパネルを挿入する。
この場合ローカルサーバー（Live Server等）が必須。

---

## 参照スキル

作業フェーズに応じて以下のスキルを参照すること。

### 実装フェーズ

- `frontend-design` — HTML/CSS/JS 実装全般
- `ui-designer` — UIデザイン判断
- `interface-design` — ナビ・インタラクション設計
- `web-design-builder` — 構築フロー

### 品質改善フェーズ

- `accessibility` — フォーカス管理・aria属性
- `performance` — 遅延読み込み・画像最適化
- `core-web-vitals` — LCP/CLS/INP

### 公開準備フェーズ

- `seo` — meta・OGP・構造化データ
- `best-practices` — コード品質
- `web-quality-audit` — 総合チェック
