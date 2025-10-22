import { useState } from "react";
import Response from "./Response";
import "./form.scss";

export default function Questionario() {
  const perguntas = [
    { id: 1, texto: "Qual é a sua preferência em relação ao ambiente de trabalho?", opcoes: [
      "Trabalhar em equipe, colaborando com os demais.",
      "Trabalhar de forma independente, focando em tarefas individuais.",
      "Atuar em um ambiente criativo.",
      "Operar em um ambiente estruturado, seguindo procedimentos estabelecidos.",
    ]},
    { id: 2, texto: "O que mais o motiva em sua vida profissional?", opcoes: [
      "Contribuir para o bem-estar dos outros e causar um impacto positivo.",
      "Criar inovações e desenvolver novos produtos ou serviços.",
      "Resolver problemas complexos e enfrentar desafios.",
      "Garantir segurança e estabilidade financeira.",
    ]},
    { id: 3, texto: "Como você se sente em relação a mudanças no ambiente de trabalho?", opcoes: [
      "Aprecio mudanças e novos desafios.",
      "Prefiro um ambiente de trabalho estável e previsível.",
      "Aceito mudanças, desde que haja um planejamento adequado.",
      "Evito mudanças, valorizando a rotina.",
    ]},
    { id: 4, texto: "Como você prefere lidar com prazos e metas no trabalho?", opcoes: [
      "Gosto de ter prazos claros e seguir um planejamento detalhado.",
      "Prefiro flexibilidade, adaptando-me conforme a situação.",
      "Busco sempre superar metas e desafios, mesmo que seja pressão extra.",
      "Trabalho melhor quando há colaboração e apoio da equipe.",
    ]},
  ];

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [erro, setErro] = useState("");
  const [finalizado, setFinalizado] = useState(false);

  const perguntaAtual = perguntas[indiceAtual];

  const handleSelect = (perguntaId, opcao) => {
    setRespostas({ ...respostas, [perguntaId]: opcao });
    setErro("");
  };

  const proximaPergunta = () => {
    if (!respostas[perguntaAtual.id]) {
      setErro("Selecione uma opção antes de continuar.");
      return;
    }
    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      setFinalizado(true);
    }
  };

  return (
    <div className="questionario">
      {!finalizado ? (
        <>
          <h2>Pergunta {indiceAtual + 1} de {perguntas.length}</h2>
          <p className="pergunta">{perguntaAtual.texto}</p>

          <div className="opcoes">
            {perguntaAtual.opcoes.map((opcao, i) => (
              <label key={i} className="opcao">
                <input
                  type="radio"
                  name={`pergunta-${perguntaAtual.id}`}
                  value={opcao}
                  checked={respostas[perguntaAtual.id] === opcao}
                  onChange={() => handleSelect(perguntaAtual.id, opcao)}
                />
                {opcao}
              </label>
            ))}
          </div>

          {erro && <p className="erro">{erro}</p>}
          <button onClick={proximaPergunta}>Próxima</button>
        </>
      ) : (
        <Response respostas={respostas} />
      )}
    </div>
  );
}
