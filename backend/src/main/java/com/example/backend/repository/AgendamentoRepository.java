package com.example.backend.repository;

import com.example.backend.domain.Agendamento;
import com.example.backend.dto.response.AgendamentoResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    @Query("SELECT a FROM Agendamento a JOIN FETCH a.hemocentro WHERE a.cpf = :cpf AND a.dataHora >= :agora")
    Optional<Agendamento> findByCpfComDataFutura(
            @Param("cpf") String cpf,
            @Param("agora") LocalDateTime agora);

    List<AgendamentoResponseDTO> findByCpfOrderByDataHoraDesc(String cpf);
}



