import NavBar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./curriculo.scss";

const Curriculo = () => {
  return (
    <div>
      <NavBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="main"
      >
        <h1>Crie o seu currículo</h1>

        <ol>
          <li>Dados pessoais (nome, contato, cidade, links).</li>
          <li>Objetivo profissional (tipo de vaga).</li>
          <li>Resumo profissional (breve apresentação).</li>
          <li>Formação acadêmica.</li>
          <li>Experiência profissional.</li>
          <li>Habilidades.</li>
          <li>Cursos e certificações.</li>
          <li>Idiomas.</li>
          <li>Projetos e atividades extras (opcional).</li>
        </ol>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Curriculo;
