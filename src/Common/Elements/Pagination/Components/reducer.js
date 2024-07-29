import * as actions from "./actions"
import { pagination } from "consts"

const initialStateObj = {
  firstPage: 1,
  lastPage: pagination.displayPage,
}

export default function reducerFn(state = initialStateObj, action) {
  switch (action.type) {
    case actions.SET_FIRST_PAGE:
      return {
        ...state,
        firstPage: action.data,
      }
    case actions.SET_LAST_PAGE:
      return {
        ...state,
        lastPage: action.data,
      }
    default:
      return state
  }
}
