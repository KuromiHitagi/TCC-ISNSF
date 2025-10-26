import { useEffect, useState } from "react";
import CursosCarousel from "../carrossel-form/carrossel.jsx";
import api from "../../api.js";

export default function Response({ respostas }) {
  const [resultado, setResultado] = useState("Analisando suas respostas...");
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const gerarAnalise = async () => {
      try {
        const res = await api.post("/api/analise", { respostas });

        if (res.status === 200) {
          setResultado(res.data.resultado);
          setAreas(res.data.areas || []);
        } else {
          setResultado("Erro ao gerar análise: " + res.data.erro);
          setAreas([]);
        }
      } catch (err) {
        setResultado("Erro ao conectar com o backend.");
        console.error("Erro api /api/analise:", err);
        setAreas([]);
      }
    };

    gerarAnalise();
  }, [respostas]);

  return (
    <div className="response">
      <h2>Resultado da Análise</h2>
      <p>{resultado}</p>
      {areas.length > 0 && <CursosCarousel areas={areas} />}
    </div>
  );
}
