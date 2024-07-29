const webengageUserLogin = (emailId) => {
  const { webengage } = window
  if (webengage) {
    webengage.user.login(emailId)
  }
}

const webEngageUserLogout = () => {
  const { webengage } = window
  if (webengage) {
    webengage.user.logout()
  }
}

const deleteInValidValueAttributes = (object) => {
  const obj = { ...object }
  Object.keys(obj).forEach((attrib) => {
    if (!obj[attrib] || obj[attrib] === "" || obj[attrib] === "+") {
      delete obj[attrib]
    }
  })
  return obj
}

const webEngageSocialLogin = ({
  email,
  first_name,
  last_name,
  phone_number,
  date_of_birth,
  gender,
  country_code,
}) => {
  const { webengage } = window
  if (webengage) {
    let phoneNumberParsed = ""
    if (country_code && phone_number) {
      phoneNumberParsed = `+${country_code}${phone_number}`
    }
    webEngageSetAttribute({
      first_name,
      last_name,
      email,
      gender,
      phone_number: phoneNumberParsed,
      date_of_birth,
    })
  }
}

const webEngageUserSignUp = (signUpInfo) => {
  const { webengage } = window
  if (webengage) {
    const objToBeSetForWebengage = {
      we_email: signUpInfo.email,
    }
    const parsedObject = deleteInValidValueAttributes(objToBeSetForWebengage)
    if (parsedObject.we_email) {
      webengage.user.login(parsedObject.we_email)
    }
    webengageEventTrack("Signed up successfully")
    webengage.user.setAttribute(parsedObject)
  }
}

const webEngageSetAttribute = ({
  first_name,
  last_name,
  email,
  gender,
  phone_number,
  date_of_birth,
}) => {
  const { webengage } = window
  if (webengage) {
    const objToBeSetForWebengage = {
      we_first_name: first_name,
      we_last_name: last_name,
      we_email: email,
      we_phone: phone_number,
      we_birth_date: date_of_birth,
      we_gender: gender,
    }
    const parsedObject = deleteInValidValueAttributes(objToBeSetForWebengage)
    if (parsedObject.we_email) {
      webengage.user.login(parsedObject.we_email)
    }
    webengage.user.setAttribute(parsedObject)
  }
}

const webengageEventTrack = (eventName, payload) => {
  const timeoutLimit = 5000
  if (window && !window.webengage) {
    let millisecond = 0
    const timerId = setInterval(() => {
      if (window.webengage) {
        window.webengage.track(eventName, payload)
        clearInterval(timerId)
      } else {
        millisecond += 1000
      }
      if (millisecond > timeoutLimit) {
        clearInterval(timerId)
      }
    }, 1000)
  } else if (window && window.webengage) {
    const { webengage } = window
    webengage.track(eventName, payload)
  }
}

const reloadWebengage = () => {
  const { webengage } = window
  if (webengage && webengage.reload) webengage.reload()
}

export {
  webengageUserLogin,
  webEngageUserLogout,
  webEngageSetAttribute,
  webEngageUserSignUp,
  webEngageSocialLogin,
  webengageEventTrack,
  reloadWebengage,
}
