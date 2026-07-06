import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './index.css';
import curriculumRaw from '../../curriculum.md?raw';

const slides = [
  { id: 'day1', title: 'Day 1: C言語の世界へようこそ', description: 'C言語の基礎、環境構築、コンパイル、Hello Worldまで。' },
  { id: 'day2', title: 'Day 2: おまじないの解剖', description: '関数の使い方、文法のルール、printf関数、型の概念。' },
  { id: 'day3', title: 'Day 3: 変数と計算', description: '変数、データ型、式と演算子を使った基本的な計算。' },
  { id: 'day4', title: 'Day 4: 比較と条件分岐', description: 'if文、switch文を使ったプログラムの条件分岐と各種演算子。' },
  { id: 'day5', title: 'Day 5: 繰り返し処理', description: 'for文、while文などのループ処理と、break、continueなどの制御。' },
  { id: 'day6', title: 'Day 6: 配列と文字列', description: '同じ型のデータをまとめる配列と、文字配列による文字列の表現。' },
  { id: 'day7', title: 'Day 7: 関数を自作する', description: 'オリジナルの関数の作成、引数と戻り値、変数のスコープについて。' },
  { id: 'day8', title: 'Day 8: ポインタ', description: 'メモリとアドレスの概念、ポインタ変数、ポインタ演算、ポインタ渡し。' },
  { id: 'day9', title: 'Day 9: ポインタの活用と構造体', description: '動的メモリ確保(malloc/free)と、異なる型をまとめる構造体の基礎。' },
  { id: 'day10', title: 'Day 10: 分割コンパイルとビルド自動化', description: '複数ファイルでの開発、ヘッダファイル、Makefileを使ったビルド自動化。' },
];

function App() {
  const [activeTab, setActiveTab] = useState('slides');

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">C Programming Workshop</h1>
        <p className="subtitle">Learn the fundamentals of C step by step.</p>

        <div className="tabs">
          <button className={activeTab === 'slides' ? 'tab active' : 'tab'} onClick={() => setActiveTab('slides')}>
            Slides
          </button>
          <button className={activeTab === 'curriculum' ? 'tab active' : 'tab'} onClick={() => setActiveTab('curriculum')}>
            Curriculum
          </button>
        </div>
      </header>

      <main className="content">
        {activeTab === 'slides' ? (
          <div className="grid">
            {slides.map(slide => (
              <a key={slide.id} href={`/${slide.id}/`} className="card">
                <div className="card-badge">{slide.id.toUpperCase()}</div>
                <h2 className="card-title">{slide.title}</h2>
                <p className="card-desc">{slide.description}</p>
                <div className="card-action">
                  <span>View Slide</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="card markdown-body" style={{ display: 'block', padding: '3rem', cursor: 'auto' }}>
            <ReactMarkdown>{curriculumRaw}</ReactMarkdown>
          </div>
        )}
      </main>
      
      <footer className="footer">
        <p>&copy; 2026 C Programming Workshop</p>
      </footer>
    </div>
  );
}

export default App;
