package com.example.backend.service;

import com.example.backend.domain.Admin;
import com.example.backend.dto.request.AdminLoginRequest;
import com.example.backend.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminAuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminAuthService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Admin login(AdminLoginRequest request) {
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("E-mail não encontrado"));

        if (!passwordEncoder.matches(request.getSenha(), admin.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }

        return admin;
    }
}
