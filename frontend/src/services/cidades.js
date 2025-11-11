export async function getCidades() {
  try {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
    if (!response.ok) {
      throw new Error('Erro ao buscar cidades');
    }
    const data = await response.json();
    // Retorna lista de nomes das cidades ordenados alfabeticamente
    return data.map(cidade => cidade.nome).sort();
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    return [];
  }
}
