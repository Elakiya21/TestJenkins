import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import { isValid, submit, getFormValues } from "redux-form";
import { getCrudActionsForDispatch } from "Auth/Common/helpers";
import { registrationForm } from "../consts";
import * as actions from "./actions";

const mapStateToProps = (state) => {
  const { selfRegistration: selfRegistrationState } =
    state.userProfile;
  const {
    selfRegistration,
    mobileVerification,
    reSendOtp,
    setResponse,
    showEmailConfirmation,
    modal,
    getBasicDetails,
    isEditSelfRegister,
    setUserPin,
    emailVerification,
    selfRegisterName,
    selfRegisterEmail,
    magicLinkCodeValue,
    setMagicLinkCode,
    getStoreDetails,
    assignToUser
  } = selfRegistrationState;
  const createFormIsValid = isValid(registrationForm)(state);
  const createFormValues = getFormValues(registrationForm)(state);
  return {
    createFormValues,
    selfRegistration,
    magicLinkCodeValue,
    showEmailConfirmation,
    setMagicLinkCode,
    assignToUserIsFetching: assignToUser.isFetching,
    assignToUserErr: get( assignToUser.error,"statusMessage.description", ""),
    selfRegistrationErr: get(
      selfRegistration.error,
      "statusMessage.description",
      ""
    ),
    selfRegistrationErrId: get(
      selfRegistration.error,
      "id",
      ""
    ),
    selfRegistrationMessage: get(
      selfRegistration.data,
      "statusMessage.description",
      ""
    ),
    userName: get(state.keycloak, "keycloakData.tokenParsed.name", ""),
    firstName: get(state.keycloak, "keycloakData.tokenParsed.given_name", ""),
    storeTerminalId: get(
      state.keycloak,
      "keycloakData.tokenParsed.storeTerminalId",
      ""
    ).toLowerCase(),
    mobileNumber: get(
      state.keycloak,
      "keycloakData.tokenParsed.mobileNumber",
      ""
    ),
    email: get(state.keycloak, "keycloakData.tokenParsed.email", ""),
    customerId: get(selfRegistration.data, "customerId", ""),
    selfRegistrationIsFetching: selfRegistration.isFetching,
    createFormIsValid,
    reSendOtp,
    modal,
    emailVerification,
    mobileVerification,
    mobileVerificationErr: get(
      mobileVerification.error,
      "statusMessage.description",
      ""
    ),
    mobileVerificationMessage: get(
      mobileVerification.data,
      "statusMessage.description",
      ""
    ),
    mobileVerificationCode: get(mobileVerification.data, "status", ""),
    mobileVerificationIsFetching: mobileVerification.isFetching,
    emailVerificationErr: get(
      emailVerification.error,
      "statusMessage.description",
      ""
    ),
    emailVerificationMessage: get(
      emailVerification.data,
      "statusMessage.description",
      ""
    ),
    emailVerificationIsFetching: emailVerification.isFetching,
    reSendOtpErr: get(reSendOtp.error, "statusMessage.description", ""),
    reSendOtpMessage: get(reSendOtp.data, "statusMessage.description", ""),
    reSendOtpCode: get(reSendOtp.data, "status", ""),
    reSendOtpIsFetching: reSendOtp.isFetching,
    setResponse,
    basicDetails: get(getBasicDetails, "data", {}),
    getBasicDetailsMessage: get(
      getBasicDetails.data,
      "statusMessage.description",
      ""
    ),
    getBasicDetailsErr: get(
      getBasicDetails.error,
      "statusMessage.description",
      ""
    ),
    isEditSelfRegister,
    setUserPinErr: get(setUserPin.error, "statusMessage.description", ""),
    setUserPinMessage: get(setUserPin.data, "statusMessage.description", ""),
    setUserPinIsFetching: setUserPin.isFetching,
    selfRegisterNameIsFetching: selfRegisterName.isFetching,
    selfRegisterNameErr: get(
      selfRegisterName.error,
      "statusMessage.description",
      ""
    ),
    selfRegisterNameMessage: get(
      selfRegisterName.data,
      "statusMessage.description",
      ""
    ),
    selfRegisterEmailIsFetching: selfRegisterEmail.isFetching,
    selfRegisterEmailErr: get(
      selfRegisterEmail.error,
      "statusMessage.description",
      ""
    ),
    selfRegisterEmailMessage: get(
      selfRegisterEmail.data,
      "statusMessage.description",
      ""
    ),
    actionToken: get(emailVerification.data, "actionToken", ""),
    androidAppUrl: get(
      getStoreDetails,
      "data.storeConfigurations.androidAppUrl",
      ""
    ),
    iosAppUrl: get(getStoreDetails, "data.storeConfigurations.iosAppUrl", ""),
  };
};

const mapDispatchToProps = (dispatch) => {
  const crudActionsWithDispatch = getCrudActionsForDispatch(actions, dispatch);
  const otherActions = bindActionCreators({ ...actions, submit }, dispatch);
  return {
    ...crudActionsWithDispatch,
    ...otherActions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
