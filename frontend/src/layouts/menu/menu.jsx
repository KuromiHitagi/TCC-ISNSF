import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.scss';

const HamburgerMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay para fechar o menu ao clicar fora */}
      {isOpen && (
        <div className="menu-overlay" onClick={onClose} />
      )}
      
      {/* Menu lateral */}
      <nav className={`hamburger-menu ${isOpen ? 'hamburger-menu--open' : ''}`}>
        <div className="hamburger-menu__header">
          <h3 className="hamburger-menu__title">Menu</h3>
          <button 
            className="hamburger-menu__close" 
            onClick={onClose}
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>
        
        <div className="hamburger-menu__content">
          <NavLink className="hamburger-menu__link" to="/">Home</NavLink>
          <NavLink className="hamburger-menu__link" to="/about">Sobre</NavLink>
          <NavLink className="hamburger-menu__link" to="/form">Form</NavLink>
          <NavLink className="hamburger-menu__link" to="/login">Inscrição</NavLink>
          <NavLink className="hamburger-menu__link" to="/search">Busca</NavLink>
          <NavLink className="hamburger-menu__link" to="/guia">Guia</NavLink>
          <NavLink className="hamburger-menu__link" to="/curriculo">Curriculo</NavLink>
        </div>
      </nav>
    </>
  );
};

export default HamburgerMenu;
