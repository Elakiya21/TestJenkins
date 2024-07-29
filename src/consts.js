//Adding this to the top of node script
//window is not available on server and so this is required
export const isClient = typeof window !== "undefined" && window.document
export const isServer = !isClient

/* eslint max-len: 0 */
/* eslint no-useless-escape: 0 */

// import GoomoIcon from "images/goomo400x400.jpg"

export const KEY = {
  BACKSPACE: 8,
  LEFTARROW: 37,
  RIGHTARROW: 39,
  SPACEBAR: 32,
  TAB: 9,
}

export const DEFAULT_CURRENCY = "₹"
export const ESCAPE_KEY = 27
export const API_DATE_FORMAT = "YYYY-MM-DD"
export const VIEW_DATE_FORMAT = "ddd, D MMM YYYY"

export const NAME_REGEX = /^[^<>()\[\]\\.,;:`~!#%\^&\s$*@][a-zA-Z][a-zA-Z ]{0,33}[a-zA-Z]$/i
export const ISNUMERIC_REGEX = /^[0-9]+$/i
export const PHONE_NUMBER_REGEX = /^(\+\d{1,2}\s)?\(?[0-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s$*@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
export const ESCAPE_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g
export const TIME_REGEX = /^([01]?[0-9]{1}|2[0-3]{1}):[0-5]{1}[0-9]{1}/i

export const ALPHA_NUMERIC_REGEX = /^[0-9a-zA-Z]+$/

export const pageUrls = {
  home: "/",
  places: {
    continents: "/places/continents",
    cities: "/places/cities",
    countries: "/places/countries",
    airports: "/places/airports",
    provinces: "/places/provinces",
    airlines: "/places/airlines",
    localities: "/places/localities",
    pointOfInterests: "/places/point-of-interests",
  },
  userProfile: {
    myAccount:"/",
    userMobileVerification:"/verify/:id",
    userVerified:"/verify/confirmation"
  }
}


export const pagination = {
  prev: "Prev",
  next: "Next",
  displayPage: 10,
}
