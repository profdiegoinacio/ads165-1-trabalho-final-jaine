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