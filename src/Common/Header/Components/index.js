import { connect } from "react-redux"
import get from "lodash/get"
import { bindActionCreators } from "redux"
import { submit } from "redux-form"
import { getCrudActionsForDispatch } from "Auth/Common/helpers"
import * as actions from "./actions"

function mapStateToProps(state) {
  const{keycloak, header,} = state
  const{ getHeaderFooter, subHeaderUpdated } = header
  const userName = get(keycloak, "keycloakData.tokenParsed.name", "")
  const userProfileId = get(keycloak, "keycloakData.tokenParsed.userProfileId", "")
  const storeTerminalId = get(keycloak, "keycloakData.tokenParsed.storeTerminalId", "").toLowerCase()
  return {
    userName,
    userProfileId,
    storeTerminalId,
    subHeaderUpdated,
    keycloak,
    getHeaderFooterValue: get(getHeaderFooter, "data", {}),

  }
}

const mapDispatchToProps = (dispatch) => {
  const crudActionsWithDispatch = getCrudActionsForDispatch(actions, dispatch)
  const otherActions = bindActionCreators({ ...actions, 
    submit}, dispatch)
  return {
    ...crudActionsWithDispatch,
    ...otherActions,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
