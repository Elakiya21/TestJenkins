import React, { Component, Fragment } from "react";
import CountDownTimer from "./CountDownTimer";
import { change, reduxForm } from "redux-form";
import Container from "../../Components";
import Button from "Common/Elements/Button";
import { loginForm } from "../../consts";
import OtpInput from "../../../Common/DumbComponents/OtpInput";
import { isEmpty } from "lodash";
import { handleMgaicLoginPlaceHolderGlow } from "../../helpers.js";
import axios from "axios";
import querystring from "query-string";
import lock from "images/lock.png";
import { maskEmail, maskPhoneNumber } from "../../../helpers.js";
import { USER_MOBILE_NUMBER_OR_EMAIL_IS_NOT_VERIRFIED } from "../../consts.js";
const otpLength = process.env.REACT_APP_OTP_LENGTH;
const KEYCLOAK_ACTION_TOKEN_URL =
  process.env.REACT_APP_KEYCLOAK_ACTION_TOKEN_URL;
const MAGIC_LINK_LOGIN_CLIENT_ID =
  process.env.REACT_APP_MAGIC_LINK_LOGIN_CLIENT_ID;
const ipAddressApiUrl = process.env.REACT_APP_IP_ADDRESS_API_URL;

class LoginWithOtp extends Component {
  state = {
    showTimer: false,
    disableButton: true,
    stopLoop: true,
    reset: false,
    showErr: false,
    showMsg: "",
    showOtpField: true,
    loading: false,
    userName: "",
    isCallSendMagicLinkLoginOtpApi: true,
    userIp: "",
    showSendOtpErrMsg: "",
  };

  componentDidMount() {
    const {
      verifyMagicLinkLoginOtp,
      match,
      reSendMagicLinkLoginOtp,
      sendMagicLinkLoginOtp,
    } = this.props;
    const { storeId } = match.params || {};
    sendMagicLinkLoginOtp.clear();
    reSendMagicLinkLoginOtp.clear();
    verifyMagicLinkLoginOtp.clear();
    let qureyParams = querystring.parse(location.search);
    const { userTerminalId } = qureyParams || {};
    sendMagicLinkLoginOtp.request({
      userTerminalId: userTerminalId,
      storeTerminalId: storeId,
    });
    axios.get(ipAddressApiUrl).then(
      (response) => {
        var ipAddress = response.data && response.data.ip;
        this.setState({ userIp: ipAddress });
      },
      (error) => {}
    );
  }

