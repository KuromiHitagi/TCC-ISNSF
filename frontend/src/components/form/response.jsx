import { useEffect, useState } from "react";

export default function Response({ respostas }) {
  const [resultado, setResultado] = useState("Analisando suas respostas...");

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
        } else {
          // Se backend retornou erro
          setResultado("Erro ao gerar análise: " + data.erro);
        }
      } catch (err) {
        setResultado("Erro ao conectar com o backend.");
        console.error("Erro fetch /api/analise:", err);
      }
    };

    gerarAnalise();
  }, [respostas]);

  return (
    <div className="response">
      <h2>Resultado da Análise</h2>
      <pre>{resultado}</pre>
    </div>
  );
}
