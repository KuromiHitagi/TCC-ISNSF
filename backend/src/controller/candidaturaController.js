import * as repo from '../repository/candidaturaRepository.js';
import { getAuthentication } from '../utils/JWT.js';
import { Router } from "express";

const endpoints = Router();

// Listar todas as candidaturas (admin)
endpoints.get('/candidatura', getAuthentication((user) => user.tipo === 'admin'), async (req, resp) => {
  try {
    const candidaturas = await repo.listarCandidaturas();
    resp.send(candidaturas);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Buscar candidatura por ID
endpoints.get('/candidatura/:id', getAuthentication(), async (req, resp) => {
  try {
    const id = req.params.id;
    const candidatura = await repo.buscarCandidaturaPorId(id);
    if (!candidatura) {
      return resp.status(404).send({ erro: 'Candidatura não encontrada' });
    }
    // Verificar se é o usuário da candidatura ou admin
    if (candidatura.usuario_id !== req.user.id && req.user.tipo !== 'admin') {
      return resp.status(403).send({ erro: 'Acesso negado' });
    }
    resp.send(candidatura);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Candidatar-se a uma vaga (autenticado)
endpoints.post('/candidatura', getAuthentication(), async (req, resp) => {
  try {
    const novaCandidatura = req.body;
    novaCandidatura.usuario_id = req.user.id; // Associar ao usuário logado
    const id = await repo.criarCandidatura(novaCandidatura);
    resp.send({ novoId: id });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Atualizar status da candidatura (dono da vaga ou admin)
endpoints.put('/candidatura/:id/status', getAuthentication(), async (req, resp) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    // Buscar a candidatura para obter a vaga_id
    const candidatura = await repo.buscarCandidaturaPorId(id);
    if (!candidatura) {
      return resp.status(404).send({ erro: 'Candidatura não encontrada' });
    }

    // Verificar se o usuário é dono da vaga ou admin
    const vagaRepo = (await import('../repository/vagaRepository.js')).default || (await import('../repository/vagaRepository.js'));
    const vaga = await vagaRepo.buscarVagaPorId(candidatura.vaga_id);
    if (!vaga) {
      return resp.status(404).send({ erro: 'Vaga não encontrada' });
    }
    if (vaga.usuario_id !== req.user.id && req.user.tipo !== 'admin') {
      return resp.status(403).send({ erro: 'Acesso negado' });
    }

    await repo.atualizarStatusCandidatura(id, status);
    resp.send({ mensagem: 'Status atualizado com sucesso' });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Deletar candidatura (autenticado - só o dono ou admin)
endpoints.delete('/candidatura/:id', getAuthentication(), async (req, resp) => {
  try {
    const id = req.params.id;
    const candidatura = await repo.buscarCandidaturaPorId(id);
    if (!candidatura) {
      return resp.status(404).send({ erro: 'Candidatura não encontrada' });
    }
    if (candidatura.usuario_id !== req.user.id && req.user.tipo !== 'admin') {
      return resp.status(403).send({ erro: 'Acesso negado' });
    }
    await repo.deletarCandidatura(id);
    resp.send({ mensagem: 'Candidatura deletada com sucesso' });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Listar candidaturas do usuário logado
endpoints.get('/candidatura/usuario/minhas', getAuthentication(), async (req, resp) => {
  try {
    const candidaturas = await repo.listarCandidaturasPorUsuario(req.user.id);
    resp.send(candidaturas);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Listar candidaturas para uma vaga (dono da vaga ou admin)
endpoints.get('/candidatura/vaga/:idVaga', getAuthentication(), async (req, resp) => {
  try {
    const idVaga = req.params.idVaga;
    // Verificar se o usuário é dono da vaga ou admin
    const vagaRepo = (await import('../repository/vagaRepository.js')).default || (await import('../repository/vagaRepository.js'));
    const vaga = await vagaRepo.buscarVagaPorId(idVaga);
    if (!vaga) {
      return resp.status(404).send({ erro: 'Vaga não encontrada' });
    }
    if (vaga.usuario_id !== req.user.id && req.user.tipo !== 'admin') {
      return resp.status(403).send({ erro: 'Acesso negado' });
    }
    const candidaturas = await repo.listarCandidaturasPorVaga(idVaga);
    resp.send(candidaturas);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Listar detalhes completos da vaga e candidatos (dono da vaga ou admin)
endpoints.get('/candidatura/vaga/detalhes/:idVaga', getAuthentication(), async (req, resp) => {
  try {
    const idVaga = req.params.idVaga;
    // Verificar se o usuário é dono da vaga ou admin
    const vagaRepo = (await import('../repository/vagaRepository.js')).default || (await import('../repository/vagaRepository.js'));
    const vaga = await vagaRepo.buscarVagaPorId(idVaga);
    if (!vaga) {
      return resp.status(404).send({ erro: 'Vaga não encontrada' });
    }
    if (vaga.usuario_id !== req.user.id && req.user.tipo !== 'admin') {
      return resp.status(403).send({ erro: 'Acesso negado' });
    }
    const detalhes = await repo.listarCandidaturasDetalhadasPorVaga(idVaga);
    resp.send(detalhes);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

export default endpoints;
