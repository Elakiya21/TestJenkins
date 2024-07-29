import React, { Component } from "react";
import CountDownTimer from "Auth/SelfRegistration/DumbComponents/CountDownTimer";
import { change, reduxForm } from "redux-form";
import Container from "../../../Components";
import Button from "Common/Elements/Button";
import { loginForm } from "../../../consts";
import OtpInput from "../../../../Common/DumbComponents/OtpInput";
import { isEmpty } from "lodash";
import { Fragment } from "react";
import "../../index.css";
import querystring from "query-string";
import axios from "axios";
const ipAddressApiUrl = process.env.REACT_APP_IP_ADDRESS_API_URL;
const KEYCLOAK_ACTION_TOKEN_URL =
  process.env.REACT_APP_KEYCLOAK_ACTION_TOKEN_URL;
const otpLength = process.env.REACT_APP_OTP_LENGTH;

class VerifyOtpLogin extends Component {
  state = {
    showTimer: true,
    disableButton: true,
    stopLoop: true,
    reset: false,
    showErr: false,
    showMsg: "",
    showOtpField: true,
    currentOtpMethod: "",
    isSetResendOtpValue: false,
    userName: "",
    isUserLoggingIn: false,
  };

  componentDidMount() {
    const {
      reSendLoginOtp,
      verifyLoginOtp,
      sendLoginOtpData,
      resetPinLoginData,
      dispatch,
      change,
    } = this.props;
    let querParams = querystring.parse(location.search);
    const { isResetPin } = querParams || {};
    const { userName, extension, currentOtpMethod } =
      isResetPin == "true" ? resetPinLoginData : sendLoginOtpData || {};
    reSendLoginOtp.clear();
    verifyLoginOtp.clear();
    if (currentOtpMethod == "Mobile") {
      this.setState({
        userName:
          (extension
            ? extension.includes("+")
              ? extension
              : "+" + extension
            : "+91") +
          " " +
          userName,
      });
    } else {
      this.setState({ userName: userName });
    }
    dispatch(change("OTP", ""));
    axios.get(ipAddressApiUrl).then(
      (response) => {
        var ipAddress = response.data && response.data.ip;
        dispatch(change("userIp", ipAddress));
      },
      (error) => {}
    );
    this.setState({ currentOtpMethod: currentOtpMethod });
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("resetBiometric");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { verifyLoginOtpIsFetching } = nextProps;
    const { reset } = this.state;
    if (!verifyLoginOtpIsFetching && reset) {
      this.setState({ showTimer: false, disableButton: false, reset: false });
    }
  }

  componentDidUpdate() {
    const {
      verifyLoginOtpData,
      verifyLoginOtpIsFetching,
      createFormValues,
      loginBasicDeatils,
      verifyLoginOtpErr,
      history,
      match,
      verifyLoginOtpMsg,
      reSendOtpData,
      reSendOtpIsFetching,
    } = this.props;
    const { isSetResendOtpValue, isUserLoggingIn } = this.state;
    const { userIp } = createFormValues || {};
    const { device_id, client_id } = loginBasicDeatils || {};
    const { id } = match.params;
    if (
      verifyLoginOtpData &&
      !isEmpty(verifyLoginOtpData) &&
      !verifyLoginOtpIsFetching
    ) {
      if (
        verifyLoginOtpData.actionToken &&
        !isEmpty(verifyLoginOtpData.actionToken)
      ) {
        if (!isUserLoggingIn) {
          this.setState({ isUserLoggingIn: true });
          window.location.href = `${KEYCLOAK_ACTION_TOKEN_URL}?client_id=${client_id}&key=${verifyLoginOtpData.actionToken}&userIp=${userIp}`;
        }
      } else if (
        verifyLoginOtpMsg &&
        !isEmpty(verifyLoginOtpMsg) &&
        isEmpty(verifyLoginOtpErr) &&
        device_id &&
        !isEmpty(device_id)
      ) {
        history.push(`/auth/${id}/login/mobile/set-pin`);
      }
    }
    if (
      !reSendOtpIsFetching &&
      isSetResendOtpValue &&
      reSendOtpData &&
      !isEmpty(reSendOtpData)
    ) {
      if (reSendOtpData.currentOtpMethod)
        this.setState({
          currentOtpMethod: reSendOtpData.currentOtpMethod,
        });
      if (reSendOtpData.alternativeUserName) {
        if (reSendOtpData.currentOtpMethod == "Email")
          this.setState({ userName: reSendOtpData.alternativeUserName });
        else
          this.setState({
            userName: "+91 " + reSendOtpData.alternativeUserName,
          });
      } else {
        if (reSendOtpData.currentOtpMethod == "Email")
          this.setState({ userName: reSendOtpData.userName });
        else this.setState({ userName: "+91 " + reSendOtpData.userName });
      }
      this.setState({
        isSetResendOtpValue: false,
      });
    }
  }

  handleSubmit = () => {
    const {
      createFormIsValid,
      verifyLoginOtp,
      submit,
      reSendLoginOtp,
      createFormValues,
      loginBasicDeatils,
    } = this.props;
    const { device_id } = loginBasicDeatils || {};
    reSendLoginOtp.clear();
    verifyLoginOtp.clear();
    submit(loginForm);
    if (createFormIsValid && createFormValues && createFormValues.OTP) {
      this.setState({ showErr: false, showMsg: "" });
      verifyLoginOtp.request({ deviceId: device_id });
      this.setState({ reset: true });
    } else {
      this.setState({
        showErr: true,
        showMsg: "Please enter a valid otp",
        disableButton: false,
      });
    }
  };

