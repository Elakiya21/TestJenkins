import { call, put, select, takeEvery } from "redux-saga/effects";
import { getFormValues } from "redux-form";
import querystring from "query-string";
import * as actions from "./actions";
import * as apis from "./apis";
import { loginForm } from "../consts";
import {
  getBodyForVerifyBiometric,
  getBodyForVerifyPin,
  getBodyForResetPinLogin,
  getBodyForSendLoginOtp,
  getBodyForVerifyLoginOtp,
  getBodyForResendOtp,
  getBodyForCreatePin,
  getBodyForVerifyMagicLinkLoginOtp
} from "../helpers";
import { isEmpty } from "lodash";

function* getStoreDetails(data) {
  try {
    const query = {};
    query.selfRegistrationStoreConfig = true;
    const content = {
      queryParams: querystring.stringify(query),
      id: data.data,
    };
    const response = yield call(apis.crudApis.getStoreDetails, content);
    if (response && response.status === "200") {
      yield put(actions.crudActions.getStoreDetails.success(response));
    } else {
      yield put(actions.crudActions.getStoreDetails.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.getStoreDetails.failure(error));
  }
}

function* getLoginFlow({ data }) {
  try {
    const {
      storeId,
      deviceId,
      storeLoginType,
      queryMobileNo,
      newInstallation,
    } = data;
    const store = yield select((state) => state);
    const query = {};
    query.storeId = storeId;
    query.deviceId = deviceId;
    query.queryMobileNo = queryMobileNo;
    query.storeLoginType = storeLoginType;
    query.newInstallation = newInstallation;
    const content = {
      queryParams: querystring.stringify(query),
    };
    const response = yield call(apis.crudApis.getLoginFlow, content);
    if (response && response.status === "200") {
      yield put(actions.crudActions.getLoginFlow.success(response));
    } else {
      yield put(actions.crudActions.getLoginFlow.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.getLoginFlow.failure(error));
  }
}

function* verifyBiometricLogin({ data }) {
  try {
    const { validateUser } = data || {};
    const store = yield select((state) => state);
    const { redirect_uri, client_id } =
      store.userProfile.login.loginBasicDeatils || {};
    let formValues = getFormValues(loginForm)(store);
    if (formValues) {
      formValues.isValidateUser = validateUser;
      formValues.redirectUrl = redirect_uri;
      formValues.clientId = client_id;
    }
    const body = getBodyForVerifyBiometric(formValues);
    const response = yield call(apis.crudApis.verifyBiometricLogin, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.verifyBiometricLogin.success(response));
    } else {
      yield put(actions.crudActions.verifyBiometricLogin.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.verifyBiometricLogin.failure(error));
  }
}

function* verifyPinLogin({ data }) {
  try {
    const { validateUser } = data || {};
    const store = yield select((state) => state);
    const { redirect_uri, client_id } =
      store.userProfile.login.loginBasicDeatils || {};
    let formValues = getFormValues(loginForm)(store);
    if (formValues) {
      formValues.isValidateUser = validateUser;
      formValues.redirectUrl = redirect_uri;
      formValues.clientId = client_id;
    }
    const body = getBodyForVerifyPin(formValues);
    const response = yield call(apis.crudApis.verifyPinLogin, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.verifyPinLogin.success(response));
    } else {
      yield put(actions.crudActions.verifyPinLogin.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.verifyPinLogin.failure(error));
  }
}

function* resetPinLogin({ data }) {
  try {
    const store = yield select((state) => state);
    let formValues = getFormValues(loginForm)(store);
    const { device_id } = store.userProfile.login.loginBasicDeatils || {};
    const { storeName } = store.userProfile.login.getStoreDetails.data || {};
    formValues.storeName = storeName;
    if (device_id && !isEmpty(device_id)) formValues.deviceId = device_id;
    const body = getBodyForResetPinLogin(formValues);
    const response = yield call(apis.crudApis.resetPinLogin, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.resetPinLogin.success(response));
    } else {
      yield put(actions.crudActions.resetPinLogin.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.resetPinLogin.failure(error));
  }
}

function* sendLoginOtp({ data }) {
  try {
    const store = yield select((state) => state);
    let formValues = getFormValues(loginForm)(store);
    const { device_id } = store.userProfile.login.loginBasicDeatils || {};
    const { storeName } = store.userProfile.login.getStoreDetails.data || {};
    formValues.storeName = storeName;
    if (device_id && !isEmpty(device_id)) formValues.deviceId = device_id;
    const body = getBodyForSendLoginOtp(formValues);
    const response = yield call(apis.crudApis.sendLoginOtp, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.sendLoginOtp.success(response));
    } else {
      yield put(actions.crudActions.sendLoginOtp.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.sendLoginOtp.failure(error));
  }
}

function* verifyLoginOtp({ data }) {
  try {
    const store = yield select((state) => state);
    let formValues = getFormValues(loginForm)(store);
    const { redirect_uri, client_id, device_id } =
      store.userProfile.login.loginBasicDeatils || {};
    if (device_id && !isEmpty(device_id)) formValues.deviceId = device_id;
    formValues.redirectUrl = redirect_uri;
    formValues.clientId = client_id;
    const body = getBodyForVerifyLoginOtp(formValues);
    const response = yield call(apis.crudApis.verifyLoginOtp, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.verifyLoginOtp.success(response));
    } else {
      yield put(actions.crudActions.verifyLoginOtp.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.verifyLoginOtp.failure(error));
  }
}

function* reSendLoginOtp({ data }) {
  try {
    let response = null;
    const store = yield select((state) => state);
    let formValues = getFormValues(loginForm)(store);
    const { storeName } = store.userProfile.login.getStoreDetails.data || {};
    formValues.storeName = storeName;
    formValues.currentOtpMethod = data.currentOtpMethod;
    const body = getBodyForResendOtp(formValues);
    response = yield call(apis.crudApis.reSendLoginOtp, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.reSendLoginOtp.success(response));
    } else {
      yield put(actions.crudActions.reSendLoginOtp.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.reSendLoginOtp.failure(error));
  }
}

function* setUserPin({ data }) {
  try {
    const store = yield select((state) => state);
    const formValues = getFormValues(loginForm)(store);
    const { device_id, redirect_uri, client_id } =
      store.userProfile.login.loginBasicDeatils || {};
    formValues.deviceId = device_id;
    formValues.redirectUrl = redirect_uri;
    formValues.clientId = client_id;
    let body = getBodyForCreatePin(formValues);
    const response = yield call(apis.crudApis.setUserPin, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.setUserPin.success(response));
    } else {
      yield put(actions.crudActions.setUserPin.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.setUserPin.failure(error));
  }
}

function* sendMagicLinkLoginOtp({ data }) {
  try {
    const { userTerminalId, storeTerminalId } = data || {};
    let response = null;
    const query = {};
    query.userTerminalId = userTerminalId;
    query.storeTerminalId = storeTerminalId;
    const body = {
      queryParams: querystring.stringify(query),
    };
    response = yield call(apis.crudApis.sendMagicLinkLoginOtp, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.sendMagicLinkLoginOtp.success(response));
    } else {
      yield put(actions.crudActions.sendMagicLinkLoginOtp.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.sendMagicLinkLoginOtp.failure(error));
  }
}

function* verifyMagicLinkLoginOtp({ data }) {
  try {
    let body = getBodyForVerifyMagicLinkLoginOtp(data);
    const response = yield call(apis.crudApis.verifyMagicLinkLoginOtp, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.verifyMagicLinkLoginOtp.success(response));
    } else {
      yield put(actions.crudActions.verifyMagicLinkLoginOtp.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.verifyMagicLinkLoginOtp.failure(error));
  }
}

function* reSendMagicLinkLoginOtp({ data }) {
  try {
    let response = null;
    const { userTerminalId, storeTerminalId } = data || {};
    const query = {};
    query.userTerminalId = userTerminalId;
    query.storeTerminalId = storeTerminalId;
    const content = {
      id: data.customerId,
      queryParams: querystring.stringify(query),
    };
    response = yield call(apis.crudApis.reSendMagicLinkLoginOtp, content);
    if (response && response.status === "200") {
      yield put(actions.crudActions.reSendMagicLinkLoginOtp.success(response));
    } else {
      yield put(actions.crudActions.reSendMagicLinkLoginOtp.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.reSendMagicLinkLoginOtp.failure(error));
  }
}

export default function* main() {
  yield takeEvery(actions.crudActions.getStoreDetails.REQUEST, getStoreDetails);
  yield takeEvery(actions.crudActions.getLoginFlow.REQUEST, getLoginFlow);
  yield takeEvery(
    actions.crudActions.verifyBiometricLogin.REQUEST,
    verifyBiometricLogin
  );
  yield takeEvery(actions.crudActions.verifyPinLogin.REQUEST, verifyPinLogin);
  yield takeEvery(actions.crudActions.resetPinLogin.REQUEST, resetPinLogin);
  yield takeEvery(actions.crudActions.sendLoginOtp.REQUEST, sendLoginOtp);
  yield takeEvery(actions.crudActions.verifyLoginOtp.REQUEST, verifyLoginOtp);
  yield takeEvery(actions.crudActions.reSendLoginOtp.REQUEST, reSendLoginOtp);
  yield takeEvery(actions.crudActions.setUserPin.REQUEST, setUserPin);
  yield takeEvery(actions.crudActions.sendMagicLinkLoginOtp.REQUEST, sendMagicLinkLoginOtp);
  yield takeEvery(actions.crudActions.verifyMagicLinkLoginOtp.REQUEST, verifyMagicLinkLoginOtp);
  yield takeEvery(actions.crudActions.reSendMagicLinkLoginOtp.REQUEST, reSendMagicLinkLoginOtp);
}
