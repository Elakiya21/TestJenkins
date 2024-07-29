import React, { Component } from "react";
import Button from "Common/Elements/Button";
import GreenTick from "../../../images/GreenTick1.png";

class AccountVerified extends Component {
  componentDidMount(){
    setTimeout(() => {
      const page = document.querySelector(".page");
      page.classList.add("slide-in");
    }, 1);
  }
  render() {
    const { match } = this.props;
    const storeTerminalId = match.params.id;
    return (
      <div className="container auth-self-registration pt-5">
        <section className="text-center">
          <img src={GreenTick} alt="Profile Verified" style={{ maxHeight: "90px" }} />
          <div className="h1 my-4 auth-f-bold">
            Your profile has been verified
          </div>
          <div className="py-4">
            <Button
              className="btn col-12 col-md-5"
              onClick={() =>
                (window.location.href = `${process.env.REACT_APP_HOME_URL}/${storeTerminalId}/home`)
              }
            >
              Discover
            </Button>
          </div>
        </section>
      </div>
    );
  }
}

export default AccountVerified;
