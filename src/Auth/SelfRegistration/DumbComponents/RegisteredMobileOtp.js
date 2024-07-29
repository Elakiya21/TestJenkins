import React, { Component } from "react";
import CountDownTimer from "Auth/SelfRegistration/DumbComponents/CountDownTimer";
import { Field, reduxForm } from "redux-form";
import Container from "../Components";
import Button from "Common/Elements/Button";
import { registrationForm } from "../consts";
import TermsAndPrivacy from "../../Common/DumbComponents/TermsAndPrivacy";
import OtpInput from "../../Common/DumbComponents/OtpInput";
const otpLength = process.env.REACT_APP_OTP_LENGTH;

class RegisteredMobileOtp extends Component {
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
      reSendOtp,
      mobileVerification,
      match,
      customerId,
      createFormValues,
      initialize,
    } = this.props;
    const { deviceId, phoneNumber, extension } = createFormValues || {};
    const { id } = match.params;
    reSendOtp.clear();
    mobileVerification.clear();
    const addInitialValues = {
      deviceId: deviceId || "",
      userId: customerId,
      id: id,
      phoneNumber: phoneNumber,
      extension: extension,
    };
    initialize(addInitialValues);
  }

  componentWillReceiveProps(nextProps) {
    const { mobileVerificationIsFetching, mobileVerificationCode } = nextProps;
    const { reset } = this.state;
    if (!mobileVerificationIsFetching && reset) {
      this.setState({ showTimer: false, disableButton: false, reset: false });
    }
  }

  handleSubmit = () => {
    const {
      createFormIsValid,
      mobileVerification,
      submit,
      reSendOtp,
      createFormValues,
      history
    } = this.props;
    this.setState({ showTimer: false });
    reSendOtp.clear();
    submit(registrationForm);
    if (createFormIsValid && createFormValues && createFormValues.OTP) {
      this.setState({ showErr: false, showMsg: "" });
      mobileVerification.request({history: history});
      this.setState({ reset: true });
    } else {
      this.setState({ showErr: true, showMsg: "Please enter a valid otp", disableButton: false });
    }
  };

  resendOTP = () => {
    const { reSendOtp, customerId, mobileVerification, dispatch, change } =
      this.props;
    mobileVerification.clear();
    dispatch(change("OTP", ""));
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
      mobileOTP: true,
    });
  };

  setChanged = () => {
    const { reSendOtp } = this.props;
    reSendOtp.clear();
    this.setState({ disableButton: false, showTimer: false });
    return null;
  };

  onOtpSubmit = (otp) => {
    const { dispatch, change } = this.props;
    dispatch(change("OTP", otp));
  };
  onOtpUndo = () =>{
    const { dispatch, change } = this.props;
    dispatch(change("OTP", ""));
  }

  render() {
    const {
      reSendOtpIsFetching,
      mobileVerificationErr,
      reSendOtpCode,
      reSendOtpErr,
      mobileVerificationIsFetching,
      createFormValues,
    } = this.props;
    const { showTimer, showErr, showMsg, showOtpField } = this.state;
    const timer = {
      sec: 30,
      min: 1,
      content: "Resend OTP in ",
      showDisable: true,
    };
    const err = mobileVerificationErr || reSendOtpErr;
    const { phoneNumber, extension, OTP } = createFormValues || {};
    return (
      <div className="container auth-self-registration pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">OTP Verification</h2>
        <div className="text-center mt-4">
          OTP has been sent to {`${extension} ${phoneNumber}`}
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
              )}
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
              disabled={mobileVerificationIsFetching}
            >
              {mobileVerificationIsFetching ? "Verifying OTP..." : "Verify"}
            </Button>
          </div>
          {!showTimer && (!reSendOtpCode || !reSendOtpCode == "200") && (
            <div className="mt-3 text-center">
              Didn't get OTP?{" "}
              <a
                onClick={this.state.disableButton ? "" : this.resendOTP}
                disabled={reSendOtpIsFetching || mobileVerificationIsFetching}
              >
                {"Resend"}
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
})(RegisteredMobileOtp);

export default Container(form);
