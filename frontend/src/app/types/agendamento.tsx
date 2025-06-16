import { Hemocentro } from "./hemocentro";

export interface Agendamento {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    dataHora: string;
    hemocentro: Hemocentro | null;
}

export interface AgendamentoDTO {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    dataHora: string;
    hemocentroId: number;
}

export interface AgendamentoResponseDTO {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    dataHora: string;
    hemocentroId: number;
    hemocentroNome: string;
    hemocentroEndereco: string;
}
