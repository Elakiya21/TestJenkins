import { createSignalAction } from "shared/redux-utils"
import fetch from "shared/fetchAuth"

const AUTH_SERVICE_URL = process.env.REACT_APP_AUTH_SERVICE_URL

const getFetch = data => (content) => {
  const { options, id, url, queryParams, companyId, storeId, orderId, subOrderId, places, wallet, profile, lineItemId, walletId } = content || {}
  const keyclockAuth = !wallet ? true : true;
  let apiUrl = null
  apiUrl = `${AUTH_SERVICE_URL}${data.url}`
  if (companyId) {
    apiUrl = `${apiUrl.replace("{companyId}", companyId)}`
  } else if (storeId) {
    apiUrl = `${apiUrl.replace("{storeId}", storeId)}`
  } 
   if (orderId) {
    apiUrl = `${apiUrl.replace("{orderId}", orderId)}`
  } 
  if (lineItemId) {
    apiUrl = `${apiUrl.replace("{lineItemId}", lineItemId)}`
  }
  if (walletId) {
    apiUrl = `${apiUrl.replace("{walletId}", walletId)}`
  } 
   if (subOrderId) {
    apiUrl = `${apiUrl.replace("{subOrderId}", subOrderId)}`
  }
  if (url) {
    apiUrl = url
  } else if (id) {
    apiUrl = `${apiUrl.replace("{id}", id)}`
  } if (queryParams) {
    apiUrl = `${apiUrl}?${queryParams}`
  }
  return fetch(
    keyclockAuth,
    apiUrl,
    {
      method: data.method,
      ...options,
    }
  )
}

export const createCrudActions = (config, type) => {
  const object = {}
  Object.keys(config).forEach((key) => {
    object[key] = createSignalAction(type, key)
  })
  return object
}

export const getCrudActionsForDispatch = (actions, dispatch) => {
  const obj = actions.crudActions
  const functionObj = {}
  Object.keys(obj).forEach((key1) => {
    functionObj[key1] = {}
    Object.keys(obj[key1]).forEach((key2) => {
      if (typeof obj[key1][key2] === "string") {
        functionObj[key1][key2.toLowerCase()] = data => dispatch(obj[key1][key2.toLowerCase()](data))
      }
    })
  })
  return functionObj
}

export const getCrudApis = (config) => {
  const obj = {}
  Object.keys(config).forEach((key) => {
    obj[key] = getFetch(config[key])
  })
  return obj
}

export const generateData = (values) => {
  const formData = new FormData()
  Object.keys(values).forEach((key) => {
    if (values[key]) {
      if (key === "files") {
        const files = values[key]
        for (let i = 0; i < files.length; i++) {
          formData.append(key, files[i])
        }
      } else {
        formData.append(key, values[key])
      }
    }
  })
  return formData
}

export const getFormattedList = ({
  list, type, editFn, statusUpdateFn,
}) => {
  const newList = [{
    id: type,
    values: ["Name", "Edit", "Status"],
    onclick: [null, null, null],
    type: ["head", "head", "head"],
  }]
  list.map((data) => {
    const newObj = {}
    const { id, name } = data
    newObj.id = id
    newObj.values = [name, "Edit", "Activate"]
    newObj.type = ["text", "edit", "activate"]
    newObj.onclick = [
      null,
      () => editFn(data),
      () => statusUpdateFn({ ...data, reqtype: "ACTIVATE" }),
    ]
    newList.push(newObj)
    return newObj
  })
  return newList
}

export const getBodyForCreate = formValues => ({
  options: {
    body: { ...formValues },
  },
})

export const searchInputTypeUpper = TYPE => {
  return (`SET_SEARCH_INPUT_${TYPE.toUpperCase()}`)
}

