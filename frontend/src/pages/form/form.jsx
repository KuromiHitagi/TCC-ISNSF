import { useState } from "react";
import NavBar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
import Questionario from '../../components/form/form.jsx'; // ajuste o caminho conforme seu projeto
import './form.scss';

export default function Form() {
  const [mostrarQuestionario, setMostrarQuestionario] = useState(false);

  const exibir1 = () => {
    setMostrarQuestionario(true);
  };

  return (
    <div>
      <NavBar />

      <div className="main">
        {!mostrarQuestionario ? (
          <div className="intro">
            <img className="form-character" src="/img/form-character.png" alt="" />
            <h2 className="form-title">Bem-vindo ao Teste Vocacional</h2>
            <p>
              Para determinar qual cargo se alinha mais com suas características e preferências,
              propomos a realização de um teste vocacional.
            </p>
            <button className="vamos-la" onClick={exibir1}>
              Vamos-lá →
            </button>
          </div>
        ) : (
          <Questionario />
        )}
      </div>

      <Footer />
    </div>
  );
}
