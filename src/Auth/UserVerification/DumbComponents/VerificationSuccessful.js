import React, { Component, Fragment } from "react";
import Button from "Common/Elements/Button";
import Components from "../Components";
import { isEmpty } from "lodash";
import GreenTick from "../../../images/GreenTick1.png";
import Downloadapp1 from "../../../images/Downloadapp1.png";
import Downloadapp2 from "../../../images/Downloadapp2.png";
import axios from "axios";
import queryString from "query-string";

const ipAddressApiUrl = process.env.REACT_APP_IP_ADDRESS_API_URL;
const KEYCLOAK_ACTION_TOKEN_URL =
  process.env.REACT_APP_KEYCLOAK_ACTION_TOKEN_URL;
const USER_VERIFICATION_CLIENT_ID =
  process.env.REACT_APP_USER_VERIFICATION_CLIENT_ID;

class LandingPage extends Component {
  state = {
    disableButton: false,
    userIp: "",
  };
  componentDidMount() {
    setTimeout(() => {
      const page = document.querySelector(".page");
      page.classList.add("slide-in");
    }, 1);
    axios.get(ipAddressApiUrl).then(
      (response) => {
        var ipAddress = response.data && response.data.ip;
        this.setState({ userIp: ipAddress });
      },
      (error) => {}
    );
    const { getStoreDetailsRequest } = this.props;
    const { id } = this.props.match.params;
    getStoreDetailsRequest(id);
  }
  handleAutoLogin = () => {
    const {
      mobileActionToken,
      emailActionToken,
      match,
      createFormValues,
      updateVerificationUserNameResData,
    } = this.props;
    const { id } = match.params;
    let param = queryString.parse(location.search);
    var deviceId;
    if (param && param.device_id) {
      deviceId = param.device_id;
    }
    const { userIp } = this.state || {};
    var actionToken =
      mobileActionToken ||
      emailActionToken ||
      (updateVerificationUserNameResData &&
        updateVerificationUserNameResData.actionToken) ||
      "";
    this.setState({ disableButton: true });
    if (actionToken && !isEmpty(actionToken) && actionToken != null) {
      if (deviceId && !isEmpty(deviceId)) {
        window.location.href = `${KEYCLOAK_ACTION_TOKEN_URL}?client_id=${USER_VERIFICATION_CLIENT_ID}&key=${actionToken}&userIp=${userIp}&device_id=${deviceId}`;
      } else {
        window.location.href = `${KEYCLOAK_ACTION_TOKEN_URL}?client_id=${USER_VERIFICATION_CLIENT_ID}&key=${actionToken}&userIp=${userIp}`;
      }
    } else {
      window.location.href = `${process.env.REACT_APP_HOME_URL}/${id}/home`;
    }
  };

  render() {
    const { disableButton } = this.state;
    const { androidAppUrl, iosAppUrl } = this.props;
    return (
      <div className="container pt-5 auth-user-verification">
        <section className="text-center">
          <img
            src={GreenTick}
            alt="Registration Completed"
            style={{ maxHeight: "90px" }}
          />
          <div className="h1 my-4 auth-f-bold">
            Your registration is completed
          </div>
          {window.ReactNativeWebView ? (
            <div className="py-4">
              <Button
                className="btn col-12 col-md-5"
                onClick={this.handleAutoLogin}
                disabled={disableButton}
              >
                Discover
              </Button>
            </div>
          ) : (
            <Fragment>
              <div className="mt-3">
                <div class="p-4">
                  <div class="text-center">Click here to download the app</div>
                  <div class="download-app-image mt-3">
                    <a href={androidAppUrl} className="me-3">
                      <img
                        alt="Download our app for Android"
                        src={Downloadapp1}
                      />
                    </a>
                    <a href={iosAppUrl}>
                      <img alt="Download our app for IOS" src={Downloadapp2} />
                    </a>
                  </div>
                  <div class="text-center mt-3">To continue on web</div>
                  <a onClick={this.handleAutoLogin}>click here</a>
                </div>
              </div>
            </Fragment>
          )}
        </section>
      </div>
    );
  }
}

export default Components(LandingPage);
