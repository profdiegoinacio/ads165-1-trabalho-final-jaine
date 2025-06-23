import axios from 'axios'

const adminApi = axios.create({
    baseURL: 'http://localhost:8080/api/v1/admin/auth',
})

export const loginAdmin = (email: string, senha: string) =>
    adminApi.post('/login', { email, senha })