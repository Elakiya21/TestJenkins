import React, { Component, Fragment } from "react";
import "./style.css";
import Toggle from "Common/Elements/Toggle";
import classnames from "classnames";
import Components from "../Components";
import isEmpty from "lodash/isEmpty";
import KeycloakLogout from "Common/Keycloak/DumbComponents/KeycloakLogout";
import Modal from "Common/Elements/Modal";
import Button from "Common/Elements/Button";
const companyAdminStoreId = process.env.REACT_APP_COMPANY_ADMIN_STORE_ID 
const companyAdminUrl = process.env.REACT_APP_COMPANY_ADMIN_URL

class SideNav extends Component {
  state = {
    showProfile: false,
    showWallets: false,
    showOrders: false,
    showHelpCentre: false,
    isInitilize: false,
    showReceivedGift: false,
    biometricEnabledSetted: false,
    biometricEnabled: false,
    notificationEnabledSetted: false,
    notificationEnabled: false,
    showLogoutModal: false,
    showCompanyAdmin: false
  };

  componentDidMount() {
    const {
      getNotificationDetailsRequest,
      getBiometricDetailsRequest,
      getNotificationDetailsClear,
      getBiometricDetailsClear,
    } = this.props;
    if (window.ReactNativeWebView) {
      getNotificationDetailsClear();
      getNotificationDetailsRequest();
      getBiometricDetailsClear();
      getBiometricDetailsRequest();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { biometricDetails, notificationDetails } = nextProps;
    const { biometricEnabledSetted, notificationEnabledSetted } = this.state;
    if (
      biometricDetails &&
      !isEmpty(biometricDetails) &&
      !biometricEnabledSetted
    ) {
      if (biometricDetails.biometricEnabled)
        this.setState({ biometricEnabled: biometricDetails.biometricEnabled });
      this.setState({ biometricEnabledSetted: true });
    }
    if (
      notificationDetails &&
      !isEmpty(notificationDetails) &&
      !notificationEnabledSetted
    ) {
      if (notificationDetails.notificationEnabled)
        this.setState({
          notificationEnabled: notificationDetails.notificationEnabled,
        });
      this.setState({ notificationEnabledSetted: true });
    }
  }

  handleActiveTabs = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  handleWallets = () => {
    this.setState({ showWallets: true });
    const { setWalletDetails, storeTerminalId, history } = this.props;
    setWalletDetails(storeTerminalId);
    history.push(`/${storeTerminalId}/auth/wallet`);
  };

  handleOrders = () => {
    this.setState({ showOrders: !this.state.showOrders });
  };

  handleReceivedGifts = () => {
    this.setState({ showReceivedGift: !this.state.showReceivedGift });
  };

  handleBiometricEnabled = (e) => {
    var biometricEnabled = e.target.checked;
    this.setState({ biometricEnabled: biometricEnabled });
    if (biometricEnabled) window.ReactNativeWebView.postMessage("biometric_on");
    else window.ReactNativeWebView.postMessage("biometric_off");
  };

  handleNotificationEnabled = (e) => {
    var notificationEnabled = e.target.checked;
    this.setState({ notificationEnabled: notificationEnabled });
    if (notificationEnabled)
      window.ReactNativeWebView.postMessage("notification_on");
    else window.ReactNativeWebView.postMessage("notification_off");
  };

  handleHelpCentre = () => {
    this.setState({ showHelpCentre: !this.state.showHelpCentre });
  };

  redirectToGiftCard = () => {
    const { storeTerminalId, history } = this.props;
    history.push(`/${storeTerminalId}/auth/gift-card`);
  };

  redirectToProducts = () => {
    const { storeTerminalId, history } = this.props;
    history.push(`/${storeTerminalId}/auth/products`);
  };

  redirectToCashCards = () => {
    const { storeTerminalId, history } = this.props;
    history.push(`/${storeTerminalId}/auth/cash-cards`);
  };

  redirectToGiftsReceived = () => {
    const { storeTerminalId, history } = this.props;
    history.push(`/${storeTerminalId}/auth/gift-received`);
  };

  redirectToMyProfile = () => {
    this.setState({ showProfile: true });
    const { storeTerminalId, history } = this.props;
    history.push(`/${storeTerminalId}/auth/profile`);
  };

  redirectToContactUs = () => {
    const { storeTerminalId, history } = this.props;
    history.push(`/${storeTerminalId}/auth/contact-us`);
  };

  redirectToCompanyAdmin = () => {
    this.setState({showCompanyAdmin: !this.state.showCompanyAdmin})
    window.location.href = companyAdminUrl
  };
  
  handleLogOut = () => {
    this.setState({ showLogoutModal: true });
  };

  handleLogoutModal = () => {
    this.setState({ showLogoutModal: false });
  };
  render() {
    const {
      myVouchers,
      showMyProfile,
      showMyOrder,
      myProducts,
      showMyWallet,
      helpCentre,
      contactUs,
      myCashCards,
      showMyReceivedGift,
      userRoles,
      storeId
    } = this.props || "";
    const {
      isInitilize,
      showProfile,
      showWallets,
      showOrders,
      showHelpCentre,
      showReceivedGift,
      biometricEnabled,
      notificationEnabled,
      showLogoutModal,
      showCompanyAdmin
    } = this.state;
    if (!isInitilize) {
      this.setState({
        showProfile: showMyProfile,
        showOrders: showMyOrder,
        showWallets: showMyWallet,
        showHelpCentre: helpCentre,
        showReceivedGift: showMyReceivedGift,
        isInitilize: true,
      });
    }
    return (
      <Fragment>
        <section className="auth-side-nav">
          <div className="accordion accordion-flush p-1" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={classnames("accordion-button", {
                    collapsed: showWallets != true,
                  })}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  onClick={this.handleWallets}
                >
                  <i className="bi bi-wallet2 m-1 px-1 pe-3 h3"></i>
                  <span className="">WALLET</span>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              ></div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={classnames("accordion-button", {
                    collapsed: showOrders != true,
                  })}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  onClick={this.handleOrders}
                >
                  <i className="bi bi-bag-plus m-1 px-1 pe-3 h3"></i>
                  <span className="">ORDERS</span>
                </button>
              </h2>
              <div
                id="collapseTwo"
                className={classnames("accordion-collapse collapse", {
                  show: showOrders == true,
                })}
                data-bs-parent="#accordionExample"
              >
                <div
                  className={classnames("accordion-body", {
                    "auth-active": myVouchers,
                  })}
                  onClick={this.redirectToGiftCard}
                >
                  <i className="bi bi-credit-card-2-front  pe-2 h-6"></i>
                  Vouchers
                </div>
                <div
                  className={classnames("accordion-body", {
                    "auth-active": myCashCards,
                  })}
                  onClick={this.redirectToCashCards}
                >
                  <i className="bi bi-credit-card  pe-2 h-6"></i>Cash Cards
                </div>
                <div
                  className={classnames("accordion-body", {
                    "auth-active": myProducts,
                  })}
                  onClick={this.redirectToProducts}
                >
                  <i className="bi bi-box-seam  pe-2 h-6"></i>Products
                </div>
              </div>
            </div>

            {/* <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={classnames("accordion-button", {
                    collapsed: showReceivedGift != true,
                  })}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <i className="bi bi-gift m-1 px-1 pe-3 h3"></i>
                  <span className="">REWARDS</span>
                </button>
              </h2>
              <div
                id="collapseThree"
                className={classnames("accordion-collapse collapse", {
                  show: showReceivedGift == true,
                })}
                data-bs-parent="#accordionExample"
              >
                <div
                  className={classnames("accordion-body", {
                    "auth-active": myReceivedVouchers,
                  })}
                  onClick={this.redirectToGiftsReceived}
                >
                  <i className="bi bi-credit-card-2-front  pe-2 h-6"></i>
                  Vouchers
                </div>
              </div>
            </div> */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={classnames("accordion-button", {
                    collapsed: showProfile != true,
                  })}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                  onClick={this.redirectToMyProfile}
                >
                  <i className="bi bi-person m-1 px-1 pe-3 h3"></i>
                  <span className="">PROFILE</span>
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              ></div>
            </div>
            {window.ReactNativeWebView && (
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    <i className="bi bi-gear m-1 px-1 pe-3 h3 h3"></i>
                    <span className="">APP CONTROL</span>
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body d-flex">
                    <i className="bi bi-fingerprint  pe-2 h-6"></i>Biometric
                    <div className="form-check form-switch ms-auto">
                      <Toggle
                        checked={biometricEnabled}
                        onChange={this.handleBiometricEnabled}
                      ></Toggle>
                    </div>
                  </div>
                </div>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body d-flex">
                    <i className="bi bi-bell  pe-2 h-6"></i>Notification
                    <div className="form-check form-switch ms-auto">
                      <Toggle
                        checked={notificationEnabled}
                        onChange={this.handleNotificationEnabled}
                      ></Toggle>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={classnames("accordion-button", {
                    collapsed: showHelpCentre != true,
                  })}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                  aria-expanded="false"
                  aria-controls="collapse"
                  onClick={this.handleHelpCentre}
                >
                  <i className="bi bi-question-circle m-1 px-1 pe-3 h3"></i>HELP
                  CENTER
                </button>
              </h2>
              <div
                id="collapseSix"
                className={classnames("accordion-collapse collapse", {
                  show: showHelpCentre == true,
                })}
                data-bs-parent="#accordionExample"
              >
                <div
                  className={classnames("accordion-body", {
                    "auth-active": contactUs,
                  })}
                  onClick={this.redirectToContactUs}
                >
                  <i className="bi bi-envelope pe-2 h-6"></i>Contact Us
                </div>
              </div>
            </div>
            <div className={classnames("accordion-item d-md-none",{
              "d-none": (!userRoles.includes("Company Admin") || !companyAdminStoreId.toLowerCase().split(",").includes(storeId.toLowerCase())),
            })}>
              <h2 className="accordion-header company-admin">
                <button
                  className={classnames("accordion-button", {
                    collapsed: showCompanyAdmin != true,
                  })}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSeven"
                  aria-expanded="true"
                  aria-controls="collapseSeven"
                  onClick={this.redirectToCompanyAdmin}
                >
                  <i class="bi bi-person-gear m-1 px-1 pe-3 h3"></i>
                  <span className="">COMPANY ADMIN</span>
                </button>
              </h2>
              <div
                id="collapseSeven"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              ></div>
            </div>
            <div className="logout">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={classnames("accordion-button collapsed")}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseEight"
                    aria-expanded="false"
                    aria-controls="collapse"
                    onClick={this.handleLogOut}
                  >
                    <i className="bi bi-box-arrow-right m-1 px-1 pe-3 h3"></i>
                    LOG OUT
                  </button>
                </h2>
              </div>
            </div>
          </div>
        </section>
        {showLogoutModal && (
          <section className="logout-modal">
            <Modal className="modal-dialog-centered">
              <section className="text-center my-3">
                Are you sure you want to log out?
                <div className="d-flex text-center mt-4 justify-content-center">
                  <KeycloakLogout />
                  <Button
                    className="btn col-4 col-md-4 ms-2"
                    primaryClassName="auth-f-bold"
                    onClick={this.handleLogoutModal}
                  >
                    No
                  </Button>
                </div>
              </section>
            </Modal>
          </section>
        )}
      </Fragment>
    );
  }
}

export default Components(SideNav);
