import NavBar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; 
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
              TECVAGAS: Sua plataforma de Oportunidades
            </h1>
            <pre className="texto">
              Você está pronto para dar o próximo passo na sua carreira?
            </pre>
            <pre className="texto">
              No TECVAGAS, conectamos você às melhores oportunidades de trabalho
            </pre>

            <Link className={`butao ${!enable ? "logged" : ""}`} to="/login">
              Inscreva-se
            </Link>
          </div>
          <div className="empresas-candidatos fade-in"></div>
          <div className="parceiros fade-in"></div>
          <Footer />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
