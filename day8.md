---
theme: default
background: https://cover.sli.dev
class: text-center
colorSchema: light
highlighter: shiki
lineNumbers: false
info: |
  ## C言語講習会 Day 8
  ポインタ
drawings:
  persist: false
title: C言語講習会 Day 8 - ポインタ
---

# C言語講習会 Day 8
## ポインタ

ここからは、C言語を学ぶ上で最大の難関とも言われる **「ポインタ」** について学習します。  
つまずきやすいポイントですが、ゆっくり理解していきましょう！  

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    はじめる <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# 今回やること

1. **前回課題の解説**
2. **ポインタとは** (メモリとアドレス)
3. **ポインタ変数と記号** (`*` と `&`)
4. **ポインタ演算と配列**
5. **ポインタのポインタ** (ダブルポインタ)
6. **値渡しとポインタ渡し**
7. **ポインタの活用例** (複数の戻り値)
8. **本日の課題**

---

# 前回出した課題の解説 (関数の自作)

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 掛け算を行う関数を作る
`main` の上で（またはプロトタイプ宣言を使って）、2つの値を受け取り掛け算して返す関数 `multiply` を作ります。  

</div>
<div>

```c
#include <stdio.h>

// 掛け算を行う関数
int multiply(int a, int b) {
    return a * b;
}

int main(void) {
    int x, y;
    printf("2つの数値を入力: ");
    scanf("%d %d", &x, &y);
    
    // 関数を呼び出して結果をもらう
    int result = multiply(x, y);
    
    printf("結果は %d です\n", result);
    return 0;
}
```

</div>
</div>

---

# ポインタとは (メモリとアドレス)

すべての変数の値は、コンピュータの **メモリ上** に格納されます。  
変数 `num` も例外なく、メモリ上のどこかに置かれます。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### ポインタとは？
ポインタとは、その値が格納されている **メモリの住所（アドレス）** を指し示すものです。  

（配列など、複数個の値が格納されている場合は、一番先頭のメモリアドレスを指し示します）  

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    int num = 6;
    printf("%d\n", num);
    return 0;
}
```

<b>【 メモリ空間のイメージ 】</b>

<div class="mem-grid mt-2">
  <div class="mem-header"><span>アドレス</span><span>中身</span><span>変数名</span></div>
  <div class="mem-row mem-dim"><span><code>0x10000004</code></span><span>???</span><span>-</span></div>
  <div class="mem-row mem-active"><span><code>0x10000008</code></span><span class="mem-val">6</span><span class="mem-varname">num</span></div>
  <div class="mem-row mem-dim"><span><code>0x1000000C</code></span><span>???</span><span>-</span></div>
</div>

<div class="mt-2 text-center text-sm">
↑ この <b>「0x10000008」</b> という住所そのものが<br>「ポインタ」（= アドレス）
</div>

</div>
</div>

---

# ポインタ変数と記号 1 (宣言と &)

ポインタ変数は、**メモリの住所（アドレス）を格納するための専用の変数**です。  
作るには、型の後にアスタリスク `*` をつけます。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### ポインタ変数の宣言
```c
int* num_ptr;
char* char_ptr;
int* ptr = NULL; // 何も指さない状態
```

### `&` (アドレス演算子)
変数の前に `&` をつけると、その変数のアドレス（住所）を取得できます。  

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    int num = 0;
    
    // & を使って num の「住所」を取得し、
    // ポインタ変数に保存する
    int* num_ptr = &num;
    
    // %p でアドレスを表示できる
    printf("%p\n", num_ptr);
    return 0;
}
```

</div>
</div>

---

# ポインタ変数と記号 2 (* による中身の取得)

アドレスを保存したポインタ変数から、元の変数の値を取得するには `*` を使います。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### `*` (間接参照演算子)
ポインタ変数の前に `*` をつけると、ポインタが指し示している「中身の値」を取得できます。  

<div class="ptr-diagram mt-4">
  <div class="ptr-box ptr-var">
    <div class="ptr-label">num_ptr <span class="ptr-type">(int*)</span></div>
    <div class="ptr-addr">住所: 0x20000004</div>
    <div class="ptr-value">中身: <code>0x10000008</code></div>
  </div>
  <div class="ptr-arrow">
    <div class="arrow-line">──── <code>*num_ptr</code> ────▶</div>
    <div class="arrow-line-rev">◀──── <code>&num</code> ────</div>
  </div>
  <div class="ptr-box ptr-target">
    <div class="ptr-label">num <span class="ptr-type">(int)</span></div>
    <div class="ptr-addr">住所: 0x10000008</div>
    <div class="ptr-value">中身: <b class="val">18</b></div>
  </div>
