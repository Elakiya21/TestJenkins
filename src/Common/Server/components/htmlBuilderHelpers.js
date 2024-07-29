// import { isStaticHtmlPage } from "Hotels/dumbComponents/Common/helpers"
const isStaticHtmlPage = () => {}
//This file will only contain those functions which help to build the html on server
const checkForSearchParam = (url) => {
  if (!url) return false
  return url.indexOf("/?") === 0 || url.indexOf("?") === 0
}
export const getDesktopCss = (url, fileMap = {}) => {
  let finalCss = ""
  if (
    url.indexOf("/flights") >= 0 ||
    url === "/" ||
    checkForSearchParam(url) ||
    url.indexOf("/mygoomo") >= 0 ||
    url.indexOf("/email-confirmed") >= 0 ||
    url.indexOf("/subscription_confirmation/") >= 0 ||
    url.indexOf("/email-confirmation-error") >= 0 ||
    url.indexOf("/users/password-set-success") >= 0 ||
    url.indexOf("/booking-policy") >= 0 ||
    url.indexOf("/users/password-reset") >= 0 ||
    url.indexOf("/users/password-reset-success") >= 0 ||
    url.indexOf("/users/new-password-reset") >= 0 ||
    url.indexOf("/users/password-set") >= 0 ||
    url.indexOf("/users/password-set-success") >= 0
  ) {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["flightsDesktop.css"]}">
    `
  } else if (url.indexOf("/hotels") >= 0 && !isStaticHtmlPage(url)) {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["hotelsDesktop.css"]}">
    `
  } else if (url === "/homestays") {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["homestaysDesktop.css"]}">
    `
  } else if (url === "/holidays") {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["holidaysDesktop.css"]}">
    `
  } else if (url === "/experiences") {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["experiencesDesktop.css"]}">
    `
  } else if (isStaticHtmlPage(url)) {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["hotelsSEODesktop.css"]}">
    `
  } else if (url.indexOf("/trains") >= 0) {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["trainsDesktop.css"]}">
    `
  }
  return finalCss
}

export const getAdaptiveCss = (url, fileMap = {}) => {
  let finalCss = ""
  if (
    url.indexOf("/flights") >= 0 ||
    url === "/" ||
    checkForSearchParam(url) ||
    url.indexOf("/mygoomo") >= 0 ||
    url.indexOf("/email-confirmed") >= 0 ||
    url.indexOf("/subscription_confirmation/") >= 0 ||
    url.indexOf("/email-confirmation-error") >= 0 ||
    url.indexOf("/users/password-set-success") >= 0 ||
    url.indexOf("/booking-policy") >= 0 ||
    url.indexOf("/users/password-reset") >= 0 ||
    url.indexOf("/users/password-reset-success") >= 0 ||
    url.indexOf("/users/new-password-reset") >= 0 ||
    url.indexOf("/users/password-set") >= 0 ||
    url.indexOf("/users/password-set-success") >= 0
  ) {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["flightsAdaptive.css"]}">
    `
  } else if (url.indexOf("/hotels") >= 0 && !isStaticHtmlPage(url)) {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["hotelsAdaptive.css"]}">
    `
  } else if (url === "/homestays") {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["homestaysAdaptive.css"]}">
    `
  } else if (url === "/holidays") {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["holidaysAdaptive.css"]}">
    `
  } else if (url === "/experiences") {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["experiencesAdaptive.css"]}">
    `
  } else if (isStaticHtmlPage(url)) {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["hotelsSEOAdaptive.css"]}">
    `
  } else if (url.indexOf("/trains") >= 0) {
    finalCss = `
      <link rel="stylesheet" href="/${fileMap["trainsAdaptive.css"]}">
    `
  }
  return finalCss
}
