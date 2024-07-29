import React from "react";
export const handleInitailLoginPlaceHolderGlow = () => {
  return (
    <div className="placeholder-glow ms-md-4 ps-5">
      <span className="row ps-1 py-3 my-1">
        <span className="col-2 me-2"></span>
        <span className="placeholder placeholder-xs col-5 ms-2"></span>
      </span>
      <span className="row ps-1 py-3 my-1 mt-4">
        <span className="placeholder placeholder-xs col-10 ms-2"></span>
      </span>
      <span className="row ps-1 py-3 my-4">
        <span className="placeholder placeholder-xs col-10 mx-2"></span>
      </span>
      <span className="row ps-1 py-3 my-4">
        <span className="col-1 me-2"></span>
        <span className="placeholder placeholder-xs col-7 mx-2"></span>
      </span>
    </div>
  );
};

export const getBodyForVerifyBiometric = (values) => {
  const formDatas = {};
  Object.keys(values).forEach((key) => {
    if (values[key] || values[key] === false) {
      if (key === "userAccountId") {
        formDatas.userAccountId = values[key];
      } else if (key === "userName") {
        formDatas.userName = values[key];
      } else if (key === "storeTerminalId") {
        formDatas.storeTerminalId = values[key];
      } else if (key === "isValidateUser") {
        formDatas.isValidateUser = values[key];
      } else if (key === "companyTerminalId") {
        formDatas.companyTerminalId = values[key];
      } else if (key === "storeLoginType") {
        formDatas.storeLoginType = values[key];
      } else if (key === "biometricAuthentication") {
        formDatas.biometricAuthentication = values[key];
      } else if (key === "biometricAuthenticatedDeviceId") {
        formDatas.biometricAuthenticatedDeviceId = values[key];
      } else if (key === "biometricSignature") {
        formDatas.biometricSignature = values[key];
      } else if (key === "biometricPayload") {
        formDatas.biometricPayload = values[key];
      } else if (key === "redirectUrl") {
        formDatas.redirectUrl = values[key];
      } else if (key === "clientId") {
        formDatas.clientId = values[key];
      } 
    }
  });
  return {
    options: {
      body: { ...formDatas },
    },
  };
};
export const getBodyForVerifyPin = (values) => {
  const formDatas = {};
  Object.keys(values).forEach((key) => {
    if (values[key] || values[key] === false) {
      if (key === "userAccountId") {
        formDatas.userAccountId = values[key];
      } else if (key === "userName") {
        formDatas.userName = values[key];
      } else if (key === "storeTerminalId") {
        formDatas.storeTerminalId = values[key];
      } else if (key === "isValidateUser") {
        formDatas.isValidateUser = values[key];
      } else if (key === "companyTerminalId") {
        formDatas.companyTerminalId = values[key];
      } else if (key === "storeLoginType") {
        formDatas.storeLoginType = values[key];
      } else if (key === "pin") {
        formDatas.pin = values[key];
      } else if (key === "redirectUrl") {
        formDatas.redirectUrl = values[key];
      } else if (key === "clientId") {
        formDatas.clientId = values[key];
      }
    }
  });
  return {
    options: {
      body: { ...formDatas },
    },
  };
};

export const getBodyForResetPinLogin = (values) => {
  const formDatas = {};
  Object.keys(values).forEach((key) => {
    if (values[key] || values[key] === false) {
      if (key === "userName") {
        formDatas.userName = values[key];
      } else if (key === "userAccountId") {
        formDatas.userAccountId = values[key];
      } else if (key === "storeLoginType") {
        formDatas.storeLoginType = values[key];
      } else if (key === "storeTerminalId") {
        formDatas.storeTerminalId = values[key];
      } else if (key === "storeName") {
        formDatas.storeName = values[key];
      } else if (key === "deviceId") {
        formDatas.deviceId = values[key];
      } else if (key === "companyTerminalId") {
        formDatas.companyTerminalId = values[key];
      }
    }
  });
  return {
    options: {
      body: { ...formDatas },
    },
  };
};

