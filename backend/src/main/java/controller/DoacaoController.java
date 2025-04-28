package com.doeagende.controller;

import com.doeagende.model.Doacao;
import com.doeagende.service.DoacaoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doacoes")
public class DoacaoController {

    private final DoacaoService doacaoService;

    public DoacaoController(DoacaoService doacaoService) {
        this.doacaoService = doacaoService;
    }

    @PostMapping
    public Doacao agendar(@RequestBody Doacao doacao) {
        return doacaoService.salvar(doacao);
    }

    @GetMapping
    public List<Doacao> listarTodas() {
        return doacaoService.listarTodas();
    }
}
