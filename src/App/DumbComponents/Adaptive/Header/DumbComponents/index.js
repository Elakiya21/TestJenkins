import React, { Component } from "react"
import { Link } from "react-router-dom"
import Container from "../Components"
import UserGreeting from "App/DumbComponents/UserGreeting"
import KeycloakLogout from "Common/Keycloak/DumbComponents/KeycloakLogout"
import logo from "images/Common/lifafa_logo.png"
import home from "images/Common/home.png"
import avatarIcon from "images/dumy_avatar.jpg"

import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TouchAppIcon from '@material-ui/icons/TouchApp';

class Header extends Component {

    state = {
        sideNavSelected: false,
        activeTab: ""
    }

    sidenavSelect = () => {
        const { sideNavSelected, activeTab } = this.state
        let currentTab = ""
        if(window.location.pathname === "/subuser"){
            currentTab = "Subuser"
        } else if(window.location.pathname === "/preferences"){
            currentTab = "Preferences"
        } else if(window.location.pathname === "/wallet"){
            currentTab = "Wallet"
        } else if(window.location.pathname === "/order"){
            currentTab = "Order"
        } else {
            currentTab = "Profile"
        }
        this.setState({ sideNavSelected: !sideNavSelected, activeTab: currentTab })
    }
    redirectToMyProfile = () => {
        window.location.href = `/`
    }
    redirectToSubUser = () => {
        window.location.href = `/subuser`
    }
    redirectToMyPreference = () => {
        window.location.href = `/preferences`
    }
    redirectToMyWallet = () => {
        window.location.href = `/wallet`
    }
    redirectToHome = () => {
        window.location.href = `/`
    }
    redirectToMyOrder = () => {
        window.location.href = `/order`
    }

    render() {
        const { userName, userProfileId, mobileNumber } = this.props
        const { sideNavSelected, activeTab } = this.state
        return (
            <div>
                <header className="header-warp">
                    <div className="header">
                        <a className="col-md-2" onClick={this.redirectToHome}><img alt="" src={logo} /></a>
                        <Link className="text-secondary col-md-2 home" to="/"><img width="15px" className="pb-1" alt="" src={home} /> Home</Link>
                        {/* <span className="float-right pl-2">{userName}</span> */}
                        <span></span>
                        <div className="float_right avatar">
                            <div className="avatar-logo">
                                <Avatar />
                            </div>
                        </div>
                        <span className="side-bar-menu" onClick={this.sidenavSelect}>&#9776;</span>
                    </div>
                </header>

                { sideNavSelected &&
                    <div className="side-nav">
                        <ul className="nav-link">
                            <li className="profile">
                                <Avatar />
                                <div className="userData">
                                    <div className="userName">
                                        <h6> <UserGreeting user={userName} /></h6>
                                    </div>
                                    {mobileNumber &&
                                      <div className="mobile">
                                        {mobileNumber}
                                    </div>
                                     } 
                                </div>
                            </li>
                            <li className="my-profile">
                                <a onClick={this.redirectToMyProfile}>
                                    <span className={activeTab === "Profile" ? "active-title" : "inactive-title"}> My Profile </span>
                                    <FaceIcon style={activeTab === "Profile" ? { color: "#b66dff" } : { color: "#bba8bff5" }} />
                                </a>
                            </li>
                            <li className="my-subUser">
                                <a onClick={this.redirectToSubUser}>
                                    <span className={activeTab === "Subuser" ? "active-title" : "inactive-title"}> My Sub Users </span>
                                    <SupervisorAccountIcon style={activeTab === "Subuser" ? { color: "#b66dff" } : { color: "#bba8bff5" }} />
                                </a>
                            </li>

                            <li className="my-preference">
                                <a onClick={this.redirectToMyPreference}>
                                    <span className={activeTab === "Preferences" ? "active-title" : "inactive-title"}> My Preferences </span>
                                    <TouchAppIcon style={activeTab === "Preferences" ? { color: "#b66dff" } : { color: "#bba8bff5" }} />
                                </a>
                            </li>

                            <li className="my-wallet">
                                <a onClick={this.redirectToMyWallet}>
                                    <span className={activeTab === "Wallet" ? "active-title" : "inactive-title"}> My Wallets </span>
                                    <AccountBalanceWalletIcon style={activeTab === "Wallet" ? { color: "#b66dff" } : { color: "#bba8bff5" }} />
                                </a>
                            </li>
                            <li className="my-purchase">
                                <a onClick={this.redirectToMyOrder}>
                                    <span className={activeTab === "Order" ? "active-title" : "inactive-title"}> My Orders </span>
                                    <ShoppingBasket style={activeTab === "Order" ? { color: "#b66dff" } : { color: "#bba8bff5" }} />
                                </a>
                            </li>

                            <li className="my-event">
                                <a onClick={this.redirectToMyProfile}>
                                    <span className={activeTab === "Event" ? "active-title" : "inactive-title"}> My Events </span>
                                    <EventIcon style={activeTab === "Event" ? { color: "#b66dff" } : { color: "#bba8bff5" }} />
                                </a>
                            </li>
                            <li className="my-event mb-4">
                                <a>
                                    <KeycloakLogout className="width_15" />
                                    <ExitToAppIcon style={{ color: "#bba8bff5" }} />
                                </a>
                            </li>
                        </ul>
                        <div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}


export default Container(Header)