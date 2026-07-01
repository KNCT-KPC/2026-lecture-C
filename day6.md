---
theme: default
background: https://cover.sli.dev
class: text-center
colorSchema: light
highlighter: shiki
lineNumbers: false
info: |
  ## C言語講習会 Day 6
  配列と文字列
drawings:
  persist: false
title: C言語講習会 Day 6 - 配列と文字列
---

# C言語講習会 Day 6
## 配列と文字列

同じようなデータをたくさん扱うとき、変数を100個宣言するのは大変です  
今回は、同じ型のデータを一つにまとめる **「配列」** と  
その応用である **「文字列」** について学びます！  

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    はじめる <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# 今回やること

1. **前回課題の解説**
2. **配列とは**
3. **配列の宣言と初期化**
4. **配列の使い方と要素数**
5. **配列とループの組み合わせ**
6. **多次元配列**
7. **C言語における「文字列」の正体**
8. **ヌル文字 (`\0`)**
9. **本日の課題**

---

# 前回出した課題の解説 1 (I AM KOSEN-SEI)

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 200回繰り返す
`for` 文を使って、`0` から `199` までの200回、または `1` から `200` までの200回繰り返します。  

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    // 1 から 200 まで繰り返す
    for (int i = 1; i <= 200; i++) {
        printf("I AM KOSEN-SEI\n");
    }
    return 0;
}
```

</div>
</div>

---

# 前回出した課題の解説 2 (FizzBuzz)

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 厳しい条件から判定する！
一番厳しい「15の倍数」から判定しないと、3の倍数や5の倍数に先に吸い込まれてしまいます。  

</div>
<div>

```c
for (int i = 1; i <= 30; i++) {
    // まず15の倍数(3かつ5の倍数)をチェック！
    if (i % 15 == 0) {
        printf("FizzBuzz\n");
    } else if (i % 3 == 0) {
        printf("Fizz\n");
    } else if (i % 5 == 0) {
        printf("Buzz\n");
    } else {
        printf("%d\n", i);
    }
}
```

</div>
</div>

---

# 配列とは  

**配列**とは、同じ型のデータを一つにまとめたものです。  
配列の中にあるそれぞれの値を **要素（ようそ）** と呼びます。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### なぜ配列が必要？
例えば、100人分のテストの点数を記憶したいとき…  
`score1`, `score2`, ..., `score100` と変数を100個作るのは現実的ではありません  

配列を使えば、**「100個の整数が入る大きな箱」** を一発で作ることができます  

</div>
<div>

```c
// 変数を個別につくる場合 (大変)
int score1 = 80;
int score2 = 65;
int score3 = 90;

// 配列をつくる場合 (スッキリ)
// int(整数)が3つ入る「scores」という配列
int scores[3] = {80, 65, 90};
```

</div>
</div>

---

# 配列の宣言と初期化

<div class="text-xl font-bold text-center my-4 bg-gray-100 p-2 rounded dark:bg-gray-800">
データ型 変数名[要素数];
</div>

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 初期化の方法は3通り  

1. **宣言と同時に初期化する**  
   中カッコ `{}` でくくって値を並べます。
2. **要素数を省略して初期化する**  
   中身の数から自動で要素数が決まります。
3. **一つずつ代入する**  
   宣言だけ先にしておき、あとで値を入れます。

</div>
<div>

```c
// 1. 宣言と同時に初期化
int nums1[3] = {1, 2, 3};

// 2. 要素数を省略して初期化
// (中身が3つなので、自動的に要素数3になる)
int nums2[] = {1, 2, 3};

// 3. 一つずつ代入して初期化
int nums3[3];
nums3[0] = 1;
nums3[1] = 2;
nums3[2] = 3;
```

</div>
</div>

---

# 配列の使い方 (0番目から始まる！)

配列の要素を使うときは、変数名に `[番号]` をつけます  
**C言語では、配列の番号（インデックス）は 0 から始まります！**  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 要素へのアクセス
要素数3の配列を作った場合、使える番号は  
`0`、`1`、`2` の3つです。  
`3` は範囲外なので使えません！  
（エラーやバグの原因になります）  

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    int nums[3] = {10, 20, 30};

    // 取り出して表示する
    printf("%d\n", nums[0]); // 10 が表示される
    printf("%d\n", nums[1]); // 20 が表示される
    printf("%d\n", nums[2]); // 30 が表示される

    return 0;
}
```

</div>
</div>

---

# 要素数を割り出すテクニック (`sizeof`)

配列にいくつの要素が入っているかを知りたいときは、`sizeof` 演算子を使います。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### `sizeof` とは？
変数がメモリ上で使っている「バイト数」を取得する演算子です。  
（Day 3で「`int` は4バイト」とやりましたね！）  

配列全体のバイト数を、要素1つ分のバイト数で割ることで、「要素数」を計算できます。  

</div>
<div>

```c
int nums[] = {10, 20, 30, 40, 50};

// 配列の要素数を計算
// (全体のバイト数) ÷ (1つ目の要素のバイト数)
int count = sizeof(nums) / sizeof(nums[0]);

printf("要素数は %d 個です\n", count); 
// 「要素数は 5 個です」と表示される
```

</div>
</div>

---

# 配列とループの強力な組み合わせ

**「配列のインデックス番号」と「for文のカウンタ変数」を合わせる**ことで、配列の全データを一気に処理できます！  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### なぜ相性がいいのか？
配列の番号は `0, 1, 2...` と1ずつ増えます。  
`for` 文も `i` が `0, 1, 2...` と1ずつ増えます。  
つまり、`nums[i]` と書くだけで全ての要素にアクセスできるのです！  

