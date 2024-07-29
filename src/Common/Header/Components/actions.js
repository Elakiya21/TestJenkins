import { createCrudActions, searchInputTypeUpper } from "Auth/Common/helpers"
import { createActionCreator } from "shared/redux-utils";

import { config, TYPE } from "../consts"

export const crudActions = createCrudActions(config, TYPE)

export const SET_KYC_PENDING_HEADER_LOGGED_IN = "SET_KYC_PENDING_HEADER_LOGGED_IN";
export const SET_SUB_HEADER = "SET_SUB_HEADER";
export const setKycPendingHeaderLoggedIn = createActionCreator(SET_KYC_PENDING_HEADER_LOGGED_IN);
export const setSubHeader = createActionCreator(SET_SUB_HEADER);

