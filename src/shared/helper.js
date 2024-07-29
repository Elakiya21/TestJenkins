
import Cookie from "js-cookie"
import { isServer } from "consts"

export const isIE = () => {
  const sAgent = window.navigator.userAgent
  const Idx = sAgent.indexOf("MSIE")

  // If IE, return version number.
  if (Idx > 0) return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)), 10)

  // If IE 11 then look for Updated user agent string.
  else if (sAgent.match(/Trident\/7\./)) return 11

  return 0 //It is not IE
}

export const getClientIp = () => {
  const ip = Cookie.get("cntip") || "11.22.33.44"
  return ip.split(",")[0]
}

export const setServerVariables = () => {
  if (isServer) {
    global.window = {}
    global.localStorage = {}
    //eslint-disable-next-line
    global.localStorage.getItem = function () { }
    //eslint-disable-next-line
    global.localStorage.setItem = function () { }

    global.sessionStorage = {}
    //eslint-disable-next-line
    global.sessionStorage.getItem = function () { }
    //eslint-disable-next-line
    global.sessionStorage.setItem = function () { }

    global.window.navigator = {}
    global.window.navigator.userAgent = ""
    //eslint-disable-next-line
    global.window.addEventListener = function () { }
    global.window.location = {}
    global.window.location.search = ""
    global.window.location.pathname = ""
    global.window.location.hostname = ""
  }
}
