import { createCrudActions, searchInputTypeUpper } from "Auth/Common/helpers"
import { createActionCreator } from "shared/redux-utils"

import { config, TYPE } from "../consts"
export const SET_RESPONSE = "SET_RESPONSE"

export const crudActions = createCrudActions(config, TYPE)
export const SET_MODAL_VISIBILITY = "SET_MODAL_VISIBILITY"
export const SET_EMAIL_CONFIRMATION_FLAG = "SET_EMAIL_CONFIRMATION_FLAG"
export const SET_MAGIC_LINK_FLAG = "SET_MAGIC_LINK_FLAG"
export const SET_IS_EDIT = "SET_IS_EDIT"

export const setResponseValue = createActionCreator(SET_RESPONSE)
export const setEmailConfirmationFlag = createActionCreator(SET_EMAIL_CONFIRMATION_FLAG)
export const setMagicLinkCode = createActionCreator(SET_MAGIC_LINK_FLAG)
export const setModalVisibility = createActionCreator(SET_MODAL_VISIBILITY)
export const setIsEdit = createActionCreator(SET_IS_EDIT)



