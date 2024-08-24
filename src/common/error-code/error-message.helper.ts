import { DetailType, ErrorCodeMessage, ErrorCodeType } from './error-code-type';

export const formatErrorMessage = (
  message: ErrorCodeMessage,
  details?: DetailType,
): string | string[] => {
  if (Array.isArray(details)) {
    return details.map((detail) => message.replace('{detail}', String(detail)));
  }
  return details
    ? message.replace('{detail}', String(details))
    : message.replace(/\{detail\} +/g, '');
};

export const getFormattedErrorMessage = (
  errorCode: ErrorCodeType,
  detail?: DetailType,
): string | string[] => {
  const message = errorCode.message;
  return formatErrorMessage(message, detail);
};
