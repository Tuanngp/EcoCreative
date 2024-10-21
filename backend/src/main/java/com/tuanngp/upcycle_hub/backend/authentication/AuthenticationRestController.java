package com.tuanngp.upcycle_hub.backend.authentication;

import com.tuanngp.upcycle_hub.backend.authentication.dto.LoginRequestDto;
import com.tuanngp.upcycle_hub.backend.authentication.dto.LoginResponseDto;
import com.tuanngp.upcycle_hub.backend.authentication.dto.RegisterRequestDto;
import com.tuanngp.upcycle_hub.backend.authentication.dto.RegisterResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/auth")
public class AuthenticationRestController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(
            @Valid @RequestBody RegisterRequestDto dto
    ) {
        return ResponseEntity.ok(authenticationService.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(
            @Valid @RequestBody LoginRequestDto dto
    ) throws Exception {
        return ResponseEntity.ok(authenticationService.login(dto));
    }
}
