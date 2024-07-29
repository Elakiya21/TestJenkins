import { call, put, select, takeEvery } from "redux-saga/effects"
import { getFormValues } from "redux-form"
import querystring from "query-string"
import * as actions from "./actions"
import * as apis from "./apis"
import { registrationForm, validateResponse } from "../consts"
import get from "lodash/get"
import { getBodyForCreate,getBodyForVerifyOTP, getBodyForCreatePin, getBodyForAssignToUser } from "../helpers"

function* selfRegistration({data}) {
  try {
    const { history } = data || {}
    const store = yield select(state => state)
    const formValues = getFormValues(registrationForm)(store)
    let magicLinkDetails = ""
    if(formValues.magicLinkCode) {
      magicLinkDetails = store.userProfile.magicLink.getMagicLinkDetails.data || {}
      formValues.companyId = magicLinkDetails.companyId || magicLinkDetails.companyTerminalId || ""
    }
    let response = null
    const body = getBodyForCreate(formValues)
    response = yield call(apis.crudApis.selfRegistration, body)
    if (response && response.status === "200") {
      yield put(actions.crudActions.selfRegistration.success(response))
      if(history)
        history.push(`/auth/${formValues.id}/self/mobile-verification`)
      else
        window.location.href = `/auth/${formValues.id}/self/mobile-verification`
    } else {
      yield put(actions.crudActions.selfRegistration.failure(response))
      if( response.id && magicLinkDetails) {
        yield put(actions.crudActions.assignToUser.request({magicLinkCode: formValues.magicLinkCode, userId: response.id}))
      }
    }
  } catch (error) {
   yield put(actions.crudActions.selfRegistration.failure(error))
  }
}

function* mobileVerification({ data }) {
    try {
      const { history } = data || {}
      const store = yield select(state => state)
      const formValues = getFormValues(registrationForm)(store)
      const body = getBodyForVerifyOTP(formValues, true)
      const response = yield call(apis.crudApis.mobileVerification, body)
      if (response && response.status === "200") {
        yield put(actions.crudActions.mobileVerification.success(response))
        if(history)
          history.push(`/auth/${formValues.id}/self/register-name`)
        else
          window.location.href = `/auth/${formValues.id}/self/register-name`
      } else {
        yield put(actions.crudActions.mobileVerification.failure(response))
      }
    } catch (error) {
      yield put(actions.crudActions.mobileVerification.failure(error))
    }
  }

  function* selfRegisterName({ data }) {
    try {
      const { history } = data || {}
      const formDatas = {}
      const store = yield select(state => state)
      const formValues = getFormValues(registrationForm)(store)
      if(formValues.fullName){
        const words = formValues.fullName.split(" ");
        formDatas.firstName = words[0];
        formDatas.lastName = words.slice(1).join(" ");
        formDatas.userId = formValues.userId
      }
      const body = {
        options: {
          body: { ...formDatas },
        }
      }
      const response = yield call(apis.crudApis.selfRegisterName, body)
      if (response && response.status === "200") {
        yield put(actions.crudActions.selfRegisterName.success(response))
        if(history)
          history.push(`/auth/${formValues.id}/self/register-email`)
        else
          window.location.href = `/auth/${formValues.id}/self/register-email`
      } else {
        yield put(actions.crudActions.selfRegisterName.failure(response))
      }
    } catch (error) {
      yield put(actions.crudActions.selfRegisterName.failure(error))
    }
  }


  function* selfRegisterEmail({ data }) {
    try {
      const { history } = data || {}
      const formDatas = {}
      const store = yield select(state => state)
      const formValues = getFormValues(registrationForm)(store)
      formDatas.email = formValues.email,
      formDatas.userId = formValues.userId
      const body = {
        options: {
          body: { ...formDatas
          },
        }
      }
      const response = yield call(apis.crudApis.selfRegisterEmail, body)
      if (response && response.status === "200") {
        yield put(actions.crudActions.selfRegisterEmail.success(response))
        if(history)
          history.push(`/auth/${formValues.id}/self/email-verification`)
        else
          window.location.href = `/auth/${formValues.id}/self/email-verification`
      } else {
        yield put(actions.crudActions.selfRegisterEmail.failure(response))
      }
    } catch (error) {
      yield put(actions.crudActions.selfRegisterEmail.failure(error))
    }
  }



