import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./curriculo.scss";

const Curriculo = () => {
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const [fechado, setFechado] = useState(false);

  useEffect(() => {
    // verifica se o usuário já fechou o pop-up antes
    const jaFechou = localStorage.getItem("tooltipFechado") === "true";
    setFechado(jaFechou);
  }, []);

  const baixarCurriculo = () => {
    const texto = document.getElementById("word").innerHTML;
    const conteudo = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: "Times New Roman", serif;
              font-size: 12pt;
              line-height: 2;
              text-align: justify;
              margin: 3cm 2cm 2cm 3cm;
            }
            h1 {
              text-align: center;
              font-weight: bold;
            }
          </style>
        </head>
        <body>${texto}</body>
      </html>
    `;

    const blob = new Blob([conteudo], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "meu_curriculo.doc";
    link.click();
  };

  const fecharTooltip = (e) => {
    e.stopPropagation();
    setFechado(true);
    localStorage.setItem("tooltipFechado", "true");
  };

  return (
    <div>
      <NavBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div id="main">
          <div className="rules">
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
          </div>

          <div
            className="fakeWord tooltip-area"
            onMouseEnter={() => !fechado && setMostrarTooltip(true)}
            onMouseLeave={() => setMostrarTooltip(false)}
          >
            <div id="word" contentEditable="true">
              <p className="text">Título</p>
            </div>
            <button id="download" onClick={baixarCurriculo}>
              Baixar Currículo
            </button>

            {!fechado && mostrarTooltip && (
              <div className="tooltip-box">
                <span className="close-btn" onClick={fecharTooltip}>
                  X
                </span>
                <p>
                  💡 Dica: você pode editar o texto livremente, ele será
                  formatado em ABNT quando baixar!
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Curriculo;
