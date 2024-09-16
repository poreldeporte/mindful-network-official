import { TypeWithKey } from "@/models/type-with-key.model";

export const getValidationError = (errorCode: any) => {
  const codeMatcher: TypeWithKey<string> = {
    ERR_NETWORK: "Network connection lost",
    ERR_TIMEOUT: "Request timed out",
    ERR_CANCEL: "Request was cancelled",
    ERR_UNKNOWN: "Unknown error occurred",
    ERR_400: "400 Bad Request",
    ERR_401: "401 Unauthorized",
    ERR_403: "403 Forbidden",
  };

  return codeMatcher[errorCode];
};
