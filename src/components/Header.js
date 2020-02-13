import React from 'react';

export default function Header(props) {
  return(
    <header className="header">
      <div className="header--text--container">      
        <h1 className="header--text">Song<span>Bird</span></h1>
        <span className="header--score">Счет: {props.score}</span>
      </div>

      <nav className="header--navbar">
        <ul className="header--navbar--list">
          <li className="header--navbar--item level0">Разминка</li>
          <li className="header--navbar--item level1">Воробьиные</li>
          <li className="header--navbar--item level2">Лесные птицы</li>
          <li className="header--navbar--item level3">Певчие птицы</li>
          <li className="header--navbar--item level4">Хищные птицы</li>
          <li className="header--navbar--item level5">Морские птицы</li>
        </ul>
      </nav>
    </header>
  )
}