import { combineReducers } from "redux"
import selfRegistration from "Auth/SelfRegistration/Components/reducer"
import userVerification from "Auth/UserVerification/Components/reducer"
import magicLink from "Auth/MagicLink/Components/reducer"
import login from "Auth/Login/Components/reducer"

export default combineReducers({
    selfRegistration,
    userVerification,
    magicLink,
    login
})
