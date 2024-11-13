export const RESULT_CODE_SUCCESS = "00";
export const STATUS_CODE_FAIL = "200";
export const STATUS_MESSAGE_SUCCESS = "Success";

export const RESULT_CODE_AUTH_FAIL = "02";
export const RESULT_CODE_AUTH_FAIL_MESSAGE = "Auth failed";

export const RESULT_CODE_INVALID_PARAMETER = "03";
export const RESULT_MESSAGE_INVALID_PARAMETER = "Invalid parameter";

export const RESULT_CODE_DUPLICATE = "04";
export const RESULT_MESSAGE_DUPLICATE = "Duplicate";

export const RESULT_CODE_NOT_FOUND = "05";
export const RESULT_MESSAGE_NOT_FOUND = "No data";

export const RESULT_CODE_FAIL = "06";
export const RESULT_MESSAGE_FAIL = "Data Error";

export const RESULT_CODE_REQ_EXECEEDED = "20";
export const RESULT_MESSAGE_REQ_EXECEEDED = "Number of Request Exceeded";

export const RESULT_CODE_FAIL_PROCESS = "22";
export const RESULT_MESSAGE_FAIL_PROCESS = "Failed to process data (All)";

export const RESULT_CODE_WARNING = "99";
export const RESULT_MESSAGE_WARNING = "Warning";

export const getResultMessage = (resultCode: string): string => {
    switch (resultCode) {
      case RESULT_CODE_SUCCESS:
        return STATUS_MESSAGE_SUCCESS;
      case RESULT_CODE_AUTH_FAIL:
        return RESULT_CODE_AUTH_FAIL_MESSAGE;
      case RESULT_CODE_INVALID_PARAMETER:
        return RESULT_MESSAGE_INVALID_PARAMETER;
      case RESULT_CODE_DUPLICATE:
        return RESULT_MESSAGE_DUPLICATE;
      case RESULT_CODE_NOT_FOUND:
        return RESULT_MESSAGE_NOT_FOUND;
      case RESULT_CODE_FAIL:
        return RESULT_MESSAGE_FAIL;
      case RESULT_CODE_REQ_EXECEEDED:
        return RESULT_MESSAGE_REQ_EXECEEDED;
      case RESULT_CODE_FAIL_PROCESS:
        return RESULT_MESSAGE_FAIL_PROCESS;
      case RESULT_CODE_WARNING:
        return RESULT_MESSAGE_WARNING;
      default:
        return "Unknown result code";
    }
};

