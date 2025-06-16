import axios from 'axios'

export interface Usuario {
    nome: string
    senha: string
    telefone: String
    email: String
}

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/auth',
})

export const loginUsuario = (cpf: string, senha: string) =>
    api.post('/login', { cpf, senha })