---
theme: default
background: https://cover.sli.dev
class: text-center
colorSchema: light
highlighter: shiki
lineNumbers: false
info: |
  ## C言語講習会 Day 9
  ポインタの活用と構造体
drawings:
  persist: false
title: C言語講習会 Day 9 - ポインタの活用と構造体
---

# C言語講習会 Day 9
## ポインタの活用と構造体

本日は少し長丁場になります！  
前半は前回学んだ「ポインタ」の応用として **メモリの動的確保** を、  
後半は複数のデータを一つにまとめる **構造体** を学習します。  

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    はじめる <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# 今回やること

1. **前回課題の解説**
2. **ポインタの活用** (静的確保と動的確保)
3. **`malloc` と `free`** (メモリを自分で確保・解放する)
4. **一次元配列の動的確保**
5. **構造体とは** (`struct`)
6. **`typedef` を用いた構造体の宣言**
7. **構造体のポインタとアロー演算子 (`->`)**
8. **構造体を関数に渡す**
9. **分割コンパイルとヘッダファイル**
10. **本日の課題**

---

# 前回出した課題の解説 1 (アドレスの代入と表示)

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 課題1の解説
`int` 型変数のアドレスを取得するには `&` を使います。  
ポインタ変数が指す先の中身を見るには `*` を使います。  

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    int num;
    printf("数値を入力: ");
    scanf("%d", &num);
    
    // num のアドレスをポインタに代入
    int* ptr = &num;
    
    // ポインタを使って中身を表示
    printf("入力された値: %d\n", *ptr);
    
    return 0;
}
```

</div>
</div>

---

# 前回出した課題の解説 2 (配列とポインタ演算)

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 課題2の解説
配列名 `arr` は、実は先頭要素のアドレスとして扱えます。  
そこに `+ i` を足すことで、次の要素のアドレスへと進みます。  

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30};
    
    for (int i = 0; i < 3; i++) {
        // *(arr + i) は arr[i] と全く同じ意味！
        printf("%d番目: %d\n", i, *(arr + i));
    }
    
    return 0;
}
```

</div>
</div>

---

# 前回出した課題の解説 3 (文字列の長さ)

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 課題3の解説 (難易度高)
文字列は一番最後に **ヌル文字 (`\0`)** が入っています。  
ポインタ `ptr` を1文字ずつ進めながら、ヌル文字が見つかるまでカウントを増やせば長さが分かります。  

</div>
<div>

```c
#include <stdio.h>

int main(void) {
    char str[100];
    scanf("%s", str);
    
    char* ptr = str; // 先頭アドレス
    int count = 0;
    
    // 中身がヌル文字('\0')でない間繰り返す
    while (*ptr != '\0') {
        count++;
        ptr++; // ポインタを1文字分進める
    }
    
    printf("長さ: %d\n", count);
    return 0;
}
```

</div>
</div>

---

# ポインタの活用：メモリの確保

今まで配列を作るときは `int arr[100];` のように「最初からサイズを決めて」作っていました。  
しかし、プログラムを実行するまで必要なサイズが分からないこともあります。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 静的確保
プログラムをコンパイルする時点でサイズが決まっている確保方法。  
（例：`int arr[3];`）

### 動的確保
プログラムを**実行している最中に**、必要な分だけメモリサイズを確保する方法。  
ここで**ポインタ**が活躍します！  

</div>
<div>

<div class="p-4 bg-blue-100 dark:bg-blue-900 rounded text-sm text-left">
💡 <b>例えば…</b><br>
ユーザーから「何人の生徒のデータを入力しますか？」と聞かれてから、その人数の分だけ配列のサイズを用意したい場合などに「動的確保」が必須になります。
</div>

</div>
</div>

---

# `malloc` 関数と `sizeof` 演算子

メモリを動的に確保するには `malloc` (マロック) 関数を使います。  
使うためには `<stdlib.h>` をインクルードする必要があります。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### `malloc` 関数
指定したバイト数だけメモリを確保し、**確保したメモリの先頭アドレス** を返します。  

### `sizeof` 演算子
型や変数の「バイト数」を計算してくれます。  
環境によって `int` のサイズが異なる場合もあるため、必ず `sizeof(int)` のように使います。  

</div>
<div>

```c
#include <stdio.h>
#include <stdlib.h> // mallocのために必要

int main(void) {
    // int型1つ分(通常4バイト)を動的確保
    int* ptr = (int*)malloc(sizeof(int));
    
    *ptr = 42; // 確保した場所に値を入れる
    printf("%d\n", *ptr);
    
    return 0;
}
```

<div class="text-xs text-gray-500 mt-2">
※ <code>(int*)</code> はキャストと呼び、「返ってきたアドレスをint型のポインタとして扱うよ」という意味です。
</div>

