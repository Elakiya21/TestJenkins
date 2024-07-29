import React, { Component, Fragment } from "react";
import Button from "Common/Elements/Button";
import Components from "../Components";
import { isEmpty } from "lodash";
import GreenTick from "../../../images/GreenTick1.png";
import Downloadapp1 from "../../../images/Downloadapp1.png";
import Downloadapp2 from "../../../images/Downloadapp2.png";
const KEYCLOAK_ACTION_TOKEN_URL =
  process.env.REACT_APP_KEYCLOAK_ACTION_TOKEN_URL;
const USER_VERIFICATION_CLIENT_ID = process.env.REACT_APP_USER_VERIFICATION_CLIENT_ID

class LandingPage extends Component {
  state = {
    disableButton: false,
  };
  componentDidMount() {
    setTimeout(() => {
      const page = document.querySelector(".page");
      page.classList.add("slide-in");
    }, 1);
    const { getStoreDetails } = this.props
    const { id } = this.props.match.params;
    getStoreDetails.request(id);
  }
  handleAutoLogin = () => {
    const { actionToken, match, createFormValues } = this.props;
    const { id } = match.params || "";
    const { deviceId, userIp } = createFormValues || {};
    this.setState({ disableButton: true });
    if (actionToken && !isEmpty(actionToken) && actionToken != null) {
      if (deviceId && !isEmpty(deviceId)) {
        window.location.href = `${KEYCLOAK_ACTION_TOKEN_URL}?client_id=${USER_VERIFICATION_CLIENT_ID}&key=${actionToken}&userIp=${userIp}&device_id=${deviceId}`;
      } else {
        window.location.href = `${KEYCLOAK_ACTION_TOKEN_URL}?client_id=${USER_VERIFICATION_CLIENT_ID}&key=${actionToken}&userIp=${userIp}`;
      }
    } else {
      window.location.href = `${process.env.REACT_APP_HOME_URL}/${id}/home`
    }
  };

  handleMagicLink = () => {
    const { match, createFormValues, magicLinkCodeValue } = this.props;
    const { id } = match.params || "";
    const { deviceId } = createFormValues || {};
    this.setState({ disableButton: true });
    let url = process.env.REACT_APP_MAGIC_LINK_DETAILS_PAGE;
    url = url.replace("{storeId}", id);
    url = url.replace("{magicLinkCode}", magicLinkCodeValue);
    if (deviceId && !isEmpty(deviceId)) {
      url = url + `&device_id=${createFormValues.deviceId}`
    }
    window.location.href = url;
  };

  render() {
    const { disableButton } = this.state;
    const { androidAppUrl, iosAppUrl, magicLinkCodeValue } = this.props
    return (
      <div className="container auth-self-registration pt-5">
        <section className="text-center">
          <img src={GreenTick} alt="Registration Completed" style={{ maxHeight: "90px" }} />
          <div className="h1 my-4 auth-f-bold">
            Your registration is completed
          </div>
          {magicLinkCodeValue ?
            (<div className="py-4">
              <Button
                className="btn col-12 col-md-5"
                onClick={this.handleMagicLink}
                disabled={disableButton}
              >
                Discover
              </Button>
            </div>) :
            (
              window.ReactNativeWebView ? (
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
                          <img alt="Download our app for Android" src={Downloadapp1} />
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
              )
            )}
        </section>
      </div>
    );
  }
}

export default Components(LandingPage);
