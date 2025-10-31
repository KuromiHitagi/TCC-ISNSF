import { connection } from "./src/config/db.js";

import bcrypt from 'bcryptjs';

async function createTestAccounts() {
  try {
    // Usuários
    const users = [
      {
        nome: 'João Silva',
        cpf: '12345678901',
        data_nascimento: '1990-01-01',
        cidade: 'São Paulo',
        telefone: '11999999999',
        email: 'joao.silva@teste.com',
        senha: 'senha123',
        area_interesse: 'Tecnologia'
      },
      {
        nome: 'Maria Santos',
        cpf: '98765432100',
        data_nascimento: '1985-05-15',
        cidade: 'Rio de Janeiro',
        telefone: '21988888888',
        email: 'maria.santos@teste.com',
        senha: 'senha456',
        area_interesse: 'Marketing'
      }
    ];

    // Empresas
    const empresas = [
      {
        nome: 'Tech Solutions Ltda',
        email: 'contato@techsolutions.com',
        cnpj: '12345678000123',
        senha: 'empresa123',
        empresa_foto: null,
        area_profissional: 'Tecnologia da Informação'
      },
      {
        nome: 'Marketing Pro',
        email: 'admin@marketingpro.com',
        cnpj: '98765432000198',
        senha: 'empresa456',
        empresa_foto: null,
        area_profissional: 'Marketing Digital'
      }
    ];

    // Inserir usuários
    for (const user of users) {
      const hash = await bcrypt.hash(user.senha, 10);
      const comando = `
        INSERT INTO usuario (nome, cpf, data_nascimento, cidade, telefone, email, senha, area_interesse)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;
      await connection.query(comando, [
        user.nome,
        user.cpf,
        user.data_nascimento,
        user.cidade,
        user.telefone,
        user.email,
        hash,
        user.area_interesse
      ]);
      console.log(`Usuário ${user.nome} criado com email: ${user.email} e senha: ${user.senha}`);
    }

    // Inserir empresas
    for (const empresa of empresas) {
      const hash = await bcrypt.hash(empresa.senha, 10);
      const comando = `
        INSERT INTO empresa (nome, email, cnpj, senha, empresa_foto, area_profissional)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      await connection.query(comando, [
        empresa.nome,
        empresa.email,
        empresa.cnpj,
        hash,
        empresa.empresa_foto,
        empresa.area_profissional
      ]);
      console.log(`Empresa ${empresa.nome} criada com email: ${empresa.email} e senha: ${empresa.senha}`);
    }

    console.log('Contas de teste criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar contas de teste:', error);
  } finally {
    await connection.end();
  }
}

createTestAccounts();
