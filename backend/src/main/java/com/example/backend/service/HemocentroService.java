package com.example.backend.service;

import com.example.backend.domain.Hemocentro;
import com.example.backend.repository.HemocentroRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HemocentroService {

    private final HemocentroRepository repository;

    public HemocentroService(HemocentroRepository repository) {
        this.repository = repository;
    }

    public List<Hemocentro> listarTodos() {
        return repository.findAll();
    }
}