</div>
</div>

---

# `free` 関数 (メモリの解放)

`malloc` で確保したメモリは、**プログラムが終了するまでずっと残り続けます**。  
使い終わったら必ず `free` 関数で解放（片付け）しなければなりません。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### メモリリーク
解放を忘れて何度も `malloc` を繰り返すと、使えるメモリがどんどん減っていき、最終的にプログラムがクラッシュします。  
この現象を **メモリリーク** と呼びます。  

<div class="text-sm mt-4 p-2 bg-red-100 dark:bg-red-900 rounded font-bold">
⚠️ malloc したら必ず free する！
</div>

</div>
<div>

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int* ptr = (int*)malloc(sizeof(int));
    
    *ptr = 100;
    printf("%d\n", *ptr);
    
    // 使い終わったら必ず解放する！
    free(ptr);
    
    return 0;
}
```

</div>
</div>

---

# 一次元配列を動的に確保する

`malloc` を使えば、好きな要素数の配列をプログラム実行中に作ることができます。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 配列として使うには
`int` 型を3個分確保したい場合は、  
`sizeof(int) * 3` のように掛け算をします。  

確保したあとは、普通の配列と全く同じように `arr[i]` や `*(arr + i)` の形で扱うことができます。  

</div>
<div>

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    // int型3個分のメモリを確保
    int* arr = (int*)malloc(sizeof(int) * 3);
    
    for (int i = 0; i < 3; i++) {
        arr[i] = i * 10; // 配列として扱える！
        printf("arr[%d]: %d\n", i, arr[i]);
    }
    
    // 配列ごと一気に解放される
    free(arr); 
    return 0;
}
```

</div>
</div>

---

# 構造体の概要と宣言

ここからは後半戦、**構造体（struct）** です！  
構造体は、**複数の異なる型の値を「一つの変数」にまとめて扱う** ための機能です。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### なぜ構造体が必要？
RPGゲームのキャラクターを作る時、  
`char name[50];`  
`int hp;`  
`int mp;`  
とバラバラの変数で作ると、キャラクターが増えた時に管理が大変になります。  
これを `struct character` という1つの箱にまとめられます！  

</div>
<div>

```c
#include <stdio.h>

// 構造体の宣言 (最後にセミコロン ; が必要！)
struct student {
    char name[50];
    int age;
    int grade;
}; 

int main(void) {
    // ...
}
```

</div>
</div>

---

# 構造体の使い方 (メンバへのアクセス)

構造体の中に含まれる一つ一つの変数を **メンバ** と呼びます。  
メンバにアクセスするには、変数名の後に **ドット（`.`）** をつけます。  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 構造体変数の作り方
`struct 構造体名 変数名;` と書きます。  

### メンバへのアクセス
`変数名.メンバ名` のようにドットで繋ぐことで、中身を読み書きできます。  

</div>
<div>

```c
#include <stdio.h>
#include <string.h>

struct student {
    char name[50];
    int age;
}; 

int main(void) {
    // 構造体変数 kosensei を宣言
    struct student kosensei;
    
    // ドット(.)を使ってアクセス
    strcpy(kosensei.name, "高専太郎"); // 文字列の代入
    kosensei.age = 18;
    
    printf("%s (%d歳)\n", kosensei.name, kosensei.age);
    return 0;
}
```

</div>
</div>

---

# `typedef` を用いた構造体の宣言

いちいち `struct student kosensei;` と `struct` を書くのは面倒ですよね。  
`typedef` (タイプデフ) を使うと、独自の「型」として名前をつけることができます！  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### 便利な書き方
`typedef struct { ... } 型の名前;`  
と宣言することで、次回からは `型の名前 変数名;` だけで宣言できるようになります。  

C言語ではこの書き方が非常によく使われます。  

</div>
<div>

```c
#include <stdio.h>

// typedef を使って Student という型を作る
typedef struct {
    char name[50];
    int age;
} Student; // ← ここに型の名前を書く

int main(void) {
    // struct を書かなくて済む！
    Student kosensei; 
    
    kosensei.age = 18;
    printf("%d歳\n", kosensei.age);
    return 0;
}
```

</div>
</div>

---

# 構造体のポインタとアロー演算子 (`->`)

構造体も普通の変数と同じように、アドレスをポインタ変数に入れることができます。  
ただし、**ポインタからメンバにアクセスする時の記号が変わります！**  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### アロー演算子 (`->`)
構造体の **ポインタ** からメンバにアクセスする時は、ドット(`.`) ではなく **アロー演算子 (`->`)** を使います。  

矢印の形をしているのでアロー(Arrow)と呼ばれます。  

