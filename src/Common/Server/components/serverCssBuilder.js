//This file is used by webpack to build the css required for server side.
// const path = require("path")

const getIndexDesktopCss = (/*dirname*/) => ([
  // // path.resolve(dirname, "../src/mockComponents/styles/css/index_desktop.css"),
])

const getCommonDesktopCss = (/*dirname*/) => ([
  // path.resolve(dirname, "../src/dumbComponents/Desktop/App/styles.css"),
  // path.resolve(dirname, "../src/mockComponents/styles/scss/material_custom/partials/desktop/newHome/_footer.scss"),
  // path.resolve(dirname, "../src/dumbComponents/Common/ErrorModal/styles.css"),
  // path.resolve(dirname, "../src/dumbComponents/Common/Modal/styles.css"),
  // path.resolve(dirname, "../src/dumbComponents/ProductTabs/styles.css"),
  // path.resolve(dirname, "../src/dumbComponents/Common/WidgetLoader/styles.css"),
])

const getFlightsDesktopHomeCss = (dirname) => {
  const desktopCss = getIndexDesktopCss(dirname)
  const commonCss = getCommonDesktopCss(dirname)
  const flightsCss = [
    // path.resolve(dirname, "../src/Flights/dumbComponents/Desktop/Search/index.css"),
    // path.resolve(dirname, "../src/dumbComponents/Common/Offers/styles.css"),
  ]
  return desktopCss.concat(commonCss, flightsCss)
}

const getHotelsDesktopHomeCss = (dirname) => {
  const desktopCss = getIndexDesktopCss(dirname)
  const commonCss = getCommonDesktopCss(dirname)
  const hotelsCss = [
    // path.resolve(dirname, "../src/Flights/dumbComponents/Desktop/Search/index.css"),
    // path.resolve(dirname, "../src/Hotels/dumbComponents/Common/Search/search.css"),
    // path.resolve(dirname, "../src/Hotels/dumbComponents/Common/LocationsAutoSuggest/suggestions.css"),
  ]
  return desktopCss.concat(commonCss, hotelsCss)
}

const getHomestayDesktopHomeCss = (dirname) => {
  const desktopCss = getIndexDesktopCss(dirname)
  const commonCss = getCommonDesktopCss(dirname)
  const homestayCss = [
    // // path.resolve(dirname, "../src/Flights/dumbComponents/Desktop/Search/index.css"),
    // // path.resolve(dirname, "../src/Hotels/dumbComponents/Common/Search/search.css"),
    // // path.resolve(dirname, "../src/Homestays/dumbComponents/Common/LocationsAutoSuggest/suggestions.css"),
  ]
  return desktopCss.concat(commonCss, homestayCss)
}

const getHolidayDesktopHomeCss = (dirname) => {
  const desktopCss = getIndexDesktopCss(dirname)
  const commonCss = getCommonDesktopCss(dirname)
  return desktopCss.concat(commonCss)
}

const getIndexAdaptiveCss = (/*dirname*/) => ([
  // // path.resolve(dirname, "../src/mockComponents/styles/css/index_adaptive.css"),
])

const getCommonAdaptiveCss = (/*dirname*/) => ([
  // path.resolve(dirname, "../src/mockComponents/styles/scss/material_custom/partials/desktop/newHome/_footer.scss"),
  // path.resolve(dirname, "../src/dumbComponents/Common/ErrorModal/styles.css"),
  // path.resolve(dirname, "../src/dumbComponents/Common/Modal/styles.css"),
  // path.resolve(dirname, "../src/dumbComponents/Common/WidgetLoader/styles.css"),
])

const getFlightsAdaptiveHomeCss = (dirname) => {
  const desktopCss = getIndexAdaptiveCss(dirname)
  const commonCss = getCommonAdaptiveCss(dirname)
  const flightsCss = [
    // // path.resolve(dirname, "../src/Flights/dumbComponents/Adaptive/Search/styles.css"),
    // // path.resolve(dirname, "../src/dumbComponents/Common/Offers/styles.css"),
  ]
  return desktopCss.concat(commonCss, flightsCss)
}

const getHotelsAdaptiveHomeCss = (dirname) => {
  const desktopCss = getIndexAdaptiveCss(dirname)
  const commonCss = getCommonAdaptiveCss(dirname)
  const hotelsCss = [
    // path.resolve(dirname, "../src/Flights/dumbComponents/Adaptive/Search/styles.css"),
    // path.resolve(dirname, "../src/Hotels/dumbComponents/Common/Search/search.css"),
    // path.resolve(dirname, "../src/Hotels/dumbComponents/Common/LocationsAutoSuggest/suggestions.css"),
    // path.resolve(dirname, "../src/Hotels/dumbComponents/Adaptive/Results/Shimmer/styles.css"),
  ]
  return desktopCss.concat(commonCss, hotelsCss)
}

