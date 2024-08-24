import { ErrorCode } from './error-code.enum';

export type ErrorCodeKey = keyof typeof ErrorCode;
export type ErrorCodeType = (typeof ErrorCode)[ErrorCodeKey];
export type ErrorCodeMessage =
  (typeof ErrorCode)[keyof typeof ErrorCode]['message'];
export type DetailType = number | string | string[];
