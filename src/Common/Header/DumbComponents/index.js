import React, { Component } from "react";
import Helmet from "react-helmet";
import Container from "../Components";
import icon from "../../../../public/favicon.ico";
import { isEmpty } from "lodash";

class Header extends Component {
  state = {
    store_header: "",
    isFormInitialized: false,
    storeFevicon_url: icon,
  };
  // componentDidMount() {
  //   document.title = "Auth";
  //   const { getHeaderFooter } = this.props
  //   let isRNView = false
  //   if (window.ReactNativeWebView) {
  //     isRNView = true;
  //   }
  //   let pathname = window.location.pathname.split("/");
  //   if (pathname && !isEmpty(pathname)) {
  //     getHeaderFooter.clear()
  //     getHeaderFooter.request({
  //       storeId: pathname[2],
  //       isLogged: false,
  //       isRNView: isRNView,
  //     });
  //   }
  // }

  handleClick = (event) => {
    const clickedElement = event.target.closest(".link-hone");
    if (clickedElement || event.target.classList.contains("link-hone")) {
      const childrenIDs = Array.from(clickedElement.querySelectorAll("*")).map(
        (child) => child.id
      );
      const isDrupalBackBtnPresent = childrenIDs.includes("isDrupalBackBtn");
      if (window.ReactNativeWebView && isDrupalBackBtnPresent) {
        window.ReactNativeWebView.postMessage("BackBtnClicked");
      }
    }
    const clickedLogoElement = event.target.closest(".logo-hone-center");
    if (
      clickedLogoElement ||
      event.target.classList.contains("logo-hone-center")
    ) {
      const childrenIDs = Array.from(
        clickedLogoElement.querySelectorAll("*")
      ).map((child) => child.id);
      const isLogoIdPresent = childrenIDs.includes("isDrupalStoreLogo");
      if (window.ReactNativeWebView && isLogoIdPresent) {
        window.ReactNativeWebView.postMessage("homeClicked");
      }
    }
  };

  render() {
    const { getHeaderFooterValue } = this.props;
    const { storeFevicon_url } = this.state;
    return (
      <div onClick={this.handleClick}>
        {getHeaderFooterValue && (
          <div>
            <Helmet>
              <link
                rel="icon"
                href={getHeaderFooterValue.store_fevicon || storeFevicon_url}
                type="image/x-icon"
                sizes="16x16"
              />
            </Helmet>
            <div
              dangerouslySetInnerHTML={{
                __html: getHeaderFooterValue.store_header,
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Container(Header);
