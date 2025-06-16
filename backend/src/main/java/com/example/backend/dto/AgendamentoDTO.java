package com.example.backend.dto;

import java.time.LocalDateTime;

public class AgendamentoDTO {
    private String nome;
    private String cpf;
    private String telefone;
    private String email;
    private LocalDateTime dataHora;
    private Long hemocentroId;

    // Getters e Setters

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public Long getHemocentroId() {
        return hemocentroId;
    }

    public void setHemocentroId(Long hemocentroId) {
        this.hemocentroId = hemocentroId;
    }
}
