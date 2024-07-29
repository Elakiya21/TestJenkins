import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Container from "../Components";
import Button from "Common/Elements/Button";
import IntlTelInput from "react-intl-tel-input";
import isEmpty from "lodash/isEmpty";
import { registrationForm } from "../consts";
import queryString from "query-string";
import TermsAndPrivacy from "../../Common/DumbComponents/TermsAndPrivacy";
import RenderInputField from "Common/FormFields/RenderInputField";
const userAlreadyExistErr = 'User profile already exists with given phone number'
class RegisterMobileNumber extends Component {
  state = {
    showErr: false,
    showMsg: "",
  };

  componentDidMount = () => {
    setTimeout(() => {
      const page = document.querySelector(".page");
      page.classList.add("slide-in");
    }, 1);
    const { selfRegistration, assignToUser, dispatch, change, initialize, match, history, setMagicLinkCode } =
      this.props;
    const { id } = match.params;
    selfRegistration.clear();
    assignToUser.clear()
    setMagicLinkCode("")
    let param = queryString.parse(location.search);
    dispatch(initialize(registrationForm, {}));
    if (param && param.device_id) dispatch(change("deviceId", param.device_id));
    if (param && param.userName) {
      dispatch(change("id", id));
      dispatch(change("phoneNumber", param.userName));
      dispatch(change("extension", "91"));
      selfRegistration.request({ history: history });
    }
    if (param && param.magicLinkCode) {
      setMagicLinkCode(param.magicLinkCode)
      assignToUser.clear()
      dispatch(change("magicLinkCode", param.magicLinkCode));
    }
    document
      .querySelector("input[type='tel']")
      .setAttribute("readOnly", "true");
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      createFormValues,
      selfRegistrationIsFetching,
      selfRegistrationErr,
      match
    } = this.props;
    const { id } = match.params;
    let param = queryString.parse(location.search);
    if (!selfRegistrationIsFetching && selfRegistrationErr && selfRegistrationErr == userAlreadyExistErr) {
      if (param && param.magicLinkCode) {
      } else {
        if (createFormValues && createFormValues.deviceId)
          window.location.href = `${process.env.REACT_APP_SIGN_IN_URL}${id}&queryMobileNo=${createFormValues.phoneNumber}&device_id=${createFormValues.deviceId}`;
        else
          window.location.href = `${process.env.REACT_APP_SIGN_IN_URL}${id}&queryMobileNo=${createFormValues.phoneNumber}`;
      }
    }

  }

  handleSubmit = () => {
    const { createFormValues, selfRegistration, assignToUser, history } = this.props;
    selfRegistration.clear();
    assignToUser.clear()
    if (createFormValues && createFormValues.phoneNumber) {
      this.setState({ showErr: false, showMsg: "" });
      selfRegistration.request({ history: history });
    } else {
      this.setState({ showErr: true, showMsg: "Mobile number is mandatory" });
    }
  };

  onMobileNumberChange = (valid, name, country) => {
    const { dispatch, change, match } = this.props;
    const dialingCode = "+" + country.dialCode;
    const { id } = match.params;
    var phone = !isEmpty(name) ? name.replace(dialingCode, "") : "";
    if (!isEmpty(phone)) phone = phone.replace(/\D/g, "");
    dispatch(change("extension", dialingCode));
    // dispatch(change("phoneNumber", phone));
    dispatch(change("id", id));
  };

  selectFlag = (country) => {
    const { dispatch, change } = this.props;
    dispatch(change("extension", "+" + country.dialCode));
  };

  render() {
    const {
      createFormValues,
      selfRegistrationIsFetching,
      selfRegistrationErr,
      assignToUserIsFetching,
      assignToUserErr
    } = this.props;
    const { showErr, showMsg } = this.state;
    const { phoneNumber, extension } = createFormValues || {};
    const err = assignToUserErr || selfRegistrationErr || "";
    return (
      <div className="container auth-self-registration pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">Create Account</h2>
        <section className="mt-4 pt-5">
          <div className="row justify-content-center">
            <div
              className={`col-12 col-md-5 mx-3 ${(showErr || (err && err != userAlreadyExistErr)) ? "" : "mb-3"}`}
            >
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
                      name="phoneNumber"
                      inputClassName="mb-0"
                      type="text"
                      inputMode="numeric"
                      maxLength={10}
                      autocomplete="off"
                    />
                  </div>
                </div>
              </div>
              {(showErr || (err && err != userAlreadyExistErr)) && (
                <div className="text-danger mt-1 text-start text-md-center">
                  {showMsg || err}
                </div>
              )}
            </div>
          </div>
          <div className="text-center py-4">
            <Button
              className="btn col-12 col-md-5"
              disabled={((assignToUserIsFetching || selfRegistrationIsFetching) || (err && err == userAlreadyExistErr))}
              onClick={this.handleSubmit}
            >
              {((assignToUserIsFetching || selfRegistrationIsFetching) || (err && err == userAlreadyExistErr)) ? "Submitting..." : "Proceed"}
            </Button>
          </div>
        </section>
        <TermsAndPrivacy />
      </div>
    );
  }
}
const form = reduxForm({
  form: registrationForm,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: () => { },
})(RegisterMobileNumber);

export default Container(form);
