import NavBar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
import { Link } from "react-router-dom";
import "./home.scss";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="main">
        <div className="apresentacao">
          <h1 className="titulo">TECVAGAS: Sua plataforma de Oportunidades</h1>
          <pre className="texto">
            Você está pronto para dar o próximo passo na sua carreira?
          </pre>
          <pre className="texto">
            No TECVAGAS, conectamos você às melhores oportunidades de trabalho
          </pre>

          <Link className="butao" to="/login">
            Inscreva-se
          </Link>
        </div>
        <div className="categoria">
          <div className="img-categoria">
            <div className="imgbackground1">
              <h2>Primeiro Emprego</h2>
            </div>
            <div className="imgbackground2">
              <h2>Administração</h2>
            </div>
            <div className="imgbackground3">
              <h2>Vendas</h2>
            </div>
          </div>
        </div>
        <div className="empresas-candidatos fade-in"></div>
        <div className="parceiros fade-in"></div>
      </div>
      <Footer />
    </div>
  );
}