  componentWillReceiveProps(nextProps) {
    const { initialize, match, history, setUserVerificationData } = this.props;
    const { storeId } = match.params || {};
    const {
      sendMagicLinkLoginOtpIsFetching,
      actionToken,
      verifyMagicLinkLoginOtpIsFetching,
      verifyMagicLinkLoginOtpMessage,
      sendMagicLinkLoginOtpData,
      sendMagicLinkLoginOtpValidationError,
      sendMagicLinkLoginOtpErr,
    } = nextProps;
    let param = querystring.parse(location.search);
    const { deviceId } = param || {};
    const { reset, isCallSendMagicLinkLoginOtpApi, userIp } = this.state;
    if (!sendMagicLinkLoginOtpIsFetching && reset) {
      this.setState({ showTimer: false, disableButton: false, reset: false });
    }
    if (
      sendMagicLinkLoginOtpData &&
      !isEmpty(sendMagicLinkLoginOtpData) &&
      !sendMagicLinkLoginOtpIsFetching &&
      isCallSendMagicLinkLoginOtpApi
    ) {
      if (
        !sendMagicLinkLoginOtpValidationError &&
        isEmpty(sendMagicLinkLoginOtpValidationError) &&
        !sendMagicLinkLoginOtpErr &&
        isEmpty(sendMagicLinkLoginOtpErr)
      ) {
        let addInitialValues = {};
        if (sendMagicLinkLoginOtpData.storeLoginType == "MOBILE") {
          addInitialValues.maskedUserName =
            "+91 " + maskPhoneNumber(sendMagicLinkLoginOtpData.userName) || "";
        } else {
          addInitialValues.maskedUserName =
            maskEmail(sendMagicLinkLoginOtpData.userName) || "";
        }
        addInitialValues.userName = sendMagicLinkLoginOtpData.userName;
        addInitialValues.userAccountId =
          sendMagicLinkLoginOtpData.userAccountId;
        initialize(addInitialValues);
        this.setState({ showTimer: true });
      } else if (
        sendMagicLinkLoginOtpValidationError &&
        !isEmpty(sendMagicLinkLoginOtpValidationError)
      ) {
        if (
          sendMagicLinkLoginOtpValidationError ==
          USER_MOBILE_NUMBER_OR_EMAIL_IS_NOT_VERIRFIED
        ) {
          setUserVerificationData(sendMagicLinkLoginOtpData);
          history.push(`/auth/${storeId}/login/user-verification-message`);
        } else {
          this.setState({
            showSendOtpErrMsg: sendMagicLinkLoginOtpValidationError,
          });
        }
      }
      this.setState({ isCallSendMagicLinkLoginOtpApi: false });
    }
    if (
      actionToken &&
      !verifyMagicLinkLoginOtpIsFetching &&
      verifyMagicLinkLoginOtpMessage
    ) {
      this.setState({ loading: true });
      if (deviceId && !isEmpty(deviceId))
        window.location.href = `${KEYCLOAK_ACTION_TOKEN_URL}?client_id=${MAGIC_LINK_LOGIN_CLIENT_ID}&key=${actionToken}&userIp=${userIp}&device_id=${deviceId}`;
      else
        window.location.href = `${KEYCLOAK_ACTION_TOKEN_URL}?client_id=${MAGIC_LINK_LOGIN_CLIENT_ID}&key=${actionToken}&userIp=${userIp}`;
    }
  }

  handleSubmit = () => {
    const {
      createFormIsValid,
      verifyMagicLinkLoginOtp,
      submit,
      reSendMagicLinkLoginOtp,
      createFormValues,
      match,
    } = this.props;
    this.setState({ showTimer: false });
    reSendMagicLinkLoginOtp.clear();
    submit(loginForm);
    const { storeId } = match.params || {};
    let param = querystring.parse(location.search);
    if (createFormIsValid && createFormValues && createFormValues.OTP) {
      this.setState({ showErr: false, showMsg: "" });
      verifyMagicLinkLoginOtp.request({
        otp: createFormValues.OTP,
        userAccountId: createFormValues.userAccountId,
        magicLinkCode: param.magicLinkCode,
        storeTerminalId: storeId,
        userName: createFormValues.userName,
      });
      this.setState({ reset: true });
    } else {
      this.setState({
        showErr: true,
        showMsg: "Please enter a valid otp",
        disableButton: false,
      });
    }
  };

  resendMagicLinkLoginOtp = () => {
    const {
      verifyMagicLinkLoginOtp,
      dispatch,
      change,
      reSendMagicLinkLoginOtp,
      match,
    } = this.props;
    const { storeId } = match.params || {};
    let queryParams = querystring.parse(location.search);
    const { userTerminalId } = queryParams || {};
    verifyMagicLinkLoginOtp.clear();
    dispatch(change("OTP", ""));
    this.setState({
      showTimer: false,
      disableButton: true,
      showOtpField: false,
      showErr: false,
      showMsg: "",
    });
    setTimeout(() => {
      this.setState({ showOtpField: true });
    }, 1);
    reSendMagicLinkLoginOtp.request({
      userTerminalId: userTerminalId,
      storeTerminalId: storeId,
    });
  };

