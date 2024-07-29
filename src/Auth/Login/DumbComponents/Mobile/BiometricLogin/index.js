import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Container from "../../../Components";
import Button from "Common/Elements/Button";
import IntlTelInput from "react-intl-tel-input";
import isEmpty from "lodash/isEmpty";
import {
  loginForm,
  USER_MOBILE_NUMBER_OR_EMAIL_IS_NOT_VERIRFIED,
  BIOMETRIC_AUTH_FAILED,
} from "../../../consts";
import RenderInputField from "Common/FormFields/RenderInputField";
import RenderSelectField from "Common/FormFields/RenderSelectField";
import axios from "axios";

const ipAddressApiUrl = process.env.REACT_APP_IP_ADDRESS_API_URL;
const KEYCLOAK_ACTION_TOKEN_URL =
  process.env.REACT_APP_KEYCLOAK_ACTION_TOKEN_URL;
const authOriginUrl = process.env.REACT_APP_AUTH_ORIGIN_URL;

class index extends Component {
  state = {
    showErr: false,
    showMsg: "",
    isButtonLoading: false,
    isShowCompanySelection: false,
    validateUser: false,
    isSetVerifyBiometricResponse: false,
  };

  componentDidMount = () => {
    const {
      loginFlowData,
      dispatch,
      change,
      initialize,
      match,
      storeLoginType,
      verifyBiometricLogin,
      setUserVerificationData,
    } = this.props;
    const { id } = match.params;
    dispatch(initialize(loginForm, {}));
    verifyBiometricLogin.clear();
    setUserVerificationData({});
    dispatch(change("storeTerminalId", id || ""));
    dispatch(change("storeLoginType", storeLoginType || "Mobile"));
    if (loginFlowData) {
      dispatch(change("phoneNumber", loginFlowData.userName));
      dispatch(change("extension", loginFlowData.dailingCode || "91"));
      dispatch(change("userAccountId", loginFlowData.userAccountId || ""));
      dispatch(change("userName", loginFlowData.userName));
    }
    axios.get(ipAddressApiUrl).then(
      (response) => {
        var ipAddress = response.data && response.data.ip;
        dispatch(change("userIp", ipAddress));
      },
      (error) => {}
    );
    document
      .querySelector("input[type='tel']")
      .setAttribute("readOnly", "true");
    window.addEventListener("message", this.handleMessage);
  };

  componentWillUnmount() {
    window.removeEventListener("message", this.handleMessage);
  }

  handleMessage = (event) => {
    const { dispatch, change, verifyBiometricLogin } = this.props;
    const dataString = event.data;
    const data = JSON.parse(dataString);
    if ((data.type = "postBiometricAuth" && event.origin == authOriginUrl)) {
      this.setState({ isButtonLoading: true });
      dispatch(change("biometricAuthentication", data.biometricAuthentication));
      dispatch(change("biometricAuthenticatedDeviceId", data.deviceId));
      dispatch(change("biometricSignature", data.signature));
      dispatch(change("biometricPayload", data.payload));
      this.setState({ isSetVerifyBiometricResponse: true });
      verifyBiometricLogin.request();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      verifyBiometricLoginIsFetching,
      verifyBiometricLoginData,
      dispatch,
      change,
      verifyBiometricLoginValidationError,
      match,
      history,
      setUserVerificationData,
      createFormValues,
      verifyBiometricLogin,
      loginBasicDeatils,
      verifyBiometricLoginErr,
    } = this.props;
    const { id } = match.params;
    const { userIp } = createFormValues || {};
    const { device_id, client_id } = loginBasicDeatils || {};
    const { validateUser, isSetVerifyBiometricResponse } = this.state;
    if (
      !verifyBiometricLoginIsFetching &&
      !isEmpty(verifyBiometricLoginData) &&
      isSetVerifyBiometricResponse
    ) {
      if (
        validateUser &&
        !verifyBiometricLoginValidationError &&
        isEmpty(verifyBiometricLoginValidationError) &&
        !verifyBiometricLoginErr &&
        isEmpty(verifyBiometricLoginErr)
      ) {
        dispatch(
          change("userAccountId", verifyBiometricLoginData.userAccountId)
        );
        verifyBiometricLogin.clear();
        this.setState({ isButtonLoading: true });
        window.ReactNativeWebView.postMessage("loginviabiometric");
        this.setState({ validateUser: !validateUser });
      } else if (
        verifyBiometricLoginValidationError &&
        !isEmpty(verifyBiometricLoginValidationError)
      ) {
        if (verifyBiometricLoginValidationError == BIOMETRIC_AUTH_FAILED) {
          history.push(`/auth/${id}/login/mobile/pin/verify`);
        } else if (
          verifyBiometricLoginValidationError ==
          USER_MOBILE_NUMBER_OR_EMAIL_IS_NOT_VERIRFIED
        ) {
          setUserVerificationData(verifyBiometricLoginData);
          history.push(`/auth/${id}/login/user-verification-message`);
        } else {
          this.setState({
            showErr: true,
            showMsg: verifyBiometricLoginValidationError,
          });
        }
      } else if (
        verifyBiometricLoginData.actionToken &&
        !isEmpty(verifyBiometricLoginData.actionToken)
      ) {
        window.location.href = `${KEYCLOAK_ACTION_TOKEN_URL}?client_id=${client_id}&key=${verifyBiometricLoginData.actionToken}&userIp=${userIp}&device_id=${device_id}`;
      }
      this.setState({ isSetVerifyBiometricResponse: false });
    }
  }

  handleSubmit = () => {
    const {
      loginFlowData,
      verifyBiometricLogin,
      match,
      dispatch,
      change,
      companyList,
      verifyBiometricLoginValidationError,
      verifyBiometricLoginErr,
    } = this.props;
    const { isShowCompanySelection, validateUser } = this.state;
    if (!isShowCompanySelection && !isEmpty(loginFlowData.companyList)) {
      dispatch(
        change(
          "companyTerminalId",
          companyList && companyList[0].companyTerminalId
        )
      );
      this.setState({ isShowCompanySelection: true });
    } else if (isShowCompanySelection && validateUser == false) {
      this.setState({ validateUser: true, isSetVerifyBiometricResponse: true });
      verifyBiometricLogin.clear();
      verifyBiometricLogin.request({ validateUser: true });
    } else if (
      (verifyBiometricLoginValidationError &&
        !isEmpty(verifyBiometricLoginValidationError)) ||
      (verifyBiometricLoginErr && !isEmpty(verifyBiometricLoginErr))
    ) {
      verifyBiometricLogin.request({ validateUser: validateUser });
    } else {
      this.setState({ isButtonLoading: true });
      window.ReactNativeWebView.postMessage("loginviabiometric");
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
      verifyBiometricLoginIsFetching,
      verifyBiometricLoginErr,
    } = this.props;
    const { showErr, showMsg, isShowCompanySelection, isButtonLoading } =
      this.state;
    const { extension } = createFormValues || {};
    const err = verifyBiometricLoginErr || "";
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
                  disabled={verifyBiometricLoginIsFetching || isButtonLoading}
                  onClick={this.handleSubmit}
                >
                  {verifyBiometricLoginIsFetching || isButtonLoading
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
