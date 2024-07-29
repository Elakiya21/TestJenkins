import { createActionCreator } from "shared/redux-utils"
import { KEY_CLOAK_TOKEN, KEY_CLOAK_AUTHENTICATED, CLEAR_KEYCLOCK_DATA, IS_CHECK_KEYCLOAK_AUTHENTICATION } from "../consts"

export const keycloakTokenAction = createActionCreator(KEY_CLOAK_TOKEN)
export const keycloakAuthenticated = createActionCreator(KEY_CLOAK_AUTHENTICATED)
export const clearKeyclockDetails = createActionCreator(CLEAR_KEYCLOCK_DATA)
export const checkKeycloakAuthentication = createActionCreator(IS_CHECK_KEYCLOAK_AUTHENTICATION)
