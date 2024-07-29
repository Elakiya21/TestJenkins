import { initialState, reducer } from "shared/simpleDataReducer"

import * as actions from "./actions"

const initialStateObj = {
  
    modal: {
      type: "",
      open: false,
    },
    getMagicLinkDetails: { ...initialState},
}

export default function reducerFn(state = initialStateObj, action) {
  switch (action.type) {
    case actions.crudActions.getMagicLinkDetails.REQUEST:
    case actions.crudActions.getMagicLinkDetails.SUCCESS:
    case actions.crudActions.getMagicLinkDetails.FAILURE:
    case actions.crudActions.getMagicLinkDetails.CLEAR:
      return {
        ...state,
        getMagicLinkDetails: { ...reducer({ ...state.getMagicLinkDetails }, action, actions.crudActions.getMagicLinkDetails) },
      }
    case actions.SET_MODAL_VISIBILITY:
      return {
        ...state,
        modal: action.data,
      }
    default:
      return state
  }
}
