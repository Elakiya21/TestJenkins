/* eslint-disable */
// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

const REACT_APP = /^REACT_APP_/i

function createDefaultEnvironment(publicUrl) {
  const env = {
    // Useful for determining whether we’re running in production mode.
    // Most importantly, it switches React into the correct mode.
    NODE_ENV: process.env.NODE_ENV || "development",
    // Useful for resolving the correct path to static assets in `public`.
    // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
    // This should only be used as an escape hatch. Normally you would put
    // images into the `src` and `import` them in code to get their paths. 
    REACT_APP_KEYCLOCK_REALM: "Lifafa",    
    REACT_APP_KEYCLOCK_URL: "http://localhost:8180/auth",
    REACT_APP_HOME_URL: "https://app.lifafa.team",
    //REACT_APP_AUTH_SERVICE_URL: "https://api.lifafa.team/auth-service/api",
    REACT_APP_AUTH_SERVICE_URL: "http://localhost:8082/api",
    REACT_APP_SUPPORT_EMAIL: "care@lifafa.com",
    REACT_APP_TERMS_OF_USE_URL: "https://app.lifafa.team/terms",
    REACT_APP_PRIVACY_POLICY_URL: "https://app.lifafa.team/privacy-policy",
    REACT_APP_SIGN_IN_URL: "https://app.lifafa.team/login?store_id=",
    REACT_APP_IP_ADDRESS_API_URL: "https://jsonip.com/",
    // REACT_APP_KEYCLOAK_ACTION_TOKEN_URL: "https://lauth.lifafa.team/auth/realms/Lifafa/login-actions/action-token",
    REACT_APP_KEYCLOAK_ACTION_TOKEN_URL: "http://localhost:8180/auth/realms/Lifafa/login-actions/action-token",
    REACT_APP_OTP_LENGTH: "5",
    // REACT_APP_AUTH_ORIGIN_URL:"https://auth.lifafa.team", 
    REACT_APP_AUTH_ORIGIN_URL:"http://localhost:3012", 
    REACT_APP_CONTACT_US_PAGE_URL:"https://app.lifafa.team/in/{storeId}/support",
    REACT_APP_MAGIC_LINK_DETAILS_PAGE: "https://store.lifafa.team/{storeId}-01/gcm/home-page?magicLinkCode={magicLinkCode}",
    REACT_APP_MAIN_DOMAIN:"localhost",
    // REACT_APP_MAIN_DOMAIN: ".lifafa.team",
    REACT_APP_USER_VERIFICATION_CLIENT_ID: "app-lifafa-team",
    REACT_APP_MAGIC_LINK_LOGIN_CLIENT_ID: "upm-myaccount-webapp",
    PUBLIC_URL: JSON.stringify(publicUrl),
  }

  Object
    .keys(env)
    .forEach((key) => {
    env[key] = JSON.stringify(env[key])
    })

  return env
}

function getClientEnvironment(publicUrl) {
  const processEnv = Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = JSON.stringify(process.env[key])
      return env
    }, createDefaultEnvironment(publicUrl))
  return { "process.env": processEnv }
}

module.exports = getClientEnvironment
