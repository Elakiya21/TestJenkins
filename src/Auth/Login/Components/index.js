import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import { isValid, submit, getFormValues } from "redux-form";
import { getCrudActionsForDispatch } from "Auth/Common/helpers";
import { loginForm } from "../consts.js";
import * as actions from "./actions.js";

const mapStateToProps = (state) => {
  const { login } = state.userProfile;
  const {
    getStoreDetails,
    getLoginFlow,
    verifyBiometricLogin,
    userVerificationData,
    loginBasicDeatils,
    verifyPinLogin,
    sendLoginOtp,
    verifyLoginOtp,
    reSendLoginOtp,
    setUserPin,
    modal,
    resetPinLogin,
    storedCompanyList,
    sendMagicLinkLoginOtp,
    verifyMagicLinkLoginOtp,
    reSendMagicLinkLoginOtp,
  } = login;
  const createFormIsValid = isValid(loginForm)(state);
  const createFormValues = getFormValues(loginForm)(state);
  return {
    createFormValues,
    createFormIsValid,
    modal,
    storeLoginType: get(
      getStoreDetails,
      "data.storeConfigurations.selfRegistrationStoreConfigurations.storeLoginType",
      ""
    ),
    storeDetails: getStoreDetails.data || {},
    storeDetailsErr: get(
      getStoreDetails.error,
      "statusMessage.description",
      ""
    ),
    getStoreDetailsIsFetching: getStoreDetails.isFetching,
    loginFlowData: getLoginFlow.data || {},
    getLoginFlowIsFetching: getLoginFlow.isFetching,
    companyList: get(getLoginFlow, "data.companyList", []),
    verifyBiometricLoginData: verifyBiometricLogin.data || {},
    verifyBiometricLoginValidationError: get(
      verifyBiometricLogin,
      "data.validationError",
      ""
    ),
    verifyBiometricLoginIsFetching: verifyBiometricLogin.isFetching,
    verifyBiometricLoginErr: get(
      verifyBiometricLogin.error,
      "statusMessage.description",
      ""
    ),
    verifyPinLoginData: verifyPinLogin.data || {},
    verifyPinLoginValidationError: get(
      verifyPinLogin,
      "data.validationError",
      ""
    ),
    verifyPinLoginIsFetching: verifyPinLogin.isFetching,
    verifyPinLoginErr: get(
      verifyPinLogin.error,
      "statusMessage.description",
      ""
    ),
    verifyPinLoginValidationErr: get(
      verifyPinLogin,
      "data.validationError",
      ""
    ),
    userVerificationData,
    loginBasicDeatils,
    sendLoginOtpErr: get(sendLoginOtp.error, "statusMessage.description", ""),
    sendLoginOtpIsFetching: sendLoginOtp.isFetching,
    sendLoginOtpData: sendLoginOtp.data || {},
    sendLoginOtpValidationError: get(sendLoginOtp, "data.validationError", ""),
    resetPinLoginData: resetPinLogin.data || {},
    resetPinLoginErr: get(resetPinLogin.error, "statusMessage.description", ""),
    resetPinLoginMsg: get(resetPinLogin.date, "statusMessage.description", ""),
    resetPinLoginIsFetching: resetPinLogin.isFetching,
    otpFlowcompanyList: get(sendLoginOtp, "data.companyList", []),
    verifyLoginOtpErr: get(
      verifyLoginOtp.error,
      "statusMessage.description",
      ""
    ),
    verifyLoginOtpMsg: get(
      verifyLoginOtp.data,
      "statusMessage.description",
      ""
    ),
    verifyLoginOtpData: verifyLoginOtp.data || {},
    verifyLoginOtpIsFetching: verifyLoginOtp.isFetching,
    reSendOtpErr: get(reSendLoginOtp.error, "statusMessage.description", ""),
    reSendOtpMessage: get(reSendLoginOtp.data, "statusMessage.description", ""),
    reSendOtpCode: get(reSendLoginOtp.data, "status", ""),
    reSendOtpData: reSendLoginOtp.data || {},
    reSendOtpIsFetching: reSendLoginOtp.isFetching,
    setUserPinErr: get(setUserPin.error, "statusMessage.description", ""),
    setUserPinMessage: get(setUserPin.data, "statusMessage.description", ""),
    setUserPinIsFetching: setUserPin.isFetching,
    setUserPinData: setUserPin.data || {},
    storedCompanyList,
    sendMagicLinkLoginOtpErr: get(sendMagicLinkLoginOtp.error, "statusMessage.description", ""),
    sendMagicLinkLoginOtpMessage: get(sendMagicLinkLoginOtp.data, "statusMessage.description", ""),
    sendMagicLinkLoginOtpIsFetching: sendMagicLinkLoginOtp.isFetching,
    sendMagicLinkLoginOtpData: sendMagicLinkLoginOtp.data || {},
    sendMagicLinkLoginOtpValidationError: get(sendMagicLinkLoginOtp, "data.validationError", ""),
    verifyMagicLinkLoginOtp,
    verifyMagicLinkLoginOtpErr: get(verifyMagicLinkLoginOtp.error, "statusMessage.description", ""),
    verifyMagicLinkLoginOtpMessage: get(verifyMagicLinkLoginOtp.data, "statusMessage.description", ""),
    verifyMagicLinkLoginOtpCode: get(verifyMagicLinkLoginOtp.data, "status", ""),
    verifyMagicLinkLoginOtpIsFetching: verifyMagicLinkLoginOtp.isFetching,
    actionToken: get(verifyMagicLinkLoginOtp.data, "actionToken", ""),
    reSendMagicLinkLoginOtpErr: get(reSendMagicLinkLoginOtp.error, "statusMessage.description", ""),
    reSendMagicLinkLoginOtpMessage: get(reSendMagicLinkLoginOtp.data, "statusMessage.description", ""),
    reSendMagicLinkLoginOtpCode: get(reSendMagicLinkLoginOtp.data, "status", ""),
    reSendMagicLinkLoginOtpIsFetching: reSendMagicLinkLoginOtp.isFetching,
    reSendMagicLinkLoginOtp,
    sendMagicLinkLoginOtpCode: get(sendMagicLinkLoginOtp.data, "status", ""),
  };
};

const mapDispatchToProps = (dispatch) => {
  const crudActionsWithDispatch = getCrudActionsForDispatch(actions, dispatch);
  const otherActions = bindActionCreators(
    {
      ...actions,
      submit,
    },
    dispatch
  );
  return {
    ...crudActionsWithDispatch,
    ...otherActions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
