import NavBar from '../../components/NavBar/navBar.jsx';
import './form.scss';
import { FaHome, FaUserEdit, FaClipboardList, FaBriefcase, FaFileAlt, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function CadastroPage() {
  return (
    <div className="pagina-cadastro">
     
      <header>
        <div className="logo">
          <img src="/logo.png" alt="Logo TEC.VAGAS" />
          <h1>TEC.VAGAS</h1>
        </div>

        <div className="menu">
          <input type="search" placeholder="Procurar..." />
          <a href="#">☰</a>
        </div>
      </header>

      <div className="nav-icons">
        <div className="icon">
          <FaHome />
          <p>Home</p>
        </div>
        <div className="icon">
          <FaUserEdit />
          <p>Inscrição</p>
        </div>
        <div className="icon">
          <FaClipboardList />
          <p>Questionário</p>
        </div>
        <div className="icon">
          <FaBriefcase /> 
          <p>Vagas</p>
        </div>
        <div className="icon">
          <FaFileAlt />
          <p>Currículo</p>
        </div>
      </div>
   
      <section className="cadastro">
        <h2>Cadastro</h2>
        <form>
          <input type="text" placeholder="Nome" required />
          <input type="text" placeholder="Idade" required />
          <input type="text" placeholder="CPF" required />
          <input type="text" placeholder="Área de Interesse" required />
          <input type="email" placeholder="E-mail" required />
          <button type="submit">Junte-se à TEC.VAGAS</button>
        </form>
      </section>

      <footer>
        <p>Junte-se a nós e transforme sua carreira</p>
        <div className="social">
          <FaFacebook />
          <FaInstagram />
          <FaLinkedin />
          <FaTwitter />
        </div>
        <p>Política de privacidade • Termos de uso</p>
      </footer>
    </div>
  );
}
