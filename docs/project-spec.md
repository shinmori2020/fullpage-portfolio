# フルページスナップスクロール ポートフォリオサイト — プロジェクト指示書

## 1. プロジェクト概要

スクロール操作に応じてセクション（ページ）が1枚ずつ切り替わる、フルページスナップスクロール方式のポートフォリオサイトを構築する。
プレゼンテーションのスライドのように、1画面=1セクションで情報を表示する。

---

## 2. フォルダ構造

以下のフォルダ構造でプロジェクトを作成すること。

```
portfolio-site/
├── index.html                  # メインHTML（パネル構造のみ）
│
├── css/
│   ├── base.css                # リセット・CSS変数・共通スタイル
│   ├── components.css          # ナビドット・進捗バー・カウンター等のUI部品
│   └── sections.css            # 各セクション固有のレイアウト・装飾
│
├── js/
│   ├── scroll-controller.js    # スナップスクロール制御（goTo / 入力ハンドラ）
│   └── section-animations.js   # セクション別アニメーション（再生・リセット）
│
├── images/
│   ├── hero/                   # Heroセクション用画像
│   ├── about/                  # Aboutセクション用画像
│   ├── works/                  # 制作実績サムネイル
│   │   ├── work-01.webp
│   │   ├── work-02.webp
│   │   └── ...
│   └── common/                 # ロゴ・ファビコン・OGP画像等
│       ├── logo.svg
│       ├── favicon.ico
│       └── ogp.jpg
│
└── docs/
    └── project-spec.md         # この指示書
```

### 各ファイルの役割と分割ルール

#### index.html

- HTMLの構造（パネル）のみを記述する
- CSS / JS は外部ファイルとして読み込む
- head 内の読み込み順序は以下の通り

```html
<!-- フォント -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- CSS -->
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/sections.css">

<!-- GSAP（body閉じタグ直前） -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>

<!-- アプリケーションJS -->
<script src="js/scroll-controller.js"></script>
<script src="js/section-animations.js"></script>
```

#### css/base.css

以下を含める：

- リセットスタイル（`*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }`）
- CSS変数の定義（`:root { ... }`）
- `html, body` の基本設定（`overflow: hidden; height: 100vh;`）
- `.panel` の基本スタイル（`position: fixed; opacity: 0; visibility: hidden;` 等）
- `.anim-hidden` ヘルパークラス
- レスポンシブのブレイクポイント共通定義

#### css/components.css

以下を含める：

- `.nav`（ナビゲーションドット）
- `.nav-dot`（各ドット + active状態 + ホバーラベル）
- `.progress-bar`（上部進捗バー）
- `.section-counter`（左下カウンター）
- `.section-label`（セクションラベルバッジ）
- 共通ボタンスタイル

#### css/sections.css

以下を含める：

- `.hero` セクション固有スタイル
- `.about` セクション固有スタイル
- `.works` セクション固有スタイル（カードグリッド含む）
- `.skills` セクション固有スタイル（スキルバー含む）
- `.contact` セクション固有スタイル
- セクション追加時はこのファイルに追記する

#### js/scroll-controller.js

以下を含める：

- GSAP プラグイン登録（`gsap.registerPlugin()`）
- パネル・ナビドット・カウンターの DOM 取得
- `goTo(index)` 関数 — セクション切り替えのコアロジック
- `updateUI(idx)` 関数 — ナビ・カウンター・進捗バー更新
- ホイール入力ハンドラ（累積50px超で発火、250msデバウンス）
- タッチ入力ハンドラ（50px超で発火）
- キーボード入力ハンドラ（↑↓/Space）
- ナビドットクリックハンドラ
- 初期化処理

#### js/section-animations.js

以下を含める：

- `resetSectionAnim(panel)` 関数 — アニメーション状態の初期化
- `playSectionAnim(idx)` 関数 — インデックスに応じたアニメーション再生
- 各セクション固有のアニメーション関数（`heroAnim()`, `aboutAnim()` 等）
- セクション追加時はこのファイルにアニメーション関数を追記し、`playSectionAnim` の switch に case を追加する

