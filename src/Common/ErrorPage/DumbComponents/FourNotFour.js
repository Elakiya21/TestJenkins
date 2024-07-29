import React, { Component } from "react";
import Container from "../Components";
import brokenLink from "images/Broken-link.png";
import axios from "axios";

const AUTH_SERVICE_URL = process.env.REACT_APP_AUTH_SERVICE_URL;

class FourNotFour extends Component {
  state = {
    storelogo_url: "",
    isFormInitialized: false,
  };
  redirectToLandingPage = () => {
    window.history.back();
    // const{storeTerminalId} = this.props
    // window.location.href=`/${storeTerminalId}/auth`
  };
  fetchLogo() {
    const { storeTerminalId } = this.props;
    const { isFormInitialized } = this.state;
    if (!isFormInitialized && storeTerminalId) {
      axios
        .get(
          `${AUTH_SERVICE_URL}/v1.0/store/${storeTerminalId.toUpperCase()}/logo`
        )
        .then(
          (response) => {
            const res = response.data.store_logo;
            this.setState({ storelogo_url: res });
            this.showFormInitialized(true);
          },
          (error) => {}
        );
    }
  }
  showFormInitialized = (value) => this.setState({ isFormInitialized: value });

  render() {
    const { storeTerminalId } = this.props;
    const { storelogo_url, isFormInitialized } = this.state;
    if (!isFormInitialized && storeTerminalId) this.fetchLogo();
    return (
      <div className="container mt-3 pt-5">
        <div className="text-center">
          {/* <div className="logo404"><img  src={storelogo_url} alt="logo"/></div> */}
          <div>
            <img src={brokenLink} alt="Not found" />
          </div>
          <div className="pt-4">
            <strong>Sign in</strong>
          </div>
          <p className="pt-4">The requested URL doesn't exist.</p>
          <div className="h4 pt-4">
            <a href="#" onClick={this.redirectToLandingPage}>
              {" "}
              Back{" "}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default Container(FourNotFour);
