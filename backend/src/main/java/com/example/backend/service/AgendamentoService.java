package com.example.backend.service;

import com.example.backend.domain.Agendamento;
import com.example.backend.domain.Hemocentro;
import com.example.backend.dto.AgendamentoDTO;
import com.example.backend.dto.response.AgendamentoResponseDTO;
import com.example.backend.repository.AgendamentoRepository;
import com.example.backend.repository.HemocentroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private HemocentroRepository hemocentroRepository;

    private final LocalDateTime agora = LocalDateTime.now();

    public Optional<AgendamentoResponseDTO> consultarPorCpf(String cpf) {
        LocalDateTime agora = LocalDateTime.now();
        Optional<Agendamento> agendamentoOpt = agendamentoRepository.findByCpfComDataFutura(cpf, agora);

        return agendamentoOpt.map(agendamento -> {
            Hemocentro hemocentro = agendamento.getHemocentro();

            return new AgendamentoResponseDTO(
                    agendamento.getNome(),
                    agendamento.getCpf(),
                    agendamento.getTelefone(),
                    agendamento.getEmail(),
                    agendamento.getDataHora(),
                    hemocentro != null ? hemocentro.getId() : null,
                    hemocentro != null ? hemocentro.getNome() : null,
                    hemocentro != null ? hemocentro.getEndereco() : null
            );
        });
    }

    public Agendamento agendar(AgendamentoDTO dto) {
        Hemocentro hemocentro = hemocentroRepository.findById(dto.getHemocentroId())
                .orElseThrow(() -> new IllegalArgumentException("Hemocentro inválido"));

        Agendamento agendamento = new Agendamento();
        agendamento.setNome(dto.getNome());
        agendamento.setCpf(dto.getCpf());
        agendamento.setTelefone(dto.getTelefone());
        agendamento.setEmail(dto.getEmail());
        agendamento.setDataHora(dto.getDataHora());
        agendamento.setHemocentro(hemocentro);

        return agendamentoRepository.save(agendamento);
    }

    public Optional<Agendamento> alterarData(String cpf, LocalDateTime novaDataHora) {
        Optional<Agendamento> agendamentoOpt = agendamentoRepository.findByCpfComDataFutura(cpf, agora);
        if (agendamentoOpt.isPresent()) {
            Agendamento agendamento = agendamentoOpt.get();
            agendamento.setDataHora(novaDataHora);
            return Optional.of(agendamentoRepository.save(agendamento));
        }
        return Optional.empty();
    }

    @Transactional
    public boolean cancelar(String cpf) {
        Optional<Agendamento> agendamentoOpt = agendamentoRepository.findByCpfComDataFutura(cpf, agora);
        if (agendamentoOpt.isPresent()) {
            agendamentoRepository.delete(agendamentoOpt.get());
            return true;
        }
        return false;
    }

}
