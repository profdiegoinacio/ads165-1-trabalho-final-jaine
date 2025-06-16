package com.example.backend.service;

import com.example.backend.domain.Endereco;
import com.example.backend.domain.Usuario;
import com.example.backend.dto.UsuarioDTO;
import com.example.backend.dto.response.AgendamentoResponseDTO;
import com.example.backend.repository.AgendamentoRepository;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final AgendamentoRepository agendamentoRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, AgendamentoRepository agendamentoRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.agendamentoRepository = agendamentoRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public void cadastrarUsuario(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNome(dto.nome);
        usuario.setCpf(dto.cpf);
        usuario.setDataNascimento(dto.dataNascimento);
        usuario.setTelefone(dto.telefone);
        usuario.setEmail(dto.email);
        usuario.setTipoSanguineo(dto.tipoSanguineo);
        usuario.setSenha(passwordEncoder.encode(dto.senha));

        Endereco endereco = new Endereco();
        endereco.setRua(dto.endereco.rua);
        endereco.setBairro(dto.endereco.bairro);
        endereco.setNumero(dto.endereco.numero);
        endereco.setCep(dto.endereco.cep);
        endereco.setCidade(dto.endereco.cidade);
        endereco.setEstado(dto.endereco.estado);
        endereco.setComplemento(dto.endereco.complemento);

        usuario.setEndereco(endereco);

        usuarioRepository.save(usuario);
    }

    public List<AgendamentoResponseDTO> consultaHistoricoDoacao(String cpf) {
        return agendamentoRepository.findByCpfOrderByDataHoraDesc(cpf);
    }
}
