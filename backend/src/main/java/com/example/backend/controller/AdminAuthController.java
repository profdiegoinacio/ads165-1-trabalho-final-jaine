package com.example.backend.controller;

import com.example.backend.domain.Admin;
import com.example.backend.dto.request.AdminLoginRequest;
import com.example.backend.dto.response.AdminAuthDTO;
import com.example.backend.service.AdminAuthService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/auth")
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    public AdminAuthController(AdminAuthService adminAuthService) {
        this.adminAuthService = adminAuthService;
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AdminAuthDTO> login(@RequestBody AdminLoginRequest loginRequest) {
        Admin admin = adminAuthService.login(loginRequest);
        return ResponseEntity.ok(new AdminAuthDTO(admin));
    }
}

