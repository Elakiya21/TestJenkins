import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import Container from "App/Components"
import "./style.css"

const giftcardUrl = process.env.REACT_APP_GIFTCARD_SERVICE_URL
  class Homepage extends Component {

    onClickMenus = (event, pathClicked) => {
      // const { pathname } = location
      // const { toggleMenuDrawer } = this.props
      // if (pathname === pathClicked) {
      //   if (toggleMenuDrawer) {
      //     event.preventDefault()
      //     toggleMenuDrawer(false)
      //   }
      // }
    }

    redirectToGiftCard = () =>{
      window.open(giftcardUrl, "_blank");
    }

    render() {
      const { currentUser } = this.props
    
  return (
    //<div className="pl-3 places-name">Welcome to Lifafa Store Front</div>
    <div>
      <div className="clear_right">
          <div>
            <div className="slide_menu_content">
              <ul className="header-nav nav nav-tabs mt-8" id="myTab" role="tablist">
                <li className="header-nav-item nav-item width_15"/>
                <li className="header-nav-item nav-item width_10">
                    <a className="nav-link active" id="flights-tab" data-toggle="tab" href="#flights" role="tab" aria-controls="flights" aria-selected="false">Flights</a>
                </li>
                <li className="header-nav-item nav-item width_10">
                    <a className="nav-link" id="hotels-tab" data-toggle="tab" href="#hotels" role="tab" aria-controls="hotels" aria-selected="false">Hotels</a>
                </li>
                <li className="header-nav-item nav-item width_10">
                    <a className="nav-link" id="trains-tab" data-toggle="tab" href="#trains" role="tab" aria-controls="trains" aria-selected="false">Trains</a>
                </li>
                <li className="header-nav-item nav-item width_10">
                    <a className="nav-link" id="visa-tab" data-toggle="tab" href="#visa" role="tab" aria-controls="visa" aria-selected="false">Visa</a>
                </li>
                <li className="header-nav-item nav-item width_10">
                    <a className="nav-link" id="cabs-tab" data-toggle="tab" href="#cabs" role="tab" aria-controls="cabs" aria-selected="false">Cabs</a>
                </li>
                <li className="header-nav-item nav-item width_10" onClick={this.redirectToGiftCard}>
                    <a className="nav-link" id="gift-cards-tab" data-toggle="tab" href="#gift-cards" role="tab" aria-controls="gift-cards" aria-selected="false">Gift Cards</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  )
}
}

export default Container(Homepage)