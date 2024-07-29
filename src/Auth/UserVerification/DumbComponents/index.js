import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import Button from "Common/Elements/Button";
import Container from "../Components";
import isEmpty from "lodash/isEmpty";
import { otpForm } from "../consts";
import {
  handleVerifyUserPlaceHolderGlow,
} from "../helpers.js";
import{
  maskEmail,
  maskPhoneNumber,
} from "../../helpers.js"
import CountDownStart from "Auth/SelfRegistration/DumbComponents/CountDownTimer";
import "./styles.css";
const otpLength = process.env.REACT_APP_OTP_LENGTH;
import OtpInput from "../../Common/DumbComponents/OtpInput";
import TermsAndPrivacy from "../../Common/DumbComponents/TermsAndPrivacy";
import queryString from "query-string";

class Form extends Component {
  state = {
    isFormInitialized: false,
    showErr: false,
    showMsg: "",
    tempAttachFile: [],
    tempDocument: [],
    isFileRemove: false,
    isFileEvent: false,
    fileErr: "",
    totalFileSize: 0,
    showTimer: true,
    isUserDetailsInitialized: false,
    reset: true,
    showOtpField: true,
  };
  componentDidMount() {
    setTimeout(() => {
      const page = document.querySelector(".page");
      page.classList.add("slide-in");
    }, 1);
    document.title = "User Verification";
    const {
      resendOTP,
      mobileVerification,
      match,
      initialize,
      getCustomerProfileDetails,
      emailVerification,
      updateUserFormValues,
    } = this.props;
    resendOTP.clear();
    mobileVerification.clear();
    emailVerification.clear();
    const { id, storeId } = match.params;
    getCustomerProfileDetails.request({ id });
    let param = queryString.parse(location.search);
    const addInitialValues = {
      userId: id,
      deviceId: (param && param.device_id) || (updateUserFormValues && updateUserFormValues.deviceId) || ""
    };
    initialize(addInitialValues);
    this.showFormInitialized(true);
  }

  componentWillReceiveProps(nextProps) {
    const {
      userDetails,
      userDetailsIsFetching,
      mobileVerificationIsFetching,
      emailVerificationIsFetching,
      otpFormValues,
      updateVerificationUserMsg,
    } = nextProps;
    const { dispatch, change } = this.props;
    const { isUserDetailsInitialized, reset } = this.state;
    const { userVerificationMethodId } = otpFormValues || {};
    if (
      userDetails &&
      !isEmpty(userDetails) &&
      !userDetailsIsFetching &&
      !isUserDetailsInitialized
    ) {
      if (updateVerificationUserMsg && !isEmpty(updateVerificationUserMsg)) {
        dispatch(
          change(
            "phoneNumber",
            (userDetails.primaryContact &&
              (userDetails.primaryContact.tempPhoneNumber ||
                userDetails.primaryContact.phoneNumber)) ||
              ""
          )
        );
      } else {
        dispatch(
          change(
            "phoneNumber",
            maskPhoneNumber(
              userDetails.primaryContact &&
                (userDetails.primaryContact.tempPhoneNumber ||
                  userDetails.primaryContact.phoneNumber)
            ) || ""
          )
        );
      }
      dispatch(
        change(
          "extension",
          (userDetails.primaryContact &&
            (userDetails.primaryContact.extension && userDetails.primaryContact.extension.includes("+") ? "": "+") + userDetails.primaryContact.extension) ||
            "+91"
        )
      );
      if (updateVerificationUserMsg && !isEmpty(updateVerificationUserMsg)) {
        dispatch(
          change(
            "email",
            (userDetails.primaryContact &&
              (userDetails.primaryContact.tempEmail ||
                userDetails.primaryContact.email)) ||
              ""
          )
        );
      } else {
        dispatch(
          change(
            "email",
            maskEmail(
              userDetails.primaryContact &&
                (userDetails.primaryContact.tempEmail ||
                  userDetails.primaryContact.email)
            ) || ""
          )
        );
      }
      dispatch(
        change(
          "userVerificationMethodId",
          userDetails.userVerificationMethodId || ""
        )
      );
      this.setState({ isUserDetailsInitialized: true });
    }
    if (
      (userVerificationMethodId == 3
        ? mobileVerificationIsFetching
        : emailVerificationIsFetching) &&
      reset
    ) {
      this.setState({ showTimer: false, reset: false });
    }
  }