</div>
<div>

```c
int nums[] = {10, 20, 30, 40, 50};

int count = sizeof(nums) / sizeof(nums[0]);

// for文で配列の中身を順番に表示
for (int i = 0; i < count; i++) {
    printf("%d番目の要素: %d\n", i, nums[i]);
}
```

</div>
</div>

---

# 多次元配列 (2次元配列)

配列の中にさらに配列を入れることができます。これを **2次元配列** と呼びます。  
表やマップの座標などを表現するのによく使われます。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 使い方
`[縦の要素数][横の要素数]` のように、カッコを2つ並べて宣言・使用します。  
※3次元以上も同じ要領で作成可能です。  

</div>
<div>

```c
// 縦2、横3 の2次元配列
int map[2][3] = {
    {1, 2, 3}, 
    {4, 5, 6}
};

// 1行目の左端 (1が表示される)
printf("%d\n", map[0][0]); 

// 2行目の右端 (6が表示される)
printf("%d\n", map[1][2]); 
```

</div>
</div>

---

# C言語における「文字列」の正体

実は、C言語には「文字列型 (String)」というデータ型は存在しません！  
では、今まで使っていた `"Hello"` とは何者だったのでしょうか？  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 文字列 ＝ 文字(`char`) の配列
文字列の正体は、**1文字ずつ区切られた `char` 型の配列**です。  

`"Hello"` という文字列は、  
`'H'`, `'e'`, `'l'`, `'l'`, `'o'` という5つの文字が順番に並んだ配列として扱われます。  

</div>
<div>

```c
// 文字列は char型の配列 として宣言します
char msg[] = "Hello";

// 配列なので、1文字ずつ取り出せる！
printf("%c\n", msg[0]); // 'H'
printf("%c\n", msg[1]); // 'e'

// 文字列全体を表示するときは %s を使う
printf("%s\n", msg);    // "Hello"
```

</div>
</div>

---

# ヌル文字 (`\0`) ── 文字列の終わりを示す目印

文字列を配列として扱うとき、「どこで文字列が終わるのか」をコンピュータに教えるための目印が必要です。それが **ヌル文字（`\0`）** です。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### ヌル文字のルール
- ダブルクォート `" "` で囲んだ文字列には、**自動的に一番最後に `\0` が追加**されます。  
- そのため、5文字の `"Hello"` を保存するには、ヌル文字の分を含めて **「6個」の箱（要素）** が必要になります！  

</div>
<div>

<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded mt-4 text-center">
<b>"Hello" がメモリに保存される様子</b><br><br>

<table class="mx-auto mt-2 text-lg w-full">
  <thead>
    <tr class="bg-gray-200 dark:bg-gray-700">
      <th>msg[0]</th><th>msg[1]</th><th>msg[2]</th><th>msg[3]</th><th>msg[4]</th><th class="text-red-500">msg[5]</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>'H'</td><td>'e'</td><td>'l'</td><td>'l'</td><td>'o'</td><td class="text-red-500 font-bold">'\0'</td>
    </tr>
  </tbody>
</table>
</div>

</div>
</div>

<style>
code, .shiki {
  font-variant-ligatures: none !important;
}
</style>

---

# 第六回の課題 (1/2)

配列とループを組み合わせたプログラムを作ってみましょう。  

### 課題1: ユーザーからの連続入力
ユーザーから5回連続で整数を入力させ、すべての入力が終わった後に、入力された5つの整数を順番に表示するプログラムを作成せよ。  

<details class="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 text-sm text-left">
  <summary class="cursor-pointer text-green-600 dark:text-green-400 select-none outline-none font-bold">
    💡 ヒントを見る (クリックで展開)
  </summary>

<div class="mt-2 pl-4 text-gray-700 dark:text-gray-300">

- **要素数 5 の `int` 型配列** を用意しましょう。  
- `for` 文を使って、5回 `scanf` で整数を入力させます。  
- <code>scanf("%d", &nums[i]);</code> のように書くと、配列の各要素に順番に保存できます。  
- 出力するときも、もう一度 `for` 文を使って配列の中身を順番に表示しましょう。  

</div>
</details>

---

# 第六回の課題 (2/2)

今度は文字列（`char` 型の配列）を扱ってみましょう。  

### 課題2: 文字列の長さを測る
ユーザーから文字列を1つ入力させ、その文字列が「何文字」だったのかをカウントして出力するプログラムを作成せよ。  

<details class="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 text-sm text-left">
  <summary class="cursor-pointer text-green-600 dark:text-green-400 select-none outline-none font-bold">
    💡 ヒントを見る (クリックで展開)
  </summary>

<div class="mt-2 pl-4 text-gray-700 dark:text-gray-300">

- まず、大きめの文字配列を用意します（例: `char str[100];`）。  
- `scanf("%s", str);` で文字列を入力させます（※文字列の場合、`str` の前に `&` はつけません！）。  
- `for` 文または `while` 文を使って配列を先頭から1文字ずつ調べ、**ヌル文字（`\0`）**が見つかるまでカウントを増やしましょう。  
- ループの終了条件は <code>str[i] != '\0'</code> のように「今の文字がヌル文字でない間」とすると上手くいきます！  

</div>
</details>

---

# 次回予定

次回は、自分だけのオリジナルの命令（関数）を作る方法を学びます！  

- **関数の自作**
- **引数と戻り値**
- **変数の寿命（スコープ）**
