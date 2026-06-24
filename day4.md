---
theme: default
background: https://cover.sli.dev
class: text-center
colorSchema: light
highlighter: shiki
lineNumbers: false
info: |
  ## C言語講習会 Day 4
  比較と条件分岐
drawings:
  persist: false
title: C言語講習会 Day 4 - 比較と条件分岐
---

# C言語講習会 Day 4
## 比較と条件分岐

ここからは、プログラムに **「判断」** をさせて、状況に応じた動き（分岐）を作る方法を学びます

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    はじめる <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# 今回やること

1. **前回課題の解説** (`scanf`)
2. **条件分岐とは**
3. **`if` 文の基本**
4. **比較演算子と論理演算子**
5. **複数の条件 (`else if`, `else`)**
6. **`switch` 文**
7. **本日の課題**

---

# 前回出した課題の解説

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 課題の振り返り
「1つの整数を入力し、それに10を掛けたものを出力する」

`printf` と対になる入力関数 **`scanf`** を使います。
変数に値を保存するため、変数の前に `&` (アンパサンド) をつけるのが特徴です。

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    int num;
    
    // ユーザーからの入力を待つ
    scanf("%d", &num); 
    
    // 入力された値に10を掛けて出力
    int ans = num * 10;
    printf("%d\n", ans);
    
    return 0;
}
```

</div>
</div>

---

# 条件分岐とは

**「～という条件が満たされたら…を実行する」** という一連の流れを条件分岐といいます。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 日常生活での例
- 「もし寒いなら、暖房をつける」
- 「もしお腹が空いているなら、ご飯を食べる」

### プログラムでの例
- 「もしスコアが90点以上なら、『秀』と表示する」
- 「もしHPが0になったら、ゲームオーバーにする」

</div>
<div>

<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded mt-4">
<b>「お前のものは俺のもの、俺のものも俺のもの」</b><br><br>
条件1: それが「お前」のものであったとき<br>
  → 実行1: 「俺のものにする」<br>
条件2: それが「俺」のものであったとき<br>
  → 実行2: 「俺のものにする」
</div>

</div>
</div>

---

# `if` 文の基本構文

<div class="text-xl font-bold text-center my-4 bg-gray-100 p-2 rounded dark:bg-gray-800">
if (条件式) { // 真のときの処理 }
</div>

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### ルール
- **条件式** が評価され、結果が「真（条件を満たす）」のときに `{ }` 内の処理が実行されます。
- C言語では、真を `1`、偽を `0` として扱います（他の言語では `true` / `false` などと呼ばれることもあります）。

</div>
<div>

```c
int hp = 0;

// hpが0と等しいか？
if (hp == 0) {
    printf("ゲームオーバー！\n");
}
```

</div>
</div>

---

# 条件式に使う「比較演算子」

条件式には、値同士を比べる「比較演算子」を使います。

<div class="text-sm mt-4">

| 演算子 | 意味 | 使用例 |
|:---:|:---|:---|
| **`==`** | 等しい | `A == B` (AとBは等しい) |
| **`!=`** | 等しくない | `A != B` (AとBは等しくない) |
| **`>`** | 大きい | `A > B` (AはBより大きい) |
| **`<`** | 小さい | `A < B` (AはBより小さい) |
| **`>=`** | 以上 | `A >= B` (AはB以上である) |
| **`<=`** | 以下 | `A <= B` (AはB以下である) |

</div>

<style>
code, .shiki {
  font-variant-ligatures: none !important;
}
</style>

<div class="mt-4 p-4 bg-orange-100 dark:bg-orange-900 rounded text-sm text-left">
💡 <b>注意！</b> 「等しい」をチェックするときは <code>=</code> ではなく <b><code>==</code>（イコール2つ）</b> です！<br>
<code>=</code> 1つだけだと「代入（変数に値を入れる）」になってしまいます。
</div>

---

# 複雑な条件を作る「論理演算子」

複数の条件を組み合わせたり、条件を反転させたりできます。

<div class="text-sm mt-4">

| 演算子 | 読み方 | 意味 | 使用例 |
|:---:|:---:|:---|:---|
| **`&&`** | AND (かつ) | 両方の条件が満たされていれば真 | `x < 10 && y >= 5`<br>(xが10未満 かつ yが5以上) |
| **<code>&#124;&#124;</code>** | OR (または) | 少なくとも一方の条件が満たされていれば真 | <code>x == 0 &#124;&#124; y == 0</code><br>(xが0 または yが0) |
| **`!`** | NOT (否定) | 条件を満たしていなければ真（反転） | `!(x == 0)`<br>(xは0ではない) |

</div>

---

# 偽だったときの処理 (`else`)

条件が満たされなかったとき（偽のとき）の処理を追加するには、`else` を使います。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### `else` の使い方
- `if` の閉じカッコ `}` の直後に `else { }` を書きます。
- 「もし～ならAをする、そうでなければBをする」という形になります。

</div>
<div>

```c
int age = 18;

if (age >= 20) {
    printf("お酒が飲めます。\n");
} else {
    printf("まだお酒は飲めません。\n");
}
```

</div>
</div>

---

# 複数の条件分岐 (`else if`)

条件が当てはまらなかったときに、**別の条件で再評価**するには `else if` を使います。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### `else if` の使い方
- 上から順番に評価され、条件が一致した最初のブロックだけが実行されます。
- `else if` はいくつでも繋げることができます。
- `else if` の前に `else` を書くことはできません。

</div>
<div>

```c
int score = 75;

if (score >= 90) {
    printf("秀\n");
} else if (score >= 80) {
    printf("優\n");
} else if (score >= 70) {
    printf("良\n");
} else {
    printf("不可\n");
}
```

</div>
</div>

---

# 多分岐をスッキリ書く (`switch` 文)

特定の値に対する分岐がたくさんある場合は、`switch` 文を使うと綺麗に書けます。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### `switch` のルール
- `case 定数:` で分岐を作ります。
- 処理の最後には必ず **`break;`** を書きます。
  - これを忘れると、次の `case` の処理まで実行されてしまいます！
- どの `case` にも一致しなかった場合は `default:` が実行されます。

</div>
<div>

```c
int rank = 2;

switch (rank) {
    case 1:
        printf("金メダル！\n");
        break;
    case 2:
        printf("銀メダル！\n");
        break;
    default:
        printf("参加賞！\n");
        break;
}
```

</div>
</div>

---

# 第四回の課題

以下の3つのプログラムを作成せよ（ファイル名は任意）。<br>
すべて、最初に `scanf` でユーザーからの入力を受け取ること。

1. **偶奇判定**
   - 整数を受け取り、それが「偶数」か「奇数」かを出力するプログラム。
2. **成績評価**
   - 点数を受け取り、その点数に基づいて評価を出力するプログラム。
   - 評価： 90点以上は「秀」、80点以上は「優」、70点以上は「良」、60点以上は「可」、60点未満は「不可」
3. **月の名前**
   - 1から12までの整数を受け取り、その数に対応する月の名前(英語)を表示するプログラム。
   - 例) `12` が入力されたら `December` を出力する。

<div class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm text-left">
💡 <b>ヒント</b><br>
課題1は「2で割った余りが0なら偶数」と考えます。<br>
課題2は <code>if</code> ~ <code>else if</code> を使うと書きやすいです。<br>
課題3は値が特定されているので <code>switch</code> 文がぴったりです！
</div>

---

# 次回予定

次回は、同じ処理を何度も繰り返す方法を学びます！

- **繰り返し処理** (`for`文, `while`文)
