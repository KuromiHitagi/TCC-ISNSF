import { connection } from "../config/db.js";

export async function listarCandidaturas() {
  const comando = `
    SELECT c.id, c.vaga_id, c.usuario_id, c.data_candidatura, c.status,
           v.titulo as vaga_titulo, u.nome as usuario_nome
      FROM candidatura c
      JOIN vaga v ON c.vaga_id = v.id
      JOIN usuario u ON c.usuario_id = u.id
     ORDER BY c.data_candidatura DESC
  `;

  const [registros] = await connection.query(comando);
  return registros;
}

export async function buscarCandidaturaPorId(id) {
  const comando = `
    SELECT c.id, c.vaga_id, c.usuario_id, c.data_candidatura, c.status,
           v.titulo as vaga_titulo, u.nome as usuario_nome
      FROM candidatura c
      JOIN vaga v ON c.vaga_id = v.id
      JOIN usuario u ON c.usuario_id = u.id
     WHERE c.id = ?
  `;

  const [registros] = await connection.query(comando, [id]);
  return registros[0];
}

export async function criarCandidatura(candidatura) {
  // Verificar se o usuário já se candidatou a esta vaga
  const verificarComando = `
    SELECT id FROM candidatura
     WHERE vaga_id = ? AND usuario_id = ?
  `;

  const [existente] = await connection.query(verificarComando, [
    candidatura.vaga_id,
    candidatura.usuario_id
  ]);

  if (existente.length > 0) {
    throw new Error('Você já se candidatou a esta vaga.');
  }

  const comando = `
    INSERT INTO candidatura (vaga_id, usuario_id, data_candidatura, status)
         VALUES (?, ?, NOW(), 'Pendente');
  `;

  const [info] = await connection.query(comando, [
    candidatura.vaga_id,
    candidatura.usuario_id
  ]);
  return info.insertId;
}

export async function atualizarStatusCandidatura(id, status) {
  const comando = `
    UPDATE candidatura
       SET status = ?
     WHERE id = ?
  `;

  await connection.query(comando, [status, id]);
}

export async function deletarCandidatura(id) {
  const comando = `
    DELETE FROM candidatura
     WHERE id = ?
  `;

  await connection.query(comando, [id]);
}

export async function listarCandidaturasPorUsuario(idUsuario) {
  const comando = `
    SELECT c.id, c.vaga_id, c.data_candidatura, c.status,
           v.titulo as vaga_titulo, v.localizacao, e.nome as empresa
      FROM candidatura c
      JOIN vaga v ON c.vaga_id = v.id
      LEFT JOIN empresa e ON v.empresa_id = e.id
     WHERE c.usuario_id = ?
     ORDER BY c.data_candidatura DESC
  `;

  const [registros] = await connection.query(comando, [idUsuario]);
  return registros;
}

export async function listarCandidaturasPorVaga(idVaga) {
  const comando = `
    SELECT c.id, c.usuario_id, c.data_candidatura, c.status,
           u.nome as usuario_nome, u.email as usuario_email
      FROM candidatura c
      JOIN usuario u ON c.usuario_id = u.id
     WHERE c.vaga_id = ?
     ORDER BY c.data_candidatura DESC
  `;

  const [registros] = await connection.query(comando, [idVaga]);
  return registros;
}

export async function listarCandidaturasDetalhadasPorVaga(idVaga) {
  // Buscar detalhes da vaga
  const vagaComando = `
    SELECT v.id, v.titulo, v.descricao, v.localizacao, v.salario, v.data_publicacao,
           e.nome as empresa_nome, e.email as empresa_email, e.empresa_foto
      FROM vaga v
      LEFT JOIN empresa e ON v.empresa_id = e.id
     WHERE v.id = ?
  `;

  const [vagaResult] = await connection.query(vagaComando, [idVaga]);
  if (vagaResult.length === 0) {
    throw new Error('Vaga não encontrada');
  }

  const vaga = vagaResult[0];

  // Buscar candidatos com detalhes
  const candidatosComando = `
    SELECT c.id as candidatura_id, c.data_candidatura, c.status,
           u.id as usuario_id, u.nome, u.email, u.data_nascimento, u.user_foto, u.cidade, u.telefone
      FROM candidatura c
      JOIN usuario u ON c.usuario_id = u.id
     WHERE c.vaga_id = ?
     ORDER BY c.data_candidatura DESC
  `;

  const [candidatos] = await connection.query(candidatosComando, [idVaga]);

  return {
    vaga: vaga,
    candidatos: candidatos
  };
}
