/**
 * Wrapper for fetch client
 * to handle auth token
 * it can send token and store it in LocalStorage
 */

import Cookies from "js-cookie"

export const NETWORK_OFFLINE = "NETWORK_OFFLINE"
const STORAGE_KEY = "accessToken"
const COOKIE_EXPIRATION_TIME = 14
const COOKIE_CONFIG = {
  expires: COOKIE_EXPIRATION_TIME,
  path: "/",
}
function createError(response, json) {
  return {
    status: response.status,
    statusMessage: response.statusMessage,
    json,
  }
}

export function networkOffline() {
  return { type: NETWORK_OFFLINE }
}

function createHeader(keyclockAuth, headers) {
  // fetch current auth headers from storage
  const accessToken = localStorage.getItem(STORAGE_KEY)
  const nextHeaders = headers || {}
  if (headers) {
    if (!headers["Content-Type"]) {
      nextHeaders["Content-Type"] = "application/json"
    }
  } else {
    nextHeaders["Content-Type"] = "application/json"
  }
   if (accessToken && keyclockAuth) nextHeaders.Authorization = `Bearer ${accessToken}`

  return nextHeaders
}

function createFormDataHeader(headers) {
  // fetch current auth headers from storage
  const accessToken = localStorage.getItem(STORAGE_KEY)
  // const accessToken = Cookies.get(STORAGE_KEY)
  const nextHeaders = headers || {}
  if (accessToken) nextHeaders.Authorization = `Bearer ${accessToken}`
  return nextHeaders
}

export function successHandler(response) {
  // if (response.status !== 204) {
    return response
      .json()
      .then((json) => {
        if (json && json.meta && json.meta.authentication_token) {
          Cookies.set(STORAGE_KEY, json.meta.authentication_token, COOKIE_CONFIG)
        }
        if(json && json.status != 409 && (((json.status == 400 || json.responseStatus == 400 ) && json.statusMessage && json.statusMessage.description && (json.statusMessage.description.toLowerCase().includes("internal server error") || json.statusMessage.description.toLowerCase().includes("401 unauthorized")) || json.statusMessage.description.toLowerCase().includes("504 gateway time-out")) || (json.status != 200 && json.status != 201 && json.status != 400 && json.responseStatus != 200 && json.responseStatus != 201 && json.responseStatus != 400))){
          return json = {
            status: 500,
            statusMessage: {
              code: "500",
              description: "Unexpected error occurred. Please try again."
            },
          };
        }
        return Promise.resolve(json)
      })
      .catch(() =>
        Promise.resolve({
          status: "ok",
          data: null,
        })
      )
  // }
  // return Promise.resolve({ status: 204 })
}

export function errorHandler(response) {
  if (response.status === 401) { localStorage.removeItem(STORAGE_KEY) }

  // if (response.status === 422) {
  //   return response
  //     .json()
  //     .then(json => (
  //       Promise.reject(createError(response, json))
  //     ))
  // }

  if (response.status !== 400) {
    return response
      .json()
      .then((json) => {
        json = {
          status: 500,
          statusMessage: {
            code: "500",
            description: "Unexpected error occurred. Please try again."
          },
        };
        return Promise.resolve(json)
      })
  }

  return Promise.reject(createError(response))
}

export function fetchWrapper(keyclockAuth, url, options = {}, etagCacheKey) {
  try {
    const { headers, body, isFormData } = options
    const updatedOptions = {
      ...options,
    }
    if (!isFormData) {
      updatedOptions.headers = createHeader(keyclockAuth, headers, url)
    } else {
      updatedOptions.headers = createFormDataHeader(headers, url)
    }
    if (body && !isFormData) {
      updatedOptions.body = JSON.stringify(body)
    }
    delete updatedOptions.isFormData
    return fetch(url, updatedOptions)
    .then((response) => {
      if (response.status == 200 || response.status == 201) {
        if (etagCacheKey) localStorage.setItem(etagCacheKey, response.headers.get("Etag"))

        return successHandler(response)
      }
      return errorHandler(response)
    })
    .catch(e => Promise.reject(createError({
      status: "500FE",
      statusMessage: {
        code: "500FE",
        description:  "Unexpected error occurred. Please try again.",
      },
    })))
  } catch (e) {
    return Promise.reject(createError({
      status: "500FE",
      statusMessage: {
        code: "500FE",
        description: "Unexpected error occurred. Please try again.",
      },
    }))
  }
}

export default function (url, options, etagCacheKey) {
  if (navigator && !navigator.onLine) {
    return Promise.reject(createError({
      status: "error",
      statusMessage: {
        code: "NETWORK_OFFLINE",
        description: NETWORK_OFFLINE,
      },
    }))
  }

  return fetchWrapper(url, options, etagCacheKey)
}
