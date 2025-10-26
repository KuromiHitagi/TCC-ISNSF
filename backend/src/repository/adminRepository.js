import { connection } from '../config/db.js';
import bcrypt from 'bcryptjs';

export async function inserirAdmin(admin) {
    const comando = `
        INSERT INTO admin (nome, email, senha)
        VALUES (?, ?, ?)
    `;

    const hash = await bcrypt.hash(admin.senha, 10);
    const [resposta] = await connection.query(comando, [
        admin.nome,
        admin.email,
        hash
    ]);

    return resposta.insertId;
}

export async function validarLoginAdmin(email, senha) {
    const comando = `
        SELECT id, nome, email, senha
        FROM admin
        WHERE email = ?
    `;

    const [linhas] = await connection.query(comando, [email]);
    if (linhas.length === 0) {
        return null;
    }

    const admin = linhas[0];
    const senhaValida = await bcrypt.compare(senha, admin.senha);
    if (!senhaValida) {
        return null;
    }

    return { id: admin.id, nome: admin.nome, email: admin.email, tipo: 'admin' };
}
