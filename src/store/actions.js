import * as storeConstants from "./consts"

export const loadDataFromSessionStorage = loadedState => ({
  type: storeConstants.LOAD,
  loadedState,
})
