import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as actions from "./actions"
import get from "lodash/get"
import { setEmailConfirmationFlag } from "../../../Auth/SelfRegistration/Components/actions"

export const isClient = typeof window !== "undefined" && window.document
export const isServer = !isClient
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

function mapStateToProps(state) {
  const { authentication, keycloakData, isCheckKeycloakAuthentication } = state.keycloak
  const { token, logout } = keycloakData
  const storeTerminalId = get(keycloakData, "tokenParsed.storeTerminalId", "").toLowerCase()
  return {
    authentication,
    keycloakToken: token,
    storeTerminalId,
    logout,
    isCheckKeycloakAuthentication
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...actions,
    setEmailConfirmationFlag,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
