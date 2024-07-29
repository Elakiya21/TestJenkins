import { initialState, reducer } from "shared/simpleDataReducer"

import * as actions from "./actions"

const initialStateObj = {
    selfRegistration: { ...initialState },
    mobileVerification: { ...initialState },
    emailVerification: {...initialState},
    reSendOtp: { ...initialState },
    modal: {
      type: "",
      open: false,
    },
    showEmailConfirmation: true,
    magicLinkCodeValue: "",
    setResponse: {},
    getBasicDetails: { ...initialState},
    setUserPin: { ...initialState},
    isEditSelfRegister: false,
    selfRegisterName: {...initialState},
    selfRegisterEmail: { ...initialState},
    getStoreDetails: { ...initialState},
    assignToUser:  { ...initialState},

}

export default function reducerFn(state = initialStateObj, action) {
  switch (action.type) {
    case actions.crudActions.selfRegistration.REQUEST:
    case actions.crudActions.selfRegistration.SUCCESS:
    case actions.crudActions.selfRegistration.FAILURE:
    case actions.crudActions.selfRegistration.CLEAR:
      return {
        ...state,
        selfRegistration: { ...reducer({ ...state.selfRegistration }, action, actions.crudActions.selfRegistration) },
      }
    case actions.crudActions.mobileVerification.REQUEST:
    case actions.crudActions.mobileVerification.SUCCESS:
    case actions.crudActions.mobileVerification.FAILURE:
    case actions.crudActions.mobileVerification.CLEAR:
      return {
        ...state,
        mobileVerification: { ...reducer({ ...state.mobileVerification }, action, actions.crudActions.mobileVerification) },
      }
    case actions.crudActions.selfRegisterName.REQUEST:
    case actions.crudActions.selfRegisterName.SUCCESS:
    case actions.crudActions.selfRegisterName.FAILURE:
    case actions.crudActions.selfRegisterName.CLEAR:
      return {
        ...state,
        selfRegisterName: { ...reducer({ ...state.selfRegisterName }, action, actions.crudActions.selfRegisterName) },
      }
    case actions.crudActions.selfRegisterEmail.REQUEST:
    case actions.crudActions.selfRegisterEmail.SUCCESS:
    case actions.crudActions.selfRegisterEmail.FAILURE:
    case actions.crudActions.selfRegisterEmail.CLEAR:
      return {
        ...state,
        selfRegisterEmail: { ...reducer({ ...state.selfRegisterEmail }, action, actions.crudActions.selfRegisterEmail) },
      }
    case actions.crudActions.emailVerification.REQUEST:
    case actions.crudActions.emailVerification.SUCCESS:
    case actions.crudActions.emailVerification.FAILURE:
    case actions.crudActions.emailVerification.CLEAR:
      return {
        ...state,
        emailVerification: { ...reducer({ ...state.emailVerification }, action, actions.crudActions.emailVerification) },
      }
    case actions.crudActions.reSendOtp.REQUEST:
    case actions.crudActions.reSendOtp.SUCCESS:
    case actions.crudActions.reSendOtp.FAILURE:
    case actions.crudActions.reSendOtp.CLEAR:
      return {
      ...state,
      reSendOtp: { ...reducer({ ...state.reSendOtp }, action, actions.crudActions.reSendOtp) },
      }
    case actions.crudActions.getBasicDetails.REQUEST:
    case actions.crudActions.getBasicDetails.SUCCESS:
    case actions.crudActions.getBasicDetails.FAILURE:
    case actions.crudActions.getBasicDetails.CLEAR:
      return {
        ...state,
        getBasicDetails: { ...reducer({ ...state.getBasicDetails }, action, actions.crudActions.getBasicDetails) },
      }
    case actions.crudActions.setUserPin.REQUEST:
    case actions.crudActions.setUserPin.SUCCESS:
    case actions.crudActions.setUserPin.FAILURE:
    case actions.crudActions.setUserPin.CLEAR:
      return {
        ...state,
        setUserPin: { ...reducer({ ...state.setUserPin }, action, actions.crudActions.setUserPin) },
      }
    case actions.crudActions.assignToUser.REQUEST:
    case actions.crudActions.assignToUser.SUCCESS:
    case actions.crudActions.assignToUser.FAILURE:
    case actions.crudActions.assignToUser.CLEAR:
      return {
        ...state,
        assignToUser: { ...reducer({ ...state.assignToUser }, action, actions.crudActions.assignToUser) },
      }
    case actions.crudActions.getStoreDetails.REQUEST:
    case actions.crudActions.getStoreDetails.SUCCESS:
    case actions.crudActions.getStoreDetails.FAILURE:
    case actions.crudActions.getStoreDetails.CLEAR:
      return {
        ...state,
        getStoreDetails: { ...reducer({ ...state.getStoreDetails }, action, actions.crudActions.getStoreDetails) },
      }
    case actions.SET_MODAL_VISIBILITY:
      return {
        ...state,
        modal: action.data,
      }
    case actions.SET_RESPONSE:
      return {
        ...state,
        setResponse: action.data,
      }
    case actions.SET_EMAIL_CONFIRMATION_FLAG:
      return {
        ...state,
        showEmailConfirmation: action.data,
      }
    case actions.SET_MAGIC_LINK_FLAG:
      return {
        ...state,
        magicLinkCodeValue: action.data,
      }
    case actions.SET_IS_EDIT:
      return {
        ...state,
        isEditSelfRegister : action.data,
      }
    default:
      return state
  }
}
