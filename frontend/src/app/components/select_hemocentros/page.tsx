// components/SelectHemocentro.tsx

import React from 'react';
import { Hemocentro } from '@/app/types/hemocentro';

interface Props {
    hemocentros: Hemocentro[];
    valorSelecionado: Hemocentro | null;
    onSelecionar: (hemocentro: Hemocentro | null) => void;
    placeholder?: string;
}

export default function SelectHemocentro({
                                             hemocentros,
                                             valorSelecionado,
                                             onSelecionar,
                                             placeholder = 'Local da Doação'
                                         }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const idSelecionado = parseInt(e.target.value);
        const hemocentro = hemocentros.find(h => h.id === idSelecionado) || null;
        onSelecionar(hemocentro);
    };

    return (
        <select
            name="hemocentro"
            value={valorSelecionado?.id ?? ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mb-4 text-base min-h-[48px]"
        >
            <option value="">{placeholder}</option>
            {hemocentros.map(h => (
                <option key={h.id} value={h.id}>
                    {h.nome} - {h.endereco}, {h.cidade}
                </option>
            ))}
        </select>
    );
}
