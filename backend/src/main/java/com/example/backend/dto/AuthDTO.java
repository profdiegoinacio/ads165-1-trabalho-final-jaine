package com.example.backend.dto;

import com.example.backend.domain.Usuario;

public class AuthDTO {
    private String nome;
    private String cpf;
    private String telefone;
    private String email;

    public AuthDTO(Usuario usuario) {
        this.nome = usuario.getNome();
        this.cpf = usuario.getCpf();
        this.telefone = usuario.getTelefone();
        this.email = usuario.getEmail();
    }

    // Getters e Setters

    public String getNome() {
        return nome;
    }

    public String getCpf() {
        return cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getEmail() {
        return email;
    }
}

