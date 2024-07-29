import { initialState, reducer } from "shared/simpleDataReducer";

import * as actions from "./actions";

const initialStateObj = {
  getStoreDetails: { ...initialState },
  getLoginFlow: { ...initialState },
  loginBasicDeatils: {},
  userVerificationData: {},
  verifyBiometricLogin: { ...initialState },
  verifyPinLogin: { ...initialState },
  resetPinLogin: { ...initialState },
  sendLoginOtp: { ...initialState },
  verifyLoginOtp: { ...initialState },
  reSendLoginOtp: { ...initialState },
  modal: {
    type: "",
    open: false,
  },
  setUserPin: { ...initialState },
  storedCompanyList: [],
  sendMagicLinkLoginOtp: { ...initialState },
  verifyMagicLinkLoginOtp: { ...initialState },
  reSendMagicLinkLoginOtp: { ...initialState },
};

export default function reducerFn(state = initialStateObj, action) {
  switch (action.type) {
    case actions.crudActions.getStoreDetails.REQUEST:
    case actions.crudActions.getStoreDetails.SUCCESS:
    case actions.crudActions.getStoreDetails.FAILURE:
    case actions.crudActions.getStoreDetails.CLEAR:
      return {
        ...state,
        getStoreDetails: {
          ...reducer(
            { ...state.getStoreDetails },
            action,
            actions.crudActions.getStoreDetails
          ),
        },
      };
    case actions.crudActions.getLoginFlow.REQUEST:
    case actions.crudActions.getLoginFlow.SUCCESS:
    case actions.crudActions.getLoginFlow.FAILURE:
    case actions.crudActions.getLoginFlow.CLEAR:
      return {
        ...state,
        getLoginFlow: {
          ...reducer(
            { ...state.getLoginFlow },
            action,
            actions.crudActions.getLoginFlow
          ),
        },
      };
    case actions.crudActions.verifyBiometricLogin.REQUEST:
    case actions.crudActions.verifyBiometricLogin.SUCCESS:
    case actions.crudActions.verifyBiometricLogin.FAILURE:
    case actions.crudActions.verifyBiometricLogin.CLEAR:
      return {
        ...state,
        verifyBiometricLogin: {
          ...reducer(
            { ...state.verifyBiometricLogin },
            action,
            actions.crudActions.verifyBiometricLogin
          ),
        },
      };
    case actions.crudActions.verifyPinLogin.REQUEST:
    case actions.crudActions.verifyPinLogin.SUCCESS:
    case actions.crudActions.verifyPinLogin.FAILURE:
    case actions.crudActions.verifyPinLogin.CLEAR:
      return {
        ...state,
        verifyPinLogin: {
          ...reducer(
            { ...state.verifyPinLogin },
            action,
            actions.crudActions.verifyPinLogin
          ),
        },
      };
    case actions.crudActions.resetPinLogin.REQUEST:
    case actions.crudActions.resetPinLogin.SUCCESS:
    case actions.crudActions.resetPinLogin.FAILURE:
    case actions.crudActions.resetPinLogin.CLEAR:
      return {
        ...state,
        resetPinLogin: {
          ...reducer(
            { ...state.resetPinLogin },
            action,
            actions.crudActions.resetPinLogin
          ),
        },
      };
    case actions.crudActions.sendLoginOtp.REQUEST:
    case actions.crudActions.sendLoginOtp.SUCCESS:
    case actions.crudActions.sendLoginOtp.FAILURE:
    case actions.crudActions.sendLoginOtp.CLEAR:
      return {
        ...state,
        sendLoginOtp: {
          ...reducer(
            { ...state.sendLoginOtp },
            action,
            actions.crudActions.sendLoginOtp
          ),
        },
      };
    case actions.crudActions.verifyLoginOtp.REQUEST:
    case actions.crudActions.verifyLoginOtp.SUCCESS:
    case actions.crudActions.verifyLoginOtp.FAILURE:
    case actions.crudActions.verifyLoginOtp.CLEAR:
      return {
        ...state,
        verifyLoginOtp: {
          ...reducer(
            { ...state.verifyLoginOtp },
            action,
            actions.crudActions.verifyLoginOtp
          ),
        },
      };
    case actions.crudActions.reSendLoginOtp.REQUEST:
    case actions.crudActions.reSendLoginOtp.SUCCESS:
    case actions.crudActions.reSendLoginOtp.FAILURE:
    case actions.crudActions.reSendLoginOtp.CLEAR:
      return {
        ...state,
        reSendLoginOtp: {
          ...reducer(
            { ...state.reSendLoginOtp },
            action,
            actions.crudActions.reSendLoginOtp
          ),
        },
      };
    case actions.crudActions.setUserPin.REQUEST:
    case actions.crudActions.setUserPin.SUCCESS:
    case actions.crudActions.setUserPin.FAILURE:
    case actions.crudActions.setUserPin.CLEAR:
      return {
        ...state,
        setUserPin: {
          ...reducer(
            { ...state.setUserPin },
            action,
            actions.crudActions.setUserPin
          ),
        },
      };
    case actions.crudActions.sendMagicLinkLoginOtp.REQUEST:
    case actions.crudActions.sendMagicLinkLoginOtp.SUCCESS:
    case actions.crudActions.sendMagicLinkLoginOtp.FAILURE:
    case actions.crudActions.sendMagicLinkLoginOtp.CLEAR:
      return {
        ...state,
        sendMagicLinkLoginOtp: {
          ...reducer({ ...state.sendMagicLinkLoginOtp }, action, actions.crudActions.sendMagicLinkLoginOtp),
        },
      };
    case actions.crudActions.verifyMagicLinkLoginOtp.REQUEST:
    case actions.crudActions.verifyMagicLinkLoginOtp.SUCCESS:
    case actions.crudActions.verifyMagicLinkLoginOtp.FAILURE:
    case actions.crudActions.verifyMagicLinkLoginOtp.CLEAR:
      return {
        ...state,
        verifyMagicLinkLoginOtp: {
          ...reducer(
            { ...state.verifyMagicLinkLoginOtp },
            action,
            actions.crudActions.verifyMagicLinkLoginOtp
          ),
        },
      };
    case actions.crudActions.reSendMagicLinkLoginOtp.REQUEST:
    case actions.crudActions.reSendMagicLinkLoginOtp.SUCCESS:
    case actions.crudActions.reSendMagicLinkLoginOtp.FAILURE:
    case actions.crudActions.reSendMagicLinkLoginOtp.CLEAR:
      return {
        ...state,
        reSendMagicLinkLoginOtp: {
          ...reducer(
            { ...state.reSendMagicLinkLoginOtp },
            action,
            actions.crudActions.reSendMagicLinkLoginOtp
          ),
        },
      };
    case actions.SET_MODAL_VISIBILITY:
      return {
        ...state,
        modal: action.data,
      };
    case actions.SET_LOGIN_BASIC_DETAILS:
      return {
        ...state,
        loginBasicDeatils: action.data,
      };
    case actions.SET_USER_VERIFICATION_DATA:
      return {
        ...state,
        userVerificationData: action.data,
      };
      case actions.SET_COMPANY_LIST:
      return {
        ...state,
        storedCompanyList: action.data,
      };
    default:
      return state;
  }
}
