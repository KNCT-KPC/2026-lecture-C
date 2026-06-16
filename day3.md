---
theme: default
background: https://cover.sli.dev
class: text-center
colorSchema: light
highlighter: shiki
lineNumbers: false
info: |
  ## C言語講習会 Day 3
  変数と計算
drawings:
  persist: false
title: C言語講習会 Day 3 - 変数と計算
---

# C言語講習会 Day 3
## 変数とデータ型、そして計算

ここからはプログラミングの根幹である**「変数を扱う」「計算する」**方法を学びます。

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    はじめる <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# 今回やること

本日はプログラミングの根幹となる要素を一気に学びます！

1. **前回出した課題の解説**
2. **変数**
   - コンピューターに値を覚えさせよう
3. **各種演算**
   - 足し算とか引き算とか
4. **第三回の課題**

---

# 前回出した課題の解説

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 課題1の解説
ターミナルに「自分の名前 年齢」を出力するプログラム。そのまま `printf` で表示させればOKです。

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    printf("高専太郎 18歳\n");
    return 0;
}
```

</div>
</div>

<hr class="my-4" />

<div class="grid grid-cols-[1fr_1fr] gap-6 text-left">
<div>

### 課題2の解説
書式付き文字列 `%d` を使用して年齢を表示する。
1番目の引数に文字列を指定し、2番目以降の引数に `%d` に対応する値を入れることで置き換えられます。

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    printf("自分の年齢: %d 歳\n", 18);
    return 0;
}
```

</div>
</div>

---

# 1. 変数ってなんですか

**変数** ＝ 値を入れることができる「箱」みたいなやつです。
数字とか文字列とか、色々なデータを入れることができます。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### メモリの確保
- 変数を作ると、コンピューター上の「どこかのメモリ」を確保し、そこに値を入れます。
- **メモリを事前に確保しないといけない関係上、使う前に「宣言」しないといけません。**

</div>
<div>

```c
// 1. 箱を用意する (宣言)
// int(整数)を入れる箱に「age」という名前をつける
int age;

// 2. 箱にデータを入れる (代入)
// 「age」という箱に 18 を入れる
age = 18;
```

</div>
</div>

---

# 1-1. 変数の宣言と代入

<div class="text-xl font-bold text-center my-4 bg-gray-100 p-2 rounded dark:bg-gray-800">
型 変数名 = 値;
</div>

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 宣言のルール
- 変数の宣言をするには、上のように書きます。
- **型**は、その変数に「どういった種類の値が入るのか」を示します。
  - 整数、実数、文字列など…事前にコンピューターに分からせる必要があります。
- イコール(`=`)は**代入**を意味します。

</div>
<div>

### ⚠️ 初期化の重要性
変数を宣言した後は、**必ず初期化（値を入れること）**をしなければなりません！
初期化しないで使った場合、元々メモリが確保される前にあった値が使用されてしまいます。

```c
// 宣言と代入(初期化)を同時にやる
int score = 100;
```

</div>
</div>

---

# 1-2. 変数名の制約

変数名はなんでも良いわけではありません。以下の制約に従う必要があります。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### ルール
1. **アルファベット、数字、アンダーバー (`_`) のみ**使用できます。
2. **先頭の文字に数字を使うことはできません。**
3. C言語で予約されている語（`int`, `return` など）は使用できません。
4. **大文字と小文字は区別されます。**

</div>
<div>

<div class="p-4 bg-green-100 dark:bg-green-900 rounded">
💡 <b>超重要！</b><br>
変数名は、<b>「なんの値を持つのか分かりやすいように」</b>つけましょう！！！<br><br>
❌ 悪い例: <code>int a = 18;</code><br>
⭕ 良い例: <code>int age = 18;</code>
</div>

</div>
</div>

---

# 2. 変数：型の情報 (使用メモリ量)

Day 2で紹介した「データ型」。型によって**「使用するメモリ量」**が厳密に決まっています！

<div class="text-sm mt-4">

| 型名 | 値の種類 | 使用メモリ量 | 例 | 備考 |
|:---|:---|:---|:---|:---|
| **`int`** | 整数 | 4 バイト | `0`, `1`, `2` | |
| **`float`** | 浮動小数点 | 4 バイト | `1.0f`, `6.3f` | 後ろに `f` をつける |
| **`double`** | 倍精度浮動小数点 | 8 バイト | `3.1415` | 通常の小数にはこれを使う |
| **`char`** | 文字 | 1 バイト | `'a'`, `'b'` | ASCIIのみ |
| **`char*`** | 文字列 | 可変長 | `"あいう"` | 厳密には異なる |

