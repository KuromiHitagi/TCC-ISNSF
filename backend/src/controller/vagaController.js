import * as repo from '../repository/vagaRepository.js';
import * as empresaRepo from '../repository/empresaRepository.js';
import { getAuthentication } from '../utils/JWT.js';
import { Router } from "express";

const endpoints = Router();

// Listar todas as vagas
endpoints.get('/vaga', async (req, resp) => {
  try {
    const vagas = await repo.listarVagas();
    resp.send(vagas);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Buscar vaga por ID
endpoints.get('/vaga/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const vaga = await repo.buscarVagaPorId(id);
    if (!vaga) {
      return resp.status(404).send({ erro: 'Vaga não encontrada' });
    }
    resp.send(vaga);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Criar nova vaga (autenticado)
endpoints.post('/vaga/criar', getAuthentication(), async (req, resp) => {
  try {
    const novaVaga = req.body;
    // Buscar empresa pelo ID do usuário logado (assumindo que o usuário é empresa)
    const empresa = await empresaRepo.buscarEmpresaPorId(req.user.id);
    if (!empresa) {
      return resp.status(400).send({ erro: 'Empresa não encontrada para o usuário logado' });
    }
    novaVaga.empresa_id = empresa.id;
    novaVaga.usuario_id = req.user.id; // Associar ao usuário logado
    const id = await repo.criarVaga(novaVaga);
    resp.send({ novoId: id });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Atualizar vaga (autenticado - só o dono)
endpoints.put('/vaga/:id', getAuthentication(), async (req, resp) => {
  try {
    const id = req.params.id;
    const vaga = await repo.buscarVagaPorId(id);
    if (!vaga) {
      return resp.status(404).send({ erro: 'Vaga não encontrada' });
    }
    if (vaga.usuario_id !== req.user.id && req.user.tipo !== 'admin') {
      return resp.status(403).send({ erro: 'Acesso negado' });
    }
    const dados = req.body;
    await repo.atualizarVaga(id, dados);
    resp.send({ mensagem: 'Vaga atualizada com sucesso' });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Deletar vaga (autenticado - só o dono ou admin)
endpoints.delete('/vaga/:id', getAuthentication(), async (req, resp) => {
  try {
    const id = req.params.id;
    const vaga = await repo.buscarVagaPorId(id);
    if (!vaga) {
      return resp.status(404).send({ erro: 'Vaga não encontrada' });
    }
    if (vaga.usuario_id !== req.user.id && req.user.tipo !== 'admin') {
      return resp.status(403).send({ erro: 'Acesso negado' });
    }
    await repo.deletarVaga(id);
    resp.send({ mensagem: 'Vaga deletada com sucesso' });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Listar vagas do usuário logado
endpoints.get('/vaga/usuario/minhas', getAuthentication(), async (req, resp) => {
  try {
    const vagas = await repo.listarVagasPorUsuario(req.user.id);
    resp.send(vagas);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

export default endpoints;
