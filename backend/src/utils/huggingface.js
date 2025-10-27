import fetch from 'node-fetch';

const HF_READ_API_KEY = process.env['Read-HuggingFace-TECVAGAS'];
const HF_WRITE_API_KEY = process.env['Write-HuggingFace-TECVAGAS'];

export async function analyzeResponsesWithHuggingFace(respostas) {
  try {
    // Formatar as respostas para o prompt
    const prompt = formatResponsesForPrompt(respostas);

    // Fazer a requisição para o Hugging Face
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_READ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 200,
          temperature: 0.7,
          do_sample: true,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();

    // Processar a resposta e extrair áreas recomendadas
    const generatedText = data[0]?.generated_text || '';
    const areas = extractAreasFromResponse(generatedText);

    return areas;
  } catch (error) {
    console.error('Erro ao analisar respostas com Hugging Face:', error);
    // Fallback para o método atual
    return null;
  }
}

function formatResponsesForPrompt(respostas) {
  let prompt = "Baseado nas seguintes respostas de um teste vocacional, recomende áreas profissionais adequadas:\n\n";

  for (const [key, value] of Object.entries(respostas)) {
    prompt += `Pergunta ${key}: ${value}\n`;
  }

  prompt += "\nRecomende 3-5 áreas profissionais mais adequadas, separadas por vírgula. Áreas possíveis: Administração, Contabilidade, Desenvolvimento de Software, Engenharia, Análise de Dados, Design, Marketing, Recursos Humanos, Psicologia, Educação, Pesquisa, Gestão de Projetos.\n\nResposta:";

  return prompt;
}

function extractAreasFromResponse(response) {
  // Extrair áreas da resposta gerada
  const areasPossiveis = [
    "Administração", "Contabilidade", "Desenvolvimento de Software", "Engenharia",
    "Análise de Dados", "Design", "Marketing", "Recursos Humanos",
    "Psicologia", "Educação", "Pesquisa", "Gestão de Projetos"
  ];

  const areasEncontradas = areasPossiveis.filter(area =>
    response.toLowerCase().includes(area.toLowerCase())
  );

  // Se não encontrou áreas, retornar algumas padrão
  return areasEncontradas.length > 0 ? areasEncontradas.slice(0, 5) : ["Administração", "Desenvolvimento de Software", "Marketing"];
}

export async function saveAnalysisToHuggingFace(analysisData) {
  // Esta função pode ser usada para salvar análises no Hugging Face Dataset
  // Implementação futura se necessário
  console.log('Salvando análise no Hugging Face:', analysisData);
}
