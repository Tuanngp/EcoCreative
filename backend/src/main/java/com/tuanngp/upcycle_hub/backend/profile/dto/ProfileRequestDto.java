package com.tuanngp.upcycle_hub.backend.profile.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

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
}
