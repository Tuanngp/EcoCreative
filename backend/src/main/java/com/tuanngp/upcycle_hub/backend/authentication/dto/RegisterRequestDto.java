package com.tuanngp.upcycle_hub.backend.authentication.dto;

import lombok.Data;

@Data
public class RegisterRequestDto {
    private String username;

    private String password;

    private String name;

    private String email;

    private Long roleId;
}
