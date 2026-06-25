---
theme: default
background: https://cover.sli.dev
class: text-center
colorSchema: light
highlighter: shiki
lineNumbers: false
info: |
  ## C言語講習会 Day 5
  繰り返し処理
drawings:
  persist: false
title: C言語講習会 Day 5 - 繰り返し処理
---

# C言語講習会 Day 5
## 繰り返し処理

今回は、コンピュータの最大の強みである **「単純作業を爆速で繰り返す」** 方法を学びます！

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    はじめる <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# 今回やること

1. **前回課題の解説** (`if`, `switch`)
2. **繰り返しとは**
3. **`for` 文** (回数が決まっている繰り返し)
4. **`while` 文** (条件を満たす間の繰り返し)
5. **`do-while` 文**
6. **ループの制御 (`break`, `continue`)**
7. **ネストしたループ**
8. **本日の課題**

---

# 前回出した課題の解説 (偶奇判定)

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 課題1: 偶数か奇数か
「2で割った余りが0なら偶数」という性質を利用して `if` 文で分岐させます。

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    int num;
    scanf("%d", &num);
    
    // 2で割った余り (%) をチェック
    if (num % 2 == 0) {
        printf("偶数です\n");
    } else {
        printf("奇数です\n");
    }
    
    return 0;
}
```

</div>
</div>

---

# 繰り返し処理とは

コンピュータは「繰り返し」が大得意です。<br>
人間がやると数日かかる計算も、一瞬（めちゃくちゃ早いスピード）で終わらせてくれます。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### C言語の繰り返し構文
用途に合わせて、主に以下の3種類を使い分けます。
1. **`for`** (フォー)
2. **`while`** (ホワイル)
3. **`do-while`** (ドゥーホワイル)

</div>
<div>

<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded mt-4">
💡 <b>なぜ繰り返しが必要？</b><br><br>
「画面に "Hello" を100回表示して」と言われたとき、<code>printf</code> を100行コピペするのは大変ですよね。繰り返し構文を使えば、たった3行で書くことができます！
</div>

</div>
</div>

---

# `for` 文 (回数が決まっている繰り返し)

「〇〇回繰り返す」と決まっている場合は **`for` 文** を使うと便利です。

<div class="text-xl font-bold text-center my-4 bg-gray-100 p-2 rounded dark:bg-gray-800">
for (初期化式; 反復条件; 変化式) { // 処理... }
</div>

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 各パーツの役割
1. **初期化式**: カウンタ変数を準備する (`int i = 0`)
2. **反復条件**: いつまで繰り返すか (`i < 7`)
3. **変化式**: 1周終わるごとにどうするか (`i++` ※1増やす)

</div>
<div>

```c
// iを0からスタートし、7未満の間、iを1ずつ増やす
for (int i = 0; i < 7; i++) {
    printf("%d回目の処理です\n", i);
}

// ※ i++ は「i = i + 1」の省略形です
```

</div>
</div>

---

# `while` 文 (条件を満たす間の繰り返し)

「何回繰り返すかわからないけど、特定の条件を満たす間ずっと繰り返したい」ときは **`while` 文** が便利

<div class="text-xl font-bold text-center my-4 bg-gray-100 p-2 rounded dark:bg-gray-800">
while (反復条件) { // 処理... }
</div>

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 無限ループ
反復条件に `1` (常に真) を入れると、永遠に繰り返す**無限ループ**になります。<br>
※ゲームエンジンなどは、無限ループで画面の描画をずっと更新し続けています。

</div>
<div>

```c
int hp = 100;

// hpが0より大きい間、繰り返す
while (hp > 0) {
    printf("ダメージを受けた！\n");
    hp = hp - 20;
}