const getHomestayAdaptiveHomeCss = (dirname) => {
  const desktopCss = getIndexAdaptiveCss(dirname)
  const commonCss = getCommonAdaptiveCss(dirname)
  const homestayCss = [
    // path.resolve(dirname, "../src/Flights/dumbComponents/Adaptive/Search/styles.css"),
    // path.resolve(dirname, "../src/Hotels/dumbComponents/Common/Search/search.css"),
    // path.resolve(dirname, "../src/Homestays/dumbComponents/Desktop/style.css"),
    // path.resolve(dirname, "../src/Homestays/dumbComponents/Common/LocationsAutoSuggest/suggestions.css"),
  ]
  return desktopCss.concat(commonCss, homestayCss)
}

const getHolidayAdaptiveHomeCss = (dirname) => {
  const desktopCss = getIndexAdaptiveCss(dirname)
  const commonCss = getCommonAdaptiveCss(dirname)
  return desktopCss.concat(commonCss)
}

const getExperiencesDesktopHomeCss = (dirname) => {
  const desktopCss = getIndexDesktopCss(dirname)
  const commonCss = getCommonDesktopCss(dirname)
  const experiencesCss = [
    // path.resolve(dirname, "../src/Experiences/dumbComponents/Desktop/Search/styles.css"),
  ]
  return desktopCss.concat(commonCss, experiencesCss)
}

const getExperiencesAdaptiveHomeCss = (dirname) => {
  const adaptiveCss = getIndexAdaptiveCss(dirname)
  const commonCss = getCommonAdaptiveCss(dirname)
  const experiencesCss = [
    // // path.resolve(dirname, "../src/Experiences/dumbComponents/Adaptive/Search/styles.css"),
  ]
  return adaptiveCss.concat(commonCss, experiencesCss)
}

const getHotelsSEODesktopCss = (dirname) => {
  const desktopCss = getIndexDesktopCss(dirname)
  const hotelsCss = [
    // // path.resolve(dirname, "../src/Hotels/dumbComponents/Desktop/Results/results.css"),
    // // path.resolve(dirname, "../src/Hotels/dumbComponents/Desktop/Details/details.css"),
  ]
  return desktopCss.concat(hotelsCss)
}

const getHotelsSEOAdaptiveCss = (dirname) => {
  const adaptiveCss = getIndexAdaptiveCss(dirname)
  const commonCss = getCommonAdaptiveCss(dirname)
  const hotelsCss = [
    // path.resolve(dirname, "../src/Hotels/dumbComponents/Adaptive/Details/adaptiveDetail.css"),
    // path.resolve(dirname, "../src/Hotels/dumbComponents/Desktop/Results/results.css"),
  ]
  return adaptiveCss.concat(commonCss, hotelsCss)
}

const getTrainsDesktopHomeCss = (dirname) => {
  const desktopCss = getIndexDesktopCss(dirname)
  const commonCss = getCommonDesktopCss(dirname)
  const trainsCss = [
    // path.resolve(dirname, "../src/Trains/dumbComponents/Desktop/Results/Loader/styles.css"),
  ]
  return desktopCss.concat(commonCss, trainsCss)
}

const getTrainsAdaptiveHomeCss = (dirname) => {
  const adaptiveCss = getIndexAdaptiveCss(dirname)
  const commonCss = getCommonAdaptiveCss(dirname)
  const trainsCss = [
    // path.resolve(dirname, "../src/Trains/dumbComponents/Adaptive/TrainLoaders/headerLoader.css"),
    // path.resolve(dirname, "../src/Trains/dumbComponents/Adaptive/TrainLoaders/trainsProgressiveLoader.css"),
  ]
  return adaptiveCss.concat(commonCss, trainsCss)
}

module.exports = {
  getFlightsDesktopHomeCss,
  getHotelsDesktopHomeCss,
  getHomestayDesktopHomeCss,
  getHolidayDesktopHomeCss,
  getFlightsAdaptiveHomeCss,
  getHotelsAdaptiveHomeCss,
  getHomestayAdaptiveHomeCss,
  getHolidayAdaptiveHomeCss,
  getExperiencesDesktopHomeCss,
  getExperiencesAdaptiveHomeCss,
  getHotelsSEODesktopCss,
  getHotelsSEOAdaptiveCss,
  getTrainsDesktopHomeCss,
  getTrainsAdaptiveHomeCss,
}
