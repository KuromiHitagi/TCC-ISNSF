import NavBar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api.js";
import "./complete-google.scss";
import { IMaskInput } from "react-imask";
import validarCPF from "../../services/validarCPF.js";
import validarCNPJ from "../../services/validarCNPJ.js";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { areasDisponiveis } from "../../services/areas.js";

export default function CompleteGoogleRegistration() {
  const areasDisponiveisList = areasDisponiveis();
  const navigate = useNavigate();
  const location = useLocation();

  // Receber dados do Google da navegação
  const googleUser = location.state?.googleUser;
  const tipo = location.state?.tipo;

  const [googleCpf, setGoogleCpf] = useState("");
  const [googleCpfRaw, setGoogleCpfRaw] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [googleCnpj, setGoogleCnpj] = useState("");
  const [googleCnpjRaw, setGoogleCnpjRaw] = useState("");
  const [googleAreaInteresse, setGoogleAreaInteresse] = useState("");
  const [googleAreaProfissionalizada, setGoogleAreaProfissionalizada] =
    useState("");

  useEffect(() => {
    if (!googleUser || !tipo) {
      // Se não há dados, redirecionar para register
      navigate("/register");
    }
  }, [googleUser, tipo, navigate]);

  async function submitGoogleRegistration(e) {
    e.preventDefault();

    if (!googleUser) return;

    if (tipo === "usuario") {
      try {
        const body = {
          nome: googleUser.displayName,
          cpf: googleCpfRaw,
          areainteresse: googleAreaInteresse,
          email: googleUser.email,
          senha: "", // Senha vazia para contas Google
        };

        const response = await api.post("/usuario", body);

        if (response.status === 200) {
          // Agora fazer login automático
          const loginResponse = await api.post("/usuario/login", {
            email: googleUser.email,
            senha: "",
          });

          if (loginResponse.status === 200) {
            localStorage.setItem("EMAIL", googleUser.email);
            localStorage.setItem("NOME", loginResponse.data.nome);
            localStorage.setItem("TOKEN", loginResponse.data.token);
            localStorage.setItem("USER_TYPE", "usuario");
            alert("Conta criada e logada com sucesso!");
            navigate("/register/complete");
          }
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao criar conta de usuário");
      }
    } else if (tipo === "empresa") {
      try {
        const body = {
          nome: googleUser.displayName,
          cnpj: googleCnpjRaw,
          areaprofissionalizada: googleAreaProfissionalizada,
          email: googleUser.email,
          senha: "", // Senha vazia para contas Google
        };

        const response = await api.post("/empresa", body);

        if (response.status === 200) {
          // Agora fazer login automático
          const loginResponse = await api.post("/empresa/login", {
            email: googleUser.email,
            senha: "",
          });

          if (loginResponse.status === 200) {
            localStorage.setItem("EMAIL", googleUser.email);
            localStorage.setItem("NOME", loginResponse.data.nome);
            localStorage.setItem("TOKEN", loginResponse.data.token);
            localStorage.setItem("USER_TYPE", "empresa");
            alert("Conta criada e logada com sucesso!");
            navigate("/register/complete");
          }
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao criar conta de empresa");
      }
    }
  }

  if (!googleUser || !tipo) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <NavBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <section className="cadastro">
          <h2>Complete seu Cadastro</h2>
          <p>
            Olá, {googleUser.displayName}! Complete as informações abaixo para
            finalizar seu cadastro.
          </p>

          <form onSubmit={submitGoogleRegistration} className="additional-form">
            {tipo === "usuario" ? (
              <>
                <h3>Informações de Usuário</h3>
                <IMaskInput
                  mask="000.000.000-00"
                  minLength={11}
                  maxLength={11}
                  value={googleCpf}
                  onAccept={(value, mask) => {
                    setGoogleCpf(value);
                    setGoogleCpfRaw(mask.unmaskedValue);

                    if (mask.unmaskedValue.length === 11) {
                      if (!validarCPF(mask.unmaskedValue)) {
                        alert(
                          "CPF inválido. Por favor, verifique o número inserido."
                        );
                        setGoogleCpf("");
                        setGoogleCpfRaw("");
                      }
                    }
                  }}
                  placeholder="CPF:"
                  className="input-mask"
                  required
                />
                <select
                  value={googleAreaInteresse}
                  onChange={(e) => setGoogleAreaInteresse(e.target.value)}
                  className="input-mask"
                  required
                >
                  <option value="">-- Selecione uma área --</option>
                  {areasDisponiveisList.map((area, index) => (
                    <option key={index} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <h3>Informações de Empresa</h3>
                <IMaskInput
                  mask="00.000.000/0000-00"
                  minLength={14}
                  maxLength={14}
                  value={googleCnpjRaw}
                  onAccept={(value, mask) => {
                    setGoogleCnpj(value);
                    setGoogleCnpjRaw(mask.unmaskedValue);

                    if (mask.unmaskedValue.length === 14) {
                      if (!validarCNPJ(mask.unmaskedValue)) {
                        alert(
                          "CNPJ inválido. Por favor, verifique o número inserido."
                        );
                        setGoogleCnpj("");
                        setGoogleCnpjRaw("");
                      }
                    }
                  }}
                  placeholder="CNPJ:"
                  className="input-mask"
                  required
                />
                <select
                  value={googleAreaProfissionalizada}
                  onChange={(e) => setGoogleAreaProfissionalizada(e.target.value)}
                  className="input-mask"
                  required
                >
                  <option value="">-- Selecione uma área --</option>
                  {areasDisponiveisList.map((area, index) => (
                    <option key={index} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </>
            )}

            <button type="submit">Finalizar Cadastro</button>
          </form>

          <button className="butão" onClick={() => navigate("/register")}>
            Voltar ao Cadastro
          </button>
        </section>
      </motion.div>

      <Footer />
    </div>
  );
}