function* emailVerification({ data }) {
  try {
    const { history } = data || {}
    const store = yield select(state => state)
    let magicLinkDetails = store.userProfile.magicLink.getMagicLinkDetails.data || {}
    const formValues = getFormValues(registrationForm)(store)
    formValues.magicLinkCode = magicLinkDetails && magicLinkDetails.magicLinkCode || ""
    const body = getBodyForVerifyOTP(formValues, false)
    const response = yield call(apis.crudApis.emailVerification, body)
    if (response && response.status === "200") {
      yield put(actions.crudActions.emailVerification.success(response))
      if(history){
        if(formValues && formValues.deviceId)
        history.push(`/auth/${formValues.id}/self/create-pin`)
      else
        history.push(`/auth/${formValues.id}/self/verified`)
      }
      else{
      if(formValues && formValues.deviceId)
        window.location.href = `/auth/${formValues.id}/self/create-pin`
      else
        window.location.href = `/auth/${formValues.id}/self/verified`
      }
    } else {
      yield put(actions.crudActions.emailVerification.failure(response))
      var err = response && response.statusMessage && response.statusMessage.description || ""
      if( err == "User is created successfully, But email notification failed"){
        if(history){
          if(formValues && formValues.deviceId)
            history.push(`/auth/${formValues.id}/self/create-pin`)
          else{
            history.push(`/auth/${formValues.id}/self/verified`)
          }
        }else{
          if(formValues && formValues.deviceId)
            window.location.href = `/auth/${formValues.id}/self/create-pin`
          else{
            window.location.href = `/auth/${formValues.id}/self/verified`
          }
        }
      }
    }
  } catch (error) {
    yield put(actions.crudActions.emailVerification.failure(error))
  }
}
  
  function* reSendOtp({ data }) {
    try {
      let response = null
      const query = {}
      if (data) {
        query.user_id = data.customerId,
        query.mobileOTP = data.mobileOTP
      }
      const content = {
        id: data.customerId,
        queryParams: querystring.stringify(query),
      }
      response = yield call(apis.crudApis.reSendOtp, content)
      if (response && response.status === "200") {
        yield put(actions.crudActions.reSendOtp.success(response))
      } else {
        yield put(actions.crudActions.reSendOtp.failure(response))
      }
    } catch (error) {
     yield put(actions.crudActions.reSendOtp.failure(error))
    }
  }

  function* getBasicDetails() {
    try {
      const store = yield select(state => state)
      const userTerminalId = get(store.keycloak, "keycloakData.tokenParsed.preferred_username", "")
      const body = {
        id: userTerminalId.toUpperCase()
      }
      const response = yield call(apis.crudApis.getBasicDetails, body)
      if (response && response.status === "200") {
        yield put(actions.crudActions.getBasicDetails.success(response))
      } else {
        yield put(actions.crudActions.getBasicDetails.failure(response))
      }
    } catch (error) {
      yield put(actions.crudActions.getBasicDetails.failure(error))
    }
  }

  function* setUserPin({ data }) {
    try {
      const { history } = data || {}
      const store = yield select(state => state)
      const formValues = getFormValues(registrationForm)(store)
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
          history.push(`/auth/${formValues.id}/self/verified`)
        }else
          window.location.href = `/auth/${formValues.id}/self/verified`
      } else {
        yield put(actions.crudActions.setUserPin.failure(response))
      }
    } catch (error) {
     yield put(actions.crudActions.setUserPin.failure(error))
    }
  }


  function* getStoreDetails(data) {
    try {
      const store = yield select(state => state)
      const query = {};
      const content = {
        queryParams: querystring.stringify(query),
        id: data.data
      };
      const response = yield call(apis.crudApis.getStoreDetails, content)
      if (response && response.status === "200") {
        yield put(actions.crudActions.getStoreDetails.success(response))
      } else {
        yield put(actions.crudActions.getStoreDetails.failure(response))
      }
    } catch (error) {
      yield put(actions.crudActions.getStoreDetails.failure(error))
    }
  }


function* assignToUser({ data }) {
  try {
    const store = yield select(state => state)
    const { magicLinkCode, userId } = data
    const formValues = getFormValues(registrationForm)(store)
    const query = {};
    const body = getBodyForAssignToUser(magicLinkCode, userId)
    const content = {
      id: magicLinkCode,
      options:  body.options
    };
    const response = yield call(apis.crudApis.assignToUser, content)
    if (response && response.status === "200") {
      yield put(actions.crudActions.assignToUser.success(response))
      let url = process.env.REACT_APP_MAGIC_LINK_DETAILS_PAGE;
      url = url.replace("{storeId}", formValues.id);
      url = url.replace("{magicLinkCode}", magicLinkCode);
      if(formValues && formValues.deviceId) {
        url = url + `&device_id=${formValues.deviceId}`
      }
      window.location.href = url;
    } else {
      yield put(actions.crudActions.assignToUser.failure(response))
    }
  } catch (error) {
    yield put(actions.crudActions.assignToUser.failure(error))
  }
}
  
export default function* main() {
  yield takeEvery(actions.crudActions.selfRegistration.REQUEST, selfRegistration)
  yield takeEvery(actions.crudActions.mobileVerification.REQUEST, mobileVerification)
  yield takeEvery(actions.crudActions.selfRegisterName.REQUEST, selfRegisterName)
  yield takeEvery(actions.crudActions.selfRegisterEmail.REQUEST, selfRegisterEmail)
  yield takeEvery(actions.crudActions.emailVerification.REQUEST, emailVerification)
  yield takeEvery(actions.crudActions.reSendOtp.REQUEST, reSendOtp)
  yield takeEvery(actions.crudActions.getBasicDetails.REQUEST, getBasicDetails)
  yield takeEvery(actions.crudActions.setUserPin.REQUEST, setUserPin)
  yield takeEvery(actions.crudActions.getStoreDetails.REQUEST, getStoreDetails);
  yield takeEvery(actions.crudActions.assignToUser.REQUEST, assignToUser);
}