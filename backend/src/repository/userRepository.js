import { connection } from "../config/db.js";
import bcrypt from 'bcryptjs';
import multer from 'multer';

const upload = multer({ dest: 'public/storage' })


// FOTOS USUARIO

export async function mostrarFotosUsuario(idUsuario) {
  const comando = `
    SELECT id,
           caminho_foto
      FROM fotousuario
     WHERE usuario_id = ?
  `;

  const [registros] = await connection.query(comando, [idUsuario]);
  return registros;
}

export async function adicionarFotoUsuario(idUsuario, foto) {
  const comando = `
    INSERT INTO fotousuario (usuario_id, caminho_foto)
         VALUES (?, ?);
  `;

  const [info] = await connection.query(comando, [
    idUsuario,
    foto.caminho
  ]);
  return info.insertId;
};

export async function alterarFotoUsuario(id, caminho) {
  const comando = `
    UPDATE usuario
       SET user_foto = ?
     WHERE id = ?
  `

  const [info] = await connection.query(comando, [caminho, id])
};


// CREDENCIAIS

export async function validarCredenciais(email, senha) {
  const comando = `
    SELECT id,
           nome,
           email,
           senha
      FROM usuario
     WHERE email = ?
  `;

  const [registros] = await connection.query(comando, [email]);
  if (registros.length === 0) {
    return null;
  }

  const usuario = registros[0];
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return null;
  }

  return { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: 'user' };
}

export async function criarConta(novoUsuario) {
  const comando = `
    INSERT INTO usuario (nome, idade, cpf, data_nascimento, cidade, telefone, email, senha, area_interesse)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const hash = await bcrypt.hash(novoUsuario.senha, 10);
  const [info] = await connection.query(comando, [
    novoUsuario.nome,
    novoUsuario.idade || null,
    novoUsuario.cpf || null,
    novoUsuario.data_nascimento || null,
    novoUsuario.cidade || null,
    novoUsuario.telefone || null,
    novoUsuario.email,
    hash,
    novoUsuario.area_interesse || null
  ]);
  return info.insertId;
}

export async function buscarUsuarioPorId(id) {
  const comando = `
    SELECT id, nome, idade, cpf, data_nascimento, cidade, telefone, email
      FROM usuario
     WHERE id = ?
  `;

  const [registros] = await connection.query(comando, [id]);
  return registros[0];
}

export async function atualizarUsuario(id, dados) {
  const comando = `
    UPDATE usuario
       SET nome = ?, idade = ?, cpf = ?, data_nascimento = ?, cidade = ?, telefone = ?, email = ?
     WHERE id = ?
  `;

  await connection.query(comando, [
    dados.nome,
    dados.idade,
    dados.cpf,
    dados.data_nascimento,
    dados.cidade,
    dados.telefone,
    dados.email,
    id
  ]);
}

export async function deletarUsuario(id) {
  const comando = `
    DELETE FROM usuario
     WHERE id = ?
  `;

  await connection.query(comando, [id]);
}

export async function buscarUsuarioPorEmail(email) {
  const comando = `
    SELECT id, nome, idade, cpf, data_nascimento, cidade, telefone, email
      FROM usuario
     WHERE email = ?
  `;

  const [registros] = await connection.query(comando, [email]);
  return registros[0];
}

export { upload };
