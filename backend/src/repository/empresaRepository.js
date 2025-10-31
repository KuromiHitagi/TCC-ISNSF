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


// FOTOS EMPRESA

export async function mostrarFotosEmpresa(idEmpresa) {
  const comando = `
    SELECT empresa_foto as caminho_foto
      FROM empresa
     WHERE id = ?
  `;

  const [registros] = await connection.query(comando, [idEmpresa]);
  return registros.length > 0 ? [{ caminho_foto: registros[0].caminho_foto }] : [];
}

export async function adicionarFotoEmpresa(idEmpresa, caminhoFoto) {
  const comando = `
    UPDATE empresa
       SET empresa_foto = ?
     WHERE id = ?
  `;

  // Extrair apenas o nome do arquivo do caminho completo
  const nomeArquivo = caminhoFoto.split(/[/\\]/).pop();
  await connection.query(comando, [nomeArquivo, idEmpresa]);
};

export async function alterarFotoEmpresa(id, caminho) {
  const comando = `
    UPDATE empresa
       SET empresa_foto = ?
     WHERE id = ?
  `

  const [info] = await connection.query(comando, [caminho, id])
}

// CREDENCIAIS

export async function validarCredenciais(email, senha) {
  const comando = `
    SELECT id,
           nome,
           email,
           senha
      FROM empresa
     WHERE email = ?;
  `;

  const [registros] = await connection.query(comando, [email]);
  if (registros.length === 0) {
    return null;
  }

  const empresa = registros[0];
  const senhaValida = await bcrypt.compare(senha, empresa.senha);
  if (!senhaValida) {
    return null;
  }

  return { id: empresa.id, nome: empresa.nome, email: empresa.email, tipo: 'empresa' };
}

export async function criarConta(novaEmpresa) {
  const comando = `
    INSERT INTO empresa (nome, email, cnpj, senha, empresa_foto, area_profissional)
               VALUES (?, ?, ?, ?, ?, ?);
  `;

  const hash = await bcrypt.hash(novaEmpresa.senha, 10);
  const [info] = await connection.query(comando, [
    novaEmpresa.nome,
    novaEmpresa.email,
    novaEmpresa.cnpj || null,
    hash,
    novaEmpresa.empresa_foto || null,
    novaEmpresa.area_profissional || null
  ]);
  return info.insertId;
}

export async function buscarEmpresaPorId(id) {
  const comando = `
    SELECT id, nome, email, cnpj, empresa_foto, area_profissional
      FROM empresa
     WHERE id = ?;
  `;

  const [registros] = await connection.query(comando, [id]);
  return registros[0];
}

export async function buscarEmpresaPorEmail(email) {
  const comando = `
    SELECT id, nome, email, cnpj, empresa_foto, area_profissional
      FROM empresa
     WHERE email = ?;
  `;

  const [registros] = await connection.query(comando, [email]);
  return registros[0];
}

export async function buscarEmpresaPorNome(nome) {
  const comando = `
    SELECT id, nome, email, cnpj, empresa_foto, area_profissional
      FROM empresa
     WHERE nome = ?;
  `;

  const [registros] = await connection.query(comando, [nome]);
  return registros[0];
}

export async function atualizarEmpresa(id, dados) {
  const comando = `
    UPDATE empresa
       SET nome = ?, email = ?, cnpj = ?, empresa_foto = ?, area_profissional = ?
     WHERE id = ?;
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

export async function deletarEmpresa(id) {
  const comando = `
    DELETE FROM empresa
     WHERE id = ?;
  `;

  await connection.query(comando, [id]);
}

export { upload };
