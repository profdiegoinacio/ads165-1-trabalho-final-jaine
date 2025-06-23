// app/pages/header/page.tsx

"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [userName, setUserName] = useState('');
    const router = useRouter();

    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                setUserName(userData.nome || '');
            } catch {
                localStorage.removeItem('userData');
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('userCpf');
        setUserName('');
        router.push('/');
    };

    const handleLogin = () => {
        router.push('../pages/login_usuario');
    };

    return (
        <header className="w-full bg-red-700 text-white py-4 px-8 flex items-center justify-between shadow">
            <div className="text-xl font-bold w-full text-center">Doação de Sangue</div>

            <div className="absolute right-8">
                {userName ? (
                    <div className="flex items-center gap-2">
                        <span>Olá, {userName.split(' ')[0]}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-white text-red-700 px-3 py-1 rounded hover:bg-gray-200 transition"
                        >
                            Sair
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="bg-white text-red-700 px-3 py-1 rounded hover:bg-gray-200 transition"
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
}
