import { EMAIL_REGEX, PHONE_NUMBER_REGEX, ISNUMERIC_REGEX } from "consts"
import moment from 'moment';

export const validateCode = (value) => {
  if (value) {
    if (value.length === 2) {
      return undefined
    }
    return "code should be of 2 characters."
  }
  return "Please enter code."
}

export const validateName = value => value ? undefined : "Please Enter Name."
export const validateLeadSource = value => value ? undefined : "Please Select Leadsource"
export const validateContinentId = value => value ? undefined : "Please enter Continent id."
export const validateAirportCode = value => value ? undefined : "Please enter Airport Code."
export const validateCityId = value => value ? undefined : "Please enter valid City Id."
export const validateIcaoCode = (value) => {
  if (value) {
    if (value.length === 3) {
      return undefined
    }
    return "ICAO Code should be of 3 characters."
  }
  return "Please enter ICAO Code."
}
export const validateCountryId = value => value ? undefined : "Please Enter valid Country Id."
export const validateProvinceId = value => value ? undefined : "Please Enter valid Province Id."
export const validateLocalityId = value => value ? undefined : "Please Enter valid Locality Id."
export const validateEmail = email =>
  email && EMAIL_REGEX.test(email) ? undefined : "Please enter e-mail."

export const validatePhoneNumber = phone_number =>
  phone_number && PHONE_NUMBER_REGEX.test(phone_number) ? undefined : "Please Enter Phone Number."
export const required = value => {
  if (value === '' || value === undefined || value === null) {
    return 'Required';
  }
  return undefined;
};
export const validateOTP = value =>
value && PHONE_NUMBER_REGEX.test(value) ? undefined : "Please enter valid otp."
// never export this
const maxLength = max => value =>
value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength30 = maxLength(30);
export const maxLength50 = maxLength(50);
export const maxLength1200 = maxLength(1200);
export const maxLength5000 = maxLength(5000);

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength4 = minLength(4);

  // never export this
const ExactLength = max => value =>
  value && value.length !== max ? `Must be ${max} characters` : undefined;
export const ExactLength10 = ExactLength(10);
export const ExactLength15 = ExactLength(15);

export const alphaNumeric = value =>
value && /[^a-zA-Z0-9 ]/i.test(value)
  ? 'Only alphanumeric characters'
  : undefined;

export const number = value =>
value !== undefined && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const integerOnly = value =>
  value !== undefined && (isNaN(Number(value)) || value % 1 !== 0)
    ? 'Must be a number'
    : undefined;

export const urlValid = value =>
  value && value.match(/\s/g)
    ? 'Sorry, you are not allowed to enter any spaces'
    : undefined;

const minDate = moment(new Date('01/01/1900')).format();
const maxDate = moment(new Date('01/01/2100')).format();

export const dateValid = value => {
  let inputDate;
  if (typeof value === 'string') {
    inputDate = moment(new Date(value)).format();
  } else {
    inputDate = value;
  }
  return inputDate && (inputDate < minDate || inputDate > maxDate)
    ? 'Invalid Date'
    : undefined;
};

export const tinyMceRequired = value => {
  const arr = ['', undefined, null, '<p><br data-mce-bogus="1"></p>', '<p><br></p>'];
  if (arr.includes(value)) {
    return 'Required';
  }
  return undefined;
};

export const validateAddress = (value) => {
  if (value) {
    return undefined
  } else {
    return "Please enter a valid address"
  }
}

export const validatePhoneCode = value => {
  if(value) {
    return undefined
  }
  return "Please enter a valid country code"
}


export const validateIsNumeric = value => {
  return value && ISNUMERIC_REGEX.test(value) ? undefined : "Only numeric is allowed"
}