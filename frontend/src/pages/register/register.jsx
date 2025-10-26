import NavBar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import { useState } from 'react';
import api from '../../api.js';
import { signInWithGoogle, auth, googleProvider } from '../../firebase.js';
import { signInWithRedirect } from 'firebase/auth';


export default function Register() {
  const [open, setOpen] = useState(false)
  const [opcao, setOpcao] = useState("")
  let show = null;
  const Navigate = useNavigate();

  const [nomeUser, setNomeUser] = useState("");
  const [nomeInc, setNomeInc] = useState("");
  const [idade, setIdade] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [areainteresse, setAreainteresse] = useState("");
  const [areaprofissionalizada, setAreaprofissionalizada] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [emailInc, setEmailInc] = useState("");
  const [userSenha, setUserSenha] = useState("");
  const [incSenha, setIncSenha] = useState("");

  // Estados para cadastro com Google - removidos pois agora usa página separada

  if(opcao == "--Selecione--" || opcao == "") {
    show = <div className='nothing'><h2>Por favor selecione entre: Empresa e Usuário</h2></div>
  } else if (opcao == "empresa") {
    show = formEmpresa();
  } else if (opcao == "usuario") {
    show = formUsuario();
  }

  async function Criar(e) {
    e.preventDefault();
    if(opcao == "usuario") {
      try{
        const body = {
        "nome":nomeUser,
        "idade": idade,
        "cpf": cpf,
        "area_interesse": areainteresse,
        "email": emailUser,
        "senha": userSenha
        }

        const response = await api.post('/usuario', body);

        if(response.status === 200) {
          alert("Conta criada com Sucesso!")
          setNomeUser("")
          setIdade("")
          setCpf("")
          setAreainteresse("")
          setEmailUser("")
          setUserSenha("")
          Navigate('/login')
        }
        else{
          alert("Erro ao criar conta")
        }
      } catch(error) {
        console.error('Erro:', error)
        alert('Erro ao conectar com o servidor.')
      }

    } else if (opcao == "empresa") {
      try{
        const body = {
        "nome": nomeInc,
        "cnpj": cnpj,
        "area_profissional": areaprofissionalizada,
        "email": emailInc,
        "senha": incSenha
        }

        const response = await api.post('/empresa', body);

        if(response.status === 200) {
          alert("Conta criada com Sucesso!")
          setNomeInc("")
          setCnpj("")
          setAreaprofissionalizada("")
          setEmailInc("")
          setIncSenha("")
        }
        else{
          alert("Erro ao criar conta")
        }
      } catch(error) {
        console.error('Erro:', error)
        alert('Erro ao conectar com o servidor.')
      }
    }
  }

  async function registerWithGoogle() {
    try {
      const result = await signInWithGoogle();

      if (result) {
        // Popup method succeeded
        const { token: idToken, user } = result;
        Navigate('/register/complete-google', {
          state: {
            googleUser: {
              idToken,
              displayName: user.displayName,
              email: user.email
            },
            tipo: opcao
          }
        });
      } else {
        // This shouldn't happen with popup method, but just in case
        alert('Erro inesperado no cadastro com Google.');
      }
    } catch (error) {
      console.error('Erro no cadastro com Google:', error);

      if (error.code === 'auth/popup-blocked') {
        alert('Popups estão bloqueados. Tentando método alternativo...');
        // Try redirect method as fallback
        try {
          await signInWithRedirect(auth, googleProvider);
          alert('Redirecionando para autenticação Google...');
        } catch {
          alert('Erro na autenticação. Por favor, permita popups ou use outro navegador.');
        }
      } else if (error.code === 'auth/popup-closed-by-user') {
        alert('Autenticação cancelada. Tente novamente.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        alert('Solicitação cancelada. Tente novamente.');
      } else {
        alert('Erro no cadastro com Google. Tente novamente.');
      }
    }
  }



  function formEmpresa() {
    return(
      <div className="pre-input">
        <input value={nomeInc} onChange={(e) => setNomeInc(e.target.value)} type="text" placeholder="Nome" required />
        <input value={cnpj} onChange={(e) => setCnpj(e.target.value)} type="text" placeholder="CNPJ" required />
        <input value={areaprofissionalizada} onChange={(e) => setAreaprofissionalizada(e.target.value)} type="text" placeholder="Área profissionalizada" required />
        <input value={emailInc} onChange={(e) => setEmailInc(e.target.value)} type="email" placeholder="E-mail" required />
        <input value={incSenha} onChange={(e) => setIncSenha(e.target.value)} type="password" placeholder='Senha'required/>

        <p>Ou cadastre-se com o</p>
        <button className='google-button' type="button" onClick={registerWithGoogle}>
          <img src="/img/" alt="google-button" />
        </button>
      </div>
    )
  }

  function formUsuario() {
    return(
      <div className="pre-input">
        <input value={nomeUser} onChange={(e) => setNomeUser(e.target.value)} type="text" placeholder="Nome" required />
        <input value={idade} onChange={(e) => setIdade(e.target.value)} type="text" placeholder="Idade" required />
        <input value={cpf} onChange={(e) => setCpf(e.target.value)} type="text" placeholder="CPF" required />
        <input value={areainteresse} onChange={(e) => setAreainteresse(e.target.value)} type="text" placeholder="Área de Interesse" required />
        <input value={emailUser} onChange={(e) => setEmailUser(e.target.value)} type="email" placeholder="E-mail" required />
        <input value={userSenha} onChange={(e) => setUserSenha(e.target.value)} type="password" placeholder='Senha'required/>

        <p>Ou cadastre-se com o</p>
        <button className='google-button' type="button" onClick={registerWithGoogle}>
          <img src="/img/" alt="google-button" />
        </button>
      </div>
    )
  }



  return (
    <div>

      <NavBar />

      <section className="cadastro">
        <h2>Cadastro</h2>

        <form className='register-form' onSubmit={Criar}>

          <select value={opcao} onClick={() => setOpen(!open)} onChange={(e) => setOpcao(e.target.value)}  className={open ? "opcoes open" : "opcoes"} required>
            <option value="">-- Selecione --</option>
            <option value="empresa">Empresa</option>
            <option value="usuario">Usuário</option>
          </select>

          {show}

          <button className="butão" type="submit">Junte-se a TEC.VAGAS</button>
        </form>



        <Link className="butão" to="/login">Login</Link>
      </section>

      <Footer />
    </div>
  );
}
