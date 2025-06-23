// app/pages/consulta_doacao/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { consultarPorCpf, alterarData, cancelar } from '@/app/services/apiDoacao';
import { AgendamentoResponseDTO } from '@/app/types/agendamento';
import { maskCpf } from '@/app/utils/masks';
import { isValidCpf, isValidDataHora } from '@/app/validator/validator';
import Header from '@/app/components/header/page';
import { Hemocentro } from '@/app/types/hemocentro';
import { Agendamento } from '@/app/types/agendamento';
import SelectHemocentro from '@/app/components/select_hemocentros/page';
import { buscarLocalizacaoHemocentros } from '@/app/services/apiLocaisDoacao';
import { estadosBrasileiros, tiposSanguineos } from '@/app/utils/constants';
import { isValidIdade } from '@/app/validator/validator';

export default function ConsultaDoacao() {
    const router = useRouter();

    const [consultaCpf, setConsultaCpf] = useState('');
    const [resultado, setResultado] = useState<AgendamentoResponseDTO | null>(null);
    const [novaData, setNovaData] = useState('');
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
        const userDataRaw = localStorage.getItem('userData');
        if (userDataRaw) {
            const userData = JSON.parse(userDataRaw);
            if (userData?.cpf) {
                setConsultaCpf(maskCpf(userData.cpf).slice(0, 14));
            }
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

    const handleConsultar = async () => {
        const cpfFormatado = consultaCpf.replace(/\D/g, '');

        if (!isValidCpf(consultaCpf)) return toast.error('CPF inválido.');

        try {
            const res = await consultarPorCpf(cpfFormatado);
            const dados = res.data;
            setResultado(dados);

            const hemocentroAgendado = hemocentros.find(h => h.id === dados.hemocentroId) ?? null;

            setAgendamento({
                nome: dados.nome,
                cpf: dados.cpf,
                telefone: dados.telefone,
                email: dados.email,
                dataHora: dados.dataHora,
                hemocentro: hemocentroAgendado,
            });

            setNomeHemocentro(
                hemocentroAgendado
                    ? `${hemocentroAgendado.nome} - ${hemocentroAgendado.endereco}, ${hemocentroAgendado.cidade}`
                    : 'Local da Doação'
            );
        } catch {
            toast.warn('Agendamento não encontrado.');
            setResultado(null);
        }
    };


    const handleAlterarData = async () => {
        const cpfFormatado = consultaCpf.replace(/\D/g, '');

        const erro = isValidDataHora(novaData);
        if (erro) return toast.error(erro);

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

    const handleIrParaPaginaInicial = () => {
        router.push('../');
    };

    return (
        <>
            <Header />
            <main className="pt-12 px-8 pb-16">
                <div className="max-w-xl mx-auto p-5 bg-white shadow-md rounded-lg">
                    <h1>Consultar Agendamento</h1>

                    <input
                        placeholder="CPF"
                        value={consultaCpf}
                        onChange={(e) => setConsultaCpf(maskCpf(e.target.value).slice(0, 14))}
                    />
                    <div className="flex justify-center">
                        <button onClick={handleConsultar} >Consultar</button>
                    </div>
                    {resultado && (
                        <div>
                            <p><strong>Nome:</strong> {resultado.nome}</p>
                            <p><strong>Data:</strong> {new Date(resultado.dataHora).toLocaleString()}</p>
                            <p><strong>Local da Doação:</strong> {resultado.hemocentroNome}</p>
                            <p><strong>Endereço:</strong> {resultado.hemocentroEndereco}</p>
                            <input type="datetime-local" value={novaData}
                                   onChange={(e) => setNovaData(e.target.value)} />
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
                                <button onClick={handleAlterarData}>Alterar Data</button>
                                <button onClick={handleCancelar}>Cancelar Agendamento</button>
                            </div>
                        </div>
                    )}

                    <hr className="my-6" />
                    <div className="text-left">
            <span
                onClick={handleIrParaPaginaInicial}
                className="text-red-600 hover:underline text-base cursor-pointer"
            >
              Voltar para tela inicial
            </span>
                    </div>
                    <ToastContainer position="top-right" autoClose={3000} />
                </div>
            </main>
        </>
    );
}
