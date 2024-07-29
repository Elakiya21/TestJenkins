import { fork } from "redux-saga/effects"
import HeaderSaga from 'Common/Header/Components/sagas';
import selfRegistrationSaga from "Auth/SelfRegistration/Components/sagas"
import magicLinkSaga from "Auth/MagicLink/Components/sagas"
import userVerificationSaga from "Auth/UserVerification/Components/saga"
import loginSaga from "Auth/Login/Components/sagas"

export default function* main() {
    yield fork(selfRegistrationSaga)
    yield fork(userVerificationSaga)
    yield fork(loginSaga)
    yield fork(HeaderSaga)
    yield fork(magicLinkSaga)
}
