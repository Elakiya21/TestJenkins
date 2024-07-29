import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router";
import { setServerVariables } from "shared/helper";
import Header from "Common/Header/DumbComponents";
import { isServer } from "consts";
import Container from "App/Components";
import Footer from "Common/Footer/DumbComponents";
import VerifyUser from "Auth/UserVerification/DumbComponents";
import UserVerified from "Auth/UserVerification/DumbComponents/VerificationSuccessful";
import UserVerificationFailedModal from "Auth/UserVerification/DumbComponents/UserVerificationFailedModal";
import UserVerificationFailed from "Auth/UserVerification/DumbComponents/UserVerificationFailed";
import AlreadyRegistered from "Auth/SelfRegistration/DumbComponents/AlreadyRegistered";
import SelfUserVerified from "Auth/SelfRegistration/DumbComponents/AccountVerified";
import CreatePin from "Auth/SelfRegistration/DumbComponents/CreatePin";
import UpdateUser from "../../../Auth/UserVerification/DumbComponents/UpdateUser";
import UpdateUserName from "../../../Auth/UserVerification/DumbComponents/UpdateUserName";
import VerifyLinkExpired from "../../../Auth/UserVerification/DumbComponents/VerifyLinkExpired";
import RegisterMobileNumber from "Auth/SelfRegistration/DumbComponents/RegisterMobileNumber";
import RegisteredMobileOtp from "Auth/SelfRegistration/DumbComponents/RegisteredMobileOtp";
import RegisterFullName from "Auth/SelfRegistration/DumbComponents/RegisterFullName";
import RegisterEmailAddress from "Auth/SelfRegistration/DumbComponents/RegisterEmailAddress";
import RegisterEmailOtp from "Auth/SelfRegistration/DumbComponents/RegisteredEmailOtp";
import SelfRegistrationSuccessful from "Auth/SelfRegistration/DumbComponents/RegistrationSuccessful";
import VerifiedUserCreatePin from "../../../Auth/UserVerification/DumbComponents/CreatePin";
import InitialLogin from "Auth/Login/DumbComponents/InitialLogin";
import LoginUserVerificationMessage from "Auth/Login/DumbComponents/UserVerificationMessage";
import BiometricLogin from "Auth/Login/DumbComponents/Mobile/BiometricLogin";
import PinLogin from "Auth/Login/DumbComponents/Mobile/PinLogin";
import VerifyPinLogin from "Auth/Login/DumbComponents/Mobile/PinLogin/VerifyPinLogin";
import OTPLogin from "Auth/Login/DumbComponents/Mobile/OTPLogin";
import VerifyOtpLogin from "Auth/Login/DumbComponents/Mobile/OTPLogin/VerifyOtpLogin";
import MobileSetPin from "Auth/Login/DumbComponents/Mobile/OTPLogin/SetPin";
import EmailBiometricLogin from "Auth/Login/DumbComponents/Email/BiometricLogin";
import EmailPinLogin from "Auth/Login/DumbComponents/Email/PinLogin";
import EmailVerifyPinLogin from "Auth/Login/DumbComponents/Email/PinLogin/VerifyPinLogin";
import EmailOTPLogin from "Auth/Login/DumbComponents/Email/OTPLogin";
import EmailVerifyOtpLogin from "Auth/Login/DumbComponents/Email/OTPLogin/VerifyOtpLogin";
import EmailMobileSetPin from "Auth/Login/DumbComponents/Email/OTPLogin/SetPin";
import LoginWithOtp from "Auth/Login/DumbComponents/MagicLinkLogin/LoginWithOtp";
import LoginErrorPage from "Auth/Login/DumbComponents/ErrorPage.js";
import KnownUserMagicLinkPage from "Auth/MagicLink/DumbComponents/KnownUserMagicLinkPage";
import UnknownUserMagicLinkPage from "Auth/MagicLink/DumbComponents/UnknownUserMagicLinkPage";
import "../style.css";
import { isEmpty } from "lodash";
import { handleAuthPlaceHolderGlow } from "../../helpers.js";
import KeycloakLogin from "Common/Keycloak/DumbComponents/KeycloakLogin";
import querystring from "query-string";
import SlidingWrapper from "../SlidingWrapper.js"
setServerVariables();

class App extends Component {
  state = {
    isLoadedNonLoggedInHeader: false,
  };

  componentWillMount() {
    const { checkKeycloakAuthentication } = this.props;
    checkKeycloakAuthentication(true);
  }
  componentDidMount() {
    document.title = "Auth";
    const { getHeaderFooterClear, getHeaderFooterRequest } = this.props
    let isRNView = false
    if (window.ReactNativeWebView) {
      isRNView = true;
    }
    let pathname = window.location.pathname.split("/");
    if (pathname && !isEmpty(pathname)) {
      getHeaderFooterClear()
      getHeaderFooterRequest({
        storeId: pathname[2],
        isLogged: false,
        isRNView: isRNView,
      });
    }
  }

