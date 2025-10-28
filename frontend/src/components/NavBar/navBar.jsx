import { useState, useEffect } from "react";
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

  const [enable, setEnable] = useState(false);
  const [enableInc, setEnableInc] = useState(false);
  const [enableUser, setEnableUser] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const verify = localStorage.getItem("USER_TYPE");
    if (verify === "empresa") {
      setEnableInc(true);
      setEnableUser(false);
    } else if (verify === "usuario") {
      setEnableInc(false);
      setEnableUser(true);
    }

    const email = localStorage.getItem("EMAIL");
    if (email && email.trim() !== "") {
      setEnable(true);
      setUserEmail(email);
    }
  }, []);

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
                <li className={`curriculo ${enableUser ? "loggedUser" : ""}`}>
                  <NavLink className="navlink" to="/curriculo">
                    Curriculo
                  </NavLink>
                </li>
                <li className={`vagas_empresas ${enableInc ? "loggedInc" : ""}`}>
                  <NavLink className="navlink" to="/postar_vagas">
                    Postar Vagas
                  </NavLink>
                </li>
                <li className={`vagas_usuario ${enableUser ? "loggedUser" : ""}`}>
                  <NavLink className="navlink" to="/buscar_vagas">
                    Buscar Vagas
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
