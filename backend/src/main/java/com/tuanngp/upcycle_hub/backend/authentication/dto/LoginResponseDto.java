package com.tuanngp.upcycle_hub.backend.authentication.dto;

import com.tuanngp.upcycle_hub.backend.common.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class LoginResponseDto extends BaseDto {
    private String token;
}
