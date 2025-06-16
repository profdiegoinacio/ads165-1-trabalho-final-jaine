package com.example.backend.controller;

import com.example.backend.domain.Usuario;
import com.example.backend.dto.AuthDTO;
import com.example.backend.dto.request.LoginRequest;
import com.example.backend.service.AuthService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthDTO> login(@RequestBody LoginRequest loginRequest) {
        Usuario usuario = authService.login(loginRequest);
        return ResponseEntity.ok(new AuthDTO(usuario));
    }
}
