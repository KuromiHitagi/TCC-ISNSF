export default function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, ''); // Remove tudo que não é número

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false; // Tamanho errado ou todos os dígitos iguais

  // Calcula o primeiro dígito verificador
  let soma = 0;
  let pesos = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * pesos[i];
  }
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;
  if (digito1 !== parseInt(cnpj.charAt(12))) return false;

  // Calcula o segundo dígito verificador
  soma = 0;
  pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * pesos[i];
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;
  if (digito2 !== parseInt(cnpj.charAt(13))) return false;

  return true;
}
