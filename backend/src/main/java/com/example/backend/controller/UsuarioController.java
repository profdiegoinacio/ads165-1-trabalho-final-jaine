package com.example.backend.controller;

import com.example.backend.domain.Agendamento;
import com.example.backend.dto.UsuarioDTO;
import com.example.backend.dto.response.AgendamentoResponseDTO;
import com.example.backend.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@Valid @RequestBody UsuarioDTO dto) {
        usuarioService.cadastrarUsuario(dto);
        return ResponseEntity.ok("Usuário cadastrado com sucesso.");
    }

    @GetMapping("/historico/{cpf}")
    public ResponseEntity<List<AgendamentoResponseDTO>> consultaHistoricoDoacao(@PathVariable String cpf) {
        List<AgendamentoResponseDTO> historico = usuarioService.consultaHistoricoDoacao(cpf);
        if (historico.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(historico);
        }
    }
}
