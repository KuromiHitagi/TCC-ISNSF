// Mapeamentos de compatibilidade baseados no script Python
const q1Map = {
    "Trabalhar em equipe, colaborando com os demais.": ["Administração", "Educação", "Recursos Humanos", "Gestão de Projetos", "Marketing", "Psicologia"],
    "Trabalhar de forma independente, focando em tarefas individuais.": ["Desenvolvimento de Software", "Engenharia", "Análise de Dados", "Pesquisa", "Design"],
    "Atuar em um ambiente criativo.": ["Design", "Marketing", "Desenvolvimento de Software", "Educação", "Psicologia"],
    "Operar em um ambiente estruturado, seguindo procedimentos estabelecidos.": ["Administração", "Contabilidade", "Gestão de Projetos", "Recursos Humanos"]
  };
  
  const q2Map = {
    "Contribuir para o bem-estar dos outros e causar um impacto positivo.": ["Educação", "Psicologia", "Recursos Humanos", "Administração", "Marketing"],
    "Criar inovações e desenvolver novos produtos ou serviços.": ["Desenvolvimento de Software", "Engenharia", "Design", "Marketing", "Pesquisa"],
    "Resolver problemas complexos e enfrentar desafios.": ["Engenharia", "Análise de Dados", "Desenvolvimento de Software", "Pesquisa", "Gestão de Projetos"],
    "Garantir segurança e estabilidade financeira.": ["Contabilidade", "Administração", "Recursos Humanos", "Gestão de Projetos"]
  };
  
  const q3Map = {
    "Aprecio mudanças e novos desafios.": ["Marketing", "Desenvolvimento de Software", "Engenharia", "Pesquisa"],
    "Prefiro um ambiente de trabalho estável e previsível.": ["Contabilidade", "Administração", "Recursos Humanos"],
    "Aceito mudanças, desde que haja um planejamento adequado.": ["Gestão de Projetos", "Administração", "Desenvolvimento de Software"],
    "Evito mudanças, valorizando a rotina.": ["Contabilidade", "Administração", "Recursos Humanos"]
  };
  
  const q4Map = {
    "Gosto de ter prazos claros e seguir um planejamento detalhado.": ["Administração", "Gestão de Projetos", "Contabilidade"],
    "Prefiro flexibilidade, adaptando-me conforme a situação.": ["Desenvolvimento de Software", "Marketing", "Design"],
    "Busco sempre superar metas e desafios, mesmo que seja pressão extra.": ["Engenharia", "Pesquisa", "Análise de Dados"],
    "Trabalho melhor quando há colaboração e apoio da equipe.": ["Recursos Humanos", "Psicologia", "Educação"]
  };
  
  // Função para obter áreas compatíveis (interseção)
  function getCompatibleAreas(respostas) {
    const sets = [];
    for (const [key, resp] of Object.entries(respostas)) {
      let map;
      if (key === "1") map = q1Map;
      else if (key === "2") map = q2Map;
      else if (key === "3") map = q3Map;
      else if (key === "4") map = q4Map;
      if (map && map[resp]) {
        sets.push(new Set(map[resp]));
      }
    }
    if (sets.length === 0) return new Set();
    return sets.reduce((acc, set) => new Set([...acc].filter(x => set.has(x))));
  }
  
export { getCompatibleAreas };
  