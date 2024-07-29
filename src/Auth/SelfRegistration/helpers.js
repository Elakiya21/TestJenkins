
  export const getBodyForAssignToUser = (magicLinkCode, userId) => {

    const formDatas = {}
    formDatas.userTerminalId = userId
    formDatas.rewardLoadtransactionType = 2
    return ({
      options: {
        body: { ...formDatas },
      }
    })
  }


  export const getBodyForCreate = (values) => {

    const formDatas = {}
    Object.keys(values).forEach((key) => {
      if (values[key] || values[key] === false) {
        if (key === "id") {
          formDatas.storeTerminalId = values[key].toUpperCase()
        }  else if (key === "email") {
          formDatas.email = values[key]
        } else if (key === "extension") {
           formDatas.extension = values[key].replace("+","")
        } else if (key === "firstName") {
            formDatas.firstName = values[key]
        } else if (key === "lastName") {
            formDatas.lastName = values[key]
        } else if (key === "magicLinkCode") {
          formDatas.magicLinkCode = values[key]
        } else if (key === "companyId") {
            formDatas.companyId = values[key]
        } else if (key === "phoneNumber") {
            formDatas.phoneNumber = values[key]
        } else if (key === "referralCode") {
            formDatas.referralCode = values[key]
        } else if (key === "defaultMallId") {
          formDatas.defaultMallId = values[key]
        } 
      }
    })
    return ({
      options: {
        body: { ...formDatas },
      }
    })
  }

  export const getBodyForVerifyOTP = (values, isPhoneVerification) => {
    const formDatas = {}
    Object.keys(values).forEach((key) => {
      if (values[key] || values[key] === false) {
        if (key === "userId") {
          formDatas.userId = values[key]
        } else if (key === "OTP" || key === "emailOTP") {
          if(isPhoneVerification)
            formDatas.otp = values["OTP"]
          else
            formDatas.otp = values["emailOTP"]
        } else if (key === "magicLinkCode") {
          formDatas.magicLinkCode = values[key]
        }else if (key === "userIp") {
          formDatas.userIp = values[key]
        }
      }
    })
    return ({
      options: {
        body: { ...formDatas },
      }
    })
  }

  export const getBodyForCreatePin = (values) => {

    const formDatas = {}
    Object.keys(values).forEach((key) => {
      if (values[key] || values[key] === false) {
        if (key === "newPin") {
          formDatas.newPin = values[key]
        } else if (key === "confirmPin") {
           formDatas.confirmPin = values[key]
        } else if (key === "deviceId") {
            formDatas.deviceId = values[key]
        } 
      }
    })
    return ({
      options: {
        body: { ...formDatas },
      }
    })
  }