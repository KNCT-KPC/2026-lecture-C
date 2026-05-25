import React from 'react';
import './index.css';

const slides = [
  { id: 'day1', title: 'Day 1: Introduction to C', description: 'C言語の基礎、環境構築、基本的な文法とHello Worldまで。' },
  { id: 'day2', title: 'Day 2: Control Flow & Functions', description: '条件分岐、ループ処理、関数の定義と使い方。' },
];

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">C Programming Workshop</h1>
        <p className="subtitle">Learn the fundamentals of C step by step.</p>
      </header>

      <main className="content">
        <div className="grid">
          {slides.map(slide => (
            <a key={slide.id} href={`/${slide.id}/`} className="card">
              <div className="card-badge">{slide.id.toUpperCase()}</div>
              <h2 className="card-title">{slide.title}</h2>
              <p className="card-desc">{slide.description}</p>
              <div className="card-action">
                <span>View Slide</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </a>
          ))}
        </div>
      </main>
      
      <footer className="footer">
        <p>&copy; 2026 C Programming Workshop</p>
      </footer>
    </div>
  );
}

export default App;
