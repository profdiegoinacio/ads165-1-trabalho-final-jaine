// app/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { loginUsuario } from '@/app/services/apiAuth'
import Link from 'next/link'
import { isValidCpf } from '@/app/validator/validator'
import { maskCpf } from '@/app/utils/masks'
import { ToastContainer, toast } from 'react-toastify';

export default function LoginPage() {
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // Função para lidar com a mudança no input do CPF e aplicar a máscara
    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedValue = maskCpf(e.target.value)
        setCpf(maskedValue)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Validar CPF
        cpf.replace(/\D/g, '');
        if (!isValidCpf(cpf)) {
            toast.error('Por favor, insira um CPF válido no formato 000.000.000-00')
            setLoading(false)
            return
        }

        try {
            const response = await loginUsuario(cpf.replace(/\D/g, ''), senha)
            const userData = response.data

            localStorage.setItem('userCpf', userData.cpf)
            localStorage.setItem('userData', JSON.stringify(userData))

            router.push('/pages/agendar_doacao')
        } catch (error) {
            console.error(error)
            toast.error('CPF ou senha inválidos. Por favor, tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <label className="block mb-2">CPF:</label>
                <input
                    type="text"
                    value={cpf}
                    onChange={handleCpfChange}
                    className="w-full border border-gray-300 p-2 mb-4 rounded"
                    placeholder="000.000.000-00"
                    maxLength={14}
                />

                <label className="block mb-2">Senha:</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full border border-gray-300 p-2 mb-4 rounded"
                    maxLength={20}
                />

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-800 flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? (
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : null}
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <Link href="/pages/cadastro_usuario" className="text-red-600 hover:underline">
                        Cadastre-se aqui
                    </Link>
                </p>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}