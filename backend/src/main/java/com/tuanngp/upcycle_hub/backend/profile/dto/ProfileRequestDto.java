package com.tuanngp.upcycle_hub.backend.profile.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ProfileRequestDto {
    private String username;
    private String name;
    private String email;
    private String phone;
    private String address;
    private Date dateOfBirth;
    private String description;
    private String profileImage;
}
