import express from "express"
import React from "react"
import { renderToString } from "react-dom/server"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { StaticRouter } from "react-router-dom"
import fs from "fs"
// import redis from "redis"
import Helmet from "react-helmet"
//import ExpressStaticGzip from "express-static-gzip"
//Use the above commented line when needs to server gzipped files in prod build on local evironment
// import querystring from "querystring"
// import moment from "moment/min/moment.min"

import DesktopRoutes from "../src/routes/DesktopRoutes"
import AdaptiveRoutes from "../src/routes/AdaptiveRoutes"
import reducer from "../src/reducers/rootReducer"
// import {
//   getCMSData,
//   getCMSAndOffersData,
//   getHotelsSeoPageData,
//   getWhiteLabelData,
// } from "../src/Common/Server/components/actions"
import {
  // getCategoryDealSectionName,
  // getRedisKey,
  // isRedisRequiredforUrl,
  // getSearchpanelOfferName,
  getFileOpenFailedErrorPage,
} from "../src/Common/Server/components/utils"
import {
  getDesktopCss,
  getAdaptiveCss,
} from "../src/Common/Server/components/htmlBuilderHelpers"
// import { initialAppState } from "../src/components/App/reducer"
import { isMobilePlatform } from "../src/shared/lib/mobileDetect"
// import { isStaticHtmlPage, validateDates } from "../src/Hotels/dumbComponents/Common/helpers"
// import { API_DATE_FORMAT } from "consts"

// const nodeEnv = process.env.NODE_ENV

const app = express()

function excludeRoute(path, middleware) {
  return (req, res, next) => {
    if (path === req.path) {
      return next()
    }
    return middleware(req, res, next)
  }
}

const options = {
  setHeaders: (res) => {
    res.set("accept-ranges", "none")
  },
}

app.use(excludeRoute("/", express.static("build", options)))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  // res.header("X-Frame-Options", "DENY")
  next()
})

//app.use(excludeRoute("/", ExpressStaticGzip("build")))
//Use the above commented line when needs to server gzipped files in prod build on local evironment

function getInitialStore(newState, isPreloaded = false, isMobile = false) {
  let store = ""
  if (isPreloaded) {
    const data = {}
    newState.forEach((state) => {
      data[state.initialStateKey] = state.initialStateValue
    })
    data.app = {
      // ...initialAppState,
      ...data.app,
      isMobile,
    }
    store = createStore(reducer, data)
  } else {
    store = createStore(reducer)
  }
  return store
}

function getHtml(store, isMobile, req) {
  const preloadedState = store.getState()
  const context = {}
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {
          isMobile
            ? <AdaptiveRoutes path={req.path} params={req.query} hostname={req.hostname} />
            : <DesktopRoutes path={req.path} params={req.query} hostname={req.hostname} />
        }
      </StaticRouter>
    </Provider>
  )
  return { preloadedState, html }
}

function sendDocToClient(req, res, cssLinks, stringHtml) {
  fs.readFile("./build/index.html", "utf8", (err, data) => {
    try {
      if (err) throw err
      let document = data.replace(/<\/head>/, `${cssLinks}</head>`)
      document = document.replace("<div id=\"root\"></div>", stringHtml)

      /*
        React Helmet Data
        Insert it just after the head tag in rendered html
      */
      const helmet = Helmet.renderStatic()
      const reactHelmetData = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      `
      document = document.replace("<head>", `<head>${reactHelmetData}`)
      res.send(document)
    } catch (e) {
      //eslint-disable-next-line
      console.log("fs.readFile failed in sendDocToClient", e, stringHtml)
      res.send(getFileOpenFailedErrorPage())
    }
  })
}

function getDivWithPreloadedState(html, preloadedState) {
  return `
    <div id="root">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, "\\u003c")}
    </script>
  `
}

// function getCookieValue(key, req) {
//   let value = ""
//   try {
//     const cookie = req.headers.cookie
//     const values = cookie && cookie.split(";")
//     let tokenString = ""
//     values.forEach((data) => {
//       if (data.indexOf(key) >= 0) {
//         tokenString = data
//       }
//     })
//     value = tokenString.split(`${key}=`)[1]
//   } catch (e) {
//     console.log("cookie parsing failed", e) //eslint-disable-line
//     value = false
//   }
//   return value
// }

function getNormalData(preloadedState, html, req, res, isMobile) {
  // preloadedState.auth.isAuthenticated = false//!!getCookieValue("accessToken", req)
  fs.readFile("./build/asset-manifest-server.json", "utf8", (err, data) => {
    try {
      if (err) throw err

      const jsonFileMap = JSON.parse(data)
      const cssLinks = isMobile
        ? getAdaptiveCss(req.url, jsonFileMap)
        : getDesktopCss(req.url, jsonFileMap)
      const stringHtml = getDivWithPreloadedState(html, preloadedState)

      sendDocToClient(req, res, cssLinks, stringHtml, isMobile)
    } catch (e) {
      //eslint-disable-next-line
      console.log("fs.readFile failed for build/asset-manifest-server.json")
      const cssLinks = isMobile ? getAdaptiveCss(req.url, {}) : getDesktopCss(req.url, {})
      const stringHtml = getDivWithPreloadedState(html, preloadedState)
      sendDocToClient(req, res, cssLinks, stringHtml, isMobile)
    }
  })
}

function sendFullPageToClient(url, isMobile, req, res) {
  const store = getInitialStore([], false)
  const { preloadedState, html } = getHtml(store, isMobile, req)
  getNormalData(preloadedState, html, req, res, isMobile)
}

app.get("*", (req, res) => {
  const userAgent = req.headers["user-agent"]
  const isMobile = isMobilePlatform(userAgent)
  const reqUrl = req.url
  sendFullPageToClient(reqUrl, isMobile, req, res)
})

app.listen(process.env.PORT || 3012, () => {
  //eslint-disable-next-line
  console.log("Server is listening")
})
