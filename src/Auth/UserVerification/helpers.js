import React from "react";

export const getBodyForCreate = (values) => {

  const formDatas = {}
  Object.keys(values).forEach((key) => {
    if (values[key] || values[key] === false) {
      if (key === "userId") {
        formDatas.userId = values[key]
      } else if (key === "otp") {
        formDatas.otp = values[key]
      } 
    }
  })
  return ({
    options: {
      body: { ...formDatas },
    }
  })
}

export const getBodyForUpdateUser = (values) => {
  const formDatas = {}
  Object.keys(values).forEach((key) => {
    if (values[key] || values[key] === false) {
      if (key === "email") {
        formDatas.email = values[key]
      } else if (key === "phoneNumber") {
        formDatas.phoneNumber = values[key]
      } else if (key === "countryCode") {
        formDatas.countryCode = values[key]
      } else if (key === "extension") {
        if(values[key].includes('+'))
          formDatas.extension = values[key].replace(/\+/g, '')
        else
          formDatas.extension = values[key]
      }
    }
  })
  return ({
    options: {
      body: { ...formDatas },
    }
  })
}

export const generateData = (values) => {
  const formData = {};
  Object.keys(values).forEach((key) => {
    if (key === "userId") {
      formData.user_id = values[key]
    }
  }
  )
  return formData
}

export const handleVerifyUserPlaceHolderGlow = () =>{
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
    </div>
  );
}

export const handleVerifyUserPlaceHolderGlow1 = () =>{
  return (
    <div className="placeholder-glow mt-4 pt-5">
      <span className="row ps-1 py-3 my-1">
        <span className="placeholder placeholder-xs col-10 ms-2"></span>
      </span>
      <span className="row ps-1 py-3 my-1">
        <span className="placeholder placeholder-xs col-10 mx-2"></span>
      </span>
    </div>
  );
}


export const handleLinkExpiredPlaceHolderGlow = () =>{
  return (
    <div className="placeholder-glow ps-4 pt-3 mt-3">
      <span className="row ps-1 pb-3 mb-1">
        <span className="placeholder placeholder-xs col-10 ms-2"></span>
      </span>
      <span className="row ps-1 py-3 my-1">
        <span className="placeholder placeholder-xs col-10 ms-2"></span>
      </span>
    </div>
  );
}

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
      }
    }
  });
  return {
    options: {
      body: { ...formDatas },
    },
  };
};
