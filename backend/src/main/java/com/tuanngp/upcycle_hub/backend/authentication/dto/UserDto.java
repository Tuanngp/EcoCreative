package com.tuanngp.upcycle_hub.backend.authentication.dto;

import lombok.Data;

@Data
public class UserDto {
    private String username;
    private String name;
    private String email;
    private String phone;
}
