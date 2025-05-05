import axios from 'axios';
import { Agendamento } from '../types/agendamento';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/agendamentos',
});

export const agendar = (data: Agendamento) => api.post('', data);

export const consultarPorCpf = (cpf: string) =>
  api.get<Agendamento>(`/${cpf}`);

export const alterarData = (cpf: string, novaDataHora: string) =>
  api.put(`/${cpf}`, novaDataHora, {
    headers: { 'Content-Type': 'application/json' },
  });

export const cancelar = (cpf: string) => api.delete(`/${cpf}`);
