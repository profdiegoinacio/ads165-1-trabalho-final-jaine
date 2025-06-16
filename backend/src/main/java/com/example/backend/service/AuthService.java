package com.example.backend.service;

import com.example.backend.domain.Usuario;
import com.example.backend.dto.request.LoginRequest;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByCpf(request.getCpf())
                .orElseThrow(() -> new RuntimeException("CPF não encontrado"));

        if (!passwordEncoder.matches(request.getSenha(), usuario.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }
        return usuario;
    }
}

