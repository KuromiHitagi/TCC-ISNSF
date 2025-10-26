import { hashPassword } from "../utils/JWT.js";
import { Connection } from "./connection.js";

export async function GerarToken(email, senha) {
    const senhaHash = hashPassword(senha)
    const comando = `select id, email, senha from inc
                     where email = ? and senha = ?`

    const [registro] = await Connection.query(comando, [email, senhaHash]);
    return registro[0];
}

export async function CriarConta(novaConta) {
    const senhaHash = hashPassword(novaConta.senha);
    const comando = `insert into inc (nome, cnpj, areaprofissionalizada, email, senha) values(?, ?, ?, ?, ?)`

    const [registro] = await Connection.query(comando, [
        novaConta.nome,
        novaConta.cnpj,
        novaConta.areaprofissionalizada,
        novaConta.email,
        senhaHash
    ]);
    return registro.insertId;
}