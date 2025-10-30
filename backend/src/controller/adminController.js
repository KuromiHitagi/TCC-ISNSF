import { inserirAdmin, validarLoginAdmin } from '../repository/adminRepository.js';
import { generateToken } from '../utils/JWT.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.post('/register/admin', async (req, resp) => {
    try {
        const admin = req.body;
        const id = await inserirAdmin(admin);
        resp.send({ novoId: id });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.post('/login/admin', async (req, resp) => {
    try {
        const { email, senha } = req.body;
        const admin = await validarLoginAdmin(email, senha);

        if (!admin) {
            return resp.status(401).send({ erro: 'Credenciais inválidas' });
        }

        const token = generateToken(admin);
        resp.send({ token, admin });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default endpoints;
