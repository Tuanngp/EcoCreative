package com.tuanngp.upcycle_hub.common.utils;

import com.tuanngp.upcycle_hub.common.dto.ResponseDto;
import com.tuanngp.upcycle_hub.common.enums.ResponseCode;

public class ResponseUtils {
    public static <T extends ResponseDto> void setResponseSuccess(T data) {
        data.setResultCode(ResponseCode.SUCCESS.getResultCode());
        data.setResulMessage(ResponseCode.SUCCESS.getResultMessage());
    }

    public static <T extends ResponseDto> void setResponseFail(T data) {
        data.setResultCode(ResponseCode.FAIL.getResultCode());
        data.setResulMessage(ResponseCode.FAIL.getResultMessage());
    }

    public static <T extends ResponseDto> void setResponseNoData(T data) {
        data.setResultCode(ResponseCode.NO_DATA.getResultCode());
        data.setResulMessage(ResponseCode.NO_DATA.getResultMessage());
    }

    public static <T extends ResponseDto> void setResponseAuthFail(T data) {
        data.setResultCode(ResponseCode.AUTH_FAIL.getResultCode());
        data.setResulMessage(ResponseCode.AUTH_FAIL.getResultMessage());
    }

    public static <T extends ResponseDto> void setResponseInvalidParameter(T data) {
        data.setResultCode(ResponseCode.INVALID_PARAMETER.getResultCode());
        data.setResulMessage(ResponseCode.INVALID_PARAMETER.getResultMessage());
    }

    public static <T extends ResponseDto> void setResponseDuplicate(T data) {
        data.setResultCode(ResponseCode.DUPLICATE.getResultCode());
        data.setResulMessage(ResponseCode.DUPLICATE.getResultMessage());
    }

    public static <T extends ResponseDto> void setResponseReqExceeded(T data) {
        data.setResultCode(ResponseCode.REQ_EXCEEDED.getResultCode());
        data.setResulMessage(ResponseCode.REQ_EXCEEDED.getResultMessage());
    }

    public static <T extends ResponseDto> void setResponseFailProcess(T data) {
        data.setResultCode(ResponseCode.FAIL_PROCESS.getResultCode());
        data.setResulMessage(ResponseCode.FAIL_PROCESS.getResultMessage());
    }

    public static <T extends ResponseDto> void setResponseWarning(T data) {
        data.setResultCode(ResponseCode.WARNING.getResultCode());
        data.setResulMessage(ResponseCode.WARNING.getResultMessage());
    }

    public static <T extends ResponseDto> void setResponseBlocked(T data) {
        data.setResultCode(ResponseCode.BLOCKED.getResultCode());
        data.setResulMessage(ResponseCode.BLOCKED.getResultMessage());
    }

}
