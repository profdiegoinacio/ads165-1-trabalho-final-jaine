"use client";

import Header from "@/app/components/header/page";
import SelectHemocentro from "@/app/components/select_hemocentros/page";
import { buscarProximosAgendamentos } from "@/app/services/apiDoacao";
import { buscarLocalizacaoHemocentros } from "@/app/services/apiLocaisDoacao";
import { alterarData, cancelar } from "@/app/services/apiDoacao";
import { AgendamentoDTO } from "@/app/types/agendamento";
import { Hemocentro } from "@/app/types/hemocentro";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PainelAdmin() {
    const [hemocentros, setHemocentros] = useState<Hemocentro[]>([]);
    const [hemocentroSelecionado, setHemocentroSelecionado] = useState<Hemocentro | null>(null);
    const [agendamentos, setAgendamentos] = useState<AgendamentoDTO[]>([]);
    const [agendamentoSelecionadoId, setAgendamentoSelecionadoId] = useState<number | null>(null);
    const [novaDataAgendamento, setNovaDataAgendamento] = useState<{ [id: number]: string }>({});


    useEffect(() => {
        const carregarHemocentros = async () => {
            try {
                const lista = await buscarLocalizacaoHemocentros();
                setHemocentros(lista);
            } catch (error) {
                toast.error('Erro ao carregar hemocentros');
            }
        };

        carregarHemocentros();
    }, []);

    useEffect(() => {
        if (hemocentroSelecionado) {
            const carregarAgendamentos = async () => {
                try {
                    const lista = await buscarProximosAgendamentos(hemocentroSelecionado.id);
                    setAgendamentos(lista);
                } catch (error) {
                    toast.error('Erro ao buscar agendamentos');
                }
            };

            carregarAgendamentos();
        } else {
            setAgendamentos([]);
        }
    }, [hemocentroSelecionado]);

    const handleAlterar = async (id: number, cpf: string) => {
        const novaData = novaDataAgendamento[id];

        if (!novaData) {
            toast.error("Informe uma nova data e hora.");
            return;
        }

        try {
            await alterarData(cpf, novaData);
            toast.success("Data alterada com sucesso!");
            setAgendamentoSelecionadoId(null);

            setNovaDataAgendamento((prev) => {
                const novo = { ...prev };
                delete novo[id];
                return novo;
            });

            if (hemocentroSelecionado) {
                const lista = await buscarProximosAgendamentos(hemocentroSelecionado.id);
                setAgendamentos(lista);
            }
        } catch {
            toast.error("Erro ao alterar data.");
        }
    };


    const handleCancelar = async (id: number, cpf: string) => {
        const confirmar = confirm('Tem certeza que deseja cancelar este agendamento?');
        if (!confirmar) return;

        try {
            await cancelar(cpf);
            toast.success("Agendamento cancelado com sucesso!");

            if (hemocentroSelecionado) {
                const lista = await buscarProximosAgendamentos(hemocentroSelecionado.id);
                setAgendamentos(lista);
            }
        } catch {
            toast.error("Erro ao cancelar agendamento.");
        }
    };



    return (
        <>
            <Header />
            <main className="pt-12 px-8 pb-16">
                <div className="max-w-5xl mx-auto p-5 bg-white shadow-md rounded-lg">
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Agendamentos por Hemocentro</h1>

                    <SelectHemocentro
                        hemocentros={hemocentros}
                        valorSelecionado={hemocentroSelecionado}
                        onSelecionar={(h) => setHemocentroSelecionado(h)}
                    />

                    {hemocentroSelecionado && (
                        <>
                            <h2 className="text-center" style={{ marginTop: '2rem' }}>Agendamentos para: <strong>{hemocentroSelecionado.nome}</strong></h2>
                            <div className="mt-6 overflow-x-auto">
                                {agendamentos.length === 0 ? (
                                    <p className="text-gray-600">Nenhum agendamento encontrado.</p>
                                ) : (
                                    <table className="min-w-full divide-y divide-gray-200 shadow-sm border rounded-lg">
                                        <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nome</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Data/Hora</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ações</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-100">
                                        {agendamentos
                                            .sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime())
                                            .map((ag) => {
                                                const isEditando = agendamentoSelecionadoId === ag.id;
                                                console.log(`Renderizando ID: ${ag.id} — isEditando: ${isEditando}`);
                                                return (
                                                    <tr key={ag.id}>
                                                        <td className="px-4 py-2 text-sm text-gray-800">{ag.nome}</td>
                                                        <td className="px-4 py-2 text-sm text-gray-800">
                                                            {isEditando ? (
                                                                <input
                                                                    type="datetime-local"
                                                                    value={novaDataAgendamento[ag.id] || ''}
                                                                    onChange={(e) =>
                                                                        setNovaDataAgendamento((prev) => ({
                                                                            ...prev,
                                                                            [ag.id]: e.target.value,
                                                                        }))
                                                                    }
                                                                    className="border p-1 rounded text-sm"
                                                                />
                                                            ) : (
                                                                new Date(ag.dataHora).toLocaleString('pt-BR', {
                                                                    dateStyle: 'short',
                                                                    timeStyle: 'short',
                                                                })
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-sm text-gray-800">{ag.email}</td>
                                                        <td className="px-4 py-2 text-sm">
                                                            {isEditando ? (
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        className="text-white hover:underline"
                                                                        onClick={() => handleAlterar(ag.id, ag.cpf)}
                                                                    >
                                                                        Confirmar
                                                                    </button>
                                                                    <button
                                                                        className="text-white hover:underline"
                                                                        onClick={() => {
                                                                            setAgendamentoSelecionadoId(null);
                                                                            setNovaDataAgendamento((prev) => {
                                                                                const novo = { ...prev };
                                                                                delete novo[ag.id];
                                                                                return novo;
                                                                            });
                                                                        }}
                                                                    >
                                                                        Cancelar
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        className="text-white hover:underline mr-4"
                                                                        onClick={() => setAgendamentoSelecionadoId(ag.id)}
                                                                    >
                                                                        Alterar
                                                                    </button>
                                                                    <button
                                                                        className="text-white hover:underline"
                                                                        onClick={() => handleCancelar(ag.id, ag.cpf)}
                                                                    >
                                                                        Cancelar
                                                                    </button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </>
    )
}