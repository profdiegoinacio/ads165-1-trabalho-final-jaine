package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class UsuarioDTO {
    @NotBlank
    public String nome;
    @NotBlank
    public String cpf;
    @NotBlank
    public String dataNascimento;
    @NotBlank
    public String senha;
    @NotBlank
    public String telefone;
    @NotBlank
    public String email;
    @NotBlank
    public String tipoSanguineo;
    public EnderecoDTO endereco;
}
