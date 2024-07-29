import React, { Component } from "react";
import Container from "../Components";

const supportEmail = process.env.REACT_APP_SUPPORT_EMAIL;
const signIn = process.env.REACT_APP_SIGN_IN_URL;

class RegistrationComponent extends Component {
  handleLogin = () => {
    const { match } = this.props;
    const { id } = match.params || {};
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("redirectToLoginPage");
    } else {
      document.getElementById("loginUrl").href = signIn + id;
    }
  };

  checkRNViewForEmail = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("openMailTo");
    } else {
      document.getElementById("contactUsEmail").href = `mailto:${supportEmail}`;
    }
  };

  renderVerificationMessage() {
    const { userVerificationData } = this.props;
    const {
      registrationMethod,
      userVerificationMethod,
      phoneVerified,
      emailVerified,
      mobileNumber,
      email,
    } = userVerificationData;
    if (registrationMethod === "1" || registrationMethod === "3") {
      if (userVerificationMethod === "2") {
        if (!phoneVerified && !emailVerified) {
          return `Your email and phone number are not verified. An SMS has been sent to your registered phone number (${mobileNumber}) for verification. Please complete the verification process to proceed with login.`;
        } else if (!phoneVerified) {
          return `Your phone number is not verified. An SMS has been sent to your registered phone number (${mobileNumber}) for verification. Please complete the verification process to proceed with login.`;
        } else if (!emailVerified) {
          return `Your email is not verified. An SMS has been sent to your registered phone number (${mobileNumber}) for verification. Please complete the verification process to proceed with login.`;
        }
      } else if (userVerificationMethod === "3") {
        if (!phoneVerified && !emailVerified) {
          return `Your email and phone number are not verified. An email has been sent to your registered email address (${email}) for verification. Please complete the verification process to proceed with login.`;
        } else if (!phoneVerified) {
          return `Your phone number is not verified. An email has been sent to your registered email address (${email}) for verification. Please complete the verification process to proceed with login.`;
        } else if (!emailVerified) {
          return `Your email is not verified. An email has been sent to your registered email address (${email}) for verification. Please complete the verification process to proceed with login.`;
        }
      }
    } else if (registrationMethod === "8") {
      if (!phoneVerified) {
        return `Your phone number is not verified. An SMS has been sent to your registered phone number (${mobileNumber}) for verification. Please complete the verification process to proceed with login.`;
      }
    } else if (registrationMethod === "9") {
      if (!emailVerified) {
        return `Your email is not verified. An email has been sent to your registered email address (${email}) for verification. Please complete the verification process to proceed with login.`;
      }
    }
    return null;
  }

  render() {
    const verificationMessage = this.renderVerificationMessage();
    return (
      <div className="clear">
        <div className="container d-flex align-items-center justify-content-center vh-80 px-4">
          <section className="text-center">
            {verificationMessage && (
              <div>
                {verificationMessage}
                {/* <h6 className="pt-5">
                  <a onClick={this.handleLogin} id="loginUrl">
                    Click here
                  </a>{" "}
                  to login
                </h6> */}
              </div>
            )}
            <div className="pt-5">
              <h6>Trouble Signing in?</h6>
              <h6 className="paddingBt">
                Please contact us on{" "}
                <a onClick={this.checkRNViewForEmail} id="contactUsEmail">
                  {supportEmail}
                </a>
              </h6>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Container(RegistrationComponent);
