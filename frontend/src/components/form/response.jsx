import { useEffect, useState } from "react";
import CursosCarousel from "../carrossel-form/carrossel.jsx";

export default function Response({ respostas }) {
  const [resultado, setResultado] = useState("Analisando suas respostas...");
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const gerarAnalise = async () => {
      try {
        // Requisição relativa, o proxy do Vite redireciona para o backend
        const res = await fetch("/api/analise", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ respostas }),
        });

        const data = await res.json();

        if (res.ok) {
          // Se a requisição deu certo, exibe o resultado da IA
          setResultado(data.resultado);
          setAreas(data.areas || []);
        } else {
          // Se backend retornou erro
          setResultado("Erro ao gerar análise: " + data.erro);
          setAreas([]);
        }
      } catch (err) {
        setResultado("Erro ao conectar com o backend.");
        console.error("Erro fetch /api/analise:", err);
        setAreas([]);
      }
    };

    gerarAnalise();
  }, [respostas]);

  return (
    <div className="response">
      <h2>Resultado da Análise</h2>
      {areas.length > 0 && <CursosCarousel areas={areas} />}
    </div>
  );
}
