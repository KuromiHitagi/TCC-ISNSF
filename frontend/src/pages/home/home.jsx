import NavBar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import card1 from "../../assets/card-1.jpg";
import card2 from "../../assets/Card-1.png";
import "./home.scss";

const Home = () => {
  const userEmail = localStorage.getItem("EMAIL");
  let enable = true;
  if (userEmail != null && userEmail != undefined && userEmail != "") {
    enable = false;
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
          <div className="apresentacao">
            <h1 className="titulo">
              TECVAGAS: 
              Sua plataforma de Oportunidades
            </h1>
          <div className="text">

            <p>
            Tec Vagas — O Futuro da sua Carreira em Tecnologia Começa Aqui!
            O mercado de tecnologia não para de crescer — e as melhores oportunidades estão esperando por você na Tec Vagas, 
            o portal que conecta talentos incríveis às empresas mais inovadoras do Brasil.
            </p>
            

            <p>
            Seja você um dev júnior em busca do primeiro emprego, um engenheiro de software experiente ou uma startup procurando os melhores 
            profissionais, aqui é o lugar certo para transformar ambição em realização.
            </p>
              <p>
            Encontre a vaga ideal com filtros inteligentes e atualizações diárias.
            Publique oportunidades e alcance milhares de profissionais qualificados.
            Cadastre-se grátis e receba alertas das vagas que combinam com o seu perfil.
            Navegação rápida, moderna e 100% focada no universo tech.
            </p>
          </div>

          <div className="empresas e candidatos">
            <div className="text">
              <h1 className="titulo"> 
              Empresas e Candidatos
              </h1>
              <p>
                Soluções integradas para quem procura uma nova oportunidade de trabalho ou para empresas em processos de contratação.
              </p>
            </div>
            <div className="cards">
              <img src={card1} alt="card-1" height={160}/>

              <img src={card2} alt="card-2" height={160}/>
            </div>
          </div>

            <Link className={`butao ${!enable ? "logged" : ""}`} to="/login">
              Criar um perfil
            </Link>
          </div>
          <div className="empresas-candidatos fade-in"></div>
          <div className="parceiros fade-in"></div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Home;
