import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { adicionarRotas } from "./routes/routes.js";

dotenv.config();

const app = express();

// Middleware CORS manual
app.use((req, res, next) => {
  const allowedOrigin = "http://localhost:5173";
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-access-token");

  // Responder imediatamente para requisições OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

//cors automatico (nao funfa)
//app.use(cors({
//origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
//credentials: true,
//methods: ["GET", "POST", "PUT", "DELETE"],
//allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
//}));

app.use(express.json());
adicionarRotas(app); // Adicionar todas as rotas

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
