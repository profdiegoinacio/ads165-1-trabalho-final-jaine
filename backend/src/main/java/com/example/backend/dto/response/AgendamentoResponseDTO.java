package com.example.backend.dto.response;

import java.time.LocalDateTime;

public class AgendamentoResponseDTO {
    private String nome;
    private String cpf;
    private String telefone;
    private String email;
    private LocalDateTime dataHora;
    private Long hemocentroId;
    private String hemocentroNome;
    private String hemocentroEndereco;

    // construtores, getters, setters
    public AgendamentoResponseDTO(String nome, String cpf, String telefone, String email,
                                  LocalDateTime dataHora, Long hemocentroId,
                                  String hemocentroNome, String hemocentroEndereco) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.dataHora = dataHora;
        this.hemocentroId = hemocentroId;
        this.hemocentroNome = hemocentroNome;
        this.hemocentroEndereco = hemocentroEndereco;
    }

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

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public String getHemocentroNome() {
        return hemocentroNome;
    }

    public String getHemocentroEndereco() {
        return hemocentroEndereco;
    }

    public Long getHemocentroId() {
        return hemocentroId;
    }
}