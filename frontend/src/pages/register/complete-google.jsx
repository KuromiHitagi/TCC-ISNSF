import NavBar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api.js';
import './register.scss';

export default function CompleteGoogleRegistration() {
  const navigate = useNavigate();
  const location = useLocation();

  // Receber dados do Google da navegação
  const googleUser = location.state?.googleUser;
  const tipo = location.state?.tipo;



  const [googleIdade, setGoogleIdade] = useState("");
  const [googleCpf, setGoogleCpf] = useState("");
  const [googleCnpj, setGoogleCnpj] = useState("");
  const [googleAreaInteresse, setGoogleAreaInteresse] = useState("");
  const [googleAreaProfissionalizada, setGoogleAreaProfissionalizada] = useState("");

  useEffect(() => {
    if (!googleUser || !tipo) {
      // Se não há dados, redirecionar para register
      navigate('/register');
    }
  }, [googleUser, tipo, navigate]);

  async function submitGoogleRegistration(e) {
    e.preventDefault();

    if (!googleUser) return;

    if (tipo === "usuario") {
      try {
        const body = {
          "nome": googleUser.displayName,
          "idade": googleIdade,
          "cpf": googleCpf,
          "areainteresse": googleAreaInteresse,
          "email": googleUser.email,
          "senha": "" // Senha vazia para contas Google
        }

        const response = await api.post('/usuario', body);

        if (response.status === 200) {
          // Agora fazer login automático
          const loginResponse = await api.post('/usuario/login', {
            email: googleUser.email,
            senha: ""
          });

          if (loginResponse.status === 200) {
            localStorage.setItem("EMAIL", googleUser.email);
            localStorage.setItem("NOME", loginResponse.data.nome);
            localStorage.setItem("TOKEN", loginResponse.data.token);
            localStorage.setItem("USER_TYPE", "usuario");
            alert("Conta criada e logada com sucesso!");
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao criar conta de usuário');
      }
    } else if (tipo === "empresa") {
      try {
        const body = {
          "nome": googleUser.displayName,
          "cnpj": googleCnpj,
          "areaprofissionalizada": googleAreaProfissionalizada,
          "email": googleUser.email,
          "senha": "" // Senha vazia para contas Google
        }

        const response = await api.post('/empresa', body);

        if (response.status === 200) {
          // Agora fazer login automático
          const loginResponse = await api.post('/empresa/login', {
            email: googleUser.email,
            senha: ""
          });

          if (loginResponse.status === 200) {
            localStorage.setItem("EMAIL", googleUser.email);
            localStorage.setItem("NOME", loginResponse.data.nome);
            localStorage.setItem("TOKEN", loginResponse.data.token);
            localStorage.setItem("USER_TYPE", "empresa");
            alert("Conta criada e logada com sucesso!");
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao criar conta de empresa');
      }
    }
  }

  if (!googleUser || !tipo) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <NavBar />

      <section className="cadastro">
        <h2>Complete seu Cadastro</h2>
        <p>Olá, {googleUser.displayName}! Complete as informações abaixo para finalizar seu cadastro.</p>

        <form onSubmit={submitGoogleRegistration} className="additional-form">
          {tipo === "usuario" ? (
            <>
              <h3>Informações de Usuário</h3>
              <input value={googleIdade} onChange={(e) => setGoogleIdade(e.target.value)} type="text" placeholder="Idade" required />
              <input value={googleCpf} onChange={(e) => setGoogleCpf(e.target.value)} type="text" placeholder="CPF" required />
              <input value={googleAreaInteresse} onChange={(e) => setGoogleAreaInteresse(e.target.value)} type="text" placeholder="Área de Interesse" required />
            </>
          ) : (
            <>
              <h3>Informações de Empresa</h3>
              <input value={googleCnpj} onChange={(e) => setGoogleCnpj(e.target.value)} type="text" placeholder="CNPJ" required />
              <input value={googleAreaProfissionalizada} onChange={(e) => setGoogleAreaProfissionalizada(e.target.value)} type="text" placeholder="Área profissionalizada" required />
            </>
          )}

          <button type="submit">Finalizar Cadastro</button>
        </form>

        <button className="butão" onClick={() => navigate('/register')}>Voltar ao Cadastro</button>
      </section>

      <Footer />
    </div>
  );
}
