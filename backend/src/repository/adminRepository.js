import { connection } from '../config/db.js';
import bcrypt from 'bcryptjs';

export async function inserirAdmin(admin) {
    const comando = `
        INSERT INTO admin (nome, email, senha)
        VALUES (?, ?, ?)
    `;

    const hash = await bcrypt.hash(admin.senha, 10);
    const [resposta] = await connection.query(comando, [
        admin.nome,
        admin.email,
        hash
    ]);

    return resposta.insertId;
}

export async function validarLoginAdmin(email, senha) {
    const comando = `
        SELECT id, nome, email, senha
        FROM admin
        WHERE email = ?
    `;

    const [linhas] = await connection.query(comando, [email]);
    if (linhas.length === 0) {
        return null;
    }

    const admin = linhas[0];
    const senhaValida = await bcrypt.compare(senha, admin.senha);
    if (!senhaValida) {
        return null;
    }

    return { id: admin.id, nome: admin.nome, email: admin.email, tipo: 'admin' };
}

// Listar usuários
export async function listarUsuarios() {
    const comando = `SELECT id, nome, cpf, data_nascimento, cidade, telefone, email, user_foto, area_interesse FROM usuario`;
    const [linhas] = await connection.query(comando);
    return linhas;
}

// Listar empresas
export async function listarEmpresas() {
    const comando = `SELECT id, nome, email, cnpj, empresa_foto, area_profissional FROM empresa`;
    const [linhas] = await connection.query(comando);
    return linhas;
}

// Listar vagas
export async function listarVagas() {
    const comando = `SELECT v.id, v.titulo, v.descricao, v.localizacao, v.salario, v.data_publicacao, e.nome AS empresa_nome FROM vaga v JOIN empresa e ON v.empresa_id = e.id`;
    const [linhas] = await connection.query(comando);
    return linhas;
}

// Listar candidaturas
export async function listarCandidaturas() {
    const comando = `SELECT c.id, c.data_candidatura, c.status, u.nome AS usuario_nome, v.titulo AS vaga_titulo FROM candidatura c JOIN usuario u ON c.usuario_id = u.id JOIN vaga v ON c.vaga_id = v.id`;
    const [linhas] = await connection.query(comando);
    return linhas;
}

// Deletar usuário
export async function deletarUsuario(id) {
    const comando = `DELETE FROM usuario WHERE id = ?`;
    await connection.query(comando, [id]);
}

// Deletar empresa
export async function deletarEmpresa(id) {
    const comando = `DELETE FROM empresa WHERE id = ?`;
    await connection.query(comando, [id]);
}

// Deletar vaga
export async function deletarVaga(id) {
    const comando = `DELETE FROM vaga WHERE id = ?`;
    await connection.query(comando, [id]);
}

// Deletar candidatura
export async function deletarCandidatura(id) {
    const comando = `DELETE FROM candidatura WHERE id = ?`;
    await connection.query(comando, [id]);
}

// Atualizar usuário
export async function atualizarUsuario(id, dados) {
    const comando = `
        UPDATE usuario
        SET nome = ?, cpf = ?, data_nascimento = ?, cidade = ?, telefone = ?, email = ?, user_foto = ?, area_interesse = ?
        WHERE id = ?
    `;
    await connection.query(comando, [
        dados.nome,
        dados.cpf,
        dados.data_nascimento,
        dados.cidade,
        dados.telefone,
        dados.email,
        dados.user_foto,
        dados.area_interesse,
        id
    ]);
}

// Atualizar empresa
export async function atualizarEmpresa(id, dados) {
    const comando = `
        UPDATE empresa
        SET nome = ?, email = ?, cnpj = ?, empresa_foto = ?, area_profissional = ?
        WHERE id = ?
    `;
    await connection.query(comando, [
        dados.nome,
        dados.email,
        dados.cnpj,
        dados.empresa_foto,
        dados.area_profissional,
        id
    ]);
}

// Atualizar vaga
export async function atualizarVaga(id, dados) {
    const comando = `
        UPDATE vaga
        SET titulo = ?, descricao = ?, localizacao = ?, salario = ?, data_publicacao = ?
        WHERE id = ?
    `;
    await connection.query(comando, [
        dados.titulo,
        dados.descricao,
        dados.localizacao,
        dados.salario,
        dados.data_publicacao,
        id
    ]);
}

// Atualizar candidatura
export async function atualizarCandidatura(id, dados) {
    const comando = `
        UPDATE candidatura
        SET data_candidatura = ?, status = ?
        WHERE id = ?
    `;
    await connection.query(comando, [
        dados.data_candidatura,
        dados.status,
        id
    ]);
}
