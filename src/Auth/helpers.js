export const maskEmail = (email) => {
  if (!email || email.trim() === "") {
    return email;
  }
  const parts = email.split("@");
  const maskedLocalPart = parts[0].substring(0, 1) + "****";
  return maskedLocalPart + "@" + parts[1];
};

export const maskPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.trim() === "") {
    return phoneNumber;
  }
  const maskedPart =
    phoneNumber.substring(0, 1) + "*".repeat(phoneNumber.length - 5);
  return maskedPart + phoneNumber.substring(phoneNumber.length - 4);
};
