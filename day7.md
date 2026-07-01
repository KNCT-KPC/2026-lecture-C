---
theme: default
background: https://cover.sli.dev
class: text-center
colorSchema: light
highlighter: shiki
lineNumbers: false
info: |
  ## C言語講習会 Day 7
  関数を自作する
drawings:
  persist: false
title: C言語講習会 Day 7 - 関数を自作する
---

# C言語講習会 Day 7
## 関数を自作する

今まで使ってきた **printf** や **scanf** は、C言語が最初から用意してくれている「関数（命令）」です。  
今回は、**自分だけのオリジナルの関数を作る方法**を学びます！  

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    はじめる <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# 今回やること

1. **前回課題の解説**
2. **なぜ関数を自作するのか？**
3. **関数の定義方法と呼び出し方**
4. **戻り値を受け取る**
5. **関数の順番とコンパイルエラー**
6. **プロトタイプ宣言**
7. **変数のスコープ（ローカルとグローバル）**
8. **本日の課題**

---

# 前回出した課題の解説 1 (配列とループ)

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### for文で入出力をまとめる
配列のインデックス（`0`〜`4`）と、`for` 文のカウンタ変数 `i` を連携させるのがポイントです。  
入力を受け取るときは `&` を忘れないようにしましょう！  

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    int nums[5];
    
    // 5回連続で入力を受け取る
    for (int i = 0; i < 5; i++) {
        scanf("%d", &nums[i]);
    }
    
    // 5回連続で出力する
    for (int i = 0; i < 5; i++) {
        printf("%d番目: %d\n", i, nums[i]);
    }
    
    return 0;
}
```

</div>
</div>

---

# 前回出した課題の解説 2 (文字列の長さ)

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### ループとヌル文字を組み合わせる
文字列の最後には必ず `\0` があるという性質を利用し、「`\0` になるまで1文字ずつ進める」ループを作ります。  

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    char str[100];
    scanf("%s", str);
    
    int count = 0;
    // ヌル文字 '\0' ではない間、ループを続ける
    while (str[count] != '\0') {
        count++;
    }
    
    printf("%d 文字です\n", count);
    return 0;
}
```

</div>
</div>

---

# なぜ関数を自作するのか？

プログラムが長くなってくると、`main` 関数の中がコードでパンパンになってしまいます。  
関数を作る最大のメリットは **「同じような処理をまとめることができる」** 点です！  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 関数化のメリット
1. **再利用できる**  
   わざわざ同じような処理をコピペせず、関数を呼び出すだけで済みます。  

2. **修正がラクになる**  
   処理を変えたいとき、コピペだと全部直す必要がありますが  
   関数なら「関数の中身」を1箇所直すだけでよい

3. **見やすくなる**  
   `main` 関数の中がスッキリします。

</div>
<div>

<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded mt-4">
💡 <b>例えばゲームを作るとき…</b><br>
「プレイヤーのHPを減らす処理」を毎回書くのではなく、<code>take_damage(20)</code> のような関数を作っておけば、どこからでも使い回せる
</div>

</div>
</div>

---

# 関数の定義方法

<div class="text-xl font-bold text-center my-4 bg-gray-100 p-2 rounded dark:bg-gray-800">
戻り値の型 関数名(型 引数1, 型 引数2, ...) { // 処理 }
</div>

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 各パーツの役割
- **戻り値の型**: 関数が終わったときに返すデータの型（何も返さない時は `void` と書きます）  
- **引数（ひきすう）**: 関数を呼び出すときに渡すデータのこと  

</div>
<div>

```c
// 2つの整数を受け取り、足して表示する関数
// (何も返さないので戻り値は void)
void print_sum(int n1, int n2) {
    printf("%d\n", n1 + n2);
}
```

</div>
</div>

---

# 関数の呼び出し方

作った関数は、`main` 関数などの別の場所から呼び出すことができます。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 呼び出しのルール
- `関数名(渡したい値);` の形で呼び出します。  
- 渡す値（引数）の数と型は、関数を定義したときと同じにする必要があります。  

</div>
<div>

```c
void print_sum(int n1, int n2) {
    printf("%d\n", n1 + n2);
}

int main(void) {
    // 6 と 6 を渡して関数を呼び出す
    print_sum(6, 6); // 12 が出力される
    
    // 何度でも呼び出せます！
    print_sum(10, 20); // 30 が出力される
    
    return 0;
}
```

</div>
</div>

---

# 戻り値がある関数 (計算結果を返す)

ただ画面に表示するだけでなく、**「計算した結果を呼び出し元に返したい」** 場合があります。  
その場合は、`return` 文を使います。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 戻り値の受け取り方
- 関数名の前の型を `void` から返す型（`int` など）に変更します。  
- `return 返したい値;` と書きます。  
- 呼び出す側は、代入演算子 `=` を使って結果を変数で受け取ります。  

</div>
<div>

```c
// int型を返す関数に変更
int get_sum(int n1, int n2) {
    int sumval = n1 + n2;
    return sumval; // 結果を返す！
}

int main(void) {
    int num = 10;
    
    // 関数の結果を res という変数で受け取る
    int res = get_sum(num, 6);
    
    printf("結果は %d です\n", res);
    return 0;
}
```

</div>
</div>

---

# 注意！ 関数の記述順序によるエラー

C言語のコンパイラは、コードを **「上から順番に」** 読んでいきます。  
そのため、書く順番に気をつけないとエラーが発生します！  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### なぜエラーになるの？
右のコードでは、コンパイラは最初に `main` 関数を読みます。  
その中で `print_sum` が呼ばれますが、コンパイラはこの時点ではまだ `print_sum` の存在を知りません！  
「そんな関数知らないよ！」とエラーを吐いてしまいます。

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    // エラー！ print_sumって何！？
    print_sum(3, 6);
    return 0;
}

