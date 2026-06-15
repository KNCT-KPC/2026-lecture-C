---
theme: default
background: https://cover.sli.dev
class: text-center
colorSchema: light
highlighter: shiki
lineNumbers: false
info: |
  ## C言語講習会 Day 3
  変数と基本的な計算
drawings:
  persist: false
title: C言語講習会 Day 3 - 変数と計算
---

# C言語講習会 Day 3
## 変数とデータ型、そして計算

Day 2では「文字をそのまま画面に出す」という基本を学びました。
Day 3では、コンピュータの真骨頂である**「データを記憶する」「計算する」**方法を学びます！

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    はじめる <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# 本日のアジェンダ

本日はプログラミングの根幹となる要素を一気に学びます！

1. **`%d` の正体** (フォーマット指定子)
2. **変数とは** (値を入れておく箱)
3. **データ型のおさらい** (Day 2の伏線回収)
4. **式と演算子** (コンピュータに計算させる)
5. **本日の課題**

---

# 1. `%d` の正体 (フォーマット指定子)

Day 2の課題のヒントで出てきた `%d` について解説します。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### フォーマット指定子とは
- `printf` で数値を表示するための「埋め込み用の穴」
- `%d` は **d**ecimal (10進数の整数) の略
- 文字列のあとにカンマ `,` を打って、穴に埋め込む数値を渡す

</div>
<div>

```c
// 実行結果: 私の年齢は 18 歳です
printf("私の年齢は %d 歳です\n", 18);
```

<div class="mt-4 p-4 bg-orange-100 dark:bg-orange-900 rounded text-sm">
💡 <b>なぜ直接書かないの？</b><br>
今は <code>18</code> と直接書いていますが、この後学ぶ「変数」や「計算結果」を表示するために、この穴埋め機能が絶対に必要になります！
</div>

</div>
</div>

---

# 2. 変数とは (コンピュータに値を覚えてもらう)

**変数** とは、データ（数値や文字など）を一時的に記憶しておく「箱」のことです。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 変数を使うための2ステップ
1. **宣言**: 「どんな種類のデータを入れる箱か」をコンピュータに伝える
2. **代入**: 用意した箱にデータを保存する

### なぜ変数が必要？
同じデータを何度も使ったり、計算の途中の結果を覚えておいたりするため。

</div>
<div>

```c
// 1. 箱を用意する (宣言)
// int(整数)を入れる箱に「age」という名前をつける
int age;

// 2. 箱にデータを入れる (代入)
// 「age」という箱に 18 を入れる
age = 18;

// ※ まとめて書くこともできる (初期化)
int age = 18;
```

</div>
</div>

---

# 3. データ型のおさらい (Day 2の伏線回収)

Day 2の最後で見た「型（種類）」がここで登場します！変数（箱）を作るときは、**必ず入れるデータの種類（型）を決める** 必要があります。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### よく使う型とフォーマット指定子
| 型 | 意味 | フォーマット指定子 |
|:---|:---|:---|
| **`int`** | 整数 | `%d` |
| **`double`** | 小数 | `%f` (または `%lf`) |
| **`char`** | 1文字 | `%c` |

※ `double` 型を表示するときは `%d` ではなく `%f` を使います！

</div>
<div>

```c
// 整数用の箱 (int)
int score = 100;
printf("スコア: %d\n", score);

// 小数用の箱 (double)
double pi = 3.1415;
printf("円周率: %f\n", pi);

// 1文字用の箱 (char) ※シングルクォートで囲む
char rank = 'S';
printf("ランク: %c\n", rank);
```

</div>
</div>

---

# 4. 式と演算子 (コンピュータに計算させる)

コンピュータは計算機です。四則演算（足し算、引き算など）は以下の記号（演算子）を使って書きます。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 基本の演算子
| 計算 | 記号 (演算子) | 例 | 結果 |
|:---|:---:|:---|:---|
| 足し算 | **`+`** | `5 + 3` | `8` |
| 引き算 | **`-`** | `5 - 3` | `2` |
| 掛け算 | **`*`** | `5 * 3` | `15` |
| 割り算 | **`/`** | `10 / 2` | `5` |
| 余り | **`%`** | `10 % 3` | `1` |

※掛け算は `×` ではなく `*`、割り算は `÷` ではなく `/` を使います。

</div>
<div>

### 変数を使った計算
計算結果を変数に代入したり、変数同士で計算したりできます。

```c
int a = 10;
int b = 5;

// a と b を足した結果を sum に入れる
int sum = a + b;

printf("合計: %d\n", sum); // 15
```

</div>
</div>

---

# 5. 本日の課題

### 変数と計算を使ったプログラム

以下の要件を満たすC言語のプログラムを作成せよ。

1. ファイル名は `calc.c` とすること
2. 好きな整数を2つ選び、それぞれを変数に代入すること
3. その2つの変数の「足し算」「引き算」「掛け算」の結果を、`printf` とフォーマット指定子 `%d` を用いてターミナルに表示すること

**実行結果のイメージ:**
```bash
$ ./calc
足し算: 15
引き算: 5
掛け算: 50
```

<details class="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 text-sm">
  <summary class="cursor-pointer text-green-600 dark:text-green-400 select-none outline-none">
    💡 ヒントを見る (クリックで展開)
  </summary>

<div class="mt-2 pl-4 text-gray-700 dark:text-gray-300">

変数を3つ（例：`a`, `b`, `ans`）用意し、`ans = a + b;` のように計算結果を保存してから `printf("足し算: %d\n", ans);` のように表示すると分かりやすいです。
<br>
もちろん `printf("足し算: %d\n", a + b);` のように、直接計算式を埋め込むことも可能

</div>
</details>
