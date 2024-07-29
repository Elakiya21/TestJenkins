import { createCrudActions, searchInputTypeUpper } from "Auth/Common/helpers"
import { createActionCreator } from "shared/redux-utils"

import { config, TYPE } from "../consts"

export const SET_MODAL_VISIBILITY = "SET_MODAL_VISIBILITY"
export const SET_SEARCH_INPUT = searchInputTypeUpper(TYPE)

export const crudActions = createCrudActions(config, TYPE)

export const setSearchInput = createActionCreator(SET_SEARCH_INPUT)

export const setModalVisibility = createActionCreator(SET_MODAL_VISIBILITY)

