package com.example.backend.controller;

import com.example.backend.domain.Agendamento;
import com.example.backend.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService service;

    @GetMapping("/{cpf}")
    public ResponseEntity<Agendamento> consultarPorCpf(@PathVariable String cpf) {
        return service.consultarPorCpf(cpf)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Agendamento agendar(@RequestBody Agendamento agendamento) {
        return service.agendar(agendamento);
    }

    @PutMapping("/{cpf}")
    public ResponseEntity<Agendamento> alterarData(@PathVariable String cpf, @RequestBody LocalDateTime novaDataHora) {
        return service.alterarData(cpf, novaDataHora)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> cancelar(@PathVariable String cpf) {
        if (service.cancelar(cpf)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

