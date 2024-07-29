import React from "react"
import { Link } from "react-router-dom"
import classNames from "classnames"
import FlightsSearchPanel from "Flights/dumbComponents/Adaptive/Search/SearchPanel"
import HolidaysSearchPanel from "Holidays/dumbComponents/Adaptive"
import TradeFairsSearchPanel from "dumbComponents/Adaptive/TradeFairs"
import { INDEX_ROUTE_NAME } from "consts"
import { goToResultsInNewWindow } from "Flights/components/Search/utils"

const getCurrentPath = pathname => pathname.split("/")[1]
    ? pathname.split("/")[1]
    : INDEX_ROUTE_NAME

const SearchWidget = ({ image, query, pathname }) => {
  const {
    tab,
    name,
    flight_type,
  } = query

  const backgroundImageStyle = { background: `url(${image}) no-repeat center` }

  return (
    <div className="products_container" style={backgroundImageStyle}>
      <div className="tabber_container">
        {
          tab === "show" &&
          <div className="scrollmenu">
            <Link
              to={`iframe?size=small&&tab=${tab}&&name=flights`}
              className={
                classNames({
                  active_tab: name === "flights",
                })
              }
            >
              <i className="gm gm-flights"></i>
              <span>Flights</span>
            </Link>
            {process.env.REACT_APP_HOTELS &&
            <Link
              to="/hotels"
              className={getCurrentPath(pathname) === "hotels" ? "active_tab" : ""}
            >
              <i className="gm gm-hotels"></i>
              <span>Hotels</span>
            </Link>
            }
            <Link
              to={`iframe?size=small&&tab=${tab}&&name=holidays`}
              className={
                classNames({
                  active_tab: name === "holidays",
                })
              }
            >
              <i className="gm gm-holidays"></i>
              <span>Holidays</span>
            </Link>
            <Link
              to={`iframe?size=small&&tab=${tab}&&name=tradefairs`}
              className={
                classNames({
                  active_tab: name === "tradefairs",
                })
              }
            >
              <i className="gm gm-tradeFare_active"></i>
              <span>TradeFairs</span>
            </Link>
            {process.env.REACT_APP_AGENT_FINDER &&
              <Link
                to="/agentFinder"
                className={getCurrentPath(pathname) === "agentFinder" ? "active_tab" : ""}
              >
                <i className="gm gm-nearest_agent"></i>
                <span>NearestAgent</span>
              </Link>
            }
          </div>
        }
        <div className="tab_content">
          <div className="mdl-tabs__panel is-active" id="offers_panel">
            {
              name === "flights" &&
              <FlightsSearchPanel showBeta={false} goToResults={goToResultsInNewWindow} flight_type={flight_type} />
            }

            {
              name === "holidays" &&
              <HolidaysSearchPanel />
            }
            {
              name === "tradefairs" &&
              <TradeFairsSearchPanel />
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default SearchWidget
