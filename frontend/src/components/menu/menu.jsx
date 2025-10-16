import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.scss';

const HamburgerMenu = ({ isOpen, onClose }) => {
  const handleLinkClick = () => {
    onClose();
  };

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
          <NavLink to="/" className="hamburger-menu__link" onClick={handleLinkClick}>Home</NavLink>
          <NavLink to="/register" className="hamburger-menu__link" onClick={handleLinkClick}>Inscrição</NavLink>
          <NavLink to="/search" className="hamburger-menu__link" onClick={handleLinkClick}>Questionário</NavLink>
          <NavLink to="/curriculo" className="hamburger-menu__link" onClick={handleLinkClick}>Currículo</NavLink>
          <NavLink to="/about" className="hamburger-menu__link" onClick={handleLinkClick}>Sobre</NavLink>
          <NavLink to="/guia" className="hamburger-menu__link" onClick={handleLinkClick}>Guia</NavLink>
        </div>
      </nav>
    </>
  );
};

export default HamburgerMenu;