  resendOTP = (isAleternative) => {
    const { reSendLoginOtp, customerId, verifyLoginOtp, dispatch, change } =
      this.props;
    const { currentOtpMethod } = this.state || {};
    verifyLoginOtp.clear();
    dispatch(change("OTP", ""));
    this.setState({
      showTimer: "",
      disableButton: true,
      showOtpField: false,
      showErr: false,
      showMsg: "",
      isSetResendOtpValue: true,
    });
    setTimeout(() => {
      this.setState({ showOtpField: true });
    }, 1);
    if (isAleternative) {
      reSendLoginOtp.request({
        currentOtpMethod: currentOtpMethod == "Mobile" ? "Email" : "Mobile",
      });
    } else {
      reSendLoginOtp.request({
        currentOtpMethod: currentOtpMethod,
      });
    }
  };

  setChanged = () => {
    const { reSendLoginOtp } = this.props;
    reSendLoginOtp.clear();
    this.setState({ disableButton: false, showTimer: "" });
    return null;
  };

  onOtpSubmit = (otp) => {
    const { dispatch, change } = this.props;
    dispatch(change("OTP", otp));
  };
  onOtpUndo = () => {
    const { dispatch, change } = this.props;
    dispatch(change("OTP", ""));
  };

  render() {
    const {
      reSendOtpIsFetching,
      verifyLoginOtpErr,
      reSendOtpCode,
      reSendOtpErr,
      verifyLoginOtpIsFetching,
      sendLoginOtpData,
      resetPinLoginData,
    } = this.props;
    const {
      showTimer,
      showErr,
      showMsg,
      showOtpField,
      currentOtpMethod,
      userName,
      isUserLoggingIn,
    } = this.state;
    const timer = {
      sec: 30,
      min: 1,
      content: "Resend OTP in ",
      showDisable: true,
    };
    let querParams = querystring.parse(location.search);
    const { isResetPin } = querParams || {};
    const err = verifyLoginOtpErr || reSendOtpErr || "";
    const { registrationMethod } =
      isResetPin == "true" ? resetPinLoginData : sendLoginOtpData || {};
    return (
      <div className="container auth-login pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">
          OTP Verification
        </h2>
        <div className="text-center mt-4">
          OTP has been sent to {`${userName}`}
        </div>
        <section className="mt-4">
          <div className="row justify-content-center">
            <div className="col-12 col-md-5 mx-3">
              <div>
                <div className="text-start mb-1 auth-f-bold">
                  <label>Enter OTP</label>
                </div>
                <div className="d-flex">
                  <div className="col-12">
                    {showOtpField && (
                      <OtpInput
                        length={+otpLength}
                        onOtpSubmit={this.onOtpSubmit}
                        onOtpUndo={this.onOtpUndo}
                      />
                    )}
                  </div>
                </div>
              </div>
              {(showTimer || reSendOtpCode == "200") && (
                <div className="text-end mt-1">
                  <CountDownTimer timer={timer} setChanged={this.setChanged} />
                </div>
              )}
              <div className="text-center pt-4 mb-4">
                <Button
                  className="btn col-12"
                  onClick={this.handleSubmit}
                  disabled={verifyLoginOtpIsFetching || isUserLoggingIn}
                >
                  {verifyLoginOtpIsFetching || isUserLoggingIn
                    ? "Verifying OTP..."
                    : "Verify"}
                </Button>
              </div>
            </div>
          </div>
          {!isUserLoggingIn &&
            showTimer === false &&
            (!reSendOtpCode || reSendOtpCode !== "200") && (
              <Fragment>
                <div className="text-center">
                  Didn't get OTP?{" "}
                  <a
                    onClick={
                      this.state.disableButton ||
                      reSendOtpIsFetching ||
                      verifyLoginOtpIsFetching ||
                      isUserLoggingIn
                        ? null
                        : () => this.resendOTP(false)
                    }
                    disabled={
                      reSendOtpIsFetching ||
                      verifyLoginOtpIsFetching ||
                      isUserLoggingIn
                    }
                  >
                    Resend OTP
                  </a>
                </div>
                {registrationMethod &&
                  ["1", "2", "3"].includes(registrationMethod) && (
                    <Fragment>
                      <div
                        className="mt-3 text-center col-12 inline-hr"
                        id="or"
                      >
                        <hr className="me-2" />
                        or
                        <hr className="ms-2" />
                      </div>
                      <div className="mt-3 text-center">
                        <Button
                          className="btn col-11 col-md-5 btn-custom"
                          onClick={() => this.resendOTP(true)}
                          disabled={
                            reSendOtpIsFetching ||
                            verifyLoginOtpIsFetching ||
                            isUserLoggingIn
                          }
                        >
                          {currentOtpMethod === "Email"
                            ? "Get an OTP on your mobile"
                            : "Get an OTP on your email"}
                        </Button>
                      </div>
                    </Fragment>
                  )}
              </Fragment>
            )}
          {(showErr || err) && (
            <div className="text-danger mt-4 text-center">{showMsg || err}</div>
          )}
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
})(VerifyOtpLogin);

export default Container(form);
