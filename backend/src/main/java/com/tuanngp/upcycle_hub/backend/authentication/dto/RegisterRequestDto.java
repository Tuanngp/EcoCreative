package com.tuanngp.upcycle_hub.backend.authentication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.Date;

@Data
public class RegisterRequestDto {
//    @NotBlank(message = "Username cannot be blank")
    private String username;

//    @NotBlank(message = "Password cannot be blank")
    private String password;

    private String fullName;

//    @NotBlank(message = "Phone number is required")
//    @Pattern(regexp = "^(\\+84|0)\\d{9,10}$", message = "Phone number is invalid")
    private String phoneNumber;

//    @Email(message = "Email is invalid")
    private String email;

    private String address;

    private Date dateOfBirth;

//    @NotNull(message = "Role ID is required")
//    @JsonProperty("roleId")
    private Long roleId;
}
