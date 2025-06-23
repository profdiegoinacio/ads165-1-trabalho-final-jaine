package com.example.backend.controller;

import com.example.backend.domain.Admin;
import com.example.backend.dto.response.AdminAuthDTO;
import com.example.backend.service.AdminService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping(value = "/cadastrar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AdminAuthDTO> cadastrar(@RequestBody Admin admin) {
        Admin novoAdmin = adminService.cadastrar(admin);
        return ResponseEntity.ok(new AdminAuthDTO(novoAdmin));
    }
}
