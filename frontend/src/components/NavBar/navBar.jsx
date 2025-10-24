import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import HamburgerMenu from '../menu/menu.jsx'
import './navBar.scss';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      {/* Logo */}
        <div className="imglogodiv">
          <Link to="/" className="navbar__brand">
            <img className="logo-2" src="/img/TecVagas_Logo.png" alt="Logo" />
          </Link>
        </div>
      <div className="navbar__inner">
        <div className="navbar__nav-and-search">
          {/* Home sempre visível */}
          <div className="navbar__home-container">
            <NavLink className="navlink navbar__home" to="/">Home</NavLink>
            {/* Botão dropdown */}
            <button
              className="navbar__dropdown-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Abrir menu dropdown"
            >
              ▼
            </button>
            {/* Navlist dos outros itens */}
            <ul className={`navbar__navlist ${isDropdownOpen ? 'navbar__navlist--visible' : ''}`}>
              <li><NavLink className="navlink" to="/about">Sobre</NavLink></li>
              <li><NavLink className="navlink" to="/form">Form</NavLink></li>
              <li><NavLink className="navlink" to="/login">Inscrição</NavLink></li>
              <li><NavLink className="navlink" to="/search">Busca</NavLink></li>
              <li><NavLink className="navlink" to="/guia">Guia</NavLink></li>
              <li><NavLink className="navlink" to="/curriculo">Curriculo</NavLink></li>
            </ul>
          </div>
          {/* Busca */}
          <div className="navbar__search">
            <input type="text" placeholder="Pesquisar" className="navbar__search-input"/>
            <button aria-label="Pesquisar" className="navbar__search-button">🔎</button>
          </div>
        </div>

        {/* Botão Hamburguer (só mobile) */}
        <button 
          className="navbar__hamburger" 
          onClick={toggleMenu}
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>

        {/* Menu Hamburguer */}
        <HamburgerMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
      <div className="spacement"></div>
    </header>
  );
}