### セクション追加時の手順

新しいセクションを追加する場合、以下の4箇所を変更する：

1. **index.html** — `.panel` を追加（`data-section` に連番を付与）
2. **index.html** — `.nav-dot` を追加（`data-index` と `data-label` を設定）
3. **css/sections.css** — セクション固有のスタイルを追記
4. **js/section-animations.js** — アニメーション関数を追加し、switch に case を追記

```html
<!-- 例: セクション追加 -->
<section class="panel new-section" data-section="5">
  <h2 class="anim-hidden">新しいセクション</h2>
  <p class="anim-hidden">コンテンツ</p>
</section>
```

```html
<!-- 例: ナビドット追加 -->
<div class="nav-dot" data-index="5" data-label="New Section"></div>
```

```javascript
// 例: section-animations.js に追記
function newSectionAnim(p) {
  const els = p.querySelectorAll(".anim-hidden");
  els.forEach((el, i) => {
    gsap.set(el, { y: 32 });
    gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.13, ease: "power3.out" });
  });
}

// playSectionAnim() 内の switch に追加
case 5: newSectionAnim(p); break;
```

### セクション数が15枚以上になる場合

`index.html` の肥大化を防ぐため、セクションのHTMLを個別ファイルに分離する。

```
sections/
├── 01-hero.html
├── 02-about.html
├── 03-works.html
├── ...
└── 15-new-section.html
```

JS で `fetch()` を使って各ファイルを読み込み、動的にパネルを挿入する方式にする。
この場合、ローカルサーバー（VS Code Live Server 等）が必要になる。

---

## 3. 技術スタック

すべて **無料の範囲** で構成する。

| 項目 | 採用技術 | バージョン | 用途 |
|---|---|---|---|
| アニメーション | GSAP | 3.12.5 | セクション切り替え・要素モーション |
| スクロール制御 | ScrollTrigger（GSAPプラグイン） | 3.12.5 | スクロール検知・進捗管理 |
| スムーズスクロール | ScrollToPlugin（GSAPプラグイン） | 3.12.5 | ナビクリック時のスクロール移動 |
| フォント | Google Fonts | — | Outfit / Noto Sans JP |
| その他 | HTML / CSS / Vanilla JS | — | 外部フレームワーク不使用 |

### CDN URL

```
https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js
https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js
https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js
```

### ライセンス

- GSAP: 無料版は商用利用可（有料プラグイン Club GSAP を除く）
- ScrollTrigger / ScrollToPlugin: 無料プラグイン
- Google Fonts: SIL Open Font License

---

## 4. デザイン仕様

### デザイン方向性

**コーポレート・フォーマル** — 企業サイトのような信頼感・誠実さを重視。

### 配色（CSS変数で定義）

```css
:root {
  --bg-white: #ffffff;       /* メイン背景 */
  --bg-light: #f6f7f9;       /* セクション交互背景 */
  --bg-card: #ffffff;         /* カード背景 */
  --text-dark: #1a1e2c;       /* 見出しテキスト */
  --text-body: #4a4f63;       /* 本文テキスト */
  --text-muted: #8b90a0;      /* 補助テキスト */
  --border: #e2e4ea;          /* ボーダー・区切り線 */
  --accent: #2c5fcc;          /* アクセントカラー（ブルー） */
  --accent-light: #e8eefb;    /* アクセント薄 */
  --accent-hover: #1e4baa;    /* ホバー時アクセント */
}
```

### タイポグラフィ

| 用途 | フォント | ウェイト |
|---|---|---|
| 英語見出し・ラベル | Outfit | 300 / 400 / 500 / 600 / 700 |
| 日本語全般 | Noto Sans JP | 300 / 400 / 500 / 700 |

### デザインルール

- 白ベース × ブルーアクセントの配色を統一する
- 清潔感・信頼感を最優先する
- 角丸は `border-radius: 8〜12px` で統一し親しみやすさを加える
- グレインテクスチャ等の装飾は使わない
- カードにはボーダー（`1px solid var(--border)`）と控えめなシャドウを使用する
- テキストはビジネス寄りの表現にする（感性的・詩的な言い回しは避ける）
- セクション背景は `--bg-white` と `--bg-light` を交互に使い、視覚的な区切りを作る

