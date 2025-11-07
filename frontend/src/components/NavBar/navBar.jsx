import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import HamburgerMenu from "../../layouts/menu/menu.jsx";
import api from "../../services/api.js";
import logo from "../../assets/TecVagas_Logo.png";
import "./navBar.scss";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const [enable, setEnable] = useState(false);
  const [enableInc, setEnableInc] = useState(false);
  const [enableUser, setEnableUser] = useState(false);
  const [enableAdmin, setEnableAdmin] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [userNome, setUserNome] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [userEmail, setUserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    const verify = localStorage.getItem("USER_TYPE");
    if (verify === "empresa") {
      setEnableInc(true);
      setEnableUser(false);
      setEnableAdmin(false);
    } else if (verify === "usuario") {
      setEnableInc(false);
      setEnableUser(true);
      setEnableAdmin(false);
    } else if (verify === "admin") {
      setEnableInc(false);
      setEnableUser(false);
      setEnableAdmin(true);
    } else {
      setEnableInc(false);
      setEnableUser(false);
      setEnableAdmin(false);
    }

    const email = localStorage.getItem("EMAIL");
    if (email && email.trim() !== "") {
      setEnable(true);
      setUserEmail(email);
    }

    const nome = localStorage.getItem("NOME")
    setUserNome(nome)

    // Buscar foto e nome do perfil
    const fetchUserPhoto = async () => {
      const userType = localStorage.getItem("USER_TYPE");
      if (userType && userType !== "admin") {
        try {
          const endpoint = userType === "usuario" ? "/usuario/perfil" : "/empresa/perfil";
          const response = await api.get(endpoint);
          const photoField = userType === "usuario" ? "user_foto" : "empresa_foto";
          const nameField = userType === "usuario" ? "user_nome" : "empresa_nome";
          if (response.data[photoField]) {
            setUserPhoto(`${api.defaults.baseURL}/storage/${response.data[photoField]}`);
          }
          if (response.data[nameField]) {
            setUserNome(response.data[nameField]);
            localStorage.setItem("NOME", response.data[nameField]); // Atualizar localStorage também
          }
        } catch (error) {
          console.error("Erro ao buscar foto e nome do perfil:", error);
        }
      }
    };

    fetchUserPhoto();
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
            <img className="logo-2" src={logo} alt="Logo" />
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
                <li className={`forms ${enableUser ? "loggedUser" : ""}`}>
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
                <li className={`candidatos ${enableInc ? "loggedInc" : ""}`}>
                  <NavLink className="navlink" to="/candidatos">
                    Ver Candidatos
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
                <li className={`admin ${enableAdmin ? "loggedAdmin" : ""}`}>
                  <NavLink className="navlink" to="/admin">
                    Admin
                  </NavLink>
                </li>
                <li>
                  <NavLink className="navlink ult" to="/about">
                    Sobre Nós
                  </NavLink>
                </li>
              </ul>
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
            {userPhoto && <img src={userPhoto} alt="Foto de perfil" className="navbar-profile-photo" />}
            {userNome}
          </Link>
        </div>
      </header>
    </motion.div>
  );
};

export default Navbar;
