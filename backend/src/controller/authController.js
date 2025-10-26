import { Router } from "express";
import admin from "../firebase-admin.js";
import { generateToken } from "../utils/jwt.js";
import * as userRepo from "../repository/userRepository.js";
import * as empresaRepo from "../repository/empresaRepository.js";

const endpoints = Router();

// Endpoint para verificar token do Firebase e criar/login usuário/empresa
endpoints.post('/auth/google/verify', async (req, resp) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return resp.status(400).send({ erro: 'Token não fornecido' });
    }

    // Verificar o token com Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const name = decodedToken.name;

    // Verificar se é usuário ou empresa pelo email
    let usuario = await userRepo.buscarUsuarioPorEmail(email);
    let empresa = await empresaRepo.buscarEmpresaPorEmail(email);
    let tipo = 'usuario';
    let conta = null;

    if (usuario) {
      tipo = 'usuario';
      conta = usuario;
    } else if (empresa) {
      tipo = 'empresa';
      conta = empresa;
    } else {
      // Criar novo usuário por padrão
      const novoUsuario = {
        nome: name,
        email: email,
        senha: '', // Senha vazia para usuários do Google
        idade: null,
        cpf: null,
        data_nascimento: null,
        cidade: null,
        telefone: null
      };
      const id = await userRepo.criarConta(novoUsuario);
      conta = await userRepo.buscarUsuarioPorId(id);
      tipo = 'usuario';
    }

    // Gerar token JWT
    const token = generateToken({
      id: conta.id,
      nome: conta.nome,
      email: conta.email,
      tipo: tipo
    });

    resp.send({ token, usuario: conta, tipo });
  } catch (err) {
    console.error('Erro na autenticação Google:', err);
    resp.status(400).send({ erro: 'Falha na autenticação com Google' });
  }
});

export default endpoints;
