import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Container from "../Components";
import Button from "Common/Elements/Button";
import RenderInputField from "Common/FormFields/RenderInputField";
import { registrationForm, validateResponse } from "../consts";
import TermsAndPrivacy from "../../Common/DumbComponents/TermsAndPrivacy";
const validateNameErr = [
  "Invalid first name passed",
  "Invalid last name passed",
];

class RegisterFullName extends Component {
  state = {
    showErr: false,
    showMsg: "",
  };

  componentDidMount = () => {
    setTimeout(() => {
      const page = document.querySelector(".page");
      page.classList.add("slide-in");
    }, 1);
    const {
      selfRegisterName,
      customerId,
      initialize,
      createFormValues,
      match,
    } = this.props;
    const { id } = match.params;
    selfRegisterName.clear();
    const addInitialValues = {
      deviceId: (createFormValues && createFormValues.deviceId) || "",
      userId: customerId,
      id: id,
    };
    initialize(addInitialValues);
  };

  handleSubmit = () => {
    const { createFormValues, selfRegisterName, history} = this.props;
    selfRegisterName.clear();
    if (createFormValues && createFormValues.fullName) {
      this.setState({ showErr: false, showMsg: "" });
      selfRegisterName.request({history: history});
    } else {
      this.setState({ showErr: true, showMsg: "Full name is mandatory" });
    }
  };
  render() {
    const { selfRegisterNameIsFetching, selfRegisterNameErr } = this.props;
    const { showErr, showMsg } = this.state;
    const err = validateNameErr.includes(selfRegisterNameErr)
      ? "Invalid name passed"
      : selfRegisterNameErr || "";
    return (
      <div className="container auth-self-registration pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">Profile Details</h2>
        <section className="mt-4 pt-5">
          <div className="row justify-content-center">
            <div
              className={`col-12 col-md-5 mx-3 ${showErr || err ? "" : "mb-3"}`}
            >
              <div>
                <div className="text-start mb-1 auth-f-bold">
                  <label>Your name</label>
                </div>
                <Field
                  component={RenderInputField}
                  name="fullName"
                  // placeholder="Full Name"
                  inputClassName="mb-0"
                  type="text"
                />
              </div>
              {(showErr || err) && (
                <div className="text-danger mt-1 text-start text-md-center">
                  {showMsg || err}
                </div>
              )}
            </div>
          </div>

          <div className="text-center py-4">
            <Button
              className="btn col-12 col-md-5"
              disabled={selfRegisterNameIsFetching}
              onClick={this.handleSubmit}
            >
              {selfRegisterNameIsFetching ? "Submitting..." : "Proceed"}
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
  onSubmit: () => {},
})(RegisterFullName);

export default Container(form);
