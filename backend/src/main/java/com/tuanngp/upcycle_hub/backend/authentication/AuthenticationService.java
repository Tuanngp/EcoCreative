package com.tuanngp.upcycle_hub.backend.authentication;

import com.tuanngp.upcycle_hub.backend.authentication.dto.LoginRequestDto;
import com.tuanngp.upcycle_hub.backend.authentication.dto.LoginResponseDto;
import com.tuanngp.upcycle_hub.backend.authentication.dto.RegisterRequestDto;
import com.tuanngp.upcycle_hub.backend.authentication.dto.RegisterResponseDto;
import com.tuanngp.upcycle_hub.backend.entity.Account;
import com.tuanngp.upcycle_hub.backend.entity.Role;
import com.tuanngp.upcycle_hub.backend.common.enums.ResponseCode;
import com.tuanngp.upcycle_hub.backend.repositories.AccountRepository;
import com.tuanngp.upcycle_hub.backend.repositories.RoleRepository;
import com.tuanngp.upcycle_hub.backend.common.service.BaseService;
import com.tuanngp.upcycle_hub.backend.common.utils.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AuthenticationService extends BaseService {
    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenUtils jwtTokenUtils;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public RegisterResponseDto register(RegisterRequestDto dto) {
        try {
            RegisterResponseDto response = new RegisterResponseDto();

            if (accountRepository.existsByUsername(dto.getUsername())) {
                return setResponse(response, ResponseCode.DUPLICATE);
            }


            Role role = roleRepository.findById(dto.getRoleId())
                    .orElseGet(() -> {
                        Role newRole = new Role();
                        newRole.setName("ROLE_USER");
                        newRole.setDescription("User");
                        return roleRepository.save(newRole);
                    });
            Account account = Account.builder()
                    .username(dto.getUsername())
                    .password(passwordEncoder.encode(dto.getPassword()))
                    .fullName(dto.getFullName())
                    .email(dto.getEmail())
                    .phone(dto.getPhoneNumber())
                    .address(dto.getAddress())
                    .dateOfBirth(dto.getDateOfBirth())
                    .role(role)
                    .useYn(true)
                    .build();

            accountRepository.save(account);
            response.setAccount(account);
            return setResponse(response, ResponseCode.SUCCESS);
        } catch (Exception e) {
            return setResponse(new RegisterResponseDto(), ResponseCode.FAIL);
        }
    }

    public LoginResponseDto login(LoginRequestDto dto) throws Exception {
        try {
            LoginResponseDto response = new LoginResponseDto();
            Optional<Account> accountOptional = accountRepository.findByUsername(dto.getUsername());
            if (accountOptional.isEmpty() || !passwordEncoder.matches(dto.getPassword(), accountOptional.get().getPassword())) {
                response.setResultCode(ResponseCode.AUTH_FAIL.getResultCode());
                response.setStatusMessage(ResponseCode.AUTH_FAIL.getResultMessage());
                return response;
            }
            Account account = accountOptional.get();
            if (!account.isUseYn()) {
                return setResponse(response, ResponseCode.AUTH_FAIL);
            }
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            dto.getUsername(),
                            dto.getPassword(),
                            account.getAuthorities());
            authenticationManager.authenticate(authenticationToken);
            response.setToken(jwtTokenUtils.generateToken(account));
            return setResponse(response, ResponseCode.SUCCESS);
        } catch (Exception e) {
            return setResponse(new LoginResponseDto(), ResponseCode.FAIL);
        }
    }
}
