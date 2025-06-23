'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginAdmin } from '@/app/services/apiAuthAdmin'

export default function LoginAdminPage() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (!email || !senha) {
            toast.error('Preencha todos os campos.')
            setLoading(false)
            return
        }

        try {
            const response = await loginAdmin(email, senha)
            const adminData = response.data
            localStorage.setItem('adminData', JSON.stringify(adminData))
            router.push('/pages/painel_admin')
        } catch (error) {
            console.error(error)
            toast.error('Email ou senha inválidos.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login Admin</h2>

                <label className="block mb-2">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 p-2 mb-4 rounded"
                    placeholder="email@exemplo.com"
                />

                <label className="block mb-2">Senha:</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full border border-gray-300 p-2 mb-4 rounded"
                    maxLength={50}
                />

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-800 flex items-center justify-center"
                    disabled={loading}
                >
                    {loading && (
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
                    )}
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}
