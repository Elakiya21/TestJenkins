import { connect } from "react-redux"
import get from "lodash/get"

function mapStateToProps(state) {
  const userName = get(state.keycloak, "keycloakData.tokenParsed.name", "")
  const mobileNumber = get(state.keycloak, "keycloakData.tokenParsed.mobileNumber", "")
  const userProfileId = get(state.keycloak, "keycloakData.tokenParsed.userProfileId", "")
  return {
    userName,
    mobileNumber,
    userProfileId,
  }
}

export default connect(mapStateToProps)
