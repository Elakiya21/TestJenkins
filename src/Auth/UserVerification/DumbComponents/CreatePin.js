import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Container from "../Components";
import Button from "Common/Elements/Button";
import OtpInput from "../../Common/DumbComponents/OtpInput";
import { createPinForm } from "../consts";
import queryString from "query-string";

class CreatePin extends Component {
  state = {
    showErr: false,
    showMsg: "",
  };
  componentDidMount() {
    setTimeout(() => {
      const page = document.querySelector(".page");
      page.classList.add("slide-in");
    }, 1);
    const { setUserPin, dispatch, change } = this.props;
    dispatch(change("newPin", ""));
    dispatch(change("confirmPin", ""));
    setUserPin.clear();
    let param = queryString.parse(location.search);
    if (param && param.device_id) dispatch(change("deviceId", param.device_id));
  }

  createPin = () => {
    const { setUserPin, createPinFormIsValid, createPinFormValues, match, history } =
      this.props;
    const { storeId, id } = match.params;
    if (
      createPinFormIsValid &&
      createPinFormValues &&
      createPinFormValues.newPin &&
      createPinFormValues.newPin.length == 4 &&
      createPinFormValues.confirmPin &&
      createPinFormValues.confirmPin.length == 4
    ) {
      this.setState({ showErr: false, showMsg: "" });
      setUserPin.request({ customerId: id, storeId: storeId, history: history });
    } else {
      this.setState({ showErr: true, showMsg: "Please enter 4 digit pin" });
    }
  };

  onSubmitNewPin = (pin) => {
    const { dispatch, change } = this.props;
    dispatch(change("newPin", pin));
  };

  onSubmitConfirmPin = (pin) => {
    const { dispatch, change } = this.props;
    dispatch(change("confirmPin", pin));
  };

  onNewPinUndo = () => {
    const { dispatch, change } = this.props;
    dispatch(change("newPin", ""));
  };

  onConfirmPinUndo = () => {
    const { dispatch, change } = this.props;
    dispatch(change("confirmPin", ""));
  };

  render() {
    const { setUserPinIsFetching, setUserPinErr } = this.props;
    const { showMsg, showErr } = this.state || {};
    const err = setUserPinErr;
    return (
      <div className="container auth-self-registration pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">Set Your PIN</h2>
        <section className="mt-4 pt-5">
          <div className="row justify-content-center">
            <div
              className={`col-12 col-md-5 mx-3 ${showErr || err ? "" : "mb-3"}`}
            >
              <div>
                <div className="text-start mb-1 auth-f-bold">
                  <label>Enter PIN</label>
                </div>
                <OtpInput
                  length={4}
                  onOtpSubmit={this.onSubmitNewPin}
                  type="password"
                  initialSetFocus={true}
                  onOtpUndo={this.onNewPinUndo}
                />
              </div>
              <div className="pt-4">
                <div className="text-start mb-1 auth-f-bold">
                  <label>Confirm PIN</label>
                </div>
                <OtpInput
                  length={4}
                  onOtpSubmit={this.onSubmitConfirmPin}
                  type="password"
                  initialSetFocus={false}
                  onOtpUndo={this.onConfirmPinUndo}
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
              onClick={setUserPinIsFetching ? "" : this.createPin}
              disabled={setUserPinIsFetching}
            >
              {setUserPinIsFetching ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </section>
      </div>
    );
  }
}

const form = reduxForm({
  form: createPinForm,
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  onSubmit: () => {},
})(CreatePin);

export default Container(form);
