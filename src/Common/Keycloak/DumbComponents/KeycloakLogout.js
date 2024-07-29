import React, { Component, Fragment } from "react";
import Container from "../Components";
import history from "shared/history";
import Cookies from "js-cookie";
import Button from "Common/Elements/Button";
const STORAGE_KEY = "accessToken";
const STORE_LOGOUT_URL = process.env.REACT_APP_STORE_LOGOUT_URL;

class KeycloakLogout extends Component {
  logout = () => {
    const {
      logout,
      clearKeyclockDetails,
      storeTerminalId,
      keycloakAuthenticated,
      setEmailConfirmationFlag,
    } = this.props;
    // history.push("/")
    let countryCode = "in";
    if (Cookies.get("countrycode")) countryCode = Cookies.get("countrycode");
    let logoutUrl = `${STORE_LOGOUT_URL.replace(
      "{storeTerminalId}",
      storeTerminalId
    )}`;
    logoutUrl = logoutUrl.replace("{countryCode}", countryCode);
    localStorage.removeItem(STORAGE_KEY);
    clearKeyclockDetails();
    // logout()
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("logoutSuccess");
    } else {
      window.location.href = logoutUrl;
    }
  };

  render() {
    const { keycloakToken, authentication } = this.props;
    return (
      <Fragment>
        <Button
          className="btn col-4 col-md-4"
          primaryClassName="auth-f-bold"
          onClick={keycloakToken && authentication ? this.logout : ""}
        >
          Yes
        </Button>
      </Fragment>
    );
  }
}

export default Container(KeycloakLogout);
