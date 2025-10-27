import { useState } from "react";
import NavBar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
import Questionario from '../../components/form/form.jsx'; 
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import './form.scss';

const Form = () => {
  const [mostrarQuestionario, setMostrarQuestionario] = useState(false);

  const exibir1 = () => {
    setMostrarQuestionario(true);
  };

  return (
    <div>
      <NavBar />

      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="main">
        {!mostrarQuestionario ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="intro">
            <img className="form-character" src="/img/form-character.png" alt="" />
            <h2 className="form-title">Bem-vindo ao Teste Vocacional</h2>
            <p>
              Para determinar qual cargo se alinha mais com suas características e preferências,
              propomos a realização de um teste vocacional.
            </p>
            <button className="vamos-la" onClick={exibir1}>
              Vamos-lá →
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="questionario"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="questionario-container">
            <Questionario />
          </motion.div>
        )}
      </motion.div>

      <Footer />
    </div>
  );
}

export default Form;