  setChanged = () => {
    const { reSendMagicLinkLoginOtp } = this.props;
    reSendMagicLinkLoginOtp.clear();
    this.setState({ disableButton: false, showTimer: false });
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
      reSendMagicLinkLoginOtpCode,
      verifyMagicLinkLoginOtpErr,
      reSendMagicLinkLoginOtpErr,
      reSendMagicLinkLoginOtpIsFetching,
      createFormValues,
      verifyMagicLinkLoginOtpIsFetching,
      sendMagicLinkLoginOtpIsFetching,
      sendMagicLinkLoginOtpErr,
    } = this.props;
    const {
      showTimer,
      showErr,
      showMsg,
      showOtpField,
      loading,
      showSendOtpErrMsg,
    } = this.state;
    const timer = {
      sec: 30,
      min: 1,
      content: "Resend OTP in ",
      showDisable: true,
    };
    const err = verifyMagicLinkLoginOtpErr || reSendMagicLinkLoginOtpErr;
    const { maskedUserName } = createFormValues || {};
    return (
      <Fragment>
        <div className="container text-center d-flex justify-content-center align-items-center vh-100">
          {sendMagicLinkLoginOtpErr || showSendOtpErrMsg ? (
            <section>
              <img src={lock} alt="Login" style={{ maxHeight: "70px" }} />
              <h2 className="text-center auth-f-bold custom-heading-1 text-center mt-3">
                Login to redeem your points
              </h2>
              <div className="row justify-content-center">
                <div className="col-12 col-md-5 mx-3">
                  <div className="text-danger text-break mt-4 text-center">
                    {sendMagicLinkLoginOtpErr || showSendOtpErrMsg}
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section>
              <img src={lock} alt="Login" style={{ maxHeight: "70px" }} />
              <h2 className="text-center auth-f-bold custom-heading-1 text-center mt-3">
                Login to redeem your points
              </h2>
              {sendMagicLinkLoginOtpIsFetching ? (
                <div className="col-12">
                  {handleMgaicLoginPlaceHolderGlow()}
                </div>
              ) : (
                <Fragment>
                  <div className="text-center mt-4">
                    OTP has been sent to {`${maskedUserName || ""}`}
                  </div>
                  <section className="mt-4">
                    <div className="row justify-content-center">
                      <div className="col-12 col-md-5 mx-3">
                        <div>
                          <div className="text-start mb-1 auth-f-bold">
                            <label>Enter OTP</label>
                          </div>
                          {showOtpField && (
                            <OtpInput
                              length={+otpLength}
                              onOtpSubmit={this.onOtpSubmit}
                              onOtpUndo={this.onOtpUndo}
                            />
                          )}
                        </div>
                        {(showTimer ||
                          reSendMagicLinkLoginOtpCode == "200") && (
                          <div className="text-end mt-1">
                            <CountDownTimer
                              timer={timer}
                              setChanged={this.setChanged}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-center pt-4 mb-4">
                      <Button
                        className="btn col-12 col-md-5"
                        onClick={this.handleSubmit}
                        disabled={verifyMagicLinkLoginOtpIsFetching || loading}
                      >
                        {verifyMagicLinkLoginOtpIsFetching || loading
                          ? "Submitting..."
                          : "Submit"}
                      </Button>
                    </div>
                    {!showTimer &&
                      (!reSendMagicLinkLoginOtpCode ||
                        !reSendMagicLinkLoginOtpCode == "200") && (
                        <div className="mt-3 text-center">
                          Didn't get OTP?{" "}
                          <a
                            onClick={
                              this.state.disableButton
                                ? ""
                                : this.resendMagicLinkLoginOtp
                            }
                            disabled={
                              reSendMagicLinkLoginOtpIsFetching ||
                              verifyMagicLinkLoginOtpIsFetching
                            }
                          >
                            {"Resend"}
                          </a>
                        </div>
                      )}
                    <div className="row justify-content-center">
                      <div className="col-12 col-md-5 mx-3">
                        {(showErr || err) && (
                          <div className="text-danger text-break mt-4 text-center">
                            {showMsg || err}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                </Fragment>
              )}
            </section>
          )}
        </div>
      </Fragment>
    );
  }
}
const form = reduxForm({
  form: loginForm,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: () => {},
})(LoginWithOtp);

export default Container(form);
