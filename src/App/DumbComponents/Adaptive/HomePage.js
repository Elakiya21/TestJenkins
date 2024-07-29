import React, { Component } from "react"
import { Link } from "react-router-dom"
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import HotelIcon from '@material-ui/icons/Hotel';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import TrainIcon from '@material-ui/icons/Train';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';

import berlinImg from "images/Berlin.jpg"
import busImg from "images/Bus_Booking_Banner.jpg"
import flightImg from "images/flights.png"
import "./Header/DumbComponents/index.css"

const giftcardUrl = process.env.REACT_APP_GIFTCARD_SERVICE_URL
class HomePage extends Component {

  render() {
    return (
      <div className="warper side-space">

        <div className="image-slide">
          <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img width="550px" height="100px" class="d-block" src={flightImg} />
              </div>
              <div class="carousel-item">
                <img width="550px" height="100px" class="d-block" src={berlinImg} />
              </div>
              <div class="carousel-item">
                <img width="550px" height="100px" class="d-block" src={busImg} />
              </div>
            </div>
          </div>
        </div>

        <div className="product">
          <div className="title">Products</div>
          <div id="product-list1">
            <div className="flight">
              <div className="icon"><FlightTakeoffIcon fontSize="large" style={{ color: "rgb(103, 57, 183)" }} /></div>
              <div className="title">Flights</div>
            </div>
            <div className="hotel">
              <div className="icon"><HotelIcon fontSize="large" style={{ color: "rgb(103, 57, 183)" }} /></div>
              <div className="title">Hotel</div>
            </div>
            <div className="package">
              <div className="icon"><CardTravelIcon fontSize="large" style={{ color: "rgb(103, 57, 183)" }} /></div>
              <div className="title">Packages</div>
            </div>
            <a href={giftcardUrl} target="_blank">
            <div className="gift-card">
              <div className="icon"><CardGiftcardIcon fontSize="large" style={{ color: "rgb(103, 57, 183)" }} /></div>
              <div className="title">Gift Card</div>
            </div>
            </a>
            <div className="train">
              <div className="icon"><TrainIcon fontSize="large" style={{ color: "rgb(103, 57, 183)" }} /></div>
              <div className="title">Train</div>
            </div>
            <div className="bus">
              <div className="icon"><DirectionsBusIcon fontSize="large" style={{ color: "rgb(103, 57, 183)" }} /></div>
              <div className="title">Bus</div>
            </div>
            <div className="cab">
              <div className="icon"><LocalTaxiIcon fontSize="large" style={{ color: "rgb(103, 57, 183)" }} /></div>
              <div className="title">Cab</div>
            </div>
            <div className="visa"></div>
          </div>
          </div>
          <div className="product-list1 flex">
           
        </div>
      </div>
    )
  }
}

export default HomePage