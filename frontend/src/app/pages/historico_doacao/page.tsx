// app/pages/historico_doacao/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AgendamentoResponseDTO } from '@/app/types/agendamento';
import { consultaHistoricoDoacao } from '@/app/services/apiUsuario'; // Certifique-se de que o caminho está correto
import { maskCpf } from '@/app/utils/masks';
import { isValidCpf } from '@/app/validator/validator';
import Header from '@/app/components/header/page';

export default function ConsultaDoacao() {
    const router = useRouter();

    const [consultaCpf, setConsultaCpf] = useState('');
    const [historicoDoacoes, setHistoricoDoacoes] = useState<AgendamentoResponseDTO[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userDataRaw = localStorage.getItem('userData');
        if (userDataRaw) {
            const userData = JSON.parse(userDataRaw);
            if (userData?.cpf) {
                setConsultaCpf(maskCpf(userData.cpf).slice(0, 14));
            }
        }
    }, []);

    const handleConsultar = async () => {
        const cpfFormatado = consultaCpf.replace(/\D/g, '');

        if (!isValidCpf(consultaCpf)) {
            toast.error('CPF inválido.');
            setHistoricoDoacoes(null);
            return;
        }

        setLoading(true);
        setHistoricoDoacoes(null);

        try {
            const res = await consultaHistoricoDoacao(cpfFormatado);
            setHistoricoDoacoes(res);
            if (res.length === 0) {
                toast.warn('Histórico de doações não encontrado para este CPF.');
            }
        } catch (error) {
            console.error('Erro ao consultar histórico:', error);
            toast.error('Ocorreu um erro ao buscar o histórico de doações.');
            setHistoricoDoacoes(null);
        } finally {
            setLoading(false);
        }
    };

    const handleIrParaPaginaInicial = () => {
        router.push('../');
    };

    const handleIrParaAgendamento = () => {
        router.push('/pages/agendar_doacao');
    };

    return (
        <>
            <Header />
            <main className="pt-12 px-8 pb-16">
                <div className="max-w-3xl mx-auto p-5 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-4 text-center">Consultar Histórico de Doações</h1>

                    <div className="mb-4">
                        <input
                            id="cpfInput"
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ex: 123.456.789-00"
                            value={consultaCpf}
                            onChange={(e) => setConsultaCpf(maskCpf(e.target.value).slice(0, 14))}
                            maxLength={14}
                        />
                    </div>

                    <div className="flex justify-center mb-6">
                        <button
                            onClick={handleConsultar}
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                        >
                            {loading ? 'Consultando...' : 'Consultar Histórico'}
                        </button>
                    </div>
                    {loading && <p className="text-center text-red-600">Buscando histórico...</p>}
                    {historicoDoacoes && historicoDoacoes.length > 0 && !loading && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-3">Resultados da Consulta</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                    <tr className="bg-gray-100 border-b">
                                        <th className="py-2 px-4 text-left text-gray-600 font-medium">Nome</th>
                                        <th className="py-2 px-4 text-left text-gray-600 font-medium">Data e Hora</th>
                                        <th className="py-2 px-4 text-left text-gray-600 font-medium">Telefone</th>
                                        <th className="py-2 px-4 text-left text-gray-600 font-medium">Email</th>
                                        <th className="py-2 px-4 text-left text-gray-600 font-medium">Hemocentro</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {historicoDoacoes.map((agendamento) => (
                                        <tr key={agendamento.id} className="border-b hover:bg-gray-50">
                                            <td className="py-2 px-4">{agendamento.nome}</td>
                                            <td className="py-2 px-4">{new Date(agendamento.dataHora).toLocaleString('pt-BR')}</td>
                                            <td className="py-2 px-4">{agendamento.telefone}</td>
                                            <td className="py-2 px-4">{agendamento.email}</td>
                                            <td className="py-2 px-4">{agendamento.hemocentroNome}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {historicoDoacoes && historicoDoacoes.length === 0 && !loading && (
                        <p className="text-center text-red-600 mt-4">
                            Nenhum histórico de doação encontrado para este CPF.
                        </p>
                    )}
                    <div className="flex justify-between items-center text-base">
                <span
                    onClick={handleIrParaPaginaInicial}
                    className="text-red-600 hover:underline cursor-pointer"
                >
                  Voltar para tela inicial
                </span>
                        <span
                            onClick={handleIrParaAgendamento}
                            className="text-red-600 hover:underline cursor-pointer"
                        >
                  Ir para agendamento
                </span>
                    </div>
                    <ToastContainer position="top-right" autoClose={3000} />
                </div>
            </main>
        </>
    );
}