</div>

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    int num = 0;
    int* num_ptr = &num;
    
    num = 18; // num自身を書き換える
    
    // * を使って「住所の中身」を見る
    // num と num_ptr は同じ場所を参照しているため
    // ここでは 18 と出力される
    printf("%d\n", *num_ptr);
    
    return 0;
}
```

</div>
</div>

---

# ポインタ演算と配列

ポインタに対して足し算などの演算を行うことができます。  
演算を行うと、**型のサイズ分だけポインタ（指し示すアドレス）が移動** します。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 配列とポインタの関係
配列名は、多くの場面で **先頭要素のアドレス** として扱われます。  
`int` 型（4バイト）のポインタに `1` を足すと、アドレスは4バイト進み、配列の **「次の要素」** を指すことになります！  

`*(arr_ptr + 1)` は `arr[1]` と全く同じ意味になります。  
※配列とポインタは厳密には別物ですが、今は「同じように使える」と覚えてOK  

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    int arr[] = {1, 2, 3};
    
    // 配列名は先頭要素のアドレスとして使える
    int* arr_ptr = arr; 
    
    // ポインタに1を加えて中身を見る (2番目の要素)
    printf("%d\n", *(arr_ptr + 1));
    
    // 配列の添え字を使うのと全く同じ！
    printf("%d\n", arr[1]);
    
    return 0;
}
```

</div>
</div>

---

# ポインタのポインタ (ダブルポインタ) 1

ポインタ変数もまた変数の一種であるため、**メモリ上のどこか（別の住所）** に置かれます。  
つまり、「ポインタ変数のアドレス」を格納する変数も作ることができます。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### なぜそんなものが必要？
「ポインタのポインタ」を宣言するには、アスタリスクを2つ付与して `int**` と書きます。  
これは、2次元配列を扱う際や、関数の中で「呼び出し元のポインタ変数そのもの」を書き換えたい時などに必須となる重要な概念です。  

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    int val = 100;
    
    // 1. 普通のポインタ (valの住所)
    int* ptr = &val;
    
    // 2. ポインタのポインタ (ptrの住所)
    int** double_ptr = &ptr;
    
    // double_ptr から val の値(100)を見るには
    // * を2回つける！
    printf("%d\n", **double_ptr);
    
    return 0;
}
```

</div>
</div>

---

# ポインタのポインタ (ダブルポインタ) 2

図でイメージを掴んでみましょう。メモリの中で、誰が誰の住所を持っているかがポイントです。  

<div class="dptr-container">
  <div class="dptr-col">
    <div class="dptr-box dptr-pp">
      <div class="dptr-name">double_ptr <span class="dptr-type">(int**)</span></div>
      <div class="dptr-info">住所: <code>0xCCC</code></div>
      <div class="dptr-val">中身: <code>0xBBB</code></div>
    </div>
    <div class="dptr-deref">*double_ptr → ptr の中身が見える</div>
  </div>
  <div class="dptr-arrow-down">▼</div>
  <div class="dptr-col">
    <div class="dptr-box dptr-p">
      <div class="dptr-name">ptr <span class="dptr-type">(int*)</span></div>
      <div class="dptr-info">住所: <code>0xBBB</code></div>
      <div class="dptr-val">中身: <code>0xAAA</code></div>
    </div>
    <div class="dptr-deref">*ptr → val の中身が見える</div>
  </div>
  <div class="dptr-arrow-down">▼</div>
  <div class="dptr-col">
    <div class="dptr-box dptr-v">
      <div class="dptr-name">val <span class="dptr-type">(int)</span></div>
      <div class="dptr-info">住所: <code>0xAAA</code></div>
      <div class="dptr-val">中身: <b class="val">100</b></div>
    </div>
  </div>
</div>

<div class="mt-4 text-left px-8 text-sm">

- `*double_ptr` → `ptr` の中身 (`0xAAA`) が見える  
- `**double_ptr` → `val` の中身 (**100**) が見える（2段階たどる！）  

</div>

---

# 値渡しとポインタ渡し

関数に変数を渡すとき、渡し方には2種類あります。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### ❌ 値渡し（コピーが渡される）
```c
void add_ten(int x) {
    x = x + 10;
    // ↑ 関数の中では x は 15 になる
    // しかしこれは「コピー」なので
    // 呼び出し元の a には反映されない！
}

int main(void) {
    int a = 5;
    add_ten(a); // a のコピーが渡される
    printf("%d\n", a); // 5 のまま！
}
```

`return` で返すこともできるが、**1つの値しか返せない**。  

</div>
<div>

### ✅ ポインタ渡し（住所が渡される）
```c
void add_ten(int* x) {
    *x = *x + 10;
    // ↑ 住所の中身を直接書き換えるので
    // 呼び出し元の a が変わる！
}

