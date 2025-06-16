'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hemocentro } from '@/app/services/apiLocaisDoacao';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { buscarLocalizacaoHemocentros } from '@/app/services/apiLocaisDoacao';
import Header from '@/app/components/header/page';

export default function LocaisDoacao() {
    const router = useRouter();

    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const [hemocentros, setHemocentros] = useState<Hemocentro[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        buscarLocalizacaoHemocentros()
            .then(data => {
                setHemocentros(data);
            })
            .catch(console.error);
    }, [isClient]);

    useEffect(() => {
        if (!isClient || map.current || hemocentros.length === 0) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current!,
            style: `https://api.maptiler.com/maps/streets/style.json?key=UqEwfsTQa3vQWYpGcaHg`,
            center: [-52.4, -28.3],
            zoom: 6,
            pitch: 45,
            bearing: -17.6,
        });
        hemocentros.forEach(h => {
            if (h.latitude && h.longitude) {
                new maplibregl.Marker()
                    .setLngLat([h.longitude, h.latitude])
                    .setPopup(new maplibregl.Popup().setHTML(`<strong>${h.nome}</strong><br>${h.endereco}, ${h.cidade}`))
                    .addTo(map.current!);
            }
        });
    }, [isClient, hemocentros]);

    const handleIrParaPaginaInicial = () => {
        router.push('../');
    };

    const handleIrParaAgendamento = () => {
        router.push('/pages/agendar_doacao');
    };

    return (
        <>
            <Header />
            <main className="px-8 pb-16">
                <div className="min-h-screen p-8 bg-gray-100">
                    <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">Locais de Doação</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="h-[500px] overflow-y-auto pr-2">
                            {hemocentros.map(h => (
                                <div key={h.id} className="bg-white shadow rounded p-3 mb-3">
                                    <h2 className="text-lg font-semibold text-red-600">{h.nome}</h2>
                                    <p className="text-sm">{h.endereco}, {h.bairro && `${h.bairro}, `}{h.cidade} - CEP: {h.cep}</p>
                                    <p className="text-sm">Tel: {h.telefone}</p>
                                    {h.whatsapp && <p className="text-sm">WhatsApp: {h.whatsapp}</p>}
                                    <p className="text-sm">Email: {h.email}</p>
                                </div>
                            ))}
                        </div>

                        <div className="h-[500px] rounded shadow">
                            {isClient && <div ref={mapContainer} className="h-full w-full" />}
                        </div>
                    </div>
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
                </div>
            </main>
        </>
    );
}
