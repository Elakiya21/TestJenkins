import React, { Component } from "react";
import Modal from "Common/Elements/Modal";
class TestIframe extends Component {
  render() {
    return (
      <div className="align-center" >
        <h2>GCM Page</h2>
        {
          ( (
            <Modal id="create-modal gcm-page">
              <iframe
              src="http://localhost:3012/auth/INBOM240400012S02/login/magic-link?phoneNumber=8825559497&email=elakiya.b@lifafa.com&userTerminalId=INBOM240400014UBI1JD&magicLinkCode=123gtyh"
                //src="http://localhost:3011/myaccount/INBOM240400012S02/magic-link-login?phoneNumber=8825559497&email=elakiya.b@lifafa.com&userTerminalId=INBOM240400014UBI1JD&magicLinkCode=123gtyh"
                // src="https://store.lifafa.team/myaccount/INBOM240400012S02/magic-link-login?phoneNumber=8825559497&email=elakiya.b@lifafa.com&userTerminalId=INBOM240400014UBI1JD&magicLinkCode=123gtyh"
                height="450"
                width="450"
                title="Iframe Example"
              ></iframe>
            </Modal>
          ))}
      </div>
    );
  }
}
export default TestIframe;