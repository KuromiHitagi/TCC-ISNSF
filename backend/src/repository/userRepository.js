import { connection } from "../config/db.js";
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/storage'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });


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

export async function adicionarFotoUsuario(idUsuario, caminhoFoto) {
  const comando = `
    UPDATE usuario
       SET user_foto = ?
     WHERE id = ?
  `;

  await connection.query(comando, [caminhoFoto.replace(/\\/g, '/'), idUsuario]);
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
    INSERT INTO usuario (nome, cpf, data_nascimento, cidade, telefone, email, senha, area_interesse)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const hash = await bcrypt.hash(novoUsuario.senha, 10);
  const [info] = await connection.query(comando, [
    novoUsuario.nome,
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
    SELECT id, nome, cpf, data_nascimento, cidade, telefone, email, user_foto
      FROM usuario
     WHERE id = ?
  `;

  const [registros] = await connection.query(comando, [id]);
  return registros[0];
}

export async function atualizarUsuario(id, dados) {
  const comando = `
    UPDATE usuario
       SET nome = ?, cpf = ?, data_nascimento = ?, cidade = ?, telefone = ?, email = ?
     WHERE id = ?
  `;

  await connection.query(comando, [
    dados.nome,
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
    SELECT id, nome, cpf, data_nascimento, cidade, telefone, email
      FROM usuario
     WHERE email = ?
  `;

  const [registros] = await connection.query(comando, [email]);
  return registros[0];
}

export { upload };
