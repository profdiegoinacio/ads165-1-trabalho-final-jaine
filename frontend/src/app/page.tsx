"use client";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  agendar,
  consultarPorCpf,
  alterarData,
  cancelar,
} from './services/api';
import { Agendamento } from './types/agendamento';
import { maskCpf, maskTelefone, maskNome } from './utils/masks';
import { isValidCpf, isValidTelefone, isValidNome, isValidDataHora } from './validator/validator';

export default function Home() {
  const [agendamento, setAgendamento] = useState<Agendamento>({
    nome: '',
    cpf: '',
    telefone: '',
    dataHora: '',
  });
  const [consultaCpf, setConsultaCpf] = useState('');
  const [resultado, setResultado] = useState<Agendamento | null>(null);
  const [novaData, setNovaData] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let maskedValue = value;

    if (name === 'cpf') maskedValue = maskCpf(value).slice(0, 14);
    else if (name === 'telefone') maskedValue = maskTelefone(value).slice(0, 15);
    else if (name === 'nome') maskedValue = maskNome(value).slice(0, 60);

    setAgendamento({ ...agendamento, [name]: maskedValue });
  };

  const handleAgendar = async () => {
    if (!isValidNome(agendamento.nome)) {
      return toast.error('Nome inválido.');
    }

    if (!isValidCpf(agendamento.cpf)) {
      return toast.error('CPF inválido.');
    }

    if (!isValidTelefone(agendamento.telefone)) {
      return toast.error('Telefone inválido.');
    }

    const agendamentoFormatado = {
      ...agendamento,
      cpf: agendamento.cpf.replace(/\D/g, ''),
      telefone: agendamento.telefone.replace(/\D/g, '')
    };

    const erro = isValidDataHora(agendamento.dataHora);
    if (erro) {
      toast.error(erro);
      return;
    }

    await agendar(agendamentoFormatado);
    toast.success('Agendamento realizado com sucesso!');
  };


  const handleConsultar = async () => {
    const cpfFormatado = consultaCpf.replace(/\D/g, '');

    if (!isValidCpf(consultaCpf)) {
      return toast.error('CPF inválido.');
    }

    try {
      const res = await consultarPorCpf(cpfFormatado);
      setResultado(res.data);
    } catch {
      toast.warn('Agendamento não encontrado.');
      setResultado(null);
    }
  };

  const handleAlterarData = async () => {
    const cpfFormatado = consultaCpf.replace(/\D/g, '');

    const erro = isValidDataHora(novaData);
    if (erro) {
      toast.error(erro);
      return;
    }

    try {
      await alterarData(cpfFormatado, novaData);
      toast.success('Data alterada!');
    } catch {
      toast.error('Erro ao alterar data.');
    }
  };

  const handleCancelar = async () => {
    const cpfFormatado = consultaCpf.replace(/\D/g, '');
    try {
      await cancelar(cpfFormatado);
      toast.success('Agendamento cancelado.');
      setResultado(null);
    } catch {
      toast.error('Erro ao cancelar.');
    }
  };

  return (
      <div className="max-w-xl mx-auto p-5">
        <h1>Agendamento de Doação de Sangue</h1>

        <h2>Agendar</h2>
        <input placeholder="Nome" name="nome" value={agendamento.nome} onChange={handleInput} maxLength={60} />
        <input placeholder="CPF" name="cpf" value={agendamento.cpf} onChange={handleInput} maxLength={14} />
        <input placeholder="Telefone" name="telefone" value={agendamento.telefone} onChange={handleInput} maxLength={15} />
        <input type="datetime-local" name="dataHora" onChange={handleInput} />
        <button onClick={handleAgendar}>Agendar</button>

        <hr />

        <h2>Consultar/Alterar/Cancelar</h2>
        <input
            placeholder="CPF"
            value={consultaCpf}
            onChange={(e) => setConsultaCpf(maskCpf(e.target.value).slice(0, 14))}
        />
        <button onClick={handleConsultar}>Consultar</button>

        {resultado && (
            <div>
              <p><strong>Nome:</strong> {resultado.nome}</p>
              <p><strong>Data:</strong> {new Date(resultado.dataHora).toLocaleString()}</p>

              <input type="datetime-local" value={novaData} onChange={(e) => setNovaData(e.target.value)} />
              <button onClick={handleAlterarData}>Alterar Data</button>
              <button onClick={handleCancelar}>Cancelar Agendamento</button>
            </div>
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
  );
}
