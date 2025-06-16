export const isValidCpf = (cpf: string) => {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
};

export const isValidTelefone = (telefone: string) => {
  return /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);
};

export const isValidNome = (nome: string) => {
  const palavras = nome.trim().split(/\s+/);
  if (palavras.length < 2) return false;
  const [primeira, segunda] = palavras;
  return primeira.length >= 3 && segunda.length >= 2;
};


export function isValidDataHora(value: string): string | null {
  const data = new Date(value);

  if (isNaN(data.getTime())) return 'Data e hora inválidas.';

  const agora = new Date();
  if (data < agora) {
    return 'Agendamento não pode ser feito para data e hora passadas.';
  }

  const hora = data.getHours();
  const diaSemana = data.getDay();

  if (diaSemana === 0 || diaSemana === 6) {
    return 'Agendamentos só podem ser feitos em dias úteis (segunda a sexta).';
  }

  if (hora < 8 || hora >= 16) {
    return 'Horário inválido. Permitido apenas entre 08:00 e 16:00.';
  }

  return null;
}

export const isValidIdade = (dataNascimento: string, idadeMinima = 18): boolean => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade >= idadeMinima;
};


