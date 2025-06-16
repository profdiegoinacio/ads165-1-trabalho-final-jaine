// components/modal_criterios_doacao/page.tsx

import React from 'react';

interface ModalProps {
    onFechar: () => void;
    onRecusar: () => void;
}

const ModalCritériosDoacao: React.FC<ModalProps> = ({ onFechar, onRecusar }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center color-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Critérios básicos para doação</h2>
                <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Ter idade entre 16 e 69 anos (menores de 18 anos devem apresentar consentimento formal do responsável legal).</li>
                    <li>Pessoas com idade entre 60 e 69 anos só poderão doar sangue se já o tiverem feito antes dos 60 anos.</li>
                    <li>Apresentar documento de identificação com foto emitido por órgão oficial.</li>
                    <li>Pesar no mínimo 50 kg.</li>
                    <li>Ter dormido pelo menos 6 horas nas últimas 24 horas.</li>
                    <li>Estar alimentado. Evitar alimentos gordurosos nas 3 horas que antecedem a doação de sangue. Caso seja após o almoço, aguardar 2 horas.</li>
                </ul>
                <div className="flex justify-end mt-6 space-x-4">
                    <button
                        onClick={onRecusar}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                    >
                        Não quero doar nesse momento
                    </button>
                    <button
                        onClick={onFechar}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        Estou ciente, quero doar!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCritériosDoacao;
