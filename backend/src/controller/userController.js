import * as repo from '../repository/userRepository.js';
import { generateToken, getAuthentication } from '../utils/JWT.js';
import { Router } from "express";
import { upload } from '../repository/userRepository.js';


const endpoints = Router();

// FOTO USUARIO
 endpoints.put('/user/:id/imagem', upload.single('img'), async (req, resp) => {
    let caminho = req.file.path;   // lê o caminho do arquivo gerado pelo multer
    let id = req.params.id;

    await repo.alterarFotoUsuario(id, caminho);
    resp.send();
});

// Criar conta de usuário
endpoints.post('/usuario', async (req, resp) => {
  try {
    const novoUsuario = req.body;
    const id = await repo.criarConta(novoUsuario);
    resp.send({ novoId: id });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Login de usuário
endpoints.post('/usuario/login', async (req, resp) => {
  try {
    const { email, senha } = req.body;
    const credenciais = await repo.validarCredenciais(email, senha);
    if (!credenciais) {
      return resp.status(401).send({ erro: 'Credenciais inválidas' });
    }
    const token = generateToken(credenciais);
    resp.send({ token, nome: credenciais.nome });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Buscar perfil do usuário (autenticado)
endpoints.get('/usuario/perfil', getAuthentication(), async (req, resp) => {
  try {
    const usuario = await repo.buscarUsuarioPorId(req.user.id);
    if (!usuario) {
      return resp.status(404).send({ erro: 'Usuário não encontrado' });
    }
    resp.send(usuario);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Atualizar perfil do usuário (autenticado)
endpoints.put('/usuario/perfil', getAuthentication(), async (req, resp) => {
  try {
    const dados = req.body;
    await repo.atualizarUsuario(req.user.id, dados);
    resp.send({ mensagem: 'Perfil atualizado com sucesso' });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Deletar conta do usuário (autenticado)
endpoints.delete('/usuario/delete', getAuthentication(), async (req, resp) => {
  try {
    await repo.deletarUsuario(req.user.id);
    resp.send({ mensagem: 'Conta deletada com sucesso' });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Adicionar foto do usuário (autenticado)
endpoints.post('/usuario/foto', getAuthentication(), upload.single('foto_usuario'), async (req, resp) => {
  try {
    const caminhoFoto = req.file ? req.file.path : req.body.caminho_foto;
    await repo.adicionarFotoUsuario(req.user.id, caminhoFoto);
    resp.send({ mensagem: 'Foto adicionada com sucesso' });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Listar fotos do usuário (autenticado)
endpoints.get('/usuario/foto', getAuthentication(), async (req, resp) => {
  try {
    const fotos = await repo.mostrarFotosUsuario(req.user.id);
    resp.send(fotos);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

endpoints.get('/candidatos', getAuthentication(), async (req, resp) => {
  try {
    const info = await repo.mostrarCandidatos();
    resp.send(info);
  } catch (error) {
    resp.status(400).send({ erro: error.message });
  }
});
export default endpoints;
