import { call, put, select, takeEvery } from "redux-saga/effects"
import { getFormValues } from "redux-form"
import querystring from "query-string"
import * as actions from "./actions"
import * as apis from "./apis"
import { otpForm, updateUserForm, createPinForm } from "../consts"
import get from "lodash/get"
import { getBodyForCreate, getBodyForUpdateUser, getBodyForCreatePin } from "../helpers"

function* resendOTP({ data }) {
  const { history } = data || {}
  try {
    let response = null
    const query = {}
    if (data) {
      query.user_id = data.id
      query.mobileOTP = data.mobileOTP
    }
    const content = {
      id: data.id,
      queryParams: querystring.stringify(query),
    }
    response = yield call(apis.crudApis.resendOTP, content)
    if (response && response.status === "200") {
      yield put(actions.crudActions.resendOTP.success(response))
    } else {
      //yield put(actions.crudActions.resendOTP.failure(response))
      if(history)
        history.push(`/auth/${data.storeId}/verify/failed`)
      else
        window.location.href = `/auth/${data.storeId}/verify/failed`
    }
  } catch (error) {
   // yield put(actions.crudActions.resendOTP.failure(error))
      if(history)
        history.push(`/auth/${data.storeId}/verify/failed`)
      else
        window.location.href = `/auth/${data.storeId}/verify/failed`
  }
}

function* mobileVerification({ data }) {
  const { history } = data || {}
  try {
    const store = yield select(state => state)
    const formValues = getFormValues(otpForm)(store)
    const bodyOption = getBodyForCreate(formValues)
    let option = bodyOption.options || {};
    const body = {
      id: data.id,
      options: option,
    };
    const response = yield call(apis.crudApis.mobileVerification, body)
    if (response && response.status === "200") {
      yield put(actions.crudActions.mobileVerification.success(response))
      if(history){
        if(formValues && formValues.deviceId)
          history.push(`/auth/${data.storeId}/verify/create-pin/${data.id}?device_id=${formValues.deviceId}`)
        else
          history.push(`/auth/${data.storeId}/verify/confirmation`);
      }else{
        if(formValues && formValues.deviceId)
          window.location.href = `/auth/${data.storeId}/verify/create-pin/${data.id}?device_id=${formValues.deviceId}`
        else
          window.location.href = `/auth/${data.storeId}/verify/confirmation`;
      }
    } else {
      let resData = get(response, "invalidOtp", false)
      if(!resData){
        if(history)
          history.push(`/auth/${data.storeId}/verify/failed`)
        else
          window.location.href = `/auth/${data.storeId}/verify/failed`
      }
      else
        yield put(actions.crudActions.mobileVerification.failure(response))

    }
  } catch (error) {
    yield put(actions.crudActions.mobileVerification.failure(error))
    if(history)
      history.push(`/auth/${data.storeId}/verify/failed`)
    else
      window.location.href = `/auth/${data.storeId}/verify/failed`
  }
}

function* emailVerification({ data }) {
  const { history } = data || {}
  try {
    const store = yield select((state) => state);
    const formValues = getFormValues(otpForm)(store);
    const bodyOption = getBodyForCreate(formValues);
    let option = bodyOption.options || {};
    const body = {
      id: data.id,
      options: option,
    };
    const response = yield call(apis.crudApis.emailVerification, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.emailVerification.success(response));
      if(history){
        if(formValues && formValues.deviceId)
          history.push(`/auth/${data.storeId}/verify/create-pin/${data.id}?device_id=${formValues.deviceId}`)
        else
          history.push(`/auth/${data.storeId}/verify/confirmation`);
      }else{
        if(formValues && formValues.deviceId)
          window.location.href = `/auth/${data.storeId}/verify/create-pin/${data.id}?device_id=${formValues.deviceId}`
        else
          window.location.href = `/auth/${data.storeId}/verify/confirmation`;
      }

    } else {
      let resData = get(response, "invalidOtp", false);
      if (!resData){
        if(history)
          history.push(`/auth/${data.storeId}/verify/failed`)
        else
          window.location.href = `/auth/${data.storeId}/verify/failed`;
      } 
      else yield put(actions.crudActions.emailVerification.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.emailVerification.failure(error));
    if(history)
      history.push(`/auth/${data.storeId}/verify/failed`)
    else
      window.location.href = `/auth/${data.storeId}/verify/failed`;
  }
}