  showFormInitialized = (value) => this.setState({ isFormInitialized: value });

  resendOTP = () => {
    const {
      resendOTP,
      match,
      dispatch,
      change,
      mobileVerification,
      emailVerification,
      otpFormValues,
      history
    } = this.props;
    const { userVerificationMethodId } = otpFormValues || {};
    const { id, storeId } = match.params || "";
    mobileVerification.clear();
    emailVerification.clear();
    this.setState({ showTimer: true, showOtpField: false });
    setTimeout(() => {
      this.setState({ showOtpField: true });
    }, 1);
    dispatch(change("otp", ""));
    resendOTP.request({
      id: id,
      mobileOTP: userVerificationMethodId == "3" ? true : false,
      storeId: storeId,
      history: history
    });
  };
  setChanged = () => {
    this.setState({ showTimer: false });
  };

  handleSubmit = () => {
    const {
      otpFormIsValid,
      mobileVerification,
      match,
      submit,
      emailVerification,
      otpFormValues,
      history
    } = this.props;
    const { userVerificationMethodId } = otpFormValues || {};
    const { id, storeId } = match.params || "";
    submit(otpForm);
    if (otpFormIsValid) {
      if (userVerificationMethodId == 3)
        mobileVerification.request({ id: id, storeId: storeId, history: history });
      else emailVerification.request({ id: id, storeId: storeId, history: history });
      this.setState({ reset: true });
    }
  };

  onOtpSubmit = (otp) => {
    const { dispatch, change } = this.props;
    dispatch(change("otp", otp));
  };
  onOtpUndo = () => {
    const { dispatch, change } = this.props;
    dispatch(change("otp", ""));
  };

  render() {
    const {
      resendOTPErr,
      mobileVerificationErr,
      emailVerificationErr,
      resendOTPIsFetching,
      mobileVerificationIsFetching,
      emailVerificationIsFetching,
      otpFormValues,
      userDetailsIsFetching,
    } = this.props;
    const { phoneNumber, email, userVerificationMethodId, extension } =
      otpFormValues || {};
    const { showErr, showMsg, showTimer, showOtpField } = this.state;
    const timer = {
      sec: 30,
      min: 1,
      content: "Resend OTP in ",
      showDisable: true,
    };
    const err = resendOTPErr || mobileVerificationErr || emailVerificationErr;

    return (
      <div className="container auth-user-verification pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">OTP Verification</h2>
        {userDetailsIsFetching ? (
          <div className="row justify-content-center">
            <div className="col-12 col-md-5">
              {handleVerifyUserPlaceHolderGlow()}
            </div>
          </div>
        ) : (
          <Fragment>
            <div className="text-center mt-4">
              OTP has been sent to{" "}
              {`${
                userVerificationMethodId === 3
                  ? `${extension} ${phoneNumber}`
                  : email
              }`}
            </div>
            <section className="mt-4">
              <div className="row justify-content-center">
                <div
                  className={`col-12 col-md-5 mx-3 ${
                    showErr || err ? "" : "mb-3"
                  }`}
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
                  {(err || showErr) && (
                    <div className="text-danger mt-1 text-start text-md-center">
                      {err || showMsg}
                    </div>
                  )}
                  {showTimer && (
                    <div className="text-end mt-1">
                      <CountDownStart
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
                  disabled={
                    mobileVerificationIsFetching || emailVerificationIsFetching
                  }
                >
                  {mobileVerificationIsFetching || emailVerificationIsFetching
                    ? "Verifying OTP..."
                    : "Verify"}
                </Button>
              </div>
              {!showTimer && (
                <div className="mt-3 text-center">
                  Didn't get OTP?{" "}
                  <a
                    onClick={
                      showTimer ||
                      resendOTPIsFetching ||
                      mobileVerificationIsFetching ||
                      emailVerificationIsFetching
                        ? ""
                        : this.resendOTP
                    }
                  >
                    Resend
                  </a>
                </div>
              )}
              <TermsAndPrivacy />
            </section>
          </Fragment>
        )}
      </div>
    );
  }
}

const form = reduxForm({
  form: otpForm,
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  onSubmit: () => {},
})(Form);

export default Container(form);
