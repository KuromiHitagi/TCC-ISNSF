import { useState, useEffect } from "react";
import Response from "./response.jsx";
import "./form.scss";

export default function Questionario() {
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [erro, setErro] = useState("");
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    fetch('/perguntas.json')
      .then(response => response.json())
      .then(data => {
        setPerguntas(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar perguntas:', error);
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return <div className="questionario">Carregando perguntas...</div>;
  }

  if (perguntas.length === 0) {
    return <div className="questionario">Erro ao carregar perguntas.</div>;
  }

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
