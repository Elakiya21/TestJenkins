import { connect } from "react-redux"
import get from "lodash/get"

function mapStateToProps(state) {
  const{keycloak} = state
  const userName = get(keycloak, "keycloakData.tokenParsed.name", "")
  const userProfileId = get(keycloak, "keycloakData.tokenParsed.userProfileId", "")
  const storeTerminalId = get(keycloak, "keycloakData.tokenParsed.storeTerminalId", "").toLowerCase()
  return {
    userName,
    userProfileId,
    storeTerminalId,
  }
}

export default connect(mapStateToProps)
