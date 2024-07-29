const userAgent = window.navigator.userAgent.toLowerCase()

export function isMobilePlatform(agent) {
  const agentStr = agent && agent.toLowerCase() || userAgent
  if (agentStr.indexOf("android") > -1 ||
    agentStr.indexOf("iphone") > -1 ||
    agentStr.indexOf("ipad") > -1 ||
    agentStr.indexOf("windows phone") > -1 ||
    agentStr.indexOf("blackberry") > -1 ||
    agentStr.indexOf("bb10") > -1 ||
    agentStr.indexOf("tizen") > -1) {
    return true
  }
  return false
}

function getOS() {
  const androidOS = userAgent.indexOf("android") > -1
  const windowsPhoneOS = userAgent.indexOf("windows phone") > -1
  const iOS = userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1
  const macOS = userAgent.indexOf("macintosh") > -1
  const linuxOS = userAgent.indexOf("linux") > -1 && userAgent.indexOf("android") === -1
  const windowsOS = userAgent.indexOf("windows nt") > -1

  const osArray = [androidOS, iOS, windowsPhoneOS, linuxOS, macOS, windowsOS]
  const osNames = ["Android", "iOS", "Windows Phone", "Linux", "Mac", "Windows"]

  let result = ""

  osArray.forEach((os, index) => {
    if (os) {
      result = osNames[index]
    }
  })
  return result
}

function getBrowserName() {
  const safariBrowser = userAgent.indexOf("safari") > -1 &&
    userAgent.indexOf("chrome") === -1 && userAgent.indexOf("ucbrowser") === -1
  const firefoxBrowser = userAgent.indexOf("firefox") > -1 && userAgent.indexOf("seamonkey") === -1
  const chromeBrowser = userAgent.indexOf("chrome") > -1 && userAgent.indexOf("chromium") === -1
  const chromiumBrowser = userAgent.indexOf("chromium") > -1
  const operaBrowser = userAgent.indexOf("opera") > -1 || userAgent.indexOf("opr") > -1
  const edgeBrowser = userAgent.indexOf("edge") > -1
  const msieBrowser = userAgent.indexOf("msie") > -1
  const ucBrowser = userAgent.indexOf("ucbrowser") > -1

  const browserArray = [safariBrowser, firefoxBrowser, chromeBrowser, chromiumBrowser,
    operaBrowser, edgeBrowser, msieBrowser, ucBrowser]
  const browserNames = ["Safari", "Firefox", "Chrome", "Chromium", "Opera", "Edge", "Internet Explorer", "UCBrowser"]

  let result = ""

  browserArray.forEach((browser, index) => {
    if (browser) {
      result = browserNames[index]
    }
  })

  return result
}

export function getDeviceInfo() {
  const osName = getOS()
  const browserName = getBrowserName()
  let isMobile = isMobilePlatform()
  if (isMobile && window.innerWidth > 800) {
    isMobile = false
  }
  const deviceInfo = {
    isMobile,
    browserName,
    osName,
  }
  return deviceInfo
}
