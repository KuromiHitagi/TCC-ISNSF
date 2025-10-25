import NavBar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
import { Link } from 'react-router-dom';
import './register.scss';
import { useState } from 'react';


export default function Register() {
  const [opcao, setOpcao] = useState("")
  let show = null;

  if(opcao == "--Selecione--" || opcao == "") {
    show = <div className='nothing'><h2>Por favor selecione entre: Empresa e Usuário</h2></div>
  } else if (opcao == "empresa") {
    show = formEmpresa();
  } else if (opcao == "usuario") {
    show = formUsuario();
  }

  function handleSubmit() {
  }

  function formEmpresa() {
    return(
      <div className="inc">
        <input type="text" placeholder="Nome" required />
        <input type="text" placeholder="CNPJ" required />
        <input type="text" placeholder="Área profissionalizada" required />
        <input type="email" placeholder="E-mail" required />
        <input type="password" placeholder='Senha'required/>
      </div>
    )
  }

  function formUsuario() {
    return(
      <div className="user">
        <input type="text" placeholder="Nome" required />
        <input type="text" placeholder="Idade" required />
        <input type="text" placeholder="CPF" required />
        <input type="text" placeholder="Área de Interesse" required />
        <input type="email" placeholder="E-mail" required />
        <input type="password" placeholder='Senha'required/>
      </div>
    )
  }

  return (
    <div>

      <NavBar />

      <section className="cadastro">
        <h2>Cadastro</h2>

        <form onSubmit={handleSubmit}>

          <select id="opcoes" value={opcao} onChange={(e) => setOpcao(e.target.value)} required>
            <option value="">--Selecione--</option>
            <option value="empresa">Empresa</option>
            <option value="usuario">Usuário</option>
          </select>

          {show}

          <button className="butão" type="submit">Junte-se a TEC.VAGAS</button>
          <Link className="butão" to="/login">Login</Link>
        </form>
      </section>

      <Footer />
    </div>
  );
}