function* getCustomerProfileDetails({ data }) {
  try {
    const query = {}
    query.contact=true
    const body = {
      id: data.id,
      queryParams: querystring.stringify(query),
    };
    const response = yield call(apis.crudApis.getCustomerProfileDetails, body);
    if (response && response.status === "200") {
      yield put(
        actions.crudActions.getCustomerProfileDetails.success(response)
      );
    } else {
      yield put(
        actions.crudActions.getCustomerProfileDetails.failure(response)
      );
    }
  } catch (error) {
    yield put(actions.crudActions.getCustomerProfileDetails.failure(error));
  }
}

function* updateVerificationUserName({ data }) {
  try {
    const store = yield select((state) => state);
    const formValues = getFormValues(updateUserForm)(store);
    const formDatas = {}
    if(formValues.fullName){
      const words = formValues.fullName.split(" ");
      formDatas.firstName = words[0];
      formDatas.lastName = words.slice(1).join(" ");
    }
    const body = {
      id: data.id,
      options: {
        body: { ...formDatas },
      }
    }
    const response = yield call(apis.crudApis.updateVerificationUserName, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.updateVerificationUserName.success(response));
    } else {
      yield put(actions.crudActions.updateVerificationUserName.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.updateVerificationUserName.failure(error));
  }
}

function* updateVerificationUser({ data }) {
  try {
    const { history } = data || {}
    const store = yield select((state) => state);
    const formValues = getFormValues(updateUserForm)(store);
    const bodyOption = getBodyForUpdateUser(formValues);
    let option = bodyOption.options || {};
    const body = {
      id: data.id,
      options: option,
    };
    const response = yield call(apis.crudApis.updateVerificationUser, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.updateVerificationUser.success(response));
      if(history)
        history.push(`/auth/${data.storeId}/verify/${data.id}`)
      else
        window.location.href = `/auth/${data.storeId}/verify/${data.id}`
    } else {
      yield put(actions.crudActions.updateVerificationUser.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.updateVerificationUser.failure(error));
  }
}

function* setUserPin({ data }) {
  try {
    const { history } = data || {}
    const store = yield select(state => state)
    const formValues = getFormValues(createPinForm)(store)
    let  bodyOption = getBodyForCreatePin(formValues)
    let option = bodyOption.options || {}
    const body = {
      id: data.customerId,
      options: option
    };
    const response = yield call(apis.crudApis.setUserPin, body)
    if (response && response.status === "200") {
      yield put(actions.crudActions.setUserPin.success(response))
      if(history){
        if(formValues && formValues.deviceId)
          history.push(`/auth/${data.storeId}/verify/confirmation?device_id=${formValues.deviceId}`)
        else
          history.push(`/auth/${data.storeId}/verify/confirmation`)
      }else{
        if(formValues && formValues.deviceId)
          window.location.href = `/auth/${data.storeId}/verify/confirmation?device_id=${formValues.deviceId}`;
        else
          window.location.href = `/auth/${data.storeId}/verify/confirmation`;
      }
     
    } else {
      yield put(actions.crudActions.setUserPin.failure(response))
    }
  } catch (error) {
   yield put(actions.crudActions.setUserPin.failure(error))
  }
}


export default function* main() {
  yield takeEvery(actions.crudActions.resendOTP.REQUEST, resendOTP)
  yield takeEvery(actions.crudActions.mobileVerification.REQUEST, mobileVerification)
  yield takeEvery(actions.crudActions.emailVerification.REQUEST, emailVerification)
  yield takeEvery(actions.crudActions.getCustomerProfileDetails.REQUEST, getCustomerProfileDetails)
  yield takeEvery(actions.crudActions.updateVerificationUser.REQUEST, updateVerificationUser)
  yield takeEvery(actions.crudActions.updateVerificationUserName.REQUEST, updateVerificationUserName)
  yield takeEvery(actions.crudActions.setUserPin.REQUEST, setUserPin)
}