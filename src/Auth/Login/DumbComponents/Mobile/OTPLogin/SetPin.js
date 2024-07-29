import React, { Component } from "react";
import { reduxForm } from "redux-form";
import Container from "../../../Components";
import Button from "Common/Elements/Button";
import OtpInput from "../../../../Common/DumbComponents/OtpInput";
import { isEmpty } from "lodash";
import { loginForm } from "../../../consts";
import axios from "axios";
const KEYCLOAK_ACTION_TOKEN_URL =
  process.env.REACT_APP_KEYCLOAK_ACTION_TOKEN_URL;
const ipAddressApiUrl = process.env.REACT_APP_IP_ADDRESS_API_URL;

class CreatePin extends Component {
  state = {
    showErr: false,
    showMsg: "",
    isUserLoggingIn: false,
  };
  componentDidMount() {
    const { setUserPin, dispatch, change } = this.props;
    dispatch(change("newPin", ""));
    dispatch(change("confirmPin", ""));
    setUserPin.clear();
    axios.get(ipAddressApiUrl).then(
      (response) => {
        var ipAddress = response.data && response.data.ip;
        dispatch(change("userIp", ipAddress));
      },
      (error) => {}
    );
  }

  componentDidUpdate() {
    const {
      setUserPinData,
      setUserPinIsFetching,
      createFormValues,
      loginBasicDeatils,
    } = this.props;
    const { userIp } = createFormValues || {};
    const { device_id, client_id } = loginBasicDeatils || {};
    const { isUserLoggingIn } = this.state;
    if (setUserPinData && !isEmpty(setUserPinData) && !setUserPinIsFetching) {
      if (
        setUserPinData.actionToken &&
        !isEmpty(setUserPinData.actionToken) &&
        !isUserLoggingIn
      ) {
        this.setState({ isUserLoggingIn: true });
        window.location.href = `${KEYCLOAK_ACTION_TOKEN_URL}?client_id=${client_id}&key=${setUserPinData.actionToken}&userIp=${userIp}&device_id=${device_id}`;
      }
    }
  }
  createPin = () => {
    const {
      setUserPin,
      customerId,
      createFormIsValid,
      createFormValues,
      history,
    } = this.props;
    if (
      createFormIsValid &&
      createFormValues &&
      createFormValues.newPin &&
      createFormValues.newPin.length == 4 &&
      createFormValues.confirmPin &&
      createFormValues.confirmPin.length == 4
    ) {
      this.setState({ showErr: false, showMsg: "" });
      setUserPin.request({ customerId: customerId, history: history });
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
    const { showMsg, showErr, isUserLoggingIn } = this.state || {};
    const err = setUserPinErr || "";
    return (
      <div className="container auth-login pt-5">
        <h2 className="text-center auth-f-bold custom-heading-1">
          Set Your PIN
        </h2>
        <section className="mt-4 pt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-5 mx-3 mb-3">
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
              <div className="text-center py-4">
                <Button
                  className="btn col-12"
                  onClick={setUserPinIsFetching ? "" : this.createPin}
                  disabled={setUserPinIsFetching || isUserLoggingIn}
                >
                  {setUserPinIsFetching || isUserLoggingIn
                    ? "Submitting..."
                    : "Submit"}
                </Button>
              </div>
            </div>
          </div>
          {(showErr || err) && (
            <div className="text-danger mt-4 text-center">{showMsg || err}</div>
          )}
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
})(CreatePin);

export default Container(form);
