import { createCrudActions } from "Auth/Common/helpers";
import { createActionCreator } from "shared/redux-utils";

import { config, TYPE } from "../consts";
export const SET_RESPONSE = "SET_RESPONSE";

export const crudActions = createCrudActions(config, TYPE);
export const SET_MODAL_VISIBILITY = "SET_MODAL_VISIBILITY";
export const SET_LOGIN_BASIC_DETAILS = "SET_LOGIN_BASIC_DETAILS";
export const SET_USER_VERIFICATION_DATA = "SET_USER_VERIFICATION_DATA";
export const SET_COMPANY_LIST = "SET_COMPANY_LIST";

export const setModalVisibility = createActionCreator(SET_MODAL_VISIBILITY);
export const setLoginBasicDetails = createActionCreator(
  SET_LOGIN_BASIC_DETAILS
);
export const setUserVerificationData = createActionCreator(
  SET_USER_VERIFICATION_DATA
);
export const setCompanyList = createActionCreator(
  SET_COMPANY_LIST
);