</div>

<style>
th, td { padding-top: 0.1rem !important; padding-bottom: 0.1rem !important; }
table { margin-top: 0.5rem !important; margin-bottom: 0.5rem !important; }
</style>

<div class="mt-2 text-sm text-gray-600 dark:text-gray-400 text-left">
※代入する値は宣言時の型と適合している必要があります（例：数値型に文字列は代入できない）<br>
※void, struct, union, enum などもありますが、今回は割愛します
</div>

---

# 小演習：変数を使ってみましょう

試しに、自分で変数を宣言して出力してみましょう。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-8 text-left">
<div>

### やってみること
1. `int` 型の変数を宣言して好きな値を代入する
2. その値を `printf` で表示させる

※ 変数の値を表示させるには、第2回の課題2と同じように `%d` などのフォーマット指定子を使います！

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    // ここに変数の宣言と代入を書く
    
    // ここで printf を使って表示する

    return 0;
}
```

</div>
</div>

---

# 3. 演算 (いろいろ計算させる)

今度は、コンピューターに色々計算させて遊んでみましょう。
といっても、そこまで難しい内容ではありません。普通に式を書けばOKです！

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 計算の基本
- 計算順番も、数学や算数とほぼ変わりありません。
- 例: `1 + 2 * 3` なら、最初に `2 * 3` が計算されます。
- `()` かっこをつけることで、その中を先に計算させることもできます。

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    int num = 1 + 2 * 3;
    printf("計算結果: %d\n", num); // 7が出力される
    return 0;
}
```

</div>
</div>

---

# 3-1. 演算子のリスト

基本的な計算記号（演算子）のリストです。
数学の記号とは少し違うものがあるので注意してください。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

| 記号 | 意味 | 例 | 結果 |
|:---:|:---|:---|:---|
| **`+`** | 足し算 | `5 + 3` | `8` |
| **`-`** | 引き算 | `5 - 3` | `2` |
| **`*`** | 掛け算 | `5 * 3` | `15` |
| **`/`** | 割り算 | `10 / 2` | `5` |
| **`%`** | あまり | `10 % 3` | `1` |

</div>
<div>

<br>
<div class="p-4 bg-blue-100 dark:bg-blue-900 rounded text-sm">
💡 <b>ポイント</b><br>
掛け算は <code>×</code> ではなく <code>*</code>（アスタリスク）、割り算は <code>÷</code> ではなく <code>/</code>（スラッシュ）を使います。<br>
これ以外にも演算子は色々ありますが、今は上記だけで十分です！
</div>

</div>
</div>

---

# 4. 第三回の課題

### 課題内容
1つの整数を入力し、**それに10を掛けたものを出力する**プログラムを作成せよ。

**実行結果のイメージ:**
```bash
$ ./kadai2
5     <-- ※ここでユーザーがキーボードから「5」を入力してEnterを押す
50
```

<details class="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 text-sm">
  <summary class="cursor-pointer text-green-600 dark:text-green-400 select-none outline-none font-bold">
    💡 【ヒント1】ユーザーから入力を受け取る方法 (`scanf` 関数)
  </summary>

<div class="mt-2 pl-4 text-gray-700 dark:text-gray-300">
  
`printf` が出力なら、<b>入力を受け取るのは `scanf` (スキャンエフ) 関数</b>です。<br>
以下のように書くと、ユーザーが入力した整数を `num` という変数に保存できます。
  
```c
int num;
scanf("%d", &num); // ※変数の前に `&` (アンパサンド) をつけるのを忘れずに！
```

<details class="mt-3 p-2 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">
  <summary class="cursor-pointer text-orange-600 dark:text-orange-400 select-none outline-none font-bold">
    👀 【ヒント2】記述例を見る (ほぼ答えなので注意！)
  </summary>

<div class="mt-2 pl-2">

```c
#include <stdio.h>

int main(void) {
    int num;
    scanf("%d", &num); // 入力を受け取る

    int ans = num * 10; // 10を掛ける
    printf("%d\n", ans); // 結果を表示する

    return 0;
}
```

</div>
</details>

</div>
</details>
