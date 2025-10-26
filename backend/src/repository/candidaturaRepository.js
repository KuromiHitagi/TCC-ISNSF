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
