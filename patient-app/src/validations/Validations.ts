export const validateCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    
    if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
      return 'CPF inválido';
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return 'CPF inválido';

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return 'CPF inválido';

    return true;
};

export const validateDateOfBirth = (value: Date) => {
  const date = new Date(value);
  const today = new Date();
  return date <= today || 'Data de nascimento não pode ser maior que a data atual';
};