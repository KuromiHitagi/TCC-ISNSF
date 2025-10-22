import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

// Carrega variáveis do .env
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Inicializa OpenAI com a chave do .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rota teste
app.get("/", (req, res) => res.send("Servidor OK"));

// Rota de análise das respostas
app.post("/api/analise", async (req, res) => {
  const { respostas } = req.body;

  if (!respostas) {
    return res.status(400).json({ erro: "Nenhuma resposta recebida" });
  }

  const prompt = `
Você é um especialista em orientação profissional.
Analise as respostas do questionário abaixo e indique:
1. Principais características de personalidade.
2. Área de trabalho mais adequada para a pessoa.

Respostas do usuário:
${JSON.stringify(respostas, null, 2)}

Retorne em um texto curto e claro.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const resultado = response.choices[0].message.content;
    res.json({ resultado });
  } catch (err) {
    console.error("Erro na API OpenAI:", err.response?.data || err.message);
    res.status(500).json({ erro: "Erro ao analisar respostas" });
  }
});

// Porta do backend
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "OK" : "NÃO DEFINIDA");
