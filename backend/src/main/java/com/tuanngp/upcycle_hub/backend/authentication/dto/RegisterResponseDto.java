package com.tuanngp.upcycle_hub.backend.authentication.dto;

import com.tuanngp.upcycle_hub.common.dto.ResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class RegisterResponseDto extends ResponseDto {
    private String token;
    private UserDto user;
}