export const getBodyForSendLoginOtp = (values) => {
  const formDatas = {};
  Object.keys(values).forEach((key) => {
    if (values[key] || values[key] === false) {
      if (key === "userName") {
        formDatas.userName = values[key];
      } else if (key === "companyTerminalId") {
        formDatas.companyTerminalId = values[key];
      } else if (key === "storeLoginType") {
        formDatas.storeLoginType = values[key];
      } else if (key === "storeTerminalId") {
        formDatas.storeTerminalId = values[key];
      } else if (key === "storeName") {
        formDatas.storeName = values[key];
      } else if (key === "deviceId") {
        formDatas.deviceId = values[key];
      }
    }
  });
  return {
    options: {
      body: { ...formDatas },
    },
  };
};

export const getBodyForVerifyLoginOtp = (values) => {
  const formDatas = {};
  Object.keys(values).forEach((key) => {
    if (values[key] || values[key] === false) {
      if (key === "userName") {
        formDatas.userName = values[key];
      } else if (key === "storeTerminalId") {
        formDatas.storeTerminalId = values[key];
      } else if (key === "OTP") {
        formDatas.otp = values[key];
      } else if (key === "userAccountId") {
        formDatas.userAccountId = values[key];
      } else if (key === "redirectUrl") {
        formDatas.redirectUrl = values[key];
      } else if (key === "clientId") {
        formDatas.clientId = values[key];
      } else if (key === "deviceId") {
        formDatas.deviceId = values[key];
      }
    }
  });
  return {
    options: {
      body: { ...formDatas },
    },
  };
};

export const getBodyForResendOtp = (values) => {
  const formDatas = {};
  Object.keys(values).forEach((key) => {
    if (values[key] || values[key] === false) {
      if (key === "userName") {
        formDatas.userName = values[key];
      } else if (key === "storeTerminalId") {
        formDatas.storeTerminalId = values[key];
      } else if (key === "storeLoginType") {
        formDatas.storeLoginType = values[key];
      } else if (key === "userAccountId") {
        formDatas.userAccountId = values[key];
      } else if (key === "storeName") {
        formDatas.storeName = values[key];
      } else if (key === "currentOtpMethod") {
        formDatas.currentOtpMethod = values[key];
      }
    }
  });
  return {
    options: {
      body: { ...formDatas },
    },
  };
};
export const getBodyForCreatePin = (values) => {
  const formDatas = {};
  Object.keys(values).forEach((key) => {
    if (values[key] || values[key] === false) {
      if (key === "newPin") {
        formDatas.newPin = values[key];
      } else if (key === "confirmPin") {
        formDatas.confirmPin = values[key];
      } else if (key === "deviceId") {
        formDatas.deviceId = values[key];
      } else if (key === "redirectUrl") {
        formDatas.redirectUrl = values[key];
      } else if (key === "clientId") {
        formDatas.clientId = values[key];
      } else if (key === "storeTerminalId") {
        formDatas.storeTerminalId = values[key];
      } else if (key === "userName") {
        formDatas.userName = values[key];
      }
    }
  });
  return {
    options: {
      body: { ...formDatas },
    },
  };
};
export const handleMgaicLoginPlaceHolderGlow = () => {
  return (
    <div className="placeholder-glow mt-4">
      <span className="row ps-1 py-3 my-1">
        <span className="placeholder placeholder-xs col-10 ms-2"></span>
      </span>
      <span className="row ps-1 py-3 my-1 mt-4">
        <span className="placeholder placeholder-xs col-8 ms-2"></span>
      </span>
      <span className="row ps-1 py-3 my-4">
        <span className="placeholder placeholder-xs col-10 mx-2"></span>
      </span>
      <span className="row ps-1 py-3 my-4">
        <span className="placeholder placeholder-xs col-7 mx-2"></span>
      </span>
    </div>
  );
};
export const getBodyForVerifyMagicLinkLoginOtp = (values) => {
  const formDatas = {};
  Object.keys(values).forEach((key) => {
    if (values[key] || values[key] === false) {
      if (key === "userAccountId") {
        formDatas.userAccountId = values[key];
      } else if (key === "otp") {
        formDatas.otp = values[key];
      } else if (key === "magicLinkCode") {
        formDatas.magicLinkCode = values[key];
      } else if (key === "storeTerminalId") {
        formDatas.storeTerminalId = values[key];
      } else if (key === "userName") {
        formDatas.userName = values[key];
      }
    }
  });
  return {
    options: {
      body: { ...formDatas },
    },
  };
};