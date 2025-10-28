import * as repo from '../repository/empresaRepository.js';
import { generateToken, getAuthentication } from '../utils/jwt.js';
import { Router } from "express";
import { upload } from '../repository/empresaRepository.js';


const endpoints = Router();


// informa o nome da imagem 
endpoints.put('/empresa/:id/imagem', upload.single('img'), async (req, resp) => {
    let caminho = req.file.path;   // lê o caminho do arquivo gerado pelo multer
    let id = req.params.id;

    await repo.alterarFotoEmpresa(id, caminho);
    resp.send();
});

// Criar conta de empresa
endpoints.post('/empresa', async (req, resp) => {
  try {
    const novaEmpresa = req.body;
    const id = await repo.criarConta(novaEmpresa);
    resp.send({ novoId: id });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Login de empresa
endpoints.post('/empresa/login', async (req, resp) => {
  try {
    const { email, senha } = req.body;
    const credenciais = await repo.validarCredenciais(email, senha);
    if (!credenciais) {
      return resp.status(401).send({ erro: 'Credenciais inválidas' });
    }
    const token = generateToken(credenciais);
    resp.send({ token });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Buscar perfil da empresa (autenticada)
endpoints.get('/empresa/perfil', getAuthentication(), async (req, resp) => {
  try {
    const empresa = await repo.buscarEmpresaPorId(req.user.id);
    if (!empresa) {
      return resp.status(404).send({ erro: 'Empresa não encontrada' });
    }
    resp.send(empresa);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Atualizar perfil da empresa (autenticada)
endpoints.put('/empresa/perfil', getAuthentication(), async (req, resp) => {
  try {
    const dados = req.body;
    await repo.atualizarEmpresa(req.user.id, dados);
    resp.send({ mensagem: 'Perfil atualizado com sucesso' });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Deletar conta da empresa (autenticada)
endpoints.delete('/empresa', getAuthentication(), async (req, resp) => {
  try {
    await repo.deletarEmpresa(req.user.id);
    resp.send({ mensagem: 'Conta deletada com sucesso' });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Adicionar foto da empresa (autenticada)
endpoints.post('/empresa/foto', getAuthentication(), upload.single('foto_empresa'), async (req, resp) => {
  try {
    const caminhoFoto = req.file ? req.file.path : req.body.caminho_foto;
    const foto = { caminho: caminhoFoto };
    await repo.adicionarFotoEmpresa(req.user.id, foto);
    resp.send({ mensagem: 'Foto adicionada com sucesso' });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Listar fotos da empresa (autenticada)
endpoints.get('/empresa/foto', getAuthentication(), async (req, resp) => {
  try {
    const fotos = await repo.mostrarFotosEmpresa(req.user.id);
    resp.send(fotos);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

export default endpoints;