int main(void) {
    int a = 5;
    add_ten(&a); // a の住所を渡す
    printf("%d\n", a); // 15 になる！
}
```

**アドレスを渡す** ことで、複数の変数でも同時に書き換えられる！  

</div>
</div>

---

# ポインタの活用例 (複数の戻り値)

C言語では関数は `return` で1つしか値を返せません。  
しかし、ポインタを使えば **複数の値を同時に変更・取得する** ことができます！  

<div class="grid grid-cols-[1fr_1.2fr] gap-6 mt-4 text-left">
<div class="text-sm">

### アドレスを渡して書き換えてもらう
引数にポインタ変数（`int* add`など）を用意し、呼び出し元からアドレス（`&add`）を渡します。  
関数の中で `*add = ...` と中身を書き換えれば、呼び出し元の変数が直接書き換わります！  

今まで `scanf("%d", &a)` で `&` をつけていたのは、まさに「scanf 関数の中で変数を直接書き換えてもらうため」だったのです。  

</div>
<div>

```c
#include <stdio.h>
// 四則演算の結果を、対応するポインタ変数に代入する
void multi_math(int a, int b, 
                int* add, int* sub, int* mul, int* quo) {
    *add = a + b;
    *sub = a - b;
    *mul = a * b;
    *quo = a / b;
}

int main(void) {
    int a = 10, b = 2;
    int add, sub, mul, quo;
    
    // 住所(&)を渡して、関数の中で書き換えてもらう！
    multi_math(a, b, &add, &sub, &mul, &quo);
    printf("%d + %d = %d\n", a, b, add);
    printf("%d - %d = %d\n", a, b, sub);
    return 0;
}
```

</div>
</div>

---

# 第八回の課題 (1/3)

ポインタの概念を定着させるための課題です。  

### 課題1: アドレスの代入と表示
以下の要件を満たすプログラムを作成せよ。  
`int` 型変数のアドレスをポインタに代入し、ポインタを使ってその `int` 型変数の値を表示するプログラムを実装せよ。  
（`int` 型変数は自分で定義するか、ユーザーから値を入力してもらうこと）  

<details class="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 text-sm text-left">
  <summary class="cursor-pointer text-green-600 dark:text-green-400 select-none outline-none font-bold">
    💡 課題1のヒントを見る (クリックで展開)
  </summary>

<div class="mt-2 pl-4 text-gray-700 dark:text-gray-300">

`int num = 5;` と宣言した後、`int* ptr = &num;` のようにアドレスをポインタに入れます。表示するときは `*ptr` を使います。  

</div>
</details>

---

# 第八回の課題 (2/3)

### 課題2: 配列とポインタ演算
以下の要件を満たすプログラムを作成せよ。  
要素数 2 以上の `int` 型配列を作成し、それぞれの値を **ポインタを用いて** 表示するプログラムを実装せよ。  
※配列の添字（`a[1]` など）を使用することは禁止する。  

<details class="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 text-sm text-left">
  <summary class="cursor-pointer text-green-600 dark:text-green-400 select-none outline-none font-bold">
    💡 課題2のヒントを見る (クリックで展開)
  </summary>

<div class="mt-2 pl-4 text-gray-700 dark:text-gray-300">

`int arr[3] = {10, 20, 30};` と宣言した後、`*(arr + 0)`, `*(arr + 1)` のようにポインタに加算して中身を取得します。  

</div>
</details>

---

# 第八回の課題 (3/3)

少し難易度の高い課題です。標準関数に頼らず、ポインタを活用して実装してみましょう。  

### 課題3: 文字列の長さをポインタで計算する (難易度高)
ユーザーから任意の文字列を入力してもらい、その文字列の長さを計算するプログラムを実装せよ。  
- ただし、C/C++ の標準関数（`strlen` など）を使用することは禁止する。  
- 必ず **ポインタを活用して** 実装すること（`str[i]` のような配列の添え字アクセスを避けてみましょう）。  

<details class="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 text-sm text-left">
  <summary class="cursor-pointer text-green-600 dark:text-green-400 select-none outline-none font-bold">
    💡 課題3のヒントを見る (クリックで展開)
  </summary>

<div class="mt-2 pl-4 text-gray-700 dark:text-gray-300">

- `char str[100];` で文字列を受け取ったら、文字を指し示すポインタを作ります（<code>char* ptr = str;</code>）。  
- `*ptr` がヌル文字（<code>'\0'</code>）になるまでループを回します。  
- ループの中で、ポインタ自身を1つ進めます（<code>ptr++</code> または <code>ptr = ptr + 1</code>）。  
- ループが何回回ったかをカウント用の変数（`count` など）で記録すれば、それが文字数になります！  

</div>
</details>


---

# 次回予定

次回は、異なる種類のデータを一つにまとめる方法を学びます。  

- **構造体 (`struct`)**
- **分割コンパイル**
- **ヘッダファイル (`.h`) の役割**
