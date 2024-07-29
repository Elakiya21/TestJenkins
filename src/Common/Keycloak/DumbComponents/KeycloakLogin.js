import { Component } from "react";
import Container from "../Components";
import Cookies from "js-cookie";
import querystring from "query-string";
import { isEmpty } from "lodash";

class KeycloakLogin extends Component {
  componentDidMount() {
    const { checkKeycloakAuthentication } = this.props;
    checkKeycloakAuthentication(false);

    let redirectUrl = "";
    let clientId = "";
    let queryParams = querystring.parse(location.search);

    if (queryParams && !isEmpty(queryParams.redirect_uri)) {
      redirectUrl = queryParams.redirect_uri;
      delete queryParams.redirect_uri;
    }
    if (queryParams && !isEmpty(queryParams.client_id)) {
      clientId = queryParams.client_id;
      delete queryParams.client_id;
    }
    if (isEmpty(redirectUrl)) {
      redirectUrl = Cookies.get("redirectUrl");
      let userLoggedIn = Cookies.get("userLoggedIn");
      if (
        redirectUrl.includes("isFromKeycloak") &&
        userLoggedIn &&
        userLoggedIn === "true"
      ) {
        const urlObject = new URL(redirectUrl);
        urlObject.searchParams.delete("isFromKeycloak");
        redirectUrl = urlObject.toString();
      }
    }
    if (isEmpty(clientId)) {
      clientId = Cookies.get("clientId");
    }
    if (
      redirectUrl &&
      !isEmpty(redirectUrl) &&
      !redirectUrl.includes("isFromKeycloak") &&
      !isEmpty(redirectUrl) &&
      clientId
    ) {
      const keycloakUrl = `${process.env.REACT_APP_KEYCLOCK_URL}/realms/${process.env.REACT_APP_KEYCLOCK_REALM}/protocol/openid-connect/auth`;
      const queryParamsForKeycloak = {
        client_id: clientId,
        redirect_uri: redirectUrl,
        response_mode: "query",
        response_type: "code",
        scope: "openid",
        ...queryParams,
      };
      const keycloakLoginUrl = `${keycloakUrl}?${querystring.stringify(
        queryParamsForKeycloak
      )}`;
      window.location.href = keycloakLoginUrl;
    }
  }
  render() {
    return null;
  }
}

export default Container(KeycloakLogin);
