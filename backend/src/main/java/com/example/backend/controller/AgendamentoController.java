package com.example.backend.controller;

import com.example.backend.domain.Agendamento;
import com.example.backend.dto.AgendamentoDTO;
import com.example.backend.dto.response.AgendamentoResponseDTO;
import com.example.backend.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping("/{cpf}")
    public ResponseEntity<AgendamentoResponseDTO> consultarPorCpf(@PathVariable String cpf) {
        return agendamentoService.consultarPorCpf(cpf)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> agendar(@RequestBody AgendamentoDTO dto) {
        try {
            Agendamento agendado = agendamentoService.agendar(dto);
            return ResponseEntity.ok(agendado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{cpf}")
    public ResponseEntity<Agendamento> alterarData(@PathVariable String cpf, @RequestBody LocalDateTime novaDataHora) {
        return agendamentoService.alterarData(cpf, novaDataHora)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> cancelar(@PathVariable String cpf) {
        if (agendamentoService.cancelar(cpf)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

