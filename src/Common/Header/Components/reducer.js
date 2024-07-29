import { initialState, reducer } from "shared/simpleDataReducer"

import * as actions from "./actions"

const initialStateObj = {
  getHeaderFooter: { ...initialState }, 
  subHeaderUpdated: false,
  isKycPendingHeaderLoggedin: false
}

export default function reducerFn(state = initialStateObj, action) {
  switch (action.type) {
    case actions.crudActions.getHeaderFooter.REQUEST:
    case actions.crudActions.getHeaderFooter.SUCCESS:
    case actions.crudActions.getHeaderFooter.FAILURE:
    case actions.crudActions.getHeaderFooter.CLEAR:
      return {
        ...state,
        getHeaderFooter: { ...reducer({ ...state.getHeaderFooter }, action, actions.crudActions.getHeaderFooter) },
      }
      case actions.SET_KYC_PENDING_HEADER_LOGGED_IN:
      return {
        ...state,
        isKycPendingHeaderLoggedin: action.data,
      };
      case actions.SET_SUB_HEADER:
          return {
            ...state,
            subHeaderUpdated: action.data,
          };
    default:
      return state
  }
}
