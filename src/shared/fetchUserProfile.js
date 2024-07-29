/**
 * Wrapper for fetch client
 * to handle auth token
 * it can send token and store it in LocalStorage
 */
export const NETWORK_OFFLINE = 'NETWORK_OFFLINE';
export const STORAGE_KEY = 'accessToken';

function parseStatus(result) {
  const status = result && result.status ? result.status : 'FAILED';
  return status;
}

function parseMessage(result) {
  const message = result && result.userMessage ? result.userMessage : null;
  if (message === null) {
    return result && result.statusMessage && result.statusMessage.description
      ? result.statusMessage.description
      : 'Something went wrong';
  }
  return message;
}

function createError(response, json) {
  return {
    status: response.status,
    message: response.message || response.userMessage || response.statusMessage,
    json,
  };
}

export function networkOffline() {
  return { type: NETWORK_OFFLINE };
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

function createHeader(headers, skipContentType) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const nextHeaders = headers || {};
  const { Authorization } = headers || {};

  if (Authorization) {
    nextHeaders.Authorization = `Bearer ${Authorization}`;
  }

  if (!Authorization && accessToken) {
    nextHeaders.Authorization = `Bearer ${accessToken}`;
  }
  if (skipContentType) {
    return nextHeaders;
  }
  if (headers) {
    if (!headers['Content-Type']) {
      nextHeaders['Content-Type'] = 'application/json';
    }
  } else {
    nextHeaders['Content-Type'] = 'application/json';
  }
  return nextHeaders;
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
  if (response.status === 200) {
    return response
      .json()
      .then(json => Promise.resolve(json))
      .catch(() =>
        Promise.resolve({
          status: 'ok',
          data: null,
        }),
      );
  }
  return Promise.resolve({ status: 204 });
}

export function errorHandler(response) {
  if (
    response.status === 422 ||
    response.status === 400 ||
    response.status === 500 ||
    response.status === 503
  ) {
    return response
      .json()
      .then(json => Promise.reject(createError(response, json)));
  }
  return Promise.reject(createError(response));
}

export function fetchWrapper(url, options = {}, etagCacheKey) {
  try {
    const { headers, body, isFormData, skipContentType } = options;
    const updatedOptions = {
      ...options,
    };
    if (!isFormData) {
      updatedOptions.headers = createHeader(headers, url)
    } else {
      updatedOptions.headers = createFormDataHeader(headers, url)
  
    }
    if (body && !isFormData) {
      updatedOptions.body = JSON.stringify(body);
    }
    delete updatedOptions.isFormData;
    delete updatedOptions.skipContentType;
    return fetch(url, updatedOptions)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          if (etagCacheKey) {
            localStorage.setItem(etagCacheKey, response.headers.get('Etag'));
          }
          return successHandler(response);
        }
        return errorHandler(response);
      })
      .catch(e => {
        const status = parseStatus(e.json);
        const message = parseMessage(e.json);
        return Promise.reject(
          createError({
            status,
            message,
          }),
        );
      });
  } catch (e) {
    return Promise.reject(
      createError({
        status: 'FAILED',
        message: e.message || 'Something went wrong',
      }),
    );
  }
}

export default function(url, options, etagCacheKey) {
  return fetchWrapper(url, options, etagCacheKey);
}