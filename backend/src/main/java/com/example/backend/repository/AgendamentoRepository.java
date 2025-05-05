package com.example.backend.repository;

import com.example.backend.domain.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    Optional<Agendamento> findByCpf(String cpf);
    void deleteByCpf(String cpf);
}
