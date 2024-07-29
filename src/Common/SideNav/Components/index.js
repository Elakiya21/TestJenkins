import { bindActionCreators } from "redux"
import { connect } from "react-redux";
import get from "lodash/get";
function mapStateToProps(state) {
  const { keycloak } = state;
  const userRoles = get(keycloak, "keycloakData.tokenParsed.userRoles", "");
  const storeId = get(keycloak, "keycloakData.tokenParsed.storeTerminalId", "");
  return {
    userRoles,
    storeId
  };
}

function mapDispatchToProps(dispatch) {
  const otherActions = bindActionCreators(
    {
    },
    dispatch
  );
  return {
    ...otherActions,
  };
}
export default connect(mapStateToProps,mapDispatchToProps);
