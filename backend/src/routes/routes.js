import express from 'express';
import userController from '../controller/userController.js';
import adminController from '../controller/adminController.js';
import vagaController from '../controller/vagaController.js';
import candidaturaController from '../controller/candidaturaController.js';
import empresaController from '../controller/empresaController.js';
import analysisController from '../controller/analysisController.js';
import authController from '../controller/authController.js';

export function adicionarRotas(api) {
  api.use(userController);
  api.use(adminController);
  api.use(vagaController);
  api.use(candidaturaController);
  api.use(empresaController);
  api.use(analysisController);
  api.use(authController);
  api.use('/storage', express.static('../public/storage'));
}
