import { inserirAdmin, validarLoginAdmin, listarUsuarios, listarEmpresas, listarVagas, listarCandidaturas, deletarUsuario, deletarEmpresa, deletarVaga, deletarCandidatura, atualizarUsuario, atualizarEmpresa, atualizarVaga, atualizarCandidatura } from '../repository/adminRepository.js';
import { generateToken, getAuthentication } from '../utils/JWT.js';
import { Router } from 'express';

const endpoints = Router();

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

// Listar usuários
endpoints.get('/admin/usuarios', getAuthentication(), async (req, resp) => {
    try {
        const usuarios = await listarUsuarios();
        resp.send(usuarios);
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Listar empresas
endpoints.get('/admin/empresas', getAuthentication(), async (req, resp) => {
    try {
        const empresas = await listarEmpresas();
        resp.send(empresas);
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Listar vagas
endpoints.get('/admin/vagas', getAuthentication(), async (req, resp) => {
    try {
        const vagas = await listarVagas();
        resp.send(vagas);
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Listar candidaturas
endpoints.get('/admin/candidaturas', getAuthentication(), async (req, resp) => {
    try {
        const candidaturas = await listarCandidaturas();
        resp.send(candidaturas);
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Deletar usuário
endpoints.delete('/admin/usuario/:id', getAuthentication(), async (req, resp) => {
    try {
        const id = req.params.id;
        await deletarUsuario(id);
        resp.send({ mensagem: 'Usuário deletado com sucesso' });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Deletar empresa
endpoints.delete('/admin/empresa/:id', getAuthentication(), async (req, resp) => {
    try {
        const id = req.params.id;
        await deletarEmpresa(id);
        resp.send({ mensagem: 'Empresa deletada com sucesso' });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Deletar vaga
endpoints.delete('/admin/vaga/:id', getAuthentication(), async (req, resp) => {
    try {
        const id = req.params.id;
        await deletarVaga(id);
        resp.send({ mensagem: 'Vaga deletada com sucesso' });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Deletar candidatura
endpoints.delete('/admin/candidatura/:id', getAuthentication(), async (req, resp) => {
    try {
        const id = req.params.id;
        await deletarCandidatura(id);
        resp.send({ mensagem: 'Candidatura deletada com sucesso' });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Atualizar usuário
endpoints.put('/admin/usuario/:id', getAuthentication(), async (req, resp) => {
    try {
        const id = req.params.id;
        const dados = req.body;
        await atualizarUsuario(id, dados);
        resp.send({ mensagem: 'Usuário atualizado com sucesso' });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Atualizar empresa
endpoints.put('/admin/empresa/:id', getAuthentication(), async (req, resp) => {
    try {
        const id = req.params.id;
        const dados = req.body;
        await atualizarEmpresa(id, dados);
        resp.send({ mensagem: 'Empresa atualizada com sucesso' });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Atualizar vaga
endpoints.put('/admin/vaga/:id', getAuthentication(), async (req, resp) => {
    try {
        const id = req.params.id;
        const dados = req.body;
        await atualizarVaga(id, dados);
        resp.send({ mensagem: 'Vaga atualizada com sucesso' });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Atualizar candidatura
endpoints.put('/admin/candidatura/:id', getAuthentication(), async (req, resp) => {
    try {
        const id = req.params.id;
        const dados = req.body;
        await atualizarCandidatura(id, dados);
        resp.send({ mensagem: 'Candidatura atualizada com sucesso' });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.get('/admin/verify', async (req, resp) => {
    try {
        const email = req.query.email;
        const admin = await verificarAdmin(email);
        if (admin.length > 0) {
            resp.send({ mensagem: 'Admin verificado!', verified: true });
        } else {
            resp.send({ mensagem: "Admin não cadastrado", verified: false });
        }
    } catch (error) {
        resp.status(500).send({ erro: "Erro interno do servidor" });
    }
})

export default endpoints;
