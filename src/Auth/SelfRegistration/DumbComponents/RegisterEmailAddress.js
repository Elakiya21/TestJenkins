import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Container from "../Components";
import Button from "Common/Elements/Button";
import RenderInputField from "Common/FormFields/RenderInputField";
import { registrationForm } from "../consts";
import TermsAndPrivacy from "../../Common/DumbComponents/TermsAndPrivacy";

class RegisterEmailAddress extends Component {
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
      selfRegisterEmail,
      createFormValues,
      customerId,
      match,
      initialize,
    } = this.props;
    const { id } = match.params;
    selfRegisterEmail.clear();
    const addInitialValues = {
      deviceId: (createFormValues && createFormValues.deviceId) || "",
      userId: customerId,
      id: id,
    };
    initialize(addInitialValues);
  };

  handleSubmit = () => {
    const { createFormValues, selfRegisterEmail, history } = this.props;
    selfRegisterEmail.clear();
    if (createFormValues && createFormValues.email) {
      this.setState({ showErr: false, showMsg: "" });
      selfRegisterEmail.request({history: history});
    } else {
      this.setState({ showErr: true, showMsg: "Email address is mandatory" });
    }
  };
  render() {
    const { selfRegisterEmailIsFetching, selfRegisterEmailErr } = this.props;
    const { showErr, showMsg } = this.state;
    const err = selfRegisterEmailErr;
    return (
      <div className="container auth-self-registration pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">Email Verification</h2>
        <section className="mt-4 pt-5">
          <div className="row justify-content-center">
            <div
              className={`col-12 col-md-5 mx-3 ${showErr || err ? "" : "mb-3"}`}
            >
              <div>
                <div className="text-start mb-1 auth-f-bold">
                  <label>Enter your email address</label>
                </div>
                <Field
                  component={RenderInputField}
                  name="email"
                  // placeholder="Email Address"
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
              disabled={selfRegisterEmailIsFetching}
              onClick={this.handleSubmit}
            >
              {selfRegisterEmailIsFetching ? "Submitting..." : "Proceed"}
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
})(RegisterEmailAddress);

export default Container(form);
