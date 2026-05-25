---
theme: default
background: https://cover.sli.dev
class: text-center
colorSchema: light
highlighter: shiki
lineNumbers: false
info: |
  ## C言語講習会 Day 2
  変数とデータ型
drawings:
  persist: false
title: C言語講習会 Day 2 - 変数とデータ型
---

# C言語講習会 Day 2
## 変数とデータ型

ここからはC言語の基本的な文法について学んでいきます。
まずはデータを保存するための「変数」からです！

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    はじめる <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# 本日のアジェンダ

1. 変数とは
2. 基本的なデータ型 (int, double, char)
3. 変数の宣言と代入
4. `printf` による変数の表示

---

# 1. 変数とは

プログラムの中で「データ（数値や文字など）を一時的に記憶しておく箱」のことです。
C言語では、変数を使う前に「どんな種類のデータを入れる箱か」を宣言する必要があります。

```c
// 例: 整数を入れる箱「age」を用意して、20を入れる
int age = 20;
```
