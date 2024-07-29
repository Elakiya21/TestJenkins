import "styles/index.css"
import "core-js/es6/array"
import "core-js/es6/symbol"
import "whatwg-fetch"
import { Router } from "react-router-dom"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import { BROWSER_ID, TAB_ID } from "consts"
import { getDeviceInfo } from "shared/lib/mobileDetect"

import configureStore from "./store/configureStore"
// import "react-datepicker/dist/react-datepicker.css"
import uuid from "uuid"
import history from "shared/history"

// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

const deviceInfo = getDeviceInfo()
const isMobile = deviceInfo.isMobile
window.client = isMobile ? "m-web" : "desktop"
const tabWidth = screen.width

//eslint-disable-next-line
const preloadedStateServer = window.__PRELOADED_STATE__

//eslint-disable-next-line
delete window.__PRELOADED_STATE__ // Garbage collection for preloaded state

//initialize store from state given by server
const storeObject = configureStore(preloadedStateServer)
const { store } = storeObject

// Create browserId if not present
if (localStorage && localStorage.getItem(BROWSER_ID) === null) {
  localStorage.setItem(BROWSER_ID, uuid())
}

if (sessionStorage && sessionStorage.getItem(TAB_ID) === null) {
  sessionStorage.setItem(TAB_ID, uuid())
}

function bootstrap(Routes) {
  const extraProps = {}
  if (history) {
    extraProps.history = history
  }
  ReactDOM.hydrate(
    <Provider store={store}>
      <Router {...extraProps}>
        <Routes history={history} />
      </Router>
    </Provider>,
    document.getElementById("root"),
  )
}

import desktopRoutes from "./routes/DesktopRoutes"
import adaptiveRoutes from "./routes/AdaptiveRoutes"

function loadRoutes() {
  if (isMobile) {
    if (tabWidth >= 1024) {
      if (window.matchMedia("(orientation: landscape)").matches) {
        bootstrap(desktopRoutes)
      } else {
        bootstrap(adaptiveRoutes)
      }
    } else {
      bootstrap(adaptiveRoutes)
    }
  } else {
    bootstrap(desktopRoutes)
  }
}
loadRoutes()

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js")
}

if (window) {
  window.onerror = (/*errorMsg, url, lineNumber, column, errorObj*/) => {
    // graylog({
    // })
  }
}