// 読み込まれる前に呼ばれてしまった可哀想な関数
void print_sum(int n1, int n2) {
    printf("%d\n", n1 + n2);
}
```

</div>
</div>

---

# 解決策：プロトタイプ宣言
このエラーを防ぐには
コードの先頭で  
**「あとでこういう関数を作りますよ」という宣言（予告）** だけをしておく方法が便利です

これを **プロトタイプ宣言** と呼びます。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### プロトタイプ宣言の書き方
関数の戻り値、名前、引数だけを書き、最後を `{}` ではなく `;` で終わらせます。  

これさえ最初に書いておけば、関数の実体（中身）は `main` 関数の後など、どこに書いてもOKになります！  

</div>
<div>

```c
#include <stdio.h>

// プロトタイプ宣言 (予告)
void print_sum(int n1, int n2);

int main(void) {
    // 予告されているのでエラーにならない！
    print_sum(3, 6);
    return 0;
}

// 関数の実体
void print_sum(int n1, int n2) {
    printf("%d\n", n1 + n2);
}
```

</div>
</div>

---

# 変数のスコープ 1 (ローカル変数)

関数を使うようになると、**「どこで作った変数が、どこまで使えるのか」** が重要になります。  
変数が使える有効範囲のことを **スコープ** と呼びます。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### ローカル変数
関数の中で宣言した変数は  
**その関数の中でしか使えません**！  
これをローカル変数と呼びます  

`main` で作った `x` と、別の関数で作った `x` は  
完全に別物として扱われます。 

</div>
<div>

```c
#include <stdio.h>

void test_func(void) {
    int x = 10; // test_funcだけの変数
    printf("%d\n", x);
}

int main(void) {
    int y = 20; // mainだけの変数
    
    // エラー！ x は別の関数のローカル変数なので使えない
    // printf("%d", x); 
    
    return 0;
}
```

</div>
</div>

---

# 変数のスコープ 2 (グローバル変数)

関数の「外」で変数を作ることもできます。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### グローバル変数
すべての関数の外（一番上など）で作った変数は、どの関数からでも自由に使えます。  

<div class="mt-4 p-4 bg-red-100 dark:bg-red-900 rounded text-sm text-left">
⚠️ <b>取扱注意！</b><br>
便利に見えますが、どの関数からでも値を変更できてしまうため、「いつの間にか値が変わっている」といった予期せぬバグの原因になります。乱用は避けましょう！
</div>

</div>
<div>

```c
#include <stdio.h>

// すべての関数の外で作る (グローバル変数)
int global_hp = 100; 

void take_damage(void) {
    // どこからでも書き換え可能
    global_hp -= 20; 
}

int main(void) {
    printf("現在のHP: %d\n", global_hp); // 100
    take_damage();
    printf("現在のHP: %d\n", global_hp); // 80
    return 0;
}
```

</div>
</div>

<style>
code, .shiki {
  font-variant-ligatures: none !important;
}
</style>

---

# 第七回の課題

自分で関数を定義して使ってみましょう！  

### 課題: 掛け算関数の実装と呼び出し
2つの整数を受け取り、それを掛け算したものを戻り値として返す関数を作成せよ。  
また、`main` 関数の中でユーザーから2つの整数を入力させ、作成した関数を利用して掛け算を行い、結果を出力すること。  

※ `main` 関数の中で `*` 演算子を使わないこと（必ず関数の中で掛け算をすること）。  

<details class="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 text-sm text-left">
  <summary class="cursor-pointer text-green-600 dark:text-green-400 select-none outline-none font-bold">
    💡 ヒントを見る (クリックで展開)
  </summary>

<div class="mt-2 pl-4 text-gray-700 dark:text-gray-300">

- `int` を2つ受け取って `int` を返すので、<code>int multiply(int a, int b)</code> のような関数を作ります。  
- その関数の中で <code>return a * b;</code> のようにして結果を返します。  
- `main` 関数の中で <code>scanf</code> を使って2つの数字を受け取ります。  
- 受け取った2つの数字を <code>multiply</code> 関数に渡し、その戻り値を表示しましょう。  
- （任意）プロトタイプ宣言を使って、関数を `main` の後に書いてみましょう！  

</div>
</details>

---

# 次回予定

次回は、C言語の最大の壁とも言われる概念に挑戦します！  

- **ポインタ**
- **メモリアドレス**
- **値渡しと参照渡し**
