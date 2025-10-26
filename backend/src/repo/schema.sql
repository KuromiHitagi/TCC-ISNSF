drop database if exists TCCFREI;

create database if not exists TCCFREI;
use TCCFREI;

create table if not exists users(
    id int auto_increment primary key,
    nome varchar(50) not null,
    idade int not null,
    cpf varchar(11) unique not null,
    areainteresse varchar(100) not null,
    email varchar(50) unique not null,
    senha varchar(50) not null
);

create table if not exists inc(
    id int auto_increment primary key,
    nome varchar(50) unique not null,
    cnpj varchar(14) unique not null,
    areaprofissionalizada varchar(100) not null,
    email varchar(50) unique not null,
    senha varchar(50) not null
);