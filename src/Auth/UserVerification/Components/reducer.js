import { initialState, reducer } from "shared/simpleDataReducer"

import * as actions from "./actions"

const initialStateObj = {
  resendOTP: { ...initialState },
  mobileVerification: { ...initialState },
  getCustomerProfileDetails: { ...initialState},
  updateVerificationUser: { ...initialState},
  emailVerification: { ...initialState},
  updateVerificationUserName: { ...initialState},
  setUserPin: { ...initialState},
  modal: {
    type: "",
    open: false,
  },
  searchInput: "",
}

export default function reducerFn(state = initialStateObj, action) {
  switch (action.type) {
    case actions.crudActions.resendOTP.REQUEST:
    case actions.crudActions.resendOTP.SUCCESS:
    case actions.crudActions.resendOTP.FAILURE:
    case actions.crudActions.resendOTP.CLEAR:
      return {
        ...state,
        resendOTP: { ...reducer({ ...state.resendOTP }, action, actions.crudActions.resendOTP) },
      }
    case actions.crudActions.mobileVerification.REQUEST:
    case actions.crudActions.mobileVerification.SUCCESS:
    case actions.crudActions.mobileVerification.FAILURE:
    case actions.crudActions.mobileVerification.CLEAR:
      return {
        ...state,
        mobileVerification: { ...reducer({ ...state.mobileVerification }, action, actions.crudActions.mobileVerification) },
      }
    case actions.crudActions.emailVerification.REQUEST:
    case actions.crudActions.emailVerification.SUCCESS:
    case actions.crudActions.emailVerification.FAILURE:
    case actions.crudActions.emailVerification.CLEAR:
      return {
        ...state,
        emailVerification: { ...reducer({ ...state.emailVerification }, action, actions.crudActions.emailVerification) },
      }
    case actions.crudActions.getCustomerProfileDetails.REQUEST:
    case actions.crudActions.getCustomerProfileDetails.SUCCESS:
    case actions.crudActions.getCustomerProfileDetails.FAILURE:
    case actions.crudActions.getCustomerProfileDetails.CLEAR:
      return {
        ...state,
        getCustomerProfileDetails: { ...reducer({ ...state.getCustomerProfileDetails }, action, actions.crudActions.getCustomerProfileDetails) },
      }
    case actions.crudActions.updateVerificationUser.REQUEST:
    case actions.crudActions.updateVerificationUser.SUCCESS:
    case actions.crudActions.updateVerificationUser.FAILURE:
    case actions.crudActions.updateVerificationUser.CLEAR:
      return {
        ...state,
        updateVerificationUser: { ...reducer({ ...state.updateVerificationUser }, action, actions.crudActions.updateVerificationUser) },
      }
    case actions.crudActions.updateVerificationUserName.REQUEST:
    case actions.crudActions.updateVerificationUserName.SUCCESS:
    case actions.crudActions.updateVerificationUserName.FAILURE:
    case actions.crudActions.updateVerificationUserName.CLEAR:
      return {
        ...state,
        updateVerificationUserName: { ...reducer({ ...state.updateVerificationUserName }, action, actions.crudActions.updateVerificationUserName) },
      }
    case actions.crudActions.setUserPin.REQUEST:
    case actions.crudActions.setUserPin.SUCCESS:
    case actions.crudActions.setUserPin.FAILURE:
    case actions.crudActions.setUserPin.CLEAR:
      return {
        ...state,
        setUserPin: { ...reducer({ ...state.setUserPin }, action, actions.crudActions.setUserPin) },
      }
    case actions.SET_MODAL_VISIBILITY:
      return {
        ...state,
        modal: action.data,
      }
    case actions.SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.data,
      }
    default:
      return state
  }
}
