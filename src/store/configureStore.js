import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import thunk from "redux-thunk"
import createLogger from "redux-logger"
import history from "shared/history"
import { routerMiddleware } from "react-router-redux"
import { keyForReduxState } from "./consts"
import { saveStoreInSessionStorage, getFromSessionStorage } from "./storeHelpers"
import { loadDataFromSessionStorage } from "./actions"
import rootReducer, { createReducer } from "reducers/rootReducer"
import sagas from "./sagas"

const blackListState = [
  ["infiniteScroll"],
]

let reduxDevTools = false
// const history = createHistory()
const router = routerMiddleware(history)
export const sagaMiddleware = createSagaMiddleware()

const middlewares = [thunk, router, sagaMiddleware]

if (process.env.NODE_ENV === "development") {
  reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ //eslint-disable-line no-underscore-dangle
  middlewares.push(createLogger({
    level: "info",
    collapsed: true,
  }))
}

const composeEnhancers = reduxDevTools || compose
const enhancer = applyMiddleware(...middlewares)

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, composeEnhancers(enhancer))
  sagaMiddleware.run(sagas)
  if (window) {
    window.addEventListener("beforeunload", () => {
      saveStoreInSessionStorage(store, blackListState, keyForReduxState)
    })
    window.addEventListener("unload", () => {
      saveStoreInSessionStorage(store, blackListState, keyForReduxState)
    })
    window.addEventListener("pageshow", () => {
      saveStoreInSessionStorage(store, blackListState, keyForReduxState)
    })
    window.addEventListener("pagehide", () => {
      saveStoreInSessionStorage(store, blackListState, keyForReduxState)
    })
    const stateInSession = getFromSessionStorage(keyForReduxState)
    store.dispatch(loadDataFromSessionStorage(JSON.parse(stateInSession)))
  }
  store.asyncReducers = {}
  return { store, history }
}

export function injectAsyncReducer(store, name, reducer) {
  //eslint-disable-next-line
  store.asyncReducers[name] = reducer
  store.replaceReducer(createReducer(store.asyncReducers))
}