</div>
<div>

```c
#include <stdio.h>

typedef struct {
    int age;
} Student;

int main(void) {
    Student stu;
    stu.age = 18;
    
    // 構造体変数のアドレスをポインタに入れる
    Student* ptr = &stu;
    
    // ポインタ経由でアクセスするときは「->」を使う！
    printf("年齢: %d\n", ptr->age);
    
    // (補足: (*ptr).age と書いても同じ意味になります)
    
    return 0;
}
```

</div>
</div>

---

# 構造体を関数の引数に渡す

構造体は複数のデータが入っているため、サイズが大きくなりがちです。  
関数に渡すときは **「値渡し（コピー）」ではなく「ポインタ渡し（アドレス）」** にするのが鉄則です！  

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-4 text-left">
<div>

### なぜポインタ渡しにするの？
巨大な構造体をそのまま渡すと、すべてコピーされるためメモリ効率が最悪です。  
アドレスだけを渡せば、関数の中で元のデータを直接参照・書き換えができて高速です！  

</div>
<div>

```c
#include <stdio.h>

typedef struct {
    char name[50];
    int hp;
} Character;

// ポインタで受け取る (Character* c)
void take_damage(Character* c) {
    c->hp -= 20; // ポインタなので -> を使う
}

int main(void) {
    Character hero = {"勇者", 100};
    
    // アドレス(&)を渡す
    take_damage(&hero); 
    
    printf("残りHP: %d\n", hero.hp); // 80になる
    return 0;
}
```

</div>
</div>

---

# 第九回の課題 (1/2)

### 課題1: 学生カード
以下の情報を持つ構造体 `student` を作成せよ。  
- 学生の名前（最大 99 文字）
- 入学年度（西暦）
- 所属学科（文字列または整数など任意）

その後、ユーザーから `scanf` などで学生情報を入力して構造体に格納し、その情報を整形して画面に表示せよ。  

<details class="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 text-sm text-left">
  <summary class="cursor-pointer text-green-600 dark:text-green-400 select-none outline-none font-bold">
    💡 課題1のヒントを見る (クリックで展開)
  </summary>

<div class="mt-2 pl-4 text-gray-700 dark:text-gray-300">

- `typedef struct { char name[100]; int year; char dept[50]; } Student;` のように構造体を定義します。
- `scanf("%s", s.name);` のようにして入力値を格納します（配列の変数名そのものがアドレスになるので `&` は不要です！ただし `year` などの整数の場合は `&s.year` のように `&` が必要です）。

</div>
</details>

---

# 第九回の課題 (2/3)

### 課題2: ショッピングカート (定義と main 関数)
模擬的なショッピングカートアプリを作ります。以下のコードをベースに実装してください。  

<div class="mt-2 text-sm leading-tight max-h-[350px] overflow-y-auto border border-gray-300 dark:border-gray-700 p-2 rounded bg-gray-50 dark:bg-gray-900 text-left">

```c
#include <stdio.h>

#define MAX_ITEMS 5 //最大アイテム数
#define ITEM_NAME_LEN 30 //最大文字数

struct item {
    char name[ITEM_NAME_LEN];
    int id;
    int quantity;
    float price;
};

void input_items(struct item items[], int count);
void display_items(struct item items[], int count);

int main() {
    struct item items[MAX_ITEMS];
    input_items(items, MAX_ITEMS);
    display_items(items, MAX_ITEMS);
    return 0;
}
```

</div>

---

# 第九回の課題 (3/3)

### 課題2: ショッピングカート (TODOの実装)
以下の関数の `//TODO:` 部分を実装して、アプリを完成させよ。

<div class="mt-2 text-sm leading-tight max-h-[350px] overflow-y-auto border border-gray-300 dark:border-gray-700 p-2 rounded bg-gray-50 dark:bg-gray-900 text-left">

```c
// カートにアイテムを入れる関数
void input_items(struct item items[], int count) {
    for (int i = 0; i < count; i++) {
        //TODO: items[i] に対して name, id, quantity, price を入力する処理を実装する
    }
}

// アイテムを表示し、合計金額を計算する関数
void display_items(struct item items[], int count) {
    float total = 0.0;
    printf("\n");
    for (int i = 0; i < count; i++) {
        //TODO: items[i] の内容を表示する
        //TODO: total に price * quantity を足す
    }
    printf("Total price: %.2f\n", total);
}
```

</div>

---

# 次回予定

次回は、より実践的なプログラム開発に向けて **「分割コンパイルとビルド自動化」** について学びます。  

- **分割コンパイルとオブジェクトファイル**
- **プロトタイプ宣言とヘッダファイル (`.h`)**
- **`make` コマンドによるビルドの自動化**
