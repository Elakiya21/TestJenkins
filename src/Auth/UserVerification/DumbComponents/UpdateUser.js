import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { updateUserForm, DUMMY_MOBILE_NUMBER } from "../consts";
import { handleVerifyUserPlaceHolderGlow1 } from "../helpers";
import { isEmpty } from "lodash";
import IntlTelInput from "react-intl-tel-input";
import Button from "Common/Elements/Button";
import Container from "../Components";
import RenderInputField from "Common/FormFields/RenderInputField";
import TermsAndPrivacy from "../../Common/DumbComponents/TermsAndPrivacy";

class UpdateUser extends Component {
  state = {
    isFormInitialized: false,
    errMsg: "",
  };
  componentDidMount() {
    setTimeout(() => {
      const page = document.querySelector(".page");
      page.classList.add("slide-in");
    }, 1);
    document.title = "User Updation";
    const {
      getCustomerProfileDetails,
      match,
      updateVerificationUser,
    } = this.props;
    const { id, storeId } = match.params || "";
    updateVerificationUser.clear();
    getCustomerProfileDetails.request({ id });
  }
  componentWillReceiveProps(nextProps) {
    const { userDetails, userDetailsIsFetching, updateUserFormValues } = nextProps;
    const { initialize } = this.props;
    const { isFormInitialized } = this.state;
    if (
      userDetails &&
      !isEmpty(userDetails) &&
      !userDetailsIsFetching &&
      !isFormInitialized
    ) {
      const addInitialValues = {};
      if (
        userDetails.primaryContact &&
        userDetails.primaryContact.phoneNumber == DUMMY_MOBILE_NUMBER
      ) {
        addInitialValues.phoneNumber = "";
      } else {
        addInitialValues.phoneNumber =
          userDetails.primaryContact.tempPhoneNumber ||
          userDetails.primaryContact.phoneNumber;
      }
      addInitialValues.extension =
        (userDetails.primaryContact &&
          "+" + userDetails.primaryContact.extension) ||
        "";
      if (
        userDetails.primaryContact &&
        userDetails.primaryContact.email &&
        userDetails.primaryContact.email.includes("noemail")
      ) {
        addInitialValues.email = "";
      } else {
        addInitialValues.email =
          userDetails.primaryContact.tempEmail ||
          userDetails.primaryContact.email;
      }
      addInitialValues.deviceId = updateUserFormValues && updateUserFormValues.deviceId || ""
      addInitialValues.userVerificationMethodId =
        userDetails.userVerificationMethodId;
      initialize(addInitialValues);
      this.showFormInitialized(true);
    }
  }

  showFormInitialized = (value) => this.setState({ isFormInitialized: value });

  onMobileNumberChange = (valid, name, country) => {
    const { dispatch, change } = this.props;
    const dialingCode = "+" + country.dialCode;
    dispatch(change("extension", dialingCode));
  };

  selectFlag = (country) => {
    const { dispatch, change } = this.props;
    dispatch(change("extension", "+" + country.dialCode));
  };

  handleSubmit = () => {
    const { match, updateVerificationUser, updateUserFormValues, history } = this.props;
    const { id, storeId } = match.params || "";
    this.setState({ errMsg: "" });
    if (
      updateUserFormValues &&
      !isEmpty(updateUserFormValues.phoneNumber) &&
      !isEmpty(updateUserFormValues.email)
    ) {
      updateVerificationUser.request({ id: id, storeId: storeId, history: history });
    } else {
      if (
        updateUserFormValues &&
        updateUserFormValues.userVerificationMethodId == 3
      ) {
        this.setState({ errMsg: "Mobile number is mandantory" });
      } else {
        this.setState({ errMsg: "Email is mandantory" });
      }
    }
  };

  render() {
    const {
      updateUserFormValues,
      updateVerificationUserIsFetching,
      updateVerificationUserErr,
      userDetailsIsFetching,
    } = this.props;
    const { extension, userVerificationMethodId } = updateUserFormValues || {};
    const err = updateVerificationUserErr;
    const { errMsg } = this.state;
    return (
      <div className="container pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">
          {userVerificationMethodId == 3
            ? "Mobile Verification"
            : "Email Verification"}
        </h2>
        {userDetailsIsFetching ? (
          <div className="row justify-content-center">
            <div className="col-12 col-md-5">
              {handleVerifyUserPlaceHolderGlow1()}
            </div>
          </div>
        ) : (
          <section className="mt-4 pt-5">
            <div className="row justify-content-center">
              <div
                className={`col-12 col-md-5 mx-3 ${
                  errMsg || err ? "" : "mb-3"
                }`}
              >
                {userVerificationMethodId == 3 && (
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
                )}
                {userVerificationMethodId == 2 && (
                  <div>
                    <div className="text-start mb-1 auth-f-bold">
                      <label>Enter your email address</label>
                    </div>
                    <Field
                      component={RenderInputField}
                      name="email"
                      type="text"
                      inputClassName="mb-0"
                    />
                  </div>
                )}
                {(err || errMsg) && (
                  <div className="text-danger mt-1 text-start text-md-center">
                    {err || errMsg}
                  </div>
                )}
              </div>
            </div>
            <div className="text-center py-4">
              <Button
                className="btn col-12 col-md-5"
                onClick={this.handleSubmit}
                disabled={updateVerificationUserIsFetching}
                // isLoading={updateVerificationUserIsFetching}
              >
                {updateVerificationUserIsFetching ? "Submitting..." : "Proceed"}
              </Button>
            </div>
            <TermsAndPrivacy />
          </section>
        )}
      </div>
    );
  }
}

const form = reduxForm({
  form: updateUserForm,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: () => {},
})(UpdateUser);

export default Container(form);
