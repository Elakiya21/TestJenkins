import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Container from "../../../Components";
import Button from "Common/Elements/Button";
import IntlTelInput from "react-intl-tel-input";
import isEmpty from "lodash/isEmpty";
import {
  loginForm,
  USER_MOBILE_NUMBER_OR_EMAIL_IS_NOT_VERIRFIED,
  USER_NOT_FOUND,
} from "../../../consts";
import RenderInputField from "Common/FormFields/RenderInputField";
import RenderSelectField from "Common/FormFields/RenderSelectField";

const contactUsPage = process.env.REACT_APP_CONTACT_US_PAGE_URL;

class index extends Component {
  state = {
    showErr: false,
    showMsg: "",
    isShowCompanySelection: false,
    isSetsendLoginOtpResponse: false,
    disableButton: false,
  };

  componentDidMount = () => {
    const {
      dispatch,
      change,
      initialize,
      match,
      storeLoginType,
      sendLoginOtp,
      setUserVerificationData,
      storeDetails,
      loginBasicDeatils,
      setCompanyList,
    } = this.props;
    const { queryMobileNo, device_id } = loginBasicDeatils || {};
    const { id } = match.params;
    dispatch(initialize(loginForm, {}));
    sendLoginOtp.clear();
    setUserVerificationData({});
    setCompanyList([]);
    dispatch(change("storeTerminalId", id || ""));
    dispatch(change("storeName", storeDetails.storeName || ""));
    dispatch(change("storeLoginType", storeLoginType || "Mobile"));
    if (queryMobileNo && !isEmpty(queryMobileNo) && !device_id) {
      dispatch(change("userName", queryMobileNo));
      this.handleSubmit();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      sendLoginOtpIsFetching,
      sendLoginOtpData,
      dispatch,
      change,
      sendLoginOtpValidationError,
      match,
      history,
      setUserVerificationData,
      storeDetails,
      sendLoginOtpErr,
      setCompanyList,
    } = this.props;
    const { id } = match.params;
    const { isShowCompanySelection, isSetsendLoginOtpResponse } = this.state;
    const { companyList } = sendLoginOtpData || {};
    if (
      !sendLoginOtpIsFetching &&
      !isEmpty(sendLoginOtpData) &&
      isSetsendLoginOtpResponse
    ) {
      if (!isShowCompanySelection && !isEmpty(sendLoginOtpData.companyList)) {
        dispatch(
          change(
            "companyTerminalId",
            (companyList &&
              companyList.length > 0 &&
              companyList[0].companyTerminalId) ||
              ""
          )
        );
        setCompanyList(sendLoginOtpData.companyList);
        this.setState({ isShowCompanySelection: true });
      } else if (
        !sendLoginOtpValidationError &&
        isEmpty(sendLoginOtpValidationError) &&
        !sendLoginOtpErr &&
        isEmpty(sendLoginOtpErr)
      ) {
        dispatch(change("userAccountId", sendLoginOtpData.userAccountId));
        history.push(`/auth/${id}/login/mobile/otp/verify`);
      } else if (
        sendLoginOtpValidationError &&
        !isEmpty(sendLoginOtpValidationError)
      ) {
        if (
          sendLoginOtpValidationError ==
          USER_MOBILE_NUMBER_OR_EMAIL_IS_NOT_VERIRFIED
        ) {
          setUserVerificationData(sendLoginOtpData);
          history.push(`/auth/${id}/login/user-verification-message`);
        } else if (sendLoginOtpValidationError == USER_NOT_FOUND) {
          if (
            storeDetails &&
            !isEmpty(storeDetails) &&
            storeDetails.storeConfigurations &&
            storeDetails.storeConfigurations
              .selfRegistrationStoreConfigurations &&
            storeDetails.storeConfigurations.selfRegistrationStoreConfigurations
              .allowSelfRegistration
          ) {
            this.setState({
              showErr: true,
              showMsg:
                "Oops! It looks like you're not registered yet. We're redirecting you to complete your registration.",
              disableButton: true,
            });
            setTimeout(function () {
              window.location.href = `/auth/${id.toLowerCase()}/self/register`;
            }, 2000);
          } else {
            this.setState({
              showErr: true,
              showMsg:
                "You must be a registered user to login. We're redirecting you to our contact us page.",
              disableButton: true,
            });
            setTimeout(function () {
              window.location.href = contactUsPage.replace(
                "{storeId}",
                id.toLowerCase()
              );
            }, 2000);
          }
        } else {
          this.setState({
            showErr: true,
            showMsg: sendLoginOtpValidationError,
          });
        }
      }
      this.setState({ isSetsendLoginOtpResponse: false });
    }
  }

  handleSubmit = () => {
    const { sendLoginOtp } = this.props;
    this.setState({ isSetsendLoginOtpResponse: true });
    // sendLoginOtp.clear();
    sendLoginOtp.request();
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
      sendLoginOtpIsFetching,
      sendLoginOtpErr,
      sendLoginOtpValidationError,
      storedCompanyList,
    } = this.props;
    const { showErr, showMsg, isShowCompanySelection, disableButton } =
      this.state;
    const { extension } = createFormValues || {};
    let err = sendLoginOtpErr || sendLoginOtpValidationError || "";
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
                        list={storedCompanyList}
                        customName="companyName"
                        className="form-select"
                        customId="companyTerminalId"
                        defaultValue={
                          (storedCompanyList &&
                            storedCompanyList[0].companyTerminalId) ||
                          ""
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-start mb-1 auth-f-bold">
                    <label>Enter your mobile number</label>
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
                      />
                    </div>
                    <div className="ps-2 col-9">
                      <Field
                        component={RenderInputField}
                        name="userName"
                        inputClassName="mb-0"
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="text-center py-4">
                <Button
                  className="btn col-12"
                  disabled={sendLoginOtpIsFetching || disableButton}
                  onClick={this.handleSubmit}
                >
                  {sendLoginOtpIsFetching ? "Submitting..." : "Proceed"}
                </Button>
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
})(index);

export default Container(form);
