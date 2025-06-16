package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class EnderecoDTO {
    @NotBlank
    public String rua;
    @NotBlank
    public String bairro;
    @NotBlank
    public String numero;
    @NotBlank
    public String cep;
    @NotBlank
    public String cidade;
    @NotBlank
    public String estado;
    public String complemento;
}
