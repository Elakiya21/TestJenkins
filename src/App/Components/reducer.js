// import { initialState } from "shared/simpleDataReducer"

// import * as actions from "./actions"

const initialState = {
  active: "",
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case "SET":
      return {
        active: action.data,
      }
    default:
      return state
  }
}
