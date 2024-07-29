import React, { Component } from "react";
import CountDownTimer from "Auth/SelfRegistration/DumbComponents/CountDownTimer";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import Container from "../Components";
import Button from "Common/Elements/Button";
import isEmpty from "lodash/isEmpty";
import { registrationForm } from "../consts";
import TermsAndPrivacy from "../../Common/DumbComponents/TermsAndPrivacy";
import OtpInput from "../../Common/DumbComponents/OtpInput";

const ipAddressApiUrl = process.env.REACT_APP_IP_ADDRESS_API_URL;
const otpLength = process.env.REACT_APP_OTP_LENGTH;

class RegisteredEmailOtp extends Component {
  state = {
    showTimer: true,
    disableButton: true,
    stopLoop: true,
    reset: false,
    showErr: false,
    showMsg: "",
    showOtpField: true,
  };

  componentDidMount() {
    setTimeout(() => {
      const page = document.querySelector(".page");
      page.classList.add("slide-in");
    }, 1);
    const {
      dispatch,
      change,
      reSendOtp,
      match,
      createFormValues,
      customerId,
      initialize,
      emailVerification,
    } = this.props;
    const { id } = match.params;
    reSendOtp.clear();
    emailVerification.clear();
    const addInitialValues = {
      deviceId: (createFormValues && createFormValues.deviceId) || "",
      userId: customerId,
      id: id,
      email: (createFormValues && createFormValues.email) || "",
    };
    axios.get(ipAddressApiUrl).then(
      (response) => {
        var ipAddress = response.data && response.data.ip;
        dispatch(change("userIp", ipAddress));
      },
      (error) => {}
    );
    initialize(addInitialValues);
  }

  componentWillReceiveProps(nextProps) {
    const { emailVerificationIsFetching } = nextProps;
    const { reset } = this.state;
    if (!emailVerificationIsFetching && reset) {
      this.setState({ showTimer: false, disableButton: false, reset: false });
    }
  }

  handleSubmit = () => {
    const {
      createFormIsValid,
      submit,
      reSendOtp,
      emailVerification,
      createFormValues,
      history
    } = this.props;
    this.setState({ showTimer: false });
    reSendOtp.clear();
    emailVerification.clear();
    submit(registrationForm);
    if (createFormIsValid && createFormValues && createFormValues.emailOTP) {
      this.setState({ showErr: false, showMsg: "" });
      emailVerification.request({history: history});
      this.setState({ reset: true });
    } else {
      this.setState({ showErr: true, showMsg: "Please enter a valid otp", disableButton: false });
    }
  };

  resendOTP = () => {
    const { reSendOtp, customerId, dispatch, change, emailVerification } =
      this.props;
    emailVerification.clear();
    dispatch(change("emailOTP", ""));
    this.setState({
      showTimer: false,
      disableButton: true,
      showOtpField: false,
      showErr: false, 
      showMsg: ""
    });
    setTimeout(() => {
      this.setState({ showOtpField: true });
    }, 1);
    reSendOtp.request({
      customerId,
      mobileOTP: false,
    });
  };

  onMobileNumberChange = (valid, name, country) => {
    const { dispatch, change } = this.props;
    const dialingCode = "+" + country.dialCode;
    const phone = !isEmpty(name) ? name.replace(dialingCode, "") : "";
    dispatch(change("extension", country.dialCode));
    dispatch(change("phoneNumber", phone));
  };

  selectFlag = (country) => {
    const { dispatch, change } = this.props;
    dispatch(change("extension", country.dialCode));
  };

  setChanged = () => {
    const { reSendOtp } = this.props;
    reSendOtp.clear();
    this.setState({ disableButton: false, showTimer: false });
    return null;
  };

  onOtpSubmit = (otp) => {
    const { dispatch, change } = this.props;
    dispatch(change("emailOTP", otp));
  };

  onOtpUndo = () => {
    const { dispatch, change } = this.props;
    dispatch(change("emailOTP", ""));
  };

  render() {
    const {
      reSendOtpIsFetching,
      reSendOtpCode,
      reSendOtpErr,
      emailVerificationIsFetching,
      emailVerificationErr,
      createFormValues,
    } = this.props;
    const { email } = createFormValues || {};
    const { showTimer, showErr, showMsg, showOtpField } = this.state;
    const timer = {
      sec: 30,
      min: 1,
      content: "Resend OTP in ",
      showDisable: true,
    };
    const err = emailVerificationErr || reSendOtpErr;
    return (
      <div className="container auth-self-registration pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">OTP Verification</h2>
        <div className="text-center mt-4">
          OTP has been sent to {`${email}`}
        </div>
        <section className="mt-4">
          <div className="row justify-content-center">
            <div
              className={`col-12 col-md-5 mx-3 ${showErr || err ? "" : "mb-3"}`}
            >
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
              {(showErr || err) && (
                <div className="text-danger mt-1 text-start text-md-center">
                  {showMsg || err}
                </div>
              )}{" "}
              {(showTimer || reSendOtpCode == "200") && (
                <div className="text-end mt-1">
                  <CountDownTimer timer={timer} setChanged={this.setChanged} />
                </div>
              )}
            </div>
          </div>

          <div className="text-center pt-4 mb-4">
            <Button
              className="btn col-12 col-md-5"
              onClick={this.handleSubmit}
              disabled={emailVerificationIsFetching}
            >
              {emailVerificationIsFetching ? "Verifying OTP..." : "Verify"}
            </Button>
          </div>
          {!showTimer && (!reSendOtpCode || !reSendOtpCode == "200") && (
            <div className="mt-3 text-center">
              Didn't get OTP?{" "}
              <a
                onClick={this.state.disableButton ? "" : this.resendOTP}
                disabled={reSendOtpIsFetching || emailVerificationIsFetching}
              >
                {"Resend OTP"}
              </a>
            </div>
          )}

          <TermsAndPrivacy />
        </section>
      </div>
    );
  }
}
const form = reduxForm({
  form: registrationForm,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: () => {},
})(RegisteredEmailOtp);

export default Container(form);
