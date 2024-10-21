package com.tuanngp.upcycle_hub.backend.authentication.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String username;
    private String password;
}
