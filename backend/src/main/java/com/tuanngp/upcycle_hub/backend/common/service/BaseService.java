package com.tuanngp.upcycle_hub.backend.common.service;

import com.tuanngp.upcycle_hub.backend.common.dto.BaseDto;
import com.tuanngp.upcycle_hub.backend.common.enums.ResponseCode;

public abstract class BaseService {
    public <T extends BaseDto> T setResponse(T response, ResponseCode responseCode) {
        response.setResultCode(responseCode.getResultCode());
        response.setStatusMessage(responseCode.getResultMessage());
        return response;
    }
}