---

## 5. スクロール仕様

### 切り替え方式

- ブラウザの通常スクロールは `overflow: hidden` で無効化する
- 全パネルを `position: fixed` で同位置に重ねる
- JS でパネルの `opacity` / `visibility` / `z-index` を制御して切り替える
- 1回の操作で1セクションが切り替わる（スナップ方式）

### 対応入力と発火条件

| 入力 | 発火条件 | 動作 |
|---|---|---|
| マウスホイール | 累積 deltaY > 50px（250msデバウンス） | 次/前セクションへ |
| タッチスワイプ | 移動量 > 50px | 次/前セクションへ |
| キーボード ↓ / Space | キー押下 | 次のセクションへ |
| キーボード ↑ | キー押下 | 前のセクションへ |
| ナビドットクリック | クリック | 指定セクションへジャンプ |

### トランジション

```
方向: index > current → 下方向, index < current → 上方向

現パネル退場:
  opacity: 1 → 0
  yPercent: 0 → (方向 * -6)
  duration: 0.55秒
  ease: power3.in

次パネル登場:
  opacity: 0 → 1
  yPercent: (方向 * 8) → 0
  duration: 0.65秒
  ease: power3.out
  delay: 0.2秒

アニメーション中はすべての入力をロックする（isAnimating フラグ）
```

### 固定UI要素

| 要素 | 位置 | 仕様 |
|---|---|---|
| ナビゲーションドット | 画面右端中央 | 現セクション=ブルー+拡大+リング表示、ホバー=ラベル表示 |
| プログレスバー | 画面上端 | 高さ3px、ブルー、進捗に応じて幅が変化 |
| セクションカウンター | 画面左下 | 「01 / 05」形式、現在番号はブルー |

---

## 6. セクション構成（デモ版）

| # | クラス名 | 背景 | レイアウト | 主な内容 |
|---|---|---|---|---|
| 01 | `.hero` | `--bg-white` | 中央揃え縦積み | バッジ、見出し、サブテキスト、スクロールヒント |
| 02 | `.about` | `--bg-light` | 2カラム（画像 + テキスト） | ラベル、見出し、説明文、数値カウンター×3 |
| 03 | `.works` | `--bg-white` | 見出し + 3列グリッド | セクション見出し、カード×6（ホバーで詳細表示） |
| 04 | `.skills` | `--bg-light` | 見出し + リスト | セクション見出し、スキルバー×5 |
| 05 | `.contact` | `--bg-white` | 中央揃え縦積み | ラベル、見出し、説明文、CTAボタン |

実制作時にセクション数・内容は変更される。上記はデモとしての構成。

---

## 7. セクション別アニメーション仕様

各セクションに遷移した瞬間にコンテンツアニメーションを再生する。
同じセクションに再度戻った場合は `resetSectionAnim()` でリセットしてから再生する。

### 共通ルール

- アニメーション対象の要素には `.anim-hidden` クラスを付与する（初期状態 `opacity: 0`）
- `gsap.set()` で開始位置を設定し、`gsap.to()` で最終位置へアニメーションする
- イージングは基本 `power3.out`、特別な場合のみ `power4.out` / `back.out` を使用する

### Hero

```
1. バッジ:       y: -20 → 0, fadeIn, 0.8秒
2. 見出し h1:    y: 40 → 0, fadeIn, 1秒,    delay: -0.5
3. サブテキスト:  y: 20 → 0, fadeIn, 0.8秒,  delay: -0.5
4. スクロールヒント: fadeIn, 0.6秒,           delay: -0.2
```

### About

```
1. 左ビジュアル:    x: -60 → 0, fadeIn, 0.85秒
2. 右テキスト要素:  x: 40 → 0, fadeIn, 0.6秒ずつ, 0.12秒スタガー
3. 数値カウンター:  0 → 目標値, 2秒, power2.out, snap: 1
```

### Works

