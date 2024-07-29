import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import get from "lodash/get"
import { isValid, submit, getFormValues } from "redux-form"
import { getCrudActionsForDispatch } from "Auth/Common/helpers"
import { otpForm, updateUserForm, createPinForm } from "../consts"
import * as actions from "./actions"
import { crudActions as loginActions } from "../../Login/Components/actions";

const mapStateToProps = (state) => {
  const { userVerification, login } = state.userProfile
  const { getStoreDetails } = login
  const otpFormIsValid = isValid(otpForm)(state)
  const updateUserFormValues = getFormValues(updateUserForm)(state)
  const otpFormValues = getFormValues(otpForm)(state)
  const createPinFormIsValid = isValid(createPinForm)(state)
  const createPinFormValues = getFormValues(createPinForm)(state)
  const { resendOTP, mobileVerification, modal, getCustomerProfileDetails, updateVerificationUser, emailVerification, updateVerificationUserName, setUserPin} = userVerification
  return {
    resendOTP,
    mobileVerification,
    emailVerification,
    modal,
    resendOTPErr: get(resendOTP.error, "statusMessage.description", ""),
    mobileVerificationErr: get(mobileVerification.error, "statusMessage.description", ""),
    emailVerificationErr: get(emailVerification.error, "statusMessage.description", ""),
    resendOTPMessage: get(resendOTP.data, "statusMessage.description", ""),
    mobileVerificationMessage: get(mobileVerification.data, "statusMessage.description", ""),
    emailVerificationMessage: get(emailVerification.data, "statusMessage.description", ""),
    storeName: get(mobileVerification.data, "storeName", ""),
    storeUrl: get(mobileVerification.data, "storeUrl", ""),
    emailVerificationResStoreName: get(emailVerification.data, "storeName", ""),
    emailVerificationResStoreUrl: get(emailVerification.data, "storeUrl", ""),
    otpFormIsValid,
    resendOTPIsFetching: resendOTP.isFetching,
    mobileVerificationIsFetching: mobileVerification.isFetching,
    emailVerificationIsFetching: emailVerification.isFetching, 
    userDetails: getCustomerProfileDetails.data || {},
    userDetailsIsFetching: getCustomerProfileDetails.isFetching,
    userDetailsMessage: get(getCustomerProfileDetails.data, "statusMessage.description", ""),
    updateUserFormValues,
    updateVerificationUserName,
    updateVerificationUserNameIsFetching: updateVerificationUserName.isFetching,
    updateVerificationUserNameErr : get(updateVerificationUserName.error, "statusMessage.description", ""),
    updateVerificationUserNameRes: get(updateVerificationUserName.data, "statusMessage.description", ""),
    updateVerificationUserNameResData: updateVerificationUserName.data || {},
    updateVerificationUser,
    updateVerificationUserIsFetching: updateVerificationUser.isFetching,
    updateVerificationUserErr : get(updateVerificationUser.error, "statusMessage.description", ""),
    updateVerificationUserMsg: get(updateVerificationUser.data, "statusMessage.description", ""),
    otpFormValues,
    mobileActionToken: get(mobileVerification.data, "actionToken", ""),
    emailActionToken: get(emailVerification.data, "actionToken", ""),
    setUserPinErr: get(setUserPin.error, "statusMessage.description", ""),
    setUserPinMessage: get(setUserPin.data, "statusMessage.description", ""),
    setUserPinIsFetching: setUserPin.isFetching,
    createPinFormIsValid,
    createPinFormValues,
    androidAppUrl: get(getStoreDetails, "data.storeConfigurations.androidAppUrl", ""),
    iosAppUrl: get(getStoreDetails, "data.storeConfigurations.iosAppUrl", ""),
  }
}

const mapDispatchToProps = (dispatch) => {
  const crudActionsWithDispatch = getCrudActionsForDispatch(actions, dispatch)
  const otherActions = bindActionCreators({ ...actions, submit ,
    getStoreDetailsRequest :  loginActions.getStoreDetails.request,
  }, dispatch)
  return {
    ...crudActionsWithDispatch,
    ...otherActions,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
