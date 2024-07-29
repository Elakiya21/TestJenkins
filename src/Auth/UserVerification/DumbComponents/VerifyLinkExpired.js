import React, { Component, Fragment } from "react";
import Components from "../Components";
import { isEmpty } from "lodash";
import {
  handleLinkExpiredPlaceHolderGlow,
} from "../helpers";
import{
  maskEmail,
  maskPhoneNumber,
} from "../../helpers.js"
import LinkExpired from "../../../images/LinkExpired.png";

class VerifyLinkExpired extends Component {
  state = {
    label: "",
    contactDetail: "",
  };
  componentDidMount() {
    setTimeout(() => {
      const page = document.querySelector(".page");
      page.classList.add("slide-in");
    }, 1);
    document.title = "Link Expired";
    const { getCustomerProfileDetails, match } = this.props;
    const { id } = match.params || "";
    getCustomerProfileDetails.request({ id });
  }
  componentWillReceiveProps(nextProps) {
    const { userDetails, userDetailsIsFetching } = nextProps;
    const { isFormInitialized } = this.state;
    if (
      userDetails &&
      !isEmpty(userDetails) &&
      !userDetailsIsFetching &&
      !isFormInitialized
    ) {
      if (userDetails.userVerificationMethodId == 2) {
        this.setState({
          label: "phone",
          contactDetail:
            maskPhoneNumber(
              userDetails.primaryContact &&
                (userDetails.primaryContact.tempPhoneNumber ||
                  userDetails.primaryContact.phoneNumber)
            ) || "",
        });
      } else if (userDetails.userVerificationMethodId == 3) {
        this.setState({
          label: "email",
          contactDetail:
            maskEmail(
              userDetails.primaryContact &&
                (userDetails.primaryContact.tempEmail ||
                  userDetails.primaryContact.email)
            ) || "",
        });
      }
      this.showFormInitialized(true);
    }
  }
  showFormInitialized = (value) => this.setState({ isFormInitialized: value });

  render() {
    const { userDetailsIsFetching } = this.props;
    const { label, contactDetail } = this.state;
    return (
      <div className="container pt-5">
        <section className="text-center">
          <img src={LinkExpired} alt="Link Expired" style={{ maxHeight: "90px" }} />
          <div className="h1 my-4 auth-f-bold">
            Verification link expired
          </div>
          {userDetailsIsFetching ? (
            <div className="row justify-content-center">
              <div className="col-12 col-md-5">
                {handleLinkExpiredPlaceHolderGlow()}
              </div>
            </div>
          ) : (
            <div className="mt-5">
              A new link has been sent to your resgistered {label} {contactDetail} to
              restart the registration process
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default Components(VerifyLinkExpired);
