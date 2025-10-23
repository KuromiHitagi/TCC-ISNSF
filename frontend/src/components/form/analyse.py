import json

# Load the data
with open('respostas_com_areas_gen.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Define mappings for compatible areas
q1_map = {
    "Trabalhar em equipe, colaborando com os demais.": ["Administração", "Educação", "Recursos Humanos", "Gestão de Projetos", "Marketing", "Psicologia"],
    "Trabalhar de forma independente, focando em tarefas individuais.": ["Desenvolvimento de Software", "Engenharia", "Análise de Dados", "Pesquisa", "Design"],
    "Atuar em um ambiente criativo.": ["Design", "Marketing", "Desenvolvimento de Software", "Educação", "Psicologia"],
    "Operar em um ambiente estruturado, seguindo procedimentos estabelecidos.": ["Administração", "Contabilidade", "Gestão de Projetos", "Recursos Humanos"]
}

q2_map = {
    "Contribuir para o bem-estar dos outros e causar um impacto positivo.": ["Educação", "Psicologia", "Recursos Humanos", "Administração", "Marketing"],
    "Criar inovações e desenvolver novos produtos ou serviços.": ["Desenvolvimento de Software", "Engenharia", "Design", "Marketing", "Pesquisa"],
    "Resolver problemas complexos e enfrentar desafios.": ["Engenharia", "Análise de Dados", "Desenvolvimento de Software", "Pesquisa", "Gestão de Projetos"],
    "Garantir segurança e estabilidade financeira.": ["Contabilidade", "Administração", "Recursos Humanos", "Gestão de Projetos"]
}

q3_map = {
    "Aprecio mudanças e novos desafios.": ["Marketing", "Desenvolvimento de Software", "Engenharia", "Pesquisa"],
    "Prefiro um ambiente de trabalho estável e previsível.": ["Contabilidade", "Administração", "Recursos Humanos"],
    "Aceito mudanças, desde que haja um planejamento adequado.": ["Gestão de Projetos", "Administração", "Desenvolvimento de Software"],
    "Evito mudanças, valorizando a rotina.": ["Contabilidade", "Administração", "Recursos Humanos"]
}

q4_map = {
    "Gosto de ter prazos claros e seguir um planejamento detalhado.": ["Administração", "Gestão de Projetos", "Contabilidade"],
    "Prefiro flexibilidade, adaptando-me conforme a situação.": ["Desenvolvimento de Software", "Marketing", "Design"],
    "Busco sempre superar metas e desafios, mesmo que seja pressão extra.": ["Engenharia", "Pesquisa", "Análise de Dados"],
    "Trabalho melhor quando há colaboração e apoio da equipe.": ["Recursos Humanos", "Psicologia", "Educação"]
}

# Function to get intersection of compatible areas
def get_compatible_areas(respostas):
    sets = []
    for key, resp in respostas.items():
        if key == "1":
            sets.append(set(q1_map.get(resp, [])))
        elif key == "2":
            sets.append(set(q2_map.get(resp, [])))
        elif key == "3":
            sets.append(set(q3_map.get(resp, [])))
        elif key == "4":
            sets.append(set(q4_map.get(resp, [])))
    if sets:
        intersection = set.intersection(*sets)
    else:
        intersection = set()
    return intersection

# Analyze each entry
inconsistencies = []
for entry in data:
    id_ = entry['id']
    respostas = entry['respostas']
    recommended = set(entry['area_recomendada'])
    compatible = get_compatible_areas(respostas)
    if not recommended.issubset(compatible):
        extra = recommended - compatible
        inconsistencies.append((id_, extra))

# Output results
if inconsistencies:
    print("Inconsistências encontradas:")
    for id_, extra in inconsistencies:
        print(f"ID {id_}: Áreas recomendadas não compatíveis: {list(extra)}")
else:
    print("Todas as combinações são compatíveis.")
