import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Container from "../../../Components";
import Button from "Common/Elements/Button";
import IntlTelInput from "react-intl-tel-input";
import isEmpty from "lodash/isEmpty";
import {
  loginForm,
  USER_MOBILE_NUMBER_OR_EMAIL_IS_NOT_VERIRFIED,
} from "../../../consts";
import RenderInputField from "Common/FormFields/RenderInputField";
import RenderSelectField from "Common/FormFields/RenderSelectField";
import "../../index.css";

class index extends Component {
  state = {
    showErr: false,
    showMsg: "",
    isButtonLoading: false,
    isShowCompanySelection: false,
    validateUser: false,
    isSetVerifyPinResponse: false,
  };

  componentDidMount = () => {
    const {
      loginFlowData,
      dispatch,
      change,
      initialize,
      match,
      storeLoginType,
      verifyPinLogin,
      setUserVerificationData,
    } = this.props;
    const { id } = match.params;
    dispatch(initialize(loginForm, {}));
    verifyPinLogin.clear();
    setUserVerificationData({});
    if (loginFlowData) {
      dispatch(change("userAccountId", loginFlowData.userAccountId || ""));
      dispatch(change("userName", loginFlowData.userName || ""));
      dispatch(change("phoneNumber", loginFlowData.userName));
      dispatch(change("extension", loginFlowData.dailingCode || "91"));
    }
    dispatch(change("storeTerminalId", id || ""));
    dispatch(change("storeLoginType", storeLoginType || "Mobile"));
    document
      .querySelector("input[type='tel']")
      .setAttribute("readOnly", "true");
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      verifyPinLoginIsFetching,
      verifyPinLoginData,
      dispatch,
      change,
      verifyPinLoginValidationError,
      match,
      history,
      setUserVerificationData,
      verifyPinLogin,
      verifyPinLoginErr,
    } = this.props;
    const { id } = match.params;
    const { validateUser, isSetVerifyPinResponse } = this.state;
    if (
      !verifyPinLoginIsFetching &&
      !isEmpty(verifyPinLoginData) &&
      isSetVerifyPinResponse
    ) {
      if (
        validateUser &&
        !verifyPinLoginValidationError &&
        isEmpty(verifyPinLoginValidationError) &&
        !verifyPinLoginErr &&
        isEmpty(verifyPinLoginErr)
      ) {
        dispatch(change("userAccountId", verifyPinLoginData.userAccountId));
        verifyPinLogin.clear();
        history.push(`/auth/${id}/login/mobile/pin/verify`);
      } else if (
        verifyPinLoginValidationError &&
        !isEmpty(verifyPinLoginValidationError)
      ) {
        if (
          verifyPinLoginValidationError ==
          USER_MOBILE_NUMBER_OR_EMAIL_IS_NOT_VERIRFIED
        ) {
          setUserVerificationData(verifyPinLoginData);
          history.push(`/auth/${id}/login/user-verification-message`);
        } else {
          this.setState({
            showErr: true,
            showMsg: verifyPinLoginValidationError,
          });
        }
      }
      this.setState({ isSetVerifyPinResponse: false });
    }
  }

  handleSubmit = () => {
    const {
      loginFlowData,
      verifyPinLogin,
      match,
      history,
      verifyPinLoginValidationError,
      companyList,
      dispatch,
      change,
      verifyPinLoginErr,
    } = this.props;
    const { isShowCompanySelection, validateUser } = this.state;
    const { id } = match.params;
    if (!isShowCompanySelection && !isEmpty(loginFlowData.companyList)) {
      dispatch(
        change(
          "companyTerminalId",
          companyList && companyList[0].companyTerminalId
        )
      );
      this.setState({ isShowCompanySelection: true });
    } else if (isShowCompanySelection && validateUser == false) {
      this.setState({ validateUser: true, isSetVerifyPinResponse: true });
      verifyPinLogin.clear();
      verifyPinLogin.request({ validateUser: true });
    } else if (
      (verifyPinLoginValidationError &&
        !isEmpty(verifyPinLoginValidationError)) ||
      (verifyPinLoginErr && !isEmpty(verifyPinLoginErr))
    ) {
      verifyPinLogin.request({ validateUser: validateUser });
    } else {
      history.push(`/auth/${id}/login/mobile/pin/verify`);
    }
  };

  onMobileNumberChange = (valid, name, country) => {
    const { dispatch, change, match } = this.props;
    const dialingCode = "+" + country.dialCode;
    const { id } = match.params;
    var phone = !isEmpty(name) ? name.replace(dialingCode, "") : "";
    if (!isEmpty(phone)) phone = phone.replace(/\D/g, "");
    dispatch(change("extension", dialingCode));
    dispatch(change("id", id));
  };

  selectFlag = (country) => {
    const { dispatch, change } = this.props;
    dispatch(change("extension", "+" + country.dialCode));
  };

  handleSignInRedirection = () => {
    const { history, match } = this.props;
    const { id } = match.params;
    history.push(`/auth/${id}/login/mobile/otp`);
  };

  render() {
    const {
      createFormValues,
      companyList,
      verifyPinLoginIsFetching,
      verifyPinLoginErr,
    } = this.props;
    const { showErr, showMsg, isShowCompanySelection, isButtonLoading } =
      this.state;
    const { extension } = createFormValues || {};
    const err = verifyPinLoginErr || "";
    return (
      <div className="container auth-login pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">Sign In</h2>
        <section className="mt-4 pt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-5 mx-3 mb-3">
              {isShowCompanySelection ? (
                <div>
                  <div className="text-start mb-1 auth-f-bold">
                    <label>Select company</label>
                  </div>
                  <div className="d-flex">
                    <div className="col-12">
                      <Field
                        component={RenderSelectField}
                        placeholder="Select company"
                        name="companyTerminalId"
                        list={companyList}
                        customName="companyName"
                        className="form-select"
                        customId="companyTerminalId"
                        defaultValue={
                          (companyList && companyList[0].companyTerminalId) ||
                          ""
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-start mb-1 auth-f-bold">
                    <label>Mobile number</label>
                  </div>
                  <div className="d-flex">
                    <div className="col-3">
                      <IntlTelInput
                        css={["intl-tel-input", "form-control"]}
                        defaultCountry="in"
                        fieldName="extension"
                        fieldId="extension"
                        numberType="MOBILE"
                        value={extension || "+91"}
                        containerClassName="width-95"
                        placeholder=""
                        autoHideDialCode="false"
                        onSelectFlag={(data, country) => {
                          this.selectFlag(country);
                        }}
                        onPhoneNumberChange={(valid, name, country) => {
                          this.onMobileNumberChange(valid, name, country);
                        }}
                        disabled
                      />
                    </div>
                    <div className="ps-2 col-9">
                      <Field
                        component={RenderInputField}
                        name="phoneNumber"
                        inputClassName="mb-0"
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        autocomplete="off"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="text-center py-4">
                <Button
                  className="btn col-12"
                  disabled={verifyPinLoginIsFetching || isButtonLoading}
                  onClick={this.handleSubmit}
                >
                  {verifyPinLoginIsFetching || isButtonLoading
                    ? "Submitting..."
                    : "Sign In"}
                </Button>
              </div>
              {!isShowCompanySelection && (
                <div class="mt-3 text-center" id="resendOtp">
                  <a onClick={this.handleSignInRedirection}>Sign in</a> with
                  different mobile number?
                </div>
              )}
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
})(index);

export default Container(form);
