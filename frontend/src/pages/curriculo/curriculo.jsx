import { useState, useEffect, useRef } from "react";
import NavBar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Document, Packer, Paragraph, TextRun } from "docx";
import "./curriculo.scss";

const Curriculo = () => {
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const [fechado, setFechado] = useState(false);
  const wordRef = useRef(null);

  useEffect(() => {
    // verifica se o usuário já fechou o pop-up antes
    const jaFechou = localStorage.getItem("tooltipFechado") === "true";
    setFechado(jaFechou);
  }, []);

  const baixarCurriculo = async () => {
    const texto = wordRef.current ? wordRef.current.innerText.trim() : "";

    if (!texto) {
      alert("Por favor, digite algum conteúdo no currículo antes de baixar.");
      return;
    }

    try {
      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 2500, // 2.5cm
                  right: 2000, // 2cm
                  bottom: 2500, // 2.5cm
                  left: 3000, // 3cm
                },
              },
            },
            children: [
              new Paragraph({
                spacing: {
                  line: 360, // 1.5 line spacing (240 = single, 360 = 1.5)
                  after: 240, // space after paragraph
                },
                alignment: "justify", // justified text
                children: [
                  new TextRun({
                    text: texto,
                    font: "Times New Roman",
                    size: 24, // 12pt
                  }),
                ],
              }),
            ],
          },
        ],
      });

      const buffer = await Packer.toBlob(doc);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(buffer);
      link.download = "meu_curriculo.docx";
      link.click();
    } catch (error) {
      console.error("Erro ao gerar o arquivo DOCX:", error);
    }
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
            <div
              id="word"
              ref={wordRef}
              contentEditable="true"
              data-placeholder="Digite seu currículo aqui..."
            >
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
