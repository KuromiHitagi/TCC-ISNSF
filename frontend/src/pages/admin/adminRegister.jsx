import NavBar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api.js";
import "./adminRegister.scss";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AdminRegister = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("USER_TYPE");
    if (userType !== "admin") {
      alert("Acesso negado. Apenas administradores podem acessar esta página.");
      Navigate("/");
    }
  }, [Navigate]);

  async function Criar(e) {
    e.preventDefault();

    // Validações
    if (!nome || nome.trim() === "" || nome.length < 3) {
      alert("Nome é obrigatório e deve ter pelo menos 3 caracteres.");
      return;
    }
    if (!email || email.trim() === "" || !email.includes('@') || !email.endsWith('.com')) {
      alert("E-mail é obrigatório e deve ter formato válido.");
      return;
    }
    if (!senha || senha.length < 8) {
      alert("Senha é obrigatória e deve ter pelo menos 8 caracteres.");
      return;
    }
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const body = {
        nome: nome.trim(),
        email: email.trim(),
        senha: senha.trim(),
      };

      const response = await api.post("/register/admin", body);

      if (response.status === 200) {
        alert("Administrador criado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
      } else {
        alert("Erro ao criar administrador");
      }
    } catch (error) {
      console.error("Erro:", error);
      const errorMessage = error.response?.data?.erro || "Erro ao conectar com o servidor.";
      alert(errorMessage);
    }
  }

  return (
    <div>
      <NavBar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="admin-register-main">
          <h2>Cadastrar Administrador</h2>

          <form className="admin-register-form" onSubmit={Criar}>
            <div className="pre-input">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                type="text"
                placeholder="Nome"
                required
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="E-mail"
                required
              />
              <input
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                type="password"
                placeholder="Senha"
                required
              />
              <input
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                type="password"
                placeholder="Confirmar Senha"
                required
              />
            </div>

            <button className="butão-submit" type="submit">
              Cadastrar Administrador
            </button>
          </form>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default AdminRegister;
