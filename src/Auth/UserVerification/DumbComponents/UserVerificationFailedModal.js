import React, { Component, Fragment } from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import Container from "../Components";
import Modal from "Common/Elements/Modal";
import { otpForm } from "../consts";
import WrongSymbol from "../../../images/WrongSymbol.png";

import "./styles.css";
const supportEmail = process.env.REACT_APP_SUPPORT_EMAIL;
class Form extends Component {
  componentDidMount() {
    setTimeout(() => {
      const page = document.querySelector(".page");
      page.classList.add("slide-in");
    }, 1);
  }
  render() {
    return (
      <Modal
        id="create-modal1"
      >
        <div className="container auth-self-registration mt-3 mb-4">
          <section className="text-center">
            <img src={WrongSymbol} alt="User verification failed" style={{ maxHeight: "50px" }} />
            <div className="h1 my-4 auth-f-bold">
              User verification failed
            </div>
            <div className="mt-5">
              This means that our systems are very busy at the minute and we
              would request you to try again in about 30 mins.
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
      </Modal>
    );
  }
}

const form = reduxForm({
  form: otpForm,
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  onSubmit: () => {},
})(Form);

export default Container(form);
