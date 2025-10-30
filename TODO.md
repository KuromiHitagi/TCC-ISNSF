# TODO: Save name, email, token to localStorage and display in navbar

## Backend Changes
- [x] Modify backend/src/controller/userController.js login endpoint to return { token, nome }
- [x] Modify backend/src/controller/empresaController.js login endpoint to return { token, nome }

## Frontend Changes
- [x] Update frontend/src/pages/login/login.jsx to save NOME for empresas
- [x] Update frontend/src/pages/register/register.jsx to save NOME for empresas after auto-login
- [x] Update frontend/src/pages/register/complete-google.jsx to save NOME for both users and empresas after login

## Verification
- [ ] Test login for users and empresas to ensure NOME is saved
- [ ] Verify navbar displays name and profile photo correctly
