import React from "react";
import { useEffect, useRef, useState } from "react";

const OtpInput = ({
  length = 4,
  onOtpSubmit = () => {},
  type = "text",
  initialSetFocus = true,
  onOtpUndo = () => {},
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0] && initialSetFocus) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    // allow only one input
    if (value.length > 1) {
      const valueArray = value.split(""); // Split the pasted value into an array
      // Paste values into individual fields
      for (let i = 0; i < length; i++) {
        const pastedOtpLength = newOtp.join("").length;
        if (pastedOtpLength < length) newOtp[index + i] = valueArray[i] || ""; // Use empty string if there's no value
      }
      const combinedOtpLength = newOtp.join("").length;
      if (combinedOtpLength != length) {
        if (inputRefs.current[combinedOtpLength]) {
          inputRefs.current[combinedOtpLength].focus();
        }
      } else {
        if (inputRefs.current[length - 1]) {
          inputRefs.current[length - 1].focus();
        }
      }
    } else {
      // Handle single character input
      newOtp[index] = value.substring(value.length - 1);
      // Move to next input if current field is filled
      if (value && index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
    setOtp(newOtp);
    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") onOtpUndo();
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="auth-otpInput d-flex justify-content-between">
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type={type}
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`form-control otpInput ${
              length == 4 ? "otpInput-width-4" : ""
            }`}
            inputMode="numeric"
            autoFocus={initialSetFocus}
            id={initialSetFocus ? "initialField" : ""}
          />
        );
      })}
    </div>
  );
};
export default OtpInput;