  render() {
    const url = window.location.pathname.substring(
      0,
      window.location.pathname.lastIndexOf("/")
    );
    const { getHeaderFooterValue, isCheckKeycloakAuthentication } = this.props;
    let isFromKeycloak = false;
    let queryParams = querystring.parse(window.location.search);
    if (
      queryParams &&
      !isEmpty(queryParams.redirect_uri) &&
      queryParams.redirect_uri.includes("isFromKeycloak")
    )
      isFromKeycloak = true;
    if (isServer) {
      return null;
    }
    return (
      <div
        className={`app adaptive ${
          window.location.pathname.includes("/auth/verify/failed")
            ? ""
            : url.includes("/verify") || url.includes("/self")
            ? "page"
            : ""
        }`}
      >
        {window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/login/magic-link") &&
        isCheckKeycloakAuthentication &&
        !isFromKeycloak ? (
          <KeycloakLogin />
        ) : (
          ""
        )}
        {/* {window.location.pathname.includes("/auth/verify/failed") ||
        window.location.pathname.includes("magic-link") ? (
          ""
        ) : (
          <Header />
        )} */}
        {isEmpty(getHeaderFooterValue) &&
        !window.location.pathname.includes("/auth/verify/failed") &&
        !window.location.pathname.includes("magic-link") ? (
          handleAuthPlaceHolderGlow()
        ) : (
          <div className="auth-main-nl">
            <Switch>
              <Route
                path="/auth/:storeId/verify/update-user-name/:id"
                exact
                component={UpdateUserName}
              />
              <Route
                path="/auth/:storeId/verify/update-user/:id"
                exact
                component={UpdateUser}
              />
              <Route
                path="/auth/:id/verify/link-expired/:id"
                exact
                component={VerifyLinkExpired}
              />
              <Route
                path="/auth/:id/verify/confirmation"
                exact
                component={UserVerified}
              />
              <Route
                path="/auth/:id/verify/failed"
                exact
                component={UserVerificationFailed}
              />
              <Route
                path="/auth/:storeId/verify/create-pin/:id"
                exact
                component={VerifiedUserCreatePin}
              />
              <Route
                path="/auth/:storeId/verify/:id"
                exact
                component={VerifyUser}
              />
              <Route
                path="/auth/verify/failed"
                exact
                component={UserVerificationFailedModal}
              />
              <Route
                path="/auth/:id/self/register"
                exact
                component={RegisterMobileNumber}
              />
              <Route
                path="/auth/:id/self/mobile-verification"
                exact
                component={RegisteredMobileOtp}
              />
              <Route
                path="/auth/:id/self/register-name"
                exact
                component={RegisterFullName}
              />
              <Route
                path="/auth/:id/self/register-email"
                exact
                component={RegisterEmailAddress}
              />
              <Route
                path="/auth/:id/self/email-verification"
                exact
                component={RegisterEmailOtp}
              />
              <Route
                path="/auth/:id/self/create-pin"
                exact
                component={CreatePin}
              />
              <Route
                path="/auth/:id/self/verified"
                exact
                component={SelfRegistrationSuccessful}
              />
              <Route
                path="/auth/:id/self/already-registered"
                exact
                component={AlreadyRegistered}
              />
              <Route
                path="/auth/:id/self/verify/confirmation"
                exact
                component={SelfUserVerified}
              />
              <Route
                path="/auth/login/error-page"
                exact
                component={LoginErrorPage}
              />
              <Route
                path="/auth/user-magic-link/:id"
                exact
                component={KnownUserMagicLinkPage}
              />
              <Route
                path="/auth/magic-link/:id"
                exact
                component={UnknownUserMagicLinkPage}
              />
              <Route
                path="/auth/:storeId/login/magic-link"
                exact
                component={LoginWithOtp}
              />
              <Route path="/auth/:id/login" exact component={InitialLogin} />
              <Route
                path="/auth/:id/login/user-verification-message"
                exact
                component={LoginUserVerificationMessage}
              />
              <Route
                path="/auth/:id/login/mobile/biometric"
                exact
                component={BiometricLogin}
              />
              <Route
                path="/auth/:id/login/mobile/pin"
                exact
                render={(props) => (
                  <SlidingWrapper {...props}>
                    <PinLogin {...props} />
                  </SlidingWrapper>
                )}
                //component={PinLogin}
              />
              <Route
                path="/auth/:id/login/mobile/pin/verify"
                exact
                component={VerifyPinLogin}
              />
              <Route
                path="/auth/:id/login/mobile/otp"
                exact
                component={OTPLogin}
              />
              <Route
                path="/auth/:id/login/mobile/set-pin"
                exact
                component={MobileSetPin}
              />
              <Route
                path="/auth/:id/login/mobile/otp/verify"
                exact
                component={VerifyOtpLogin}
              />
              <Route
                path="/auth/:id/login/email/biometric"
                exact
                component={EmailBiometricLogin}
              />
              <Route
                path="/auth/:id/login/email/pin"
                exact
                //component={EmailPinLogin}
                render={(props) => (
                  <SlidingWrapper {...props}>
                              <Header />

                    <EmailPinLogin {...props} />
                    <Footer />

                  </SlidingWrapper>
                )}
              />
              <Route
                path="/auth/:id/login/email/pin/verify"
                exact
                component={EmailVerifyPinLogin}
              />
              <Route
                path="/auth/:id/login/email/otp"
                exact
                component={EmailOTPLogin}
              />
              <Route
                path="/auth/:id/login/email/set-pin"
                exact
                component={EmailMobileSetPin}
              />
              <Route
                path="/auth/:id/login/email/otp/verify"
                exact
                component={EmailVerifyOtpLogin}
              />
            </Switch>
          </div>
        )}
        {/* {window.ReactNativeWebView ||
        window.location.pathname.includes("/auth/verify/failed") ||
        window.location.pathname.includes("magic-link") ? (
          ""
        ) : (
          // <Footer />
        )} */}
      </div>
    );
  }
}

export default Container(withRouter(App));
