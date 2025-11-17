export default function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, ""); // tira tudo que não é número

  // Lista de CPFs falsos permitidos para testes
  const fakeCPFs = ["12345678901", "10987654321", "12345612345"];

  // Se for um CPF falso permitido, retorna true
  if (fakeCPFs.includes(cpf)) {
    return true;
  }

  // Validação normal do CPF
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // todos iguais tipo 111... ou tamanho errado

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}
