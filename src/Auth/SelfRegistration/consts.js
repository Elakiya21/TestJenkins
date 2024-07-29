import pluralize from "pluralize"

const ENTITY_TYPE = "selfRegistration"
export const TYPE = `${pluralize(ENTITY_TYPE)}`
export const config = {
  selfRegistration: {
    url: "/v1/register",
    method: "POST",
  },
  mobileVerification: {
    url: "/v1/register/verify-mobile",
    method: "POST",
  },
  selfRegisterName: {
    url: "/v1/register/name",
    method: "POST",
  },
  selfRegisterEmail: {
    url: "/v1/register/email",
    method: "POST",
  },
  emailVerification: {
    url: "/v1/register/verify-email",
    method: "POST",
  },
  reSendOtp: {
    url: "/v1/resend-verification-otp/{id}",
    method: "GET",
  },
  getBasicDetails: {
    url: "/v1.0/customer/{id}/basic-details",
    method: "GET",
  },
  setUserPin: {
    url: "/v1/user/{id}/set-pin",
    method: "POST",
  },
  getStoreDetails: {
    url: "/v1/store/{id}/store-config",
    method: "GET",
  },
  assignToUser: {
    url: "/v1/magic-link/{id}/associate-user",
    method: "POST",
  }
}

export const registrationForm = `RegistrationCreate`

export const validateResponse = ["User profile already exists with given email address","User profile already exists with given phone number"]

