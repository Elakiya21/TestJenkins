import { isArray, isEmpty } from "lodash";
import React, { Component, Fragment } from "react";
import querystring from "query-string";
import Container from "../Components";
import {
  MOBILE_BIOMETRIC_LOGIN_FLOW,
  MOBILE_PIN_LOGIN_FLOW,
  MOBILE_OTP_LOGIN_FLOW,
  EMAIL_BIOMETRIC_LOGIN_FLOW,
  EMAIL_PIN_LOGIN_FLOW,
  EMAIL_OTP_LOGIN_FLOW,
} from "../consts";
import { handleInitailLoginPlaceHolderGlow } from "../helpers";
const domain = process.env.REACT_APP_MAIN_DOMAIN;
class InitialLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCallLoginFlowApi: true,
      showErrMsg: "",
    };
  }
  componentDidMount() {
    const { match, getStoreDetails, getLoginFlow, setLoginBasicDetails } =
      this.props;
    const { id } = match.params;
    let queryParams = querystring.parse(location.search);
    setLoginBasicDetails("");
    getStoreDetails.clear();
    getLoginFlow.clear();
    if (queryParams && !isEmpty(queryParams) && queryParams.client_id) {
      getStoreDetails.request(id);
      document.cookie =
        "clientId=" +
        queryParams.client_id +
        "; domain=" +
        domain +
        "; path=/; sameSite=none; secure=false";
      document.cookie =
        "redirectUrl=" +
        queryParams.redirect_uri +
        "; domain=" +
        domain +
        "; path=/; sameSite=none; secure=false";
      if (queryParams.page_url) {
        queryParams.redirect_uri = queryParams.page_url;
        document.cookie =
          "page_url=" +
          queryParams.page_url +
          "; domain=" +
          domain +
          "; path=/; sameSite=none; secure=false";
      }
      if (queryParams.device_id) {
        document.cookie =
          "deviceId=" +
          queryParams.device_id +
          "; domain=" +
          domain +
          "; path=/; sameSite=none; secure=false";
      }
      const urlObject = new URL(queryParams.redirect_uri);
      urlObject.searchParams.delete("isFromKeycloak");
      queryParams.redirect_uri = urlObject.toString();
      setLoginBasicDetails(queryParams);
    } else {
      this.setState({ showErrMsg: "Client id not found" });
    }
    // document.cookie =
    //   "storeTerminalId=" +
    //   id.toLowerCase() +
    //   "; domain=" +
    //   domain +
    //   "; path=/; sameSite=none; secure=false";
  }

  componentDidUpdate(prevPros, prevState) {
    const {
      storeLoginType,
      getLoginFlow,
      match,
      loginFlowData,
      getStoreDetailsIsFetching,
      getLoginFlowIsFetching,
      history,
    } = this.props;
    const { isCallLoginFlowApi } = this.state;
    const { id } = match.params;
    let queryParams = querystring.parse(location.search);
    let deviceid = (queryParams && queryParams.device_id) || "";
    let queryMobileNo = (queryParams && queryParams.queryMobileNo) || "";
    let newInstallation = (queryParams && queryParams.newInstallation) || "";
    if (
      storeLoginType &&
      !isEmpty(storeLoginType) &&
      !getStoreDetailsIsFetching &&
      isCallLoginFlowApi
    ) {
      getLoginFlow.request({
        storeId: id,
        deviceId: deviceid,
        storeLoginType: storeLoginType,
        queryMobileNo: queryMobileNo,
        newInstallation: newInstallation,
      });
      this.setState({ isCallLoginFlowApi: false });
    }
    if (loginFlowData && !isEmpty(loginFlowData) && !getLoginFlowIsFetching) {
      switch (loginFlowData.flowName) {
        case MOBILE_BIOMETRIC_LOGIN_FLOW:
          history.push(`/auth/${id}/login/mobile/biometric`);
          break;
        case MOBILE_PIN_LOGIN_FLOW:
          history.push(`/auth/${id}/login/mobile/pin`);
          break;
        case MOBILE_OTP_LOGIN_FLOW:
          history.push(`/auth/${id}/login/mobile/otp`);
          break;
        case EMAIL_BIOMETRIC_LOGIN_FLOW:
          history.push(`/auth/${id}/login/email/biometric`);
          break;
        case EMAIL_PIN_LOGIN_FLOW:
          history.push(`/auth/${id}/login/email/pin`);
          break;
        case EMAIL_OTP_LOGIN_FLOW:
          history.push(`/auth/${id}/login/email/otp`);
          break;
        default:
          history.push(`/auth/${id}/login/mobile/otp`);
      }
    }
  }

  render() {
    const { storeDetailsErr } = this.props;
    const { showErrMsg } = this.state;
    return (
      <Fragment>
        {!isEmpty(showErrMsg) || storeDetailsErr ? (
          <div className="container text-center d-flex justify-content-center align-items-center vh-80">
            <section className="py-3 text-danger">
              {showErrMsg || storeDetailsErr}
            </section>
          </div>
        ) : (
          <div className="container auth-login pt-5">
            <div className="row justify-content-center">
              <div className="col-12 col-md-5">
                {handleInitailLoginPlaceHolderGlow()}
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Container(InitialLogin);
