/**
 * This is simple implementaion
 * to store data from the request
 * and track the state
 */

export const initialState = {
  isFetching: false,
  error: "",
  data: null,
  finished: false,
}

export const initialPollingState = {
  isPolling: false,
  error: "",
  data: [],
  pending: false,
  finished: false,
}

export function reducer(state = initialState, action, actionSignal) {
  switch (action.type) {
    case actionSignal.REQUEST:
      return { ...state, isFetching: true, finished: false, error: null }
    case actionSignal.SUCCESS:
      return { ...state, isFetching: false, data: action.data, finished: true, error: null }
    case actionSignal.FAILURE:
      return { ...state, isFetching: false, error: action.error || action.data, finished: true, data: null }
    case actionSignal.CLEAR:
      return initialState
    default:
      return state
  }
}

function mergePollingData(stateData = [], pollingData) {
  return pollingData && pollingData.length
     ? [...stateData, ...pollingData]
     : stateData
}

export function pollingReducer(state = initialPollingState, action, actionSignal) {
  switch (action.type) {
    case actionSignal.REQUEST:
      return { ...state, isPolling: true, pending: false, error: null, finished: false }
    case actionSignal.SUCCESS: {
      const successData = mergePollingData(state.data, action.data)

      return {
        ...state,
        isPolling: false,
        data: successData,
        finished: true,
        pending: false,
      }
    }
    case actionSignal.FAILURE:
      return { ...state, isPolling: false, error: action.error || action.data, pending: false, finished: false }
    case actionSignal.PENDING: {
      const pendingData = mergePollingData(state.data, action.data)

      return { ...state, isPolling: true, data: pendingData, error: null, pending: true, finished: false }
    }
    case actionSignal.CLEAR:
      return initialPollingState
    default:
      return state
  }
}

export default { reducer, pollingReducer, initialState, initialPollingState }
