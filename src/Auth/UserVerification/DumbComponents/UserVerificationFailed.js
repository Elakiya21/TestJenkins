import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../Components";
import "./styles.css";
import WrongSymbol from "../../../images/WrongSymbol.png";
const supportEmail = process.env.REACT_APP_SUPPORT_EMAIL;

class UserVerificationFailed extends Component {
  componentDidMount() {
    setTimeout(() => {
      const page = document.querySelector(".page");
      page.classList.add("slide-in");
    }, 1);
  }
  render() {
    return (
      <div className="container auth-self-registration pt-5">
        <section className="text-center">
          <img src={WrongSymbol} alt="User verification failed" style={{ maxHeight: "90px" }} />
          <div className="h1 my-4 auth-f-bold">
            User verification failed
          </div>
          <div className="mt-5">
            This means that our systems are very busy at the minute and we would
            request you to try again in about 30 mins.
          </div>
          <div className="mt-3">
            If this problem persists, please contact our helpdesk on{" "}
            <Link
              className="text-decoration-none"
              to={`mailto:${supportEmail}`}
              target="_blank"
              download
            >
              {supportEmail}
            </Link>{" "}
          </div>
        </section>
      </div>
    );
  }
}

export default Container(UserVerificationFailed);
