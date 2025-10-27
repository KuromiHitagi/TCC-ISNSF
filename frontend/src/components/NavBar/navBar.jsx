import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import HamburgerMenu from "../menu/menu.jsx";
import "./navBar.scss";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  let enable = false;
  const userEmail = localStorage.getItem("EMAIL");
  if (userEmail != undefined && userEmail != null && userEmail != "") {
    enable = true;
  }

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}>
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
            <div
              className={`navbar__home-container ${
                isDropdownOpen ? "open" : ""
              }`}
            >
              <NavLink className="navlink navbar__home" to="/">
                Home
              </NavLink>
              {/* Botão dropdown */}
              <button
                className="navbar__dropdown-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="Abrir menu dropdown"
              >
                ▼
              </button>
              {/* Navlist dos outros itens */}
              <ul
                className={`navbar__navlist ${
                  isDropdownOpen ? "navbar__navlist--visible" : ""
                }`}
              >
                <li>
                  <NavLink className="navlink" to="/form">
                    Formulário
                  </NavLink>
                </li>
                <li className={`subscribe ${enable ? "logged" : ""}`}>
                  <NavLink className="navlink" to="/login">
                    Inscrição
                  </NavLink>
                </li>
                <li>
                  <NavLink className="navlink" to="/search">
                    Busca
                  </NavLink>
                </li>
                <li>
                  <NavLink className="navlink" to="/guia">
                    Guia
                  </NavLink>
                </li>
                <li>
                  <NavLink className="navlink" to="/curriculo">
                    Curriculo
                  </NavLink>
                </li>
                <li>
                  <NavLink className="navlink ult" to="/about">
                    Sobre Nós
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* Busca */}
            <div className="navbar__search">
              <input
                type="text"
                placeholder="Pesquisar"
                className="navbar__search-input"
              />
              <button aria-label="Pesquisar" className="navbar__search-button">
                🔎
              </button>
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
        <div className={`spacement ${enable ? "logged" : ""}`}>
          <Link className="perfil-link" to="/perfil">
            {userEmail}
          </Link>
        </div>
      </header>
    </motion.div>
  );
};

export default Navbar;
