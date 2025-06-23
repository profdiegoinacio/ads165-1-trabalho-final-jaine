package com.example.backend.dto.response;

import com.example.backend.domain.Admin;

public class AdminAuthDTO {
    private Long id;
    private String nome;
    private String email;

    public AdminAuthDTO(Admin admin) {
        this.id = admin.getId();
        this.nome = admin.getNome();
        this.email = admin.getEmail();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
