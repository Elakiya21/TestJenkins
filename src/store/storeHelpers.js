import isObject from "lodash/isObject"
import merge from "lodash/merge"

export const getCurrentStoreState = store => store.getState()

const removeKey = (obj, currentObj, path, index) => {
  const currentObjCopy = currentObj
  const firstKey = path[index]
  const secondKey = path[index + 1]
  if (!obj || !currentObj || !isObjectNotArray(currentObj)) {
    return {}
  }
  if (index === path.length - 2) {
    const firstObj = currentObjCopy[firstKey]
    if (isObjectNotArray(firstObj[secondKey])) {
      firstObj[secondKey] = {}
    } else if (Array.isArray(firstObj[secondKey])) {
      firstObj[secondKey] = []
    } else {
      delete firstObj[secondKey]
    }
    return true
  }
  return removeKey(obj, currentObj[firstKey], path, index + 1)
}
export const filterStoreState = (state, blackList = []) => {
  const stateCopy = {
    ...state,
  }
  blackList.forEach((element) => {
    const blackListArr = element
    if (blackListArr.length > 1) {
      removeKey(stateCopy, stateCopy, blackListArr, 0)
    } else {
      delete stateCopy[element[0]]
    }
  })
  return stateCopy
}
const saveInSessionStorage = (key, value) => {
  if (sessionStorage) {
    sessionStorage.setItem(key, value)
  }
}

export const getFromSessionStorage = keyForReduxState => sessionStorage
    ? sessionStorage.getItem(keyForReduxState)
    : null

const stringifyJSON = state => JSON.stringify(state)

export const saveStoreInSessionStorage = (store, blackList, keyForReduxState) => {
  const currentState = getCurrentStoreState(store)
  const filteredState = filterStoreState(currentState, blackList)
  const stringifiedJson = stringifyJSON(filteredState)
  saveInSessionStorage(keyForReduxState, stringifiedJson)
}

const isObjectNotArray = value => isObject(value) && !Array.isArray(value)

export const merger = (oldState, newState) => {
  const result = { ...oldState }
  Object.keys(newState).forEach((key) => {
    const value = newState[key]
    const isObjectNotArr = isObjectNotArray(value)
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = isObjectNotArr
          ? merge({}, value)
          : value
    } else {
      const oldValue = result[key]

      if (isObjectNotArr) {
        result[key] = merge({}, oldValue, value)
      } else {
        result[key] = value
      }
    }
  })
  return result
}
