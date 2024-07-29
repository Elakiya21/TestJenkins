import React, { Component } from "react";
import Cookies from "js-cookie";

class ErrorPage extends Component {
  handleRedirectUrl = () =>{
    let redirectUrl = Cookies.get("redirectUrl");
    window.location.href = redirectUrl
  }
  render() {
    return (
      <div className="container text-center d-flex justify-content-center align-items-center vh-80">
        <section>
          <h2 className="text-center auth-f-bold custom-heading-1">
            You are already logged in
          </h2>
          <p className="mt-5"> Please click on the link below to continue</p>
          <a onClick={this.handleRedirectUrl} id="loginUrl">
            Back to application
          </a>
        </section>
      </div>
    );
  }
}

export default ErrorPage;
