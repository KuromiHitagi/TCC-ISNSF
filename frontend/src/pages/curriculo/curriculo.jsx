import { useState, useEffect, useRef } from "react";
import NavBar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import jsPDF from "jspdf";

import "./curriculo.scss";

const Curriculo = () => {
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const [fechado, setFechado] = useState(false);
  const wordRef = useRef(null);

  useEffect(() => {
    // verifica se o usuário já fechou o pop-up antes
    const jaFechou = localStorage.getItem("tooltipFechado") === "true";
    setFechado(!jaFechou);
  }, []);

  const baixarCurriculo = async () => {
    const wordElement = wordRef.current;
    if (!wordElement) return;

    const texto = wordElement.innerText.trim();

    // Verificar se há conteúdo além do placeholder
    const placeholder = wordElement.getAttribute('data-placeholder') || '';
    const hasContent = texto && texto.trim() !== placeholder.trim();

    if (!hasContent) {
      alert("Por favor, digite algum conteúdo no currículo antes de baixar.");
      return;
    }

    try {
      // Criar PDF com formatação ABNT
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Margens ABNT: 3cm topo e esquerda, 2cm direita e fundo
      const marginLeft = 30; // 3cm
      const marginRight = 20; // 2cm
      const marginTop = 30; // 3cm
      const marginBottom = 20; // 2cm
      const pageWidth = 210; // A4 width
      const pageHeight = 297; // A4 height
      const contentWidth = pageWidth - marginLeft - marginRight;

      // Configurar fonte ABNT: Arial, 12pt
      pdf.setFont('Arial', 'normal');
      pdf.setFontSize(12);

      // Dividir texto em linhas
      const lines = pdf.splitTextToSize(texto, contentWidth);

      let y = marginTop;

      for (let i = 0; i < lines.length; i++) {
        if (y + 6 > pageHeight - marginBottom) { // 6mm por linha aproximadamente
          pdf.addPage();
          y = marginTop;
        }
        pdf.text(lines[i], marginLeft, y);
        y += 6; // Espaçamento de linha 1.5 (aprox. 6mm para 12pt)
      }

      // Baixar o PDF
      pdf.save('meu_curriculo.pdf');
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
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
              data-placeholder=
              {`João da Silva
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
            </div>
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
