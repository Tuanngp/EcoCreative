package com.tuanngp.upcycle_hub.backend.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BaseDto {
    private String resultCode;
    private String statusMessage;
}
