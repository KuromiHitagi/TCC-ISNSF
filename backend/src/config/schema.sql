create database tecvagas;
use tecvagas;

CREATE TABLE admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE usuario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  cpf CHAR(11) UNIQUE,
  data_nascimento DATE,
  cidade VARCHAR(100),
  telefone VARCHAR(15),
  email VARCHAR(255) UNIQUE,
  senha VARCHAR(255) NOT NULL,
  user_foto VARCHAR(255),
  area_interesse VARCHAR(255)
);

create table empresa (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  cnpj CHAR(14) UNIQUE,
  senha VARCHAR(255) NOT NULL,
  empresa_foto VARCHAR(255),
  area_profissional VARCHAR(255)
);

create table vaga (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    empresa_id INT,
    localizacao VARCHAR(255),
    salario DECIMAL(10, 2),
    data_publicacao DATETIME NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES empresa(id) on delete cascade
);

create table candidatura (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vaga_id INT,
    usuario_id INT,
    data_candidatura DATETIME NOT NULL,
    status VARCHAR(50) DEFAULT 'Pendente',
    FOREIGN KEY (vaga_id) REFERENCES vaga(id) on delete cascade,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) on delete cascade
);