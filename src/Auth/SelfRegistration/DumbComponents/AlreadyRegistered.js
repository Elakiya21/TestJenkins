import React, { Component } from "react";
import Container from "../Components";
const supportEmail = process.env.REACT_APP_SUPPORT_EMAIL;

class AlreadyRegistered extends Component {
  redirectToRegister = () => {
    const { match } = this.props;
    const { id } = match.params;
    window.location.href = `/auth/${id}/self/register`;
  };
  checkRNView = (value) => {
    if (window.ReactNativeWebView) {
      if (value == "customerSupport") {
        window.ReactNativeWebView.postMessage("openMailTo");
      }
    } else {
      if (value == "customerSupport") {
        document.getElementById("supportEmail").href = `mailto:${supportEmail}`;
      }
    }
  };
  render() {
    const { match, createFormValues } = this.props;
    const { id } = match.params;
    return (
      <div className="container d-flex align-items-center justify-content-center vh-80 text-center">
        <section>
          <div className="h5">
            <span> Looks like you are already registered</span>
          </div>
          <br />
          <div>
            <a
              href={
                createFormValues && createFormValues.deviceId
                  ? `${process.env.REACT_APP_SIGN_IN_URL}${id}&device_id=${createFormValues.deviceId}`
                  : `${process.env.REACT_APP_SIGN_IN_URL}${id}`
              }
            >
              <u className="link">Click here</u>
            </a>
            &nbsp; to login now
          </div>
          <div className="mt-4">
            Trouble Signing in?
            <br />
            Please contact us on{" "}
            <a
              id="supportEmail"
              onClick={() => this.checkRNView("customerSupport")}
            >
              {supportEmail}
            </a>
          </div>
        </section>
      </div>
    );
  }
}

export default Container(AlreadyRegistered);
