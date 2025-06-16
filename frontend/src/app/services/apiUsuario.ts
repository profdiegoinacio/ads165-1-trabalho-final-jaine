// lib/apiUsuario.ts
import axios from 'axios'
import { AgendamentoResponseDTO } from '../types/agendamento'

export interface Usuario {
    nome: string
    cpf: string
    dataNascimento: string
    telefone: string
    email: string
    tipoSanguineo: string
    senha: string
    endereco: {
        rua: string
        bairro: string
        numero: string
        cep: string
        cidade: string
        estado: string
        complemento?: string
    }
}

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/usuarios',
})

// Cadastro de usuário
export const cadastrarUsuario = async (usuario: Usuario) => {
    const response = await api.post('/cadastrar', usuario)
    return response.data
}

export const consultaHistoricoDoacao = async (cpf: string): Promise<AgendamentoResponseDTO[]> => {
    const response = await api.get<AgendamentoResponseDTO[]>(`/historico/${cpf}`)
    console.log(response.data)
    return response.data
}