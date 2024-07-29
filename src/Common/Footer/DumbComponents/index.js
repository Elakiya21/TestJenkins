import React, { Component } from "react";
import Container from "../Components";

class Header extends Component {
  state = {
    store_footer: "",
    isFormInitialized: false,
  };

  handleClick = (event) => {
    const clickedElement = event.target.closest(".footer-icon");
    if (clickedElement) {
      const isFooterBackBtnPresent =
        clickedElement.querySelector("#isFooterBackBtn") !== null;
      if (window.ReactNativeWebView && isFooterBackBtnPresent) {
        window.ReactNativeWebView.postMessage("BackBtnClicked");
      }
    }
  };

  render() {
    const { getHeaderFooterValue } = this.props;
    return (
      <div onClick={this.handleClick}>
        {getHeaderFooterValue && getHeaderFooterValue.store_footer && (
          <div
            dangerouslySetInnerHTML={{
              __html: getHeaderFooterValue.store_footer,
            }}
          />
        )}
      </div>
    );
  }
}

export default Container(Header);
