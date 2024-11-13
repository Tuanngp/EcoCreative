package com.tuanngp.upcycle_hub.backend.profile.dto;

import com.tuanngp.upcycle_hub.common.dto.ResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class ProfileResponseDto extends ResponseDto {
    private String name;
    private String email;
    private String phone;
    private String address;
    private Date dateOfBirth;
    private String bio;
    private String profileImage;
}
