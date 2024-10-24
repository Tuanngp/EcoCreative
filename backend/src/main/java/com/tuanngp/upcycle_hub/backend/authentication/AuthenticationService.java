package com.tuanngp.upcycle_hub.backend.authentication;

import com.tuanngp.upcycle_hub.backend.authentication.dto.LoginRequestDto;
import com.tuanngp.upcycle_hub.backend.authentication.dto.LoginResponseDto;
import com.tuanngp.upcycle_hub.backend.authentication.dto.RegisterRequestDto;
import com.tuanngp.upcycle_hub.backend.authentication.dto.RegisterResponseDto;
import com.tuanngp.upcycle_hub.common.entity.Account;
import com.tuanngp.upcycle_hub.common.entity.Role;
import com.tuanngp.upcycle_hub.common.repositories.AccountRepository;
import com.tuanngp.upcycle_hub.common.repositories.RoleRepository;
import com.tuanngp.upcycle_hub.common.utils.JwtTokenUtils;
import com.tuanngp.upcycle_hub.common.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthenticationService {
    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenUtils jwtTokenUtils;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AuthMapper authMapper;

    @Transactional
    public RegisterResponseDto register(RegisterRequestDto dto) {
        RegisterResponseDto response = new RegisterResponseDto();
        try {
            if (accountRepository.existsByUsername(dto.getUsername())) {
                ResponseUtils.setResponseDuplicate(response);
                return response;
            }

            Role role = roleRepository.findByName("ROLE_USER")
                    .orElseGet(() -> roleRepository.save(
                            Role.builder()
                            .name("ROLE_USER")
                            .description("This role is for normal user")
                            .build())
                    );

            Account account = createAccount(dto, role);
            accountRepository.save(account);

            response.setToken(jwtTokenUtils.generateToken(account));
            response.setUser(authMapper.toDto(account));
            ResponseUtils.setResponseSuccess(response);
        } catch (Exception e) {
            ResponseUtils.setResponseFail(response);
        }
        return response;
    }

    public LoginResponseDto login(LoginRequestDto dto) {
        LoginResponseDto response = new LoginResponseDto();
        try {
            Account account = accountRepository.findByUsername(dto.getUsername())
                    .filter(acc -> passwordEncoder.matches(dto.getPassword(), acc.getPassword()))
                    .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

            if (!account.isUseYn()) {
                ResponseUtils.setResponseBlocked(response);
                return response;
            }

            authenticateUser(dto, account);
            response.setToken(jwtTokenUtils.generateToken(account));
            response.setUser(authMapper.toDto(account));
            ResponseUtils.setResponseSuccess(response);
        } catch (Exception e) {
            ResponseUtils.setResponseFail(response);
        }
        return response;
    }

    private Account createAccount(RegisterRequestDto dto, Role role) {
        return Account.builder()
                .username(dto.getUsername())
                .password(passwordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .email(dto.getEmail())
                .role(role)
                .useYn(true)
                .deleteYn(false)
                .build();
    }

    private void authenticateUser(LoginRequestDto dto, Account account) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        dto.getUsername(),
                        dto.getPassword(),
                        account.getAuthorities());
        authenticationManager.authenticate(authenticationToken);
    }
}