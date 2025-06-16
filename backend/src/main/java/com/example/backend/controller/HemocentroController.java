package com.example.backend.controller;

import com.example.backend.domain.Hemocentro;
import com.example.backend.service.HemocentroService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/v1/hemocentros")
public class HemocentroController {

    private final HemocentroService service;

    public HemocentroController(HemocentroService service) {
        this.service = service;
    }

    @GetMapping("/listar")
    public List<Hemocentro> listarTodos() {
        return service.listarTodos();
    }
}
