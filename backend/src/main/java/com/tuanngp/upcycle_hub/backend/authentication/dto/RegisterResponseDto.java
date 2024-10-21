package com.tuanngp.upcycle_hub.backend.authentication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tuanngp.upcycle_hub.backend.common.dto.BaseDto;
import com.tuanngp.upcycle_hub.backend.entity.Account;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class RegisterResponseDto extends BaseDto {
    @JsonProperty("account")
    private Account account;
}
