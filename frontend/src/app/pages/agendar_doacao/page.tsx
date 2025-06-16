// app/pages/agendar_doacao/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { agendar } from '@/app/services/apiDoacao';
import { Agendamento } from '@/app/types/agendamento';
import { maskCpf, maskTelefone, maskNome } from '@/app/utils/masks';
import { isValidCpf, isValidTelefone, isValidNome, isValidDataHora } from '@/app/validator/validator';
import Header from '@/app/components/header/page';
import ModalCritériosDoacao from '@/app/components/modal_criterios_doacao/page';
import { Hemocentro } from '@/app/types/hemocentro';
import { buscarLocalizacaoHemocentros } from '@/app/services/apiLocaisDoacao';
import SelectHemocentro from '@/app/components/select_hemocentros/page';

export default function AgendarDoacao() {
    const router = useRouter();

    const [mostrarModal, setMostrarModal] = useState(true);
    const [nomeHemocentro, setNomeHemocentro] = useState('Local da Doação');
    const [hemocentros, setHemocentros] = useState<Hemocentro[]>([]);

    const [agendamento, setAgendamento] = useState<Agendamento>({
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        dataHora: '',
        hemocentro: null,
    });

    useEffect(() => {
        setMostrarModal(true);

        const userDataRaw = localStorage.getItem('userData');
        if (userDataRaw) {
            const userData = JSON.parse(userDataRaw);
            setAgendamento(prev => ({
                ...prev,
                nome: userData.nome || '',
                cpf: userData.cpf ? maskCpf(userData.cpf) : '',
                telefone: userData.telefone ? maskTelefone(userData.telefone) : '',
                email: userData.email || '',
            }));
        }

        // Carrega lista de hemocentros
        const carregarHemocentros = async () => {
            try {
                const lista = await buscarLocalizacaoHemocentros();
                setHemocentros(lista);
            } catch (error) {
                console.error('Erro ao carregar hemocentros:', error);
            }
        };

        carregarHemocentros();
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let maskedValue = value;
        if (name === 'cpf') maskedValue = maskCpf(value).slice(0, 14);
        else if (name === 'telefone') maskedValue = maskTelefone(value).slice(0, 15);
        else if (name === 'nome') maskedValue = maskNome(value).slice(0, 60);

        setAgendamento({ ...agendamento, [name]: maskedValue });
    };

    const handleAgendar = async () => {
        if (!isValidNome(agendamento.nome)) return toast.error('Nome inválido.');
        if (!isValidCpf(agendamento.cpf)) return toast.error('CPF inválido.');
        if (!isValidTelefone(agendamento.telefone)) return toast.error('Telefone inválido.');
        if (!agendamento.hemocentro) return toast.error('Selecione um hemocentro.');

        const erro = isValidDataHora(agendamento.dataHora);
        if (erro) return toast.error(erro);

        const agendamentoFormatado = {
            nome: agendamento.nome,
            cpf: agendamento.cpf.replace(/\D/g, ''),
            telefone: agendamento.telefone.replace(/\D/g, ''),
            email: agendamento.email,
            dataHora: agendamento.dataHora,
            hemocentroId: agendamento.hemocentro?.id,
        };

        try {
            await agendar(agendamentoFormatado);
            toast.success('Agendamento realizado com sucesso!');
        } catch (error: any) {
            const mensagem = error?.response?.data || 'Erro ao agendar. Tente novamente.';
            toast.error(mensagem);
        }
    };

    const handleIrParaPaginaInicial = () => {
        router.push('../');
    };

    const handleIrParaLocaisPróximos = () => {
        router.push('/pages/locais_doacao');
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
    };

    const handleRecusarDoacao = () => {
        router.push('../');
    };

    return (
        <div className="relative">
            {mostrarModal && (
                <ModalCritériosDoacao
                    onFechar={handleFecharModal}
                    onRecusar={handleRecusarDoacao}
                />
            )}
            {!mostrarModal && (
                <>
                    <Header />
                    <main className="pt-12 px-8 pb-16">
                        <div className="max-w-xl mx-auto p-5 bg-white shadow-md rounded-lg">
                            <h1 className="text-2xl font-bold mb-4">Agendamento de Doação de Sangue</h1>

                            <input
                                placeholder="Nome" name="nome" value={agendamento.nome}
                                onChange={handleInput}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                placeholder="CPF" name="cpf" value={agendamento.cpf}
                                onChange={handleInput}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                placeholder="Telefone" name="telefone" value={agendamento.telefone}
                                onChange={handleInput}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                placeholder="E-mail" name="email" value={agendamento.email}
                                onChange={handleInput}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="datetime-local" name="dataHora" onChange={handleInput}
                                className="w-full p-2 border rounded mb-4"
                            />
                            <SelectHemocentro
                                hemocentros={hemocentros}
                                valorSelecionado={agendamento.hemocentro}
                                onSelecionar={(h) => {
                                    setAgendamento(prev => ({ ...prev, hemocentro: h }));
                                    setNomeHemocentro(
                                        h ? `${h.nome} - ${h.endereco}, ${h.cidade}` : 'Local da Doação'
                                    );
                                }}
                            />
                            <div className="flex justify-center">
                                <button
                                    onClick={handleAgendar}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                >
                                    Agendar
                                </button>
                            </div>
                            <div className="flex justify-between items-center text-base">
                <span
                    onClick={handleIrParaPaginaInicial}
                    className="text-red-600 hover:underline cursor-pointer"
                >
                  Voltar para tela inicial
                </span>
                                <span
                                    onClick={handleIrParaLocaisPróximos}
                                    className="text-red-600 hover:underline cursor-pointer"
                                >
                  Ver locais de doação próximos
                </span>
                            </div>
                            <ToastContainer position="top-right" autoClose={3000} />
                        </div>
                    </main>
                </>
            )}
        </div>
    );
}
