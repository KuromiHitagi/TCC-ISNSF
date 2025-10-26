import { connection } from "../config/db.js";

export async function listarVagas() {
  const comando = `
    SELECT v.id, v.titulo, v.descricao, e.nome as empresa, v.localizacao, v.salario, v.data_publicacao, v.empresa_id as usuario_id
      FROM vaga v
      LEFT JOIN empresa e ON v.empresa_id = e.id
     ORDER BY v.data_publicacao DESC
  `;

  const [registros] = await connection.query(comando);
  return registros;
}

export async function buscarVagaPorId(id) {
  const comando = `
    SELECT v.id, v.titulo, v.descricao, e.nome as empresa, v.localizacao, v.salario, v.data_publicacao, v.empresa_id as usuario_id
      FROM vaga v
      LEFT JOIN empresa e ON v.empresa_id = e.id
     WHERE v.id = ?
  `;

  const [registros] = await connection.query(comando, [id]);
  return registros[0];
}

export async function criarVaga(vaga) {
  const comando = `
    INSERT INTO vaga (titulo, descricao, empresa_id, localizacao, salario, data_publicacao)
         VALUES (?, ?, ?, ?, ?, NOW());
  `;

  const [info] = await connection.query(comando, [
    vaga.titulo,
    vaga.descricao,
    vaga.empresa_id,
    vaga.localizacao,
    vaga.salario
  ]);
  return info.insertId;
}

export async function atualizarVaga(id, vaga) {
  const comando = `
    UPDATE vaga
       SET titulo = ?, descricao = ?, empresa_id = ?, localizacao = ?, salario = ?
     WHERE id = ?
  `;

  await connection.query(comando, [
    vaga.titulo,
    vaga.descricao,
    vaga.empresa_id,
    vaga.localizacao,
    vaga.salario,
    id
  ]);
}

export async function deletarVaga(id) {
  const comando = `
    DELETE FROM vaga
     WHERE id = ?
  `;

  await connection.query(comando, [id]);
}

export async function listarVagasPorUsuario(idUsuario) {
  const comando = `
    SELECT v.id, v.titulo, v.descricao, e.nome as empresa, v.localizacao, v.salario, v.data_publicacao
      FROM vaga v
      LEFT JOIN empresa e ON v.empresa_id = e.id
     WHERE v.empresa_id = ?
     ORDER BY v.data_publicacao DESC
  `;

  const [registros] = await connection.query(comando, [idUsuario]);
  return registros;
}
