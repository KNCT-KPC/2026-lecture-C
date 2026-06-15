import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './index.css';
import curriculumRaw from '../../curriculum.md?raw';

const slides = [
  { id: 'day1', title: 'Day 1: C言語の世界へようこそ', description: 'C言語の基礎、環境構築、コンパイル、Hello Worldまで。' },
  { id: 'day2', title: 'Day 2: おまじないの解剖', description: '関数の使い方、文法のルール、printf関数、型の概念。' },
  { id: 'day3', title: 'Day 3: 変数と計算', description: '変数、データ型、式と演算子を使った基本的な計算。' },
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
