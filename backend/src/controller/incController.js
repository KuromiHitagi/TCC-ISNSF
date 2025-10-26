import * as repo from '../repo/incRepo.js'
import { Router } from 'express'
import { generateToken } from '../utils/JWT.js'

const api = Router()

api.post('/cadastrar/inc', async (req, resp) => {
    try {
        let novaConta = req.body;
        let info = await repo.CriarConta(novaConta)
        resp.status(200).send({novoId : info})
    } catch (error) {
        console.error('Erro ao criar conta de empresa:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            resp.status(400).send({ erro: 'Email, CNPJ ou nome já cadastrado.' });
        } else {
            resp.status(500).send({ erro: 'Erro interno do servidor.' });
        }
    }
})

api.post('/gerarToken', async (req, resp) => {
    let email = req.body.email;
    let senha = req.body.senha;

    let credenciais = await repo.GerarToken(email, senha);

    if (!credenciais) {
      resp.status(401).send({
        erro: 'Credenciais inválidas.'
      });
    }
    else {
      resp.send({
        token: generateToken(credenciais),
        email: credenciais.email
      });
    }
  })

export default api;