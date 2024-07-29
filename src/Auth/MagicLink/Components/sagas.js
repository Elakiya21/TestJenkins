import { call, put, select, takeEvery } from "redux-saga/effects"
import querystring from "query-string"
import * as actions from "./actions"
import * as apis from "./apis"

function* getMagicLinkDetails({ data }) {
  try {
    const store = yield select(state => state)
    const { id, unKnownUser, history, deviceId } = data
    const query = {};
    query.assigned = true
    if (unKnownUser) {
      query.assigned = ""
    }
    const content = {
      queryParams: querystring.stringify(query),
      id: id
    };
    const response = yield call(apis.crudApis.getMagicLinkDetails, content)
    if (response && response.status === "200") {
      yield put(actions.crudActions.getMagicLinkDetails.success(response))
      let storeId = response.storeTerminalId || response.storeId;
      if (storeId)
        storeId = storeId.toLowerCase();
      if (unKnownUser && unKnownUser == true) {
        if (response.magicLinkStatusId == 3) {
          let url = process.env.REACT_APP_MAGIC_LINK_DETAILS_PAGE;
          url = url.replace("{storeId}", storeId);
          url = url.replace("{magicLinkCode}", response.magicLinkCode);
          window.location.href = url;
        } else {
          if (history) {
            if (deviceId)
              history.push(`/auth/${storeId}/self/register?magicLinkCode=${response.magicLinkCode}&deviceId=${deviceId}`)
            else
              history.push(`/auth/${storeId}/self/register?magicLinkCode=${response.magicLinkCode}`)
          }
        }
      } else {
        let url = process.env.REACT_APP_MAGIC_LINK_DETAILS_PAGE;
        url = url.replace("{storeId}", storeId);
        url = url.replace("{magicLinkCode}", response.magicLinkCode);
        if(deviceId)
          url = url + `&deviceId=${deviceId}`
        window.location.href = url;
      }
    } else {
      yield put(actions.crudActions.getMagicLinkDetails.failure(response))
    }
  } catch (error) {
    yield put(actions.crudActions.getMagicLinkDetails.failure(error))
  }
}

export default function* main() {
  yield takeEvery(actions.crudActions.getMagicLinkDetails.REQUEST, getMagicLinkDetails);
}