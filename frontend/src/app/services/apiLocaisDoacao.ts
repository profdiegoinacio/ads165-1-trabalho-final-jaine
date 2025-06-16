import axios from "axios";

export interface Hemocentro {
    id: number;
    nome: string;
    endereco: string;
    bairro: string | null;
    cidade: string;
    cep: string;
    telefone: string;
    whatsapp: string | null;
    email: string;
    latitude: number;
    longitude: number;
}

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/hemocentros',
})

export const buscarLocalizacaoHemocentros = async () =>  {
    const response = await api.get('/listar');
    console.log("Hemocentros: "+response);
    return response.data;
}