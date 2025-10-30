import express from 'express';
import fs from 'fs';
import { getCompatibleAreas } from '../routes/compatibility.js';
import { analyzeResponsesWithHuggingFace } from '../utils/huggingface.js';

const router = express.Router();

// Carregar áreas
let areas;
try {
  areas = JSON.parse(fs.readFileSync('./src/routes/areas.json', 'utf8'));
} catch (err) {
  console.error('Erro ao carregar areas.json:', err);
  areas = {};
}

// Endpoint para análise
router.post('/api/analise', async (req, res) => {
  try {
    const { respostas } = req.body;
    if (!respostas || typeof respostas !== 'object') {
      return res.status(400).json({ erro: 'Respostas inválidas.' });
    }

    // Tentar usar Hugging Face primeiro
    let compatibleAreas = await analyzeResponsesWithHuggingFace(respostas);

    if (!compatibleAreas || compatibleAreas.length === 0) {
      // Fallback para o método atual se Hugging Face falhar
      console.log('Usando método de compatibilidade tradicional');
      const compatibleSet = getCompatibleAreas(respostas);
      compatibleAreas = Array.from(compatibleSet);
    }

    if (compatibleAreas.length === 0) {
      return res.json({ resultado: 'Não foi possível determinar áreas compatíveis com base nas suas respostas. Tente novamente.' });
    }

    // Gerar recomendação
    let recomendacao = 'Baseado nas suas respostas, as áreas profissionais mais compatíveis são:\n\n';
    compatibleAreas.forEach(area => {
      recomendacao += `- ${area}: ${areas[area] || 'Descrição não disponível.'}\n`;
    });
    recomendacao += '\nConsidere explorar essas áreas para encontrar uma carreira que se alinhe com suas preferências.';

    res.json({ resultado: recomendacao, areas: compatibleAreas });
  } catch (err) {
    console.error('Erro na análise:', err);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

export default router;
