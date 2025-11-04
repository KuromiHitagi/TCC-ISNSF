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
                  top: 1700, // 3cm
                  right: 1134, // 2cm
                  bottom: 1134, // 2cm
                  left: 1700, // 3cm
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
                    font: "Arial",
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
              data-placeholder={`
                                João da Silva
                                (11) 99999-9999 | joaosilva@email.com | São Paulo/SP
                                LinkedIn: linkedin.com/in/joaosilva | GitHub: github.com/joaosilva


                                Objetivo profissional:
                                Atuar como desenvolvedor front-end, aplicando conhecimentos em React e JavaScript.


                                Resumo profissional:
                                Profissional com experiência em desenvolvimento web, focado em boas práticas e 
                                interfaces responsivas. 
                                Comunicativo, curioso e com facilidade para aprendizado.


                                Formação acadêmica:
                                Bacharelado em Sistemas de Informação – Universidade X, Conclusão: 2024


                                Experiência profissional:
                                Empresa Y – Estagiário de Desenvolvimento (2023 – Atual)
                                Desenvolvimento de aplicações ReactJS e consumo de APIs REST.


                                Habilidades:
                                JavaScript | React | Node.js | Git | Figma


                                Cursos e certificações:
                                Curso de React Avançado – Alura (2024)


                                Idiomas:
                                Inglês – Intermediário


                                Projetos e atividades extras:
                                Participação em hackathons e projetos voluntários de tecnologia.`}
            >
              {!fechado && mostrarTooltip && (
              <div contentEditable="false" className="tooltip-box">
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
            <button id="download" onClick={baixarCurriculo}>
              Baixar Currículo
            </button>

            
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Curriculo;
