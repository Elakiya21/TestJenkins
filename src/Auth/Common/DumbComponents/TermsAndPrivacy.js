import React, { Component } from "react";
import "./index.css"

class TermsAndPrivacy extends Component {
  render() {
    return (
      <div>
        <section className="container auth-sr-terms-privacy fixed-bottom mx-auto pb-5 mb-5 text-center">
          <div className="text-center my-3">
            By signing up you are agreeing to the terms of use and the privacy
            policy
          </div>
          <div className="mt-3 text-center d-flex justify-content-center auth-sr-terms-privacy-text1">
            <div>
              <a
                href={process.env.REACT_APP_TERMS_OF_USE_URL}
                target="_blank"
                className="me-2"
              >
                Terms of use
              </a>
            </div>
            <div className="vr"></div>
            <div>
              <a
                href={process.env.REACT_APP_PRIVACY_POLICY_URL}
                target="_blank"
                className="ms-2"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default TermsAndPrivacy;
