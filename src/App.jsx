import React from 'react';
import './index.css';

const slides = [
  { id: 'day1', title: 'Day 1: Introduction to C', description: 'C言語の基礎、環境構築、基本的な文法とHello Worldまで。' },
  { id: 'day2', title: 'Day 2: Control Flow & Functions', description: '条件分岐、ループ処理、関数の定義と使い方。' },
];

function App() {
  const handleMouseMove = (e) => {
    const cards = document.getElementsByClassName("card");
    for (const card of cards) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <div className="app-container" onMouseMove={handleMouseMove}>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <main className="content">
        <header className="header">
          <h1 className="title">
            <span className="gradient-text">C Programming</span> Workshop
          </h1>
          <p className="subtitle">Learn the fundamentals of C step by step.</p>
        </header>

        <div className="grid">
          {slides.map(slide => (
            <a key={slide.id} href={`/${slide.id}/`} className="card">
              <div className="card-content">
                <div className="card-badge">{slide.id.toUpperCase()}</div>
                <h2 className="card-title">{slide.title}</h2>
                <p className="card-desc">{slide.description}</p>
                <div className="card-action">
                  <span>Start Module</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
              <div className="card-glow"></div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
