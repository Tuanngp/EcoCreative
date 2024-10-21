package com.tuanngp.upcycle_hub.backend.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ResponseCode {
    SUCCESS("00","Success"),
    AUTH_FAIL("02","Auth failed"),
    INVALID_PARAMETER("03","Invalid parameter"),
    DUPLICATE("04","Duplicate data"),
    NOT_FOUND("05","No data"),
    FAIL("06","Data Error"),
    REQ_EXCEEDED("20","Number of Request Exceeded"),
    FAIL_PROCESS("22","Failed to process data (All)"),
    WARNING("99","Warning");

    private final String resultCode;
    private final String resultMessage;
}
