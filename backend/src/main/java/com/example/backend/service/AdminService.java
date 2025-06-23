package com.example.backend.service;

import com.example.backend.domain.Admin;
import com.example.backend.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Admin cadastrar(Admin admin) {
        admin.setSenha(passwordEncoder.encode(admin.getSenha()));
        return adminRepository.save(admin);
    }
}