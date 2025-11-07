import NavBar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signInWithGoogle, auth, googleProvider } from "../../services/firebase.js";
import { signInWithRedirect } from "firebase/auth";
import { IMaskInput } from "react-imask";
import api from "../../services/api.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./register.scss";
import googleIcon from "../../assets/google.png";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Register = () => {
  const areasDisponiveis = [
    "Tecnologia da Informação",
    "Recursos Humanos",
    "Marketing",
    "Vendas",
    "Administração",
    "Comunicação Visual",
    "Design gráfico",
    "Tecnologia",
    "Serviços Sociais"
  ]
  const [open, setOpen] = useState(false);
  const [opcao, setOpcao] = useState("");
  let show = null;
  const [enable, setEnable] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const Navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("EMAIL")
    if(userEmail != undefined && userEmail != null&& userEmail != "") {
        setIsLoggedIn(true);
    }
  }, []);

  const [nomeUser, setNomeUser] = useState("");
  const [nomeInc, setNomeInc] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfRaw, setCpfRaw] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cnpjRaw, setCnpjRaw] = useState("");
  const [areainteresse, setAreainteresse] = useState("");
  const [areaprofissionalizada, setAreaprofissionalizada] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [emailInc, setEmailInc] = useState("");
  const [userSenha, setUserSenha] = useState("");
  const [incSenha, setIncSenha] = useState("");
  const [tel, setTel] = useState("");
  const [telRaw, setTelRaw] = useState("");
  const [cidade, setCidade] = useState("");
  const [dataNascimento, setDataNasc] = useState(null);

  // Estados para cadastro com Google - removidos pois agora usa página separada
  useEffect(() => {
    if (opcao == "--Selecione--" || opcao == "") {
      setEnable(false);
    } else if (opcao == "empresa") {
      setEnable(true)
    } else if (opcao == "usuario") {
      setEnable(true)
    }
  }, [opcao]);

  if (opcao == "--Selecione--" || opcao == "") {
    show = (
      <div className="nothing">
        <h2>Por favor selecione entre: Empresa e Usuário</h2>
      </div>
    );
  } else if (opcao == "empresa") {
    show = formEmpresa();
  } else if (opcao == "usuario") {
    show = formUsuario();
  }

  async function Criar(e) {
    e.preventDefault();

    // Função para validar se o campo não está vazio ou apenas espaços
    const isCampoValido = (valor) => valor && valor.trim() !== "";

    if (opcao == "usuario") {
      // Validações para usuário
      if (!isCampoValido(nomeUser)) {
        alert("Nome é obrigatório e não pode conter apenas espaços.");
        return;
      }
      const nomeParts = nomeUser.trim().split(/\s+/);
      if (nomeParts.length < 3) {
        alert("Nome deve incluir primeiro nome, nome do meio e sobrenome.");
        return;
      }
      if (nomeParts[0].length < 3) {
        alert("Primeiro nome deve ter pelo menos 3 caracteres.");
        return;
      }
      if (nomeParts[1].length < 3) {
        alert("Nome do meio deve ter pelo menos 3 caracteres.");
        return;
      }
      if (nomeParts[2].length < 3) {
        alert("Sobrenome deve ter pelo menos 3 caracteres.");
        return;
      }
      if (!cpfRaw || cpfRaw.length !== 11) {
        alert("CPF deve estar completo (11 dígitos).");
        return;
      }
      if (!dataNascimento) {
        alert("Data de nascimento é obrigatória.");
        return;
      }
      if (!isCampoValido(cidade) || cidade.trim().length < 3) {
        alert("Cidade é obrigatória, não pode conter apenas espaços e deve ter pelo menos 3 caracteres.");
        return;
      }
      if (!telRaw || telRaw.trim() === "" || telRaw.length < 11) {
        alert("Telefone é obrigatório, e deve ter pelo menos 3 caracteres.");
        return;
      }
      if (!isCampoValido(areainteresse)) {
        alert("Área de interesse é obrigatória e não pode conter apenas espaços.");
        return;
      }
      if (!areasDisponiveis.includes(areainteresse.trim())) {
        alert("Área de interesse inválida. Escolha uma das seguintes: \n" + areasDisponiveis.join(", \n"));
        return;
      }
      if (!isCampoValido(emailUser)) {
        alert("E-mail é obrigatório e não pode conter apenas espaços.");
        return;
      }
      const emailTrimmed = emailUser.trim();
      if (!emailTrimmed.includes('@') || !emailTrimmed.endsWith('.com')) {
        alert("E-mail deve ter formato válido com @ e terminar com .com.");
        return;
      }
      if (!isCampoValido(userSenha) || userSenha.length < 8) {
        alert("Senha é obrigatória, não pode conter apenas espaços e deve ter pelo menos 8 caracteres.");
        return;
      }

      try {
        // Format date to YYYY-MM-DD for backend
        const formattedDate = dataNascimento ? dataNascimento.toISOString().split('T')[0] : null;

        const body = {
          nome: nomeUser.trim(),
          cpf: cpfRaw,
          data_nascimento: formattedDate,
          cidade: cidade.trim(),
          telefone: telRaw,
          area_interesse: areainteresse.trim(),
          email: emailUser.trim(),
          senha: userSenha.trim(),
        };

        const response = await api.post("/usuario", body);

        if (response.status === 200) {
          alert("Conta criada com Sucesso!");

          // Store values before clearing form
          const email = emailUser;
          const senha = userSenha;

          setNomeUser("");
          setCpf("");
          setDataNasc(null);
          setCidade("");
          setTel("");
          setAreainteresse("");
          setEmailUser("");
          setUserSenha("");

          // Perform automatic login after successful registration
          try {
            const loginBody = {
              email: email,
              senha: senha
            };
            const loginResponse = await api.post("/usuario/login", loginBody);
            const userToken = loginResponse.data.token;
            const userName = loginResponse.data.nome;

            localStorage.setItem("EMAIL", email);
            localStorage.setItem("TOKEN", userToken);
            localStorage.setItem("NOME", userName)
            localStorage.setItem("USER_TYPE", "usuario");

            Navigate("/register/complete");
          } catch (loginError) {
            console.error("Erro no login automático:", loginError);
            alert("Conta criada, mas erro no login automático. Faça login manualmente.");
            Navigate("/login");
          }
        } else {
          alert("Erro ao criar conta");
        }
      } catch (error) {
        console.error("Erro:", error);
        const errorMessage = error.response?.data?.erro || "Erro ao conectar com o servidor.";
        alert(errorMessage);
      }
    } else if (opcao == "empresa") {
      // Validações para empresa
      if (!isCampoValido(nomeInc) || nomeInc.trim() === "") {
        alert("Nome da empresa é obrigatório e não pode conter apenas espaços.");
        return;
      }
      if (nomeInc.length < 2) {
        alert("O nome da empresa deve ter pelo menos 2 caracteres.");
        return;
      }
      if (!cnpjRaw || cnpjRaw.trim() === "" || cnpjRaw.length !== 14) {
        alert("CNPJ é obrigatório.");
        return;
      }
      if (!isCampoValido(areaprofissionalizada)) {
        alert("Área profissionalizada é obrigatória e não pode conter apenas espaços.");
        return;
      }
      if (!areasDisponiveis.includes(areaprofissionalizada.trim())) {
        alert("Área profissionalizada inválida. Escolha uma das seguintes: \n" + areasDisponiveis.join(", \n"));
        return;
      }
      if (!isCampoValido(emailInc)) {
        alert("E-mail é obrigatório e não pode conter apenas espaços.");
        return;
      }
      const emailIncTrimmed = emailInc.trim();
      if (!emailIncTrimmed.includes('@') || !emailIncTrimmed.endsWith('.com')) {
        alert("E-mail deve ter formato válido com @ e terminar com .com.");
        return;
      }
      if (!isCampoValido(incSenha)) {
        alert("Senha é obrigatória e não pode conter apenas espaços.");
        return;
      }
      if (incSenha.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres.");
        return;
      }

      try {
        const body = {
          nome: nomeInc.trim(),
          cnpj: cnpjRaw,
          area_profissional: areaprofissionalizada.trim(),
          email: emailInc.trim(),
          senha: incSenha.trim(),
        };

        const response = await api.post("/empresa", body);

        if (response.status === 200) {
          alert("Conta criada com Sucesso!");

          // Store values before clearing form
          const email = emailInc;
          const senha = incSenha;

          setNomeInc("");
          setCnpj("");
          setAreaprofissionalizada("");
          setEmailInc("");
          setIncSenha("");

          // Perform automatic login after successful registration
          try {
            const loginBody = {
              email: email,
              senha: senha
            };
            const loginResponse = await api.post("/empresa/login", loginBody);
            const userToken = loginResponse.data.token;
            const userName = loginResponse.data.nome;

            localStorage.setItem("EMAIL", email);
            localStorage.setItem("NOME", userName);
            localStorage.setItem("TOKEN", userToken);
            localStorage.setItem("USER_TYPE", "empresa");

            Navigate("/register/complete");
          } catch (loginError) {
            console.error("Erro no login automático:", loginError);
            alert("Conta criada, mas erro no login automático. Faça login manualmente.");
            Navigate("/login");
          }
        } else {
          alert("Erro ao criar conta");
        }
      } catch (error) {
        console.error("Erro:", error);
        const errorMessage = error.response?.data?.erro || "Erro ao conectar com o servidor.";
        alert(errorMessage);
      }
    }
  }

  async function registerWithGoogle() {
    try {
      const result = await signInWithGoogle();

      if (result) {
        // Popup method succeeded
        const { token: idToken, user } = result;
        Navigate("/register/complete-google", {
          state: {
            googleUser: {
              idToken,
              displayName: user.displayName,
              email: user.email,
            },
            tipo: opcao,
          },
        });
      } else {
        // This shouldn't happen with popup method, but just in case
        alert("Erro inesperado no cadastro com Google.");
      }
    } catch (error) {
      console.error("Erro no cadastro com Google:", error);

      if (error.code === "auth/popup-blocked") {
        alert("Popups estão bloqueados. Tentando método alternativo...");
        // Try redirect method as fallback
        try {
          await signInWithRedirect(auth, googleProvider);
          alert("Redirecionando para autenticação Google...");
        } catch {
          alert(
            "Erro na autenticação. Por favor, permita popups ou use outro navegador."
          );
        }
      } else if (error.code === "auth/popup-closed-by-user") {
        alert("Autenticação cancelada. Tente novamente.");
      } else if (error.code === "auth/cancelled-popup-request") {
        alert("Solicitação cancelada. Tente novamente.");
      } else {
        alert("Erro no cadastro com Google. Tente novamente.");
      }
    }
  }

  function formEmpresa() {
    return (
      <div className="pre-input">
        <input
          value={nomeInc}
          onChange={(e) => setNomeInc(e.target.value)}
          type="text"
          placeholder="Nome"
          required
        />
        <IMaskInput
          mask="00.000.000/0000-00"
          value={cnpj}
          onAccept={(value, mask) => {
            setCnpj(value);
            setCnpjRaw(mask.unmaskedValue);
          }}
          placeholder="CNPJ:"
          className="input-mask"
        />
        <input
          value={areaprofissionalizada}
          onChange={(e) => setAreaprofissionalizada(e.target.value)}
          type="text"
          placeholder="Área profissionalizada"
          required
        />
        <input
          value={emailInc}
          onChange={(e) => setEmailInc(e.target.value)}
          type="email"
          placeholder="E-mail"
          required
        />
        <input
          value={incSenha}
          onChange={(e) => setIncSenha(e.target.value)}
          type="password"
          placeholder="Senha"
          required
        />
      </div>
    );
  }

  function formUsuario() {
    return (
      <div className="pre-input">
        <input
          minLength={3}
          maxLength={255}
          pattern="^[a-zA-Z ]+$"
          value={nomeUser}
          onChange={(e) => setNomeUser(e.target.value)}
          type="text"
          placeholder="Nome"
          required
        />

        <IMaskInput
          mask="000.000.000-00"
          value={cpf}
          onAccept={(value, mask) => {
            setCpf(value);
            setCpfRaw(mask.unmaskedValue);
          }}
          placeholder="CPF:"
          className="input-mask"
          required
        />
        <DatePicker
          selected={dataNascimento}
          onChange={(date) => setDataNasc(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de Nascimento"
          className="date-picker-input"
          wrapperClassName="date-picker-wrapper"
          maxDate={new Date()}
          minDate={new Date(new Date().getFullYear() - 80, new Date().getMonth(), new Date().getDate())}
        />
        <input
          maxLength={100}
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          type="text"
          placeholder="Cidade"
        />
        <IMaskInput
          mask="(00) 00000-0000"
          value={tel}
          onAccept={(value, mask) => {
            setTel(value);
            setTelRaw(mask.unmaskedValue);
          }}
          placeholder="Telefone:"
          className="input-mask"
        />
        <input
          value={areainteresse}
          onChange={(e) => setAreainteresse(e.target.value)}
          type="text"
          placeholder="Área de Interesse"
          required
        />
        <input
          value={emailUser}
          onChange={(e) => setEmailUser(e.target.value)}
          pattern="^[a-zA-Z0-9._-]{2,}+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          type="email"
          placeholder="E-mail"
          required
        />
        <input
          value={userSenha}
          onChange={(e) => setUserSenha(e.target.value)}
          type="password"
          placeholder="Senha"
          required
        />
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="main">
          <h2>Cadastro</h2>

          <form className="register-form" onSubmit={Criar}>
            <select
              value={opcao}
              onClick={() => setOpen(!open)}
              onChange={(e) => setOpcao(e.target.value)}
              className={open ? "opcoes open" : "opcoes"}
              required
            >
              <option value="">-- Selecione --</option>
              <option value="empresa">Empresa</option>
              <option value="usuario">Usuário</option>
            </select>

            {show}

            <button className="butão-submit" type="submit">
              Junte-se a TEC.VAGAS
            </button>
          </form>

          <div className="logs">
            <Link className="butão" to="/login">
              Login
            </Link>

            {isLoggedIn ? null : (
              <div className={`google ${enable ? "logged" : ""}`}>
                <p>Ou cadastre-se com o</p>
                <button
                  className="butão btn"
                  type="button"
                  onClick={registerWithGoogle}
                >
                  <img src={googleIcon} height={20} alt="google-button" />
                  <p>Google</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Register;