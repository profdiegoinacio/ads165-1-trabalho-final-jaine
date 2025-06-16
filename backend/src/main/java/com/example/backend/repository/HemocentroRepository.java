package com.example.backend.repository;

import com.example.backend.domain.Hemocentro;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HemocentroRepository extends JpaRepository<Hemocentro, Long> {
    List<Hemocentro> findByCidadeIgnoreCase(String cidade);
}

