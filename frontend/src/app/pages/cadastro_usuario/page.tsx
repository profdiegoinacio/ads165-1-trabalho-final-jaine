// app/pages/cadastro_usuario/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cadastrarUsuario } from '@/app/services/apiUsuario'
import { loginUsuario } from '@/app/services/apiAuth'
import { ToastContainer, toast } from 'react-toastify'
import { maskCep, maskCpf, maskNome, maskTelefone } from '@/app/utils/masks'
import { isValidIdade } from '@/app/validator/validator'
import { estadosBrasileiros, tiposSanguineos } from '@/app/utils/constants'

export default function CadastroPage() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        rua: '',
        bairro: '',
        numero: '',
        cep: '',
        cidade: '',
        estado: '',
        complemento: '',
        telefone: '',
        email: '',
        tipoSanguineo: '',
        senha: '',
        confirmarSenha: '',
    })
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'cpf') {
            setFormData(prev => ({ ...prev, [name]: maskCpf(value) }));
        } else if (name === 'telefone') {
            setFormData(prev => ({ ...prev, [name]: maskTelefone(value) }));
        } else if (name === 'nome') {
            setFormData(prev => ({ ...prev, [name]: maskNome(value) }));
        } else if (name === 'cep') {
            setFormData(prev => ({ ...prev, [name]: maskCep(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.senha !== formData.confirmarSenha) {
            toast.error('As senhas não coincidem!')
            return
        }
        if (!formData.nome.trim()) {
            toast.error('O campo Nome é obrigatório.');
            return;
        }
        if (!formData.cpf.trim()) {
            toast.error('O campo CPF é obrigatório.');
            return;
        }
        if (!isValidIdade(formData.dataNascimento)) {
            return toast.error('Você precisa ter pelo menos 18 anos para se cadastrar.');
        }
        if (!formData.cep.trim()) {
            toast.error('O campo CEP é obrigatório.');
            return;
        }
        if (!formData.email.trim()) {
            toast.error('O campo E-mail é obrigatório.');
            return;
        }

        const unmaskedCpf = formData.cpf.replace(/\D/g, '')
        const unmaskedTelefone = formData.telefone.replace(/\D/g, '')
        const unmaskedCep = formData.cep.replace(/\D/g, '')

        const camposObrigatorios = ['nome', 'cpf', 'cep', 'email', 'tipoSanguineo'];
        for (const campo of camposObrigatorios) {
            if (!formData[campo as keyof typeof formData].trim()) {
                return toast.error(`O campo ${campo} é obrigatório.`);
            }
        }

        const usuario = {
            nome: formData.nome,
            cpf: unmaskedCpf,
            dataNascimento: formData.dataNascimento,
            telefone: unmaskedTelefone,
            email: formData.email,
            senha: formData.senha,
            tipoSanguineo: formData.tipoSanguineo,
            endereco: {
                rua: formData.rua,
                bairro: formData.bairro,
                numero: formData.numero,
                cep: unmaskedCep,
                cidade: formData.cidade,
                estado: formData.estado,
                complemento: formData.complemento,
            },
        }

        try {
            await cadastrarUsuario(usuario)
            const response = await loginUsuario(unmaskedCpf, formData.senha)
            const userData = response.data
            localStorage.setItem('userCpf', userData.cpf)
            localStorage.setItem('userData', JSON.stringify(userData))
            router.push('/pages/agendar_doacao')
        } catch (error: any) {
            console.error(error)
            toast.error('Erro ao cadastrar usuário.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Usuário</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="nome" placeholder="Nome completo" onChange={handleChange}
                           value={formData.nome} className="p-2 border rounded" maxLength={60} required />
                    <input name="cpf" placeholder="CPF" onChange={handleChange} value={formData.cpf}
                           className="p-2 border rounded" maxLength={14} required />
                    <input type="date" name="dataNascimento" placeholder="Data de Nascimento"
                           onChange={handleChange} value={formData.dataNascimento} className="p-2 border rounded" required />
                    <input name="telefone" placeholder="Celular: (XX) XXXXX-XXXX" onChange={handleChange}
                           value={formData.telefone} className="p-2 border rounded" maxLength={15} required />
                    <input type="email" name="email" placeholder="E-mail" onChange={handleChange}
                           value={formData.email} className="p-2 border rounded" maxLength={60} required />
                    <select name="tipoSanguineo" onChange={handleChange} value={formData.tipoSanguineo} className="p-2 border rounded" required>
                        <option value="">Tipo Sanguíneo</option>
                        {tiposSanguineos.map(tipo => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                    </select>
                    <input name="cep" placeholder="CEP" onChange={handleChange} value={formData.cep}
                           className="p-2 border rounded" maxLength={9} required />
                    <input name="rua" placeholder="Rua" onChange={handleChange}
                           value={formData.rua} className="p-2 border rounded" required />
                    <input name="bairro" placeholder="Bairro" maxLength={60} onChange={handleChange}
                           value={formData.bairro} className="p-2 border rounded" required />
                    <input name="numero" placeholder="Número" maxLength={8} onChange={handleChange}
                           value={formData.numero} className="p-2 border rounded" required />
                    <input name="complemento" placeholder="Complemento" maxLength={60} onChange={handleChange}
                           value={formData.complemento} className="p-2 border rounded" />
                    <input name="cidade" placeholder="Cidade" maxLength={50} onChange={handleChange}
                           value={formData.cidade} className="p-2 border rounded" required />
                    <select name="estado" onChange={handleChange} value={formData.estado} className="p-2 border rounded" required>
                        <option value="">Selecione o estado</option>
                        {estadosBrasileiros.map(uf => (<option key={uf} value={uf}>{uf}</option>))}
                    </select>
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="password" name="senha" placeholder="Senha" maxLength={20} onChange={handleChange}
                               value={formData.senha} className="p-2 border rounded" required />
                        <input type="password" name="confirmarSenha" maxLength={20} placeholder="Confirmar Senha"
                               onChange={handleChange} value={formData.confirmarSenha} className="p-2 border rounded" required />
                    </div>
                </div>
                <button type="submit" className="mt-6 w-full bg-red-600 text-white p-2 rounded hover:bg-red-800">
                    Cadastrar
                </button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}
