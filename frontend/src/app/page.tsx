"use client"
import { useRouter } from 'next/navigation';
import Header from './components/header/page';
import { useEffect, useState } from 'react';

export default function Apresentacao() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const verificarLoginERedirecionar = (rota: string) => {
    if (!isClient) return;
    const userCpf = localStorage.getItem('userCpf');
    if (!userCpf) {
      router.push('/pages/login_usuario');
    } else {
      router.push(rota);
    }
  };

  return (
      <>
        <Header />
        <main className="pt-24 px-8 pb-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="max-w-3xl mx-auto p-4 text-center">
              <h1 className="text-4xl font-bold text-red-700 mb-8">Sobre a Doação de Sangue</h1>

              <p className="text-lg leading-relaxed mb-12 text-center">
                A doação de sangue é um ato de solidariedade e cidadania, que tem importância vital para a saúde pública.
                A doação de sangue é 100% voluntária e beneficia qualquer pessoa. O sangue é essencial para os atendimentos
                de sangramentos agudos em casos de urgências e emergências, realização de cirurgias de grande porte e tratamentos
                de doenças crônicas que frequentemente demandam transfusões sanguíneas; e também na produção de medicamentos
                essenciais derivados do plasma.
              </p>

              <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 w-full">
                <button
                    className="flex-1 min-w-[150px] px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => verificarLoginERedirecionar('/pages/agendar_doacao')}
                >
                  Agendar <br /> Doação
                </button>

                <button
                    className="flex-1 min-w-[150px] px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => verificarLoginERedirecionar('/pages/consulta_doacao')}
                >
                  Consultar Agendamentos
                </button>

                <button
                    className="flex-1 min-w-[150px] px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => verificarLoginERedirecionar('/pages/historico_doacao')}
                >
                  Histórico de Doações
                </button>

                <button
                    className="flex-1 min-w-[150px] px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => router.push('/pages/locais_doacao')}
                >
                  Locais <br /> Próximos
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
  );
}
