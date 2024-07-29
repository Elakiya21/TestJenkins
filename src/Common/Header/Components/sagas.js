import { call, put, select, takeEvery } from "redux-saga/effects";
import querystring from "query-string";
import { getDeviceInfo } from "shared/lib/mobileDetect";
import * as actions from "./actions";
import * as apis from "./apis";
const deviceInfo = getDeviceInfo();

function* getHeaderFooter({ data }) {
  try {
    let response = null;
    const query = {};
    let storeTerminalId = data.storeId;
    if (data.isLogged) query.isLogged = data.isLogged;
    if (data.isLogged == false) {
      query.isHideUserIcon = true;
      query.isDisableLogoClick = true;
    }
    if (data.isRNView == true || data.isRNView == false)
      query.isRNView = data.isRNView;

    query.device = deviceInfo.osName;
    const body = {
      queryParams: querystring.stringify(query),
      storeId: storeTerminalId,
    };
    response = yield call(apis.crudApis.getHeaderFooter, body);
    if (response && response.status === "200") {
      yield put(actions.crudActions.getHeaderFooter.success(response));
    } else {
      yield put(actions.crudActions.getHeaderFooter.failure(response));
    }
  } catch (error) {
    yield put(actions.crudActions.getHeaderFooter.failure(error));
  }
}

export default function* main() {
  yield takeEvery(actions.crudActions.getHeaderFooter.REQUEST, getHeaderFooter);
}
