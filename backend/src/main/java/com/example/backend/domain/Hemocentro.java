package com.example.backend.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "hemocentros")
public class Hemocentro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String endereco;
    private String bairro;
    private String cidade;
    private String cep;
    private String telefone;
    private String whatsapp;
    private String email;
    private Double latitude;
    private Double longitude;


    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public String getBairro() {
        return bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public String getCep() {
        return cep;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public String getEmail() {
        return email;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }
}

