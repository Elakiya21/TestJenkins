import pluralize from "pluralize"

const ENTITY_TYPE = "userVerification"
export const TYPE = `${pluralize(ENTITY_TYPE)}`
export const config = {
  resendOTP: {
    url : "/v1/resend-verification-otp/{id}",
    method: "GET",
  },
  mobileVerification: {
    url: "/v1/mobile-confirmation-otp/{id}",
    method: "POST",
  },
  emailVerification: {
    url: "/v1/email-confirmation-otp/{id}",
    method: "POST",
  },
  getCustomerProfileDetails: {
    url : "/v1/customer/{id}",
    method: "GET",
  },
  updateVerificationUser: {
    url : "/v1/customer/verification/update/{id}",
    method: "POST",
  },
  updateVerificationUserName: {
    url : "/v1/customer/verification/update-name/{id}",
    method: "POST",
  },
  setUserPin: {
    url: "/v1/user/{id}/set-pin",
    method: "POST",
  }
}

export const otpForm = `otp${TYPE}`
export const createPinForm = `createPin${TYPE}`
export const updateUserForm = `updateUser${TYPE}`

export const modalTypes = {
  create: "CREATE",
  update: "UPDATE",
}

export const DUMMY_FIRST_NAME = "NoFName";
export const DUMMY_LAST_NAME = "NoLName";
export const DUMMY_MOBILE_NUMBER = "0000000000";

export const radioOptions = [{ name: "Yes", type: true }, { name: "No", type: false }]

export const maxSize = 10 * 1024 * 1024