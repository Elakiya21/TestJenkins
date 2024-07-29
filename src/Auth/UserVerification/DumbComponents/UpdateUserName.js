import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { updateUserForm, DUMMY_FIRST_NAME, DUMMY_LAST_NAME } from "../consts";
import { handleVerifyUserPlaceHolderGlow } from "../helpers";
import { maskEmail, maskPhoneNumber } from "../../helpers.js";
import { isEmpty } from "lodash";
import Button from "Common/Elements/Button";
import Container from "../Components";
import RenderInputField from "Common/FormFields/RenderInputField";
import TermsAndPrivacy from "../../Common/DumbComponents/TermsAndPrivacy";
import queryString from "query-string";
const validateNameErr = [
  "Invalid first name passed",
  "Invalid last name passed",
];

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
    document.title = "User Name Updation";
    const { getCustomerProfileDetails, match, updateVerificationUserName, dispatch, change } =
      this.props;
    const { id, storeId } = match.params || "";
    updateVerificationUserName.clear();
    getCustomerProfileDetails.request({ id });
    let param = queryString.parse(location.search);
    if (param && param.device_id){
      dispatch(change("deviceId", param.device_id));
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      userDetails,
      userDetailsIsFetching,
      updateVerificationUserNameIsFetching,
      updateVerificationUserNameRes,
      updateVerificationUserNameResData,
      updateUserFormValues
    } = nextProps;
    const { initialize, match, history } = this.props;
    const { storeId, id } = match.params;
    const { isFormInitialized } = this.state;
    if (
      userDetails &&
      !isEmpty(userDetails) &&
      !userDetailsIsFetching &&
      !isFormInitialized
    ) {
      const addInitialValues = {};
      if (userDetails.firstName && userDetails.firstName == DUMMY_FIRST_NAME) {
        addInitialValues.firstName = "";
      } else {
        addInitialValues.firstName = userDetails.firstName || "";
        addInitialValues.fullName = addInitialValues.firstName + " ";
      }
      if (userDetails.lastName && userDetails.lastName == DUMMY_LAST_NAME) {
        addInitialValues.lastName = "";
      } else {
        addInitialValues.lastName = userDetails.lastName || "";
        addInitialValues.fullName =
          addInitialValues.fullName + addInitialValues.lastName || "";
      }
      addInitialValues.phoneNumber =
        maskPhoneNumber(
          userDetails.primaryContact &&
            (userDetails.primaryContact.tempPhoneNumber ||
              userDetails.primaryContact.phoneNumber)
        ) || "";
      addInitialValues.extension =
        (userDetails.primaryContact &&
          (userDetails.primaryContact.extension && userDetails.primaryContact.extension.includes("+") ? "": "+") + userDetails.primaryContact.extension) ||
        "+91";
      addInitialValues.email =
        maskEmail(
          userDetails.primaryContact &&
            (userDetails.primaryContact.tempEmail ||
              userDetails.primaryContact.email)
        ) || "";
      addInitialValues.userVerificationMethodId =
        userDetails.userVerificationMethodId;
      addInitialValues.deviceId = updateUserFormValues && updateUserFormValues.deviceId || ""
      initialize(addInitialValues);
      this.showFormInitialized(true);
    }
    if (
      !updateVerificationUserNameIsFetching &&
      updateVerificationUserNameRes &&
      !isEmpty(updateVerificationUserNameRes) &&
      userDetails &&
      updateVerificationUserNameResData
    ) {
      if (
        userDetails.registrationMethodId == 8 ||
        userDetails.registrationMethodId == 9
      ) {
        if(updateUserFormValues && updateUserFormValues.deviceId)
          history.push(`/auth/${storeId}/verify/create-pin/${id}?device_id=${updateUserFormValues.deviceId}`)
        else
          history.push(`/auth/${storeId}/verify/confirmation`)
      } else
        history.push(`/auth/${storeId}/verify/update-user/${id}`)
    }
  }

  showFormInitialized = (value) => this.setState({ isFormInitialized: value });

  handleSubmit = () => {
    const { match, updateVerificationUserName, updateUserFormValues } =
      this.props;
    const { id, storeId } = match.params || "";
    this.setState({ errMsg: "" });
    if (updateUserFormValues && !isEmpty(updateUserFormValues.fullName)) {
      updateVerificationUserName.request({ id: id, storeId: storeId });
    } else {
      this.setState({ errMsg: "Name is mandatory" });
    }
  };

  render() {
    const {
      updateUserFormValues,
      updateVerificationUserNameIsFetching,
      updateVerificationUserNameErr,
      userDetailsIsFetching,
    } = this.props;
    const {
      phoneNumber,
      extension,
      email,
      userVerificationMethodId,
      fullName,
    } = updateUserFormValues || {};
    const err = validateNameErr.includes(updateVerificationUserNameErr)
      ? "Invalid name passed"
      : updateVerificationUserNameErr;
    const { errMsg } = this.state;
    return (
      <div className="container pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">Profile Details</h2>
        {userDetailsIsFetching ? (
          <div className="row justify-content-center">
            <div className="col-12 col-md-5">
              {handleVerifyUserPlaceHolderGlow()}
            </div>
          </div>
        ) : (
          <Fragment>
            <div className="row justify-content-center">
              <div className="text-center mt-4 col-12 col-md-5">
                Your
                {`${
                  userVerificationMethodId === 2 ? ` mobile number ` : " email "
                }`}
                {`${
                  userVerificationMethodId === 2
                    ? `${extension} ${phoneNumber}`
                    : email
                }`}{" "}
                has been verified. Please{" "}
                {fullName && !isEmpty(fullName) ? "confirm" : "provide"} detail
                below to continue.
              </div>
            </div>
            <section className="mt-4">
              <div className="row justify-content-center">
                <div
                  className={`col-12 col-md-5 mx-3 ${
                    errMsg || err ? "" : "mb-3"
                  }`}
                >
                  <div>
                    <div className="text-start mb-1 auth-f-bold">
                      <label>Your name</label>
                    </div>
                    <Field
                      component={RenderInputField}
                      name="fullName"
                      type="text"
                      inputClassName="mb-0"
                    />
                  </div>
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
                  disabled={updateVerificationUserNameIsFetching}
                  // isLoading={updateVerificationUserNameIsFetching}
                >
                  {updateVerificationUserNameIsFetching
                    ? "Submitting..."
                    : "Proceed"}
                </Button>
              </div>
              <TermsAndPrivacy />
            </section>
          </Fragment>
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
