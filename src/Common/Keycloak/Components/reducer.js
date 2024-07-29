import { KEY_CLOAK_TOKEN, KEY_CLOAK_AUTHENTICATED, CLEAR_KEYCLOCK_DATA, IS_CHECK_KEYCLOAK_AUTHENTICATION } from "../consts"

const KeycloakInitialState = {
  keycloakData: {},
  authentication: false,
  isCheckKeycloakAuthentication: true
}

export default function keycloakReducer(state = KeycloakInitialState, action) {
  switch (action.type) {
    case KEY_CLOAK_TOKEN:
      return {
        ...state,
        keycloakData: action.data,
      }
    case KEY_CLOAK_AUTHENTICATED:
      return {
        ...state,
        authentication: action.data,
      }
      case CLEAR_KEYCLOCK_DATA:
        return {
          ...state,
          keycloakData: {}
        }
    case IS_CHECK_KEYCLOAK_AUTHENTICATION:
      return {
        ...state,
        isCheckKeycloakAuthentication: action.data,
      }
    default: {
      return state
    }
  }
}
