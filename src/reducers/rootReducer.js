import { combineReducers } from "redux"
import { routerReducer as routing } from "react-router-redux"
import { LOAD } from "store/consts"
import { merger } from "store/storeHelpers"

import form from "./form"
import header from "Common/Header/Components/reducer"
import keycloak from "Common/Keycloak/Components/reducer"
import userProfile from "Auth/combineReducers"
import pagination from "Common/Elements/Pagination/Components/reducer"


const appReducer = asyncReducers => combineReducers({
  routing,
  form,
  keycloak,
  header,
  userProfile,
  pagination,
  ...asyncReducers,
})

export const createReducer = (asyncReducers, state, action) => {
  if (action.type === LOAD && !!action.loadedState) {
    const newState = merger(state, action.loadedState)
    return appReducer(asyncReducers)(newState, action)
  }
  return appReducer(asyncReducers)(state, action)
}

const rootReducer = (state, action) => createReducer(() => {}, state, action)

export default rootReducer
