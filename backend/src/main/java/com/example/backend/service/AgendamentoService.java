package com.example.backend.service;

import com.example.backend.domain.Agendamento;
import com.example.backend.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository repository;

    public Optional<Agendamento> consultarPorCpf(String cpf) {
        return repository.findByCpf(cpf);
    }

    public Agendamento agendar(Agendamento agendamento) {
        return repository.save(agendamento);
    }

    public Optional<Agendamento> alterarData(String cpf, LocalDateTime novaDataHora) {
        Optional<Agendamento> agendamentoOpt = repository.findByCpf(cpf);
        if (agendamentoOpt.isPresent()) {
            Agendamento agendamento = agendamentoOpt.get();
            agendamento.setDataHora(novaDataHora);
            return Optional.of(repository.save(agendamento));
        }
        return Optional.empty();
    }

    @Transactional
    public boolean cancelar(String cpf) {
        Optional<Agendamento> agendamentoOpt = repository.findByCpf(cpf);
        if (agendamentoOpt.isPresent()) {
            repository.delete(agendamentoOpt.get());
            return true;
        }
        return false;
    }

}