```
1. ヘッダー:  y: 24 → 0, fadeIn, 0.65秒
2. カード群:  y: 40 → 0, scale: 0.96 → 1, 0.5秒, 0.07秒スタガー, back.out(1.1)
```

### Skills

```
1. ヘッダー:    y: 20 → 0, fadeIn, 0.6秒
2. 各アイテム:  x: ±24（交互） → 0, fadeIn, 0.45秒, 0.09秒スタガー
3. バー:        width: 0% → 目標%, 1秒, 各アイテム表示完了後に発火
```

### Contact

```
1. 全要素: y: 32 → 0, fadeIn, 0.7秒, 0.13秒スタガー
```

---

## 8. レスポンシブ対応

### ブレイクポイント

```css
/* タブレット */
@media (max-width: 900px) { ... }

/* スマートフォン */
@media (max-width: 768px) { ... }

/* 小型スマートフォン */
@media (max-width: 600px) { ... }
```

### セクション別の対応方針

| セクション | PC | タブレット | スマホ |
|---|---|---|---|
| Hero | そのまま | フォントサイズ縮小 | フォントサイズ縮小 |
| About | 2カラム | 2カラム（gap縮小） | 1カラム縦積み |
| Works | 3列グリッド | 2列グリッド | 1列グリッド |
| Skills | 横並び（名前+バー+%） | そのまま | 折り返し（バーが下に） |
| Contact | そのまま | そのまま | パディング調整 |
| ナビドット | 通常サイズ | 通常サイズ | 小型化、右端寄せ |

---

## 9. 画像に関するルール

- 形式は **WebP** を優先する（フォールバック不要）
- 実績サムネイルは **800×600px** を目安とする
- OGP画像は **1200×630px** で作成する
- ファビコンは `.ico` 形式で用意する
- ロゴは `.svg` 形式で用意する
- ファイル名はケバブケースで統一する（例: `work-01.webp`）
- `images/` 配下のフォルダはセクション単位で整理する

---

## 10. 今後の作業（TODO）

### フェーズ1: コンテンツ準備

- [ ] 掲載するセクション数の確定
- [ ] 各セクションのテキスト原稿の作成
- [ ] 使用する画像の準備とWebP変換
- [ ] ロゴ・ファビコン・OGP画像の準備

### フェーズ2: 実装

- [ ] フォルダ構造の作成
- [ ] base.css / components.css / sections.css の分割実装
- [ ] scroll-controller.js の実装
- [ ] section-animations.js の実装
- [ ] 各セクションのHTMLパネル実装
- [ ] レスポンシブ対応

### フェーズ3: 品質改善

- [ ] アクセシビリティ対応（フォーカス管理・aria属性）
- [ ] パフォーマンス最適化（画像遅延読み込み等）
- [ ] Core Web Vitals 計測

### フェーズ4: 公開準備

- [ ] OGP / meta 情報の設定
- [ ] ファビコンの設定
- [ ] SEO基本設定
- [ ] 全体品質チェック
- [ ] 本番環境へのデプロイ

---

## 11. 検討した代替技術と採用判断

| 技術 | 判断 | 理由 |
|---|---|---|
| CSS Scroll Snap | 不採用 | スナップのみでアニメーション制御が難しい |
| fullPage.js | 不採用 | 商用利用に有料ライセンスが必要 |
| Pageable | 不採用 | GSAPほどのアニメーション機能がない |
| Swiper.js | 不採用 | スライダー寄りで自由度が低い |
| Locomotive Scroll | 不採用 | スムーズスクロール向きでスナップ用途と異なる |

---

## 12. デザイン変更の経緯

| 段階 | デザイン方向性 | 主な特徴 |
|---|---|---|
| 初期案 | ラグジュアリー・ミニマル | ダーク背景、ゴールドアクセント、セリフ体、グレインテクスチャ |
| 方向転換 | コーポレート・フォーマル | 白ベース、ブルーアクセント、サンセリフ体、クリーンなUI |
| 最終方針 | コーポレート + スライド型 | 上記に加え、プレゼン風の多様なレイアウトを各パネルに適用 |

---

*最終更新: 2026年4月7日*
