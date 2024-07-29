import React, { Component } from "react";
import { reduxForm } from "redux-form";
import Container from "../../../Components";
import Button from "Common/Elements/Button";
import OtpInput from "../../../../Common/DumbComponents/OtpInput";
import isEmpty from "lodash/isEmpty";
import { loginForm } from "../../../consts";
import axios from "axios";
const ipAddressApiUrl = process.env.REACT_APP_IP_ADDRESS_API_URL;
const KEYCLOAK_ACTION_TOKEN_URL =
  process.env.REACT_APP_KEYCLOAK_ACTION_TOKEN_URL;

class VerifyPinLogin extends Component {
  state = {
    showErr: false,
    showMsg: "",
    isUserLoggingIn: false,
  };

  componentDidMount() {
    const { verifyPinLogin, resetPinLogin, dispatch, change } = this.props;
    verifyPinLogin.clear();
    resetPinLogin.clear();
    axios.get(ipAddressApiUrl).then(
      (response) => {
        var ipAddress = response.data && response.data.ip;
        dispatch(change("userIp", ipAddress));
      },
      (error) => {}
    );
    dispatch(change("pin", ""));
  }
  onSubmitPin = (pin) => {
    const { dispatch, change } = this.props;
    dispatch(change("pin", pin));
  };

  onPinUndo = () => {
    const { dispatch, change } = this.props;
    dispatch(change("pin", ""));
  };
  handleResetPin = () => {
    const { verifyPinLogin, resetPinLogin } = this.props;
    verifyPinLogin.clear();
    resetPinLogin.clear();
    resetPinLogin.request();
  };

  handleSubmit = () => {
    const { verifyPinLogin } = this.props;
    verifyPinLogin.clear();
    verifyPinLogin.request({ validateUser: false });
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      verifyPinLoginData,
      createFormValues,
      verifyPinLoginIsFetching,
      loginBasicDeatils,
      resetPinLoginIsFetching,
      resetPinLoginErr,
      resetPinLoginData,
      verifyPinLoginErr,
      match,
      history,
      dispatch,
      change,
    } = this.props;
    const { id } = match.params;
    const { userIp } = createFormValues || {};
    const { device_id, client_id } = loginBasicDeatils || {};
    const { isUserLoggingIn } = this.state;
    if (
      !verifyPinLoginIsFetching &&
      !isEmpty(verifyPinLoginData) &&
      verifyPinLoginData.actionToken &&
      !isEmpty(verifyPinLoginData.actionToken) &&
      !isUserLoggingIn
    ) {
      this.setState({ isUserLoggingIn: true });
      window.location.href = `${KEYCLOAK_ACTION_TOKEN_URL}?client_id=${client_id}&key=${verifyPinLoginData.actionToken}&userIp=${userIp}&device_id=${device_id}`;
    }
    if (
      !resetPinLoginIsFetching &&
      isEmpty(resetPinLoginErr) &&
      !isEmpty(resetPinLoginData)
    ) {
      history.push(`/auth/${id}/login/email/otp/verify?isResetPin=true`);
    }
  }

  render() {
    const {
      verifyPinLoginErr,
      verifyPinLoginIsFetching,
      verifyPinLoginValidationErr,
      resetPinLoginErr,
      resetPinLoginIsFetching,
    } = this.props;
    const { showMsg, showErr, isUserLoggingIn } = this.state || {};
    const err =
      verifyPinLoginErr ||
      verifyPinLoginValidationErr ||
      resetPinLoginErr ||
      "";
    return (
      <div className="container auth-login pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">Verify PIN</h2>
        <section className="mt-4 pt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-5 mx-3 mb-3">
              <div>
                <div className="text-start mb-1 auth-f-bold">
                  <label>Enter PIN</label>
                </div>
                <OtpInput
                  length={4}
                  onOtpSubmit={this.onSubmitPin}
                  type="password"
                  initialSetFocus={true}
                  onOtpUndo={this.onPinUndo}
                />
              </div>
              <div className="text-center py-4">
                <Button
                  className="btn col-12"
                  disabled={
                    verifyPinLoginIsFetching ||
                    resetPinLoginIsFetching ||
                    isUserLoggingIn
                  }
                  onClick={this.handleSubmit}
                >
                  {verifyPinLoginIsFetching || isUserLoggingIn
                    ? "Verifying..."
                    : "Sign In"}
                </Button>
              </div>
              <div class="mt-3 text-center" id="resendOtp">
                Forgot PIN?{" "}
                <a
                  onClick={
                    verifyPinLoginIsFetching ||
                    resetPinLoginIsFetching ||
                    isUserLoggingIn
                      ? ""
                      : this.handleResetPin
                  }
                >
                  Reset
                </a>
              </div>
            </div>
            {(showErr || err) && (
              <div className="text-danger mt-4 text-center">
                {showMsg || err}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

const form = reduxForm({
  form: loginForm,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: () => {},
})(VerifyPinLogin);

export default Container(form);
