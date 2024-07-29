import pluralize from "pluralize";

const ENTITY_TYPE = "login";
export const TYPE = `${pluralize(ENTITY_TYPE)}`;
export const config = {
  getStoreDetails: {
    url: "/v1/store/{id}/store-config",
    method: "GET",
  },
  getLoginFlow: {
    url: "/v1/login-flow",
    method: "GET",
  },
  verifyBiometricLogin: {
    url: "/v1/verify-biometric-login",
    method: "POST",
  },
  verifyPinLogin: {
    url: "/v1/verify-pin-login",
    method: "POST",
  },
  resetPinLogin: {
    url: "/v1/reset-pin-login",
    method: "POST",
  },
  sendLoginOtp: {
    url: "/v1/send-login-otp",
    method: "POST",
  },
  verifyLoginOtp: {
    url: "/v1/verify-login-otp",
    method: "POST",
  },
  reSendLoginOtp: {
    url: "/v1/resend-login-otp",
    method: "POST",
  },
  setUserPin: {
    url: "/v1/set-login-pin",
    method: "POST",
  },
  sendMagicLinkLoginOtp: {
    url: "/v1/magic-link-login/send-otp",
    method: "POST",
  },
  verifyMagicLinkLoginOtp: {
    url: "/v1/magic-link-login/verify-otp",
    method: "POST",
  },
  reSendMagicLinkLoginOtp: {
    url: "/v1/magic-link-login/send-otp",
    method: "POST",
  },
};

export const loginForm = `loginCreateForm`;

export const validateResponse = [
  "User profile already exists with given email address",
  "User profile already exists with given phone number",
];

export const MOBILE_BIOMETRIC_LOGIN_FLOW = "MOBILE_BIOMETRIC_LOGIN_FLOW";
export const MOBILE_PIN_LOGIN_FLOW = "MOBILE_PIN_LOGIN_FLOW";
export const MOBILE_OTP_LOGIN_FLOW = "MOBILE_OTP_LOGIN_FLOW";
export const EMAIL_BIOMETRIC_LOGIN_FLOW = "EMAIL_BIOMETRIC_LOGIN_FLOW";
export const EMAIL_PIN_LOGIN_FLOW = "EMAIL_PIN_LOGIN_FLOW";
export const EMAIL_OTP_LOGIN_FLOW = "EMAIL_OTP_LOGIN_FLOW";
export const USER_MOBILE_NUMBER_OR_EMAIL_IS_NOT_VERIRFIED =
  "User mobile number or email is not vrified";
export const USER_NOT_FOUND = "User not found";
export const BIOMETRIC_AUTH_FAILED = "Biometric authentication failed";
