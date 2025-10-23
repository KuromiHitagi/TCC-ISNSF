import express from 'express';
import fs from 'fs';
import { getCompatibleAreas } from './compatibility.js';

const app = express();
const PORT = 3001;

// Middleware para parsing JSON
app.use(express.json());

// Carregar áreas
let areas;
try {
  areas = JSON.parse(fs.readFileSync('areas.json', 'utf8'));
} catch (err) {
  console.error('Erro ao carregar areas.json:', err);
  areas = {};
}

// Endpoint para análise
app.post('/api/analise', (req, res) => {
  try {
    const { respostas } = req.body;
    if (!respostas || typeof respostas !== 'object') {
      return res.status(400).json({ erro: 'Respostas inválidas.' });
    }

    // Calcular áreas compatíveis
    const compatibleSet = getCompatibleAreas(respostas);
    const compatibleAreas = Array.from(compatibleSet);

    if (compatibleAreas.length === 0) {
      return res.json({ resultado: 'Não foi possível determinar áreas compatíveis com base nas suas respostas. Tente novamente.' });
    }

    // Gerar recomendação
    let recomendacao = 'Baseado nas suas respostas, as áreas profissionais mais compatíveis são:\n\n';
    compatibleAreas.forEach(area => {
      recomendacao += `- ${area}: ${areas[area] || 'Descrição não disponível.'}\n`;
    });
    recomendacao += '\nConsidere explorar essas áreas para encontrar uma carreira que se alinhe com suas preferências.';

    res.json({ resultado: recomendacao });
  } catch (err) {
    console.error('Erro na análise:', err);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
