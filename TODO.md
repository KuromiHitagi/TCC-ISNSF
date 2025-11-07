# TODO: Adicionar Página de Admin

## Backend
- [x] Adicionar endpoints no adminController.js para listar usuários, empresas, vagas, candidaturas
- [x] Adicionar endpoints para editar e deletar usuários, empresas, vagas, candidaturas
- [x] Atualizar adminRepository.js com funções correspondentes

## Frontend
- [x] Criar página admin (adminPainel.jsx e adminPainel.scss)
- [x] Modificar login.jsx para tentar login como admin (revertido para original)
- [x] Modificar navBar.jsx para mostrar link para admin se USER_TYPE for "admin"
- [x] Adicionar rota /admin em main.jsx
- [x] Criar página de cadastro de admin (adminRegister.jsx e adminRegister.scss)
- [x] Adicionar rota /admin/register em main.jsx
- [ ] Adicionar botão para cadastrar novo admin no painel admin (removido temporariamente para testes)

## Testes
- [ ] Testar login admin
- [ ] Verificar carregamento da página admin
- [ ] Testar funcionalidades de gerenciamento (listar, editar, deletar)
