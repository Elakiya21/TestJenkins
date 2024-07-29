import { connect } from "react-redux";
import get from "lodash/get";
import { bindActionCreators } from "redux";
import { crudActions as crudActionOrgGroup } from "../../Common/Header/Components/actions";
import {
  setSubHeader,
} from "../../Common/Header/Components/actions";
import { submit } from "redux-form";
import {
  keycloakAuthenticated,
  clearKeyclockDetails,
  checkKeycloakAuthentication
} from "Common/Keycloak/Components/actions";

export const isClient = typeof window !== "undefined" && window.document;
export const isServer = !isClient;

function mapStateToProps(state) {
  const { header } = state;
  const { authentication, keycloakData, isCheckKeycloakAuthentication } = state.keycloak;

  const {
    getHeaderFooter,
    isKycPendingHeaderLoggedin,
    subHeaderUpdated,
  } = header;
  const roles = get(
    keycloakData.tokenParsed,
    "resource_access.upm-auth-webapp.roles",
    []
  );
  const currentUser = get(keycloakData.tokenParsed, "name", "");
  const adminAccess =
    roles && roles.length > 0 && roles.indexOf("admin") !== -1;
  const storeTerminalId = get(
    keycloakData,
    "tokenParsed.storeTerminalId",
    ""
  ).toLowerCase();
  return {
    storeTerminalId,
    authentication,
    adminAccess,
    currentUser,
    headerFooterErr: get(
      getHeaderFooter.error,
      "statusMessage.description",
      ""
    ),
    getHeaderFooterValue: get(getHeaderFooter, "data", {}),
    getHeaderIsFetching: getHeaderFooter.isFetching,
    subHeaderUpdated,
    isKycPendingHeaderLoggedin,
    isCheckKeycloakAuthentication
  };
}

const mapDispatchToProps = (dispatch) => {
  const otherActions = bindActionCreators(
    {
      getHeaderFooterRequest: crudActionOrgGroup.getHeaderFooter.request,
      getHeaderFooterClear: crudActionOrgGroup.getHeaderFooter.clear,
      keycloakAuthenticated,
      clearKeyclockDetails,
      setSubHeader,
      checkKeycloakAuthentication,
      submit,
    },
    dispatch
  );
  return {
    ...otherActions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