// --- 無限ループの例 ---
// while (1) {
//     printf("止まらないよ！");
// }
```

</div>
</div>

---

# `do-while` 文 (最低1回は実行する)

「条件を満たす間繰り返したいけど、**条件にかかわらず最低1回は必ず実行したい！**」というわがままに対応するのが **`do-while` 文** です。

<div class="text-xl font-bold text-center my-4 bg-gray-100 p-2 rounded dark:bg-gray-800">
do { // 処理... } while (反復条件);
</div>

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 判定のタイミング
- `while`: 処理の **前** に条件を評価する
- `do-while`: 処理の **後** に条件を評価する

</div>
<div>

```c
// ※条件式に「0 (偽)」を入れた例
// (無駄なコードですが、デバッグ時には便利かもです)

do {
    printf("条件を満たしていなくても1回は表示される\n");
} while (0);
```

</div>
</div>

---

# ループの制御 (`break` と `continue`)

ループの途中で強制的に終了したり、次の周へスキップしたりすることができます。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### `break` (ループから抜ける)
特定の条件になったらループを完全に終了します。（Day 4の `switch` で使ったものと同じです）

```c
for (int i = 0; i < 100; i++) {
    if (i == 3) {
        break; // iが3になったらループを強制終了
    }
    printf("%d ", i);
}
// 出力: 0 1 2
```

</div>
<div>

### `continue` (次の周へスキップ)
その周の残りの処理を飛ばして、次の周の先頭（反復条件の判定）にジャンプします。

```c
for (int i = 0; i < 5; i++) {
    if (i == 2) {
        continue; // iが2の時はスキップ
    }
    printf("%d ", i);
}
// 出力: 0 1 3 4
```

</div>
</div>

---

# ネストしたループ (二重ループ)

ループの中に、さらにループを書くことができます。これを **ネスト（入れ子）** と呼びます。

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### どう動く？
外側のループが1周する間に、内側のループがすべて回りきります。<br>
時計の「分」と「秒」のような関係です。

表やマス目（縦と横の座標）を処理する時によく使われます。

</div>
<div>

```c
// 九九の表を作る例
for (int i = 1; i <= 9; i++) {
    for (int j = 1; j <= 9; j++) {
        // %2d は「2桁分の幅を確保して表示する」という意味
        printf("%2d ", i * j); 
    }
    printf("\n"); // 1行終わるごとに改行
}
```

</div>
</div>

---

# 第五回の課題 (1/2)

今日は「繰り返し」と、前回学んだ「条件分岐(`if`)」を組み合わせてみましょう。

### 課題1: I AM KOSEN-SEI
ターミナルに `I AM KOSEN-SEI` を **200回出力** するプログラムを作成せよ。<br>
※実行するとターミナルのログが大変なことになるので注意！

---

# 第五回の課題 (2/2)

### 課題2: FizzBuzz (今までの復習)
1から30までの整数を順番に改行しながら出力するプログラムを作成せよ。<br>
ただし、以下の条件に従うこと。
1. その数が **3の倍数** のときは、数字の代わりに `Fizz` と出力する。
2. その数が **5の倍数** のときは、数字の代わりに `Buzz` と出力する。
3. その数が **3と5の両方の倍数 (15の倍数)** のときは、`FizzBuzz` と出力する。
4. いずれでもない場合は、そのままの数字を出力する。

<details class="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 text-sm text-left">
  <summary class="cursor-pointer text-green-600 dark:text-green-400 select-none outline-none font-bold">
    💡 ヒントを見る (クリックで展開)
  </summary>

<div class="mt-2 pl-4 text-gray-700 dark:text-gray-300">

課題2は <code>for</code> 文の中で <code>if</code> ~ <code>else if</code> を使います。<br>
<b>一番厳しい条件（15の倍数）から先に判定</b>しないと、3や5の倍数に吸い込まれてしまうので注意してください！

</div>
</details>

---

# 次回予定

次回は、同じ種類のデータを一つにまとめる方法を学びます！

- **配列** (`int nums[5]`)
- **文字列の正体** (`char` の配列と `\0`)
