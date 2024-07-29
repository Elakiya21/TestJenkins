import React, { Component } from "react"
import { Link } from "react-router-dom"
import Container from "StoreFront/MyAccount/Components"
import hamburger from "images/Common/hamburger.svg"
import { getDeviceInfo } from "shared/lib/mobileDetect"
import history from "shared/history"
import classNames from "classnames"

import "./style.css"

class SideNav extends Component {
  state = {
    showdetails: false,
    showWallets: false,
    showOrders: false,
    showBookings: false,
    showEvents: false,
    showSurveys: false,
    showGiftRecveived: false,
    showHelpCentre: false,
    isInitilize: false,
    myAccount: `/profile`,
    mySubUser: `/subuser`,
    myPreferences: `/preferences`,
    myWallets: `/`,
    myPurchases: `/order`,
    myEvents: `/events`,
    giftCard: `/gift-card`,
    perks: `/perks`,
    products: `/products`,
    cashCards: "/cash-cards"
  }

  redirectToWallet = () => {
     window.location.href=`${this.state.myWallets}`
  }
  redirectToOrder = () => {
    window.location.href=`${this.state.myPurchases}`
 }
 redirectToBookings = () => {
  window.location.href=`${this.state.myPreferences}`
}
redirectToEvents = () => {
  //window.location.href=`${this.state.myWallets}`
}
redirectToSurveys = () => {
  window.location.href=`${this.state.myPreferences}`
}
redirectToReceived = () => {
  //window.location.href=`${this.state.myWallets}`
}
redirectToMyDetails = () => {
   const{storeTerminalId} = this.props
  window.location.href=`/${storeTerminalId}/myaccount/${this.state.myAccount}`
}
redirectToContactUs = () => {
   const{storeTerminalId} = this.props
  window.location.href=`/${storeTerminalId}/myaccount/contact-us`
}
redirectToGiftCard = () => {
   const{storeTerminalId} = this.props
   window.location.href=`/${storeTerminalId}/myaccount/${this.state.giftCard}`
}
redirectToPerks = () => {
   const{storeTerminalId} = this.props
   window.location.href=`/${storeTerminalId}/myaccount/${this.state.perks}`
}
redirectToProducts = () => {
   const{storeTerminalId} = this.props
   window.location.href=`/${storeTerminalId}/myaccount/${this.state.products}`
}
redirectToCashCards = () => {
   const{storeTerminalId} = this.props
   window.location.href=`/${storeTerminalId}/myaccount/${this.state.cashCards}`
}
redirectToGiftsReceived = () => {
   const{storeTerminalId} = this.props
   window.location.href=`/${storeTerminalId}/myaccount/gift-received`
 
}
redirectToMyCenter = () => {
  //window.location.href=`${this.state.myWallets}`
}
handleCloseTable = () => {
   this.setState({showdetails: false, showWallets: false, showOrders: false, showBookings: false, showEvents: false, showSurveys: false, showHelpCentre: false, showGiftRecveived: false});
}
handledetails = () =>{
   this.handleCloseTable()
   this.setState({ showdetails: !this.state.showdetails })}

handleWallets = () =>{
   this.handleCloseTable()
   this.setState({ showWallets: true })
   const{setWalletDetails, storeTerminalId} = this.props
   setWalletDetails(storeTerminalId)
   window.location.href=`/${storeTerminalId}/myaccount/wallet`
   }
   
handleOrders = () =>{
   this.handleCloseTable()
   this.setState({ showOrders: !this.state.showOrders })}

handleBookings = () =>{
   this.handleCloseTable()
   this.setState({ showBookings: !this.state.showBookings})}
  
handleEvents = () =>{
   this.handleCloseTable()
  // this.setState({ showEvents: !this.state.showEvents })
}

handleSurveys = () =>{
   this.handleCloseTable()
//   this.setState({ showSurveys: !this.state.showSurveys })
}

handleHelpCentre = () =>{
   this.handleCloseTable()
   this.setState({ showHelpCentre: !this.state.showHelpCentre})}
  
   handleGiftRecveived = () =>{
   this.handleCloseTable()
   this.setState({ showGiftRecveived: !this.state.showGiftRecveived })
}

   handleWall = (data) => {
    const{setWalletDetails, storeTerminalId} = this.props
    setWalletDetails(data)
    window.location.href=`/${storeTerminalId}/myaccount`
   }
   
   handleWallet = (data) => {
      return (
       <div>
       <button class="tablinks bg-wl tab-dasktop" onClick={()=>this.handleWall(data)}>{data.walletName}</button>
       <button class="tablinks bg-wl tab-mobile"><a onClick={()=>this.handleWall(data)}>{data.walletName}</a></button>
      </div>
      )
    }

  render() {
    const { isMobile } = getDeviceInfo()
    const pathName = location.pathname
    const {isInitilize, showdetails, showWallets, showBookings, showEvents, showGiftRecveived, showOrders, showHelpCentre, showSurveys } = this.state
    const {
      myWallet,
      myOrder,
      myBookings,
      myEvents,
      mySurvey,
      receivedItem,
      myDetails,
      helpCenter,
      myProfile,
      showMyProfile,
      showMyOrder,
      myPerks,
      myProducts,
      myRGifts,
      showMyWallet,
      HelpCentre,
      contactUs,
      walletDetailsList,
      storeTerminalId,
      myCashCards
    } = this.props || ""
    if(!isInitilize){
       this.setState({showdetails: showMyProfile, showOrders: showMyOrder, showWallets: showMyWallet , showHelpCentre: HelpCentre,  isInitilize: true})
    }
    return (
             <div class="account-tab-left">
                  <div class="set">
                       <a class={`tab-link ${showWallets ? 'active' : ''}`} onClick={this.handleWallets}>Wallets<span class="a-icon"></span></a>
                       {showWallets &&
                       <div></div>
                       //   <button class={`tablinks bg-w5 tab-dasktop ${showWallets ? 'active' : ''} `} onClick={this.redirectToGiftCard}>My Wallets</button>
                      //   <div class="tab-content" style={{ display: 'block' }}>
                     //       {walletDetailsList && walletDetailsList.map(data => this.handleWallet(data))}
                    //    </div>
                  }
                  </div>
                  <div class="set">
                     <a  class={`tab-link ${showOrders ? 'active' : ''}`} onClick={this.handleOrders}>Orders <span class="a-icon"></span></a>
                     {showOrders &&
                     <div class="tab-content" style={{ display: 'block' }}>
                        {/* <button class={`tablinks bg-1 tab-dasktop ${myPerks ? 'active' : ''} `} onClick={this.redirectToPerks}>Perks</button> */}
                        <button class={`tablinks bg-2 tab-dasktop ${myOrder ? 'active' : ''} `} onClick={this.redirectToGiftCard}>Vouchers</button>
                        {/* <button class="tablinks bg-w3 tab-dasktop" onclick="openCity(event, 'orders-2')">Products</button> */}
                        <button class={`tablinks bg-w6 tab-dasktop ${myCashCards ? 'active' : ''} `} onClick={this.redirectToCashCards}>Cash Cards</button>
                        <button class={`tablinks bg-3 tab-dasktop ${myProducts ? 'active' : ''} `} onClick={this.redirectToProducts}>Products</button>
                        {/* <button class="tablinks bg-4 tab-dasktop" onclick="openCity(event, 'orders-2')">Hampers</button> */}
                        {/* <button class="tablinks bg-5 tab-dasktop" onclick="openCity(event, 'orders-4')">Flights</button> */}
                        {/* <button class="tablinks bg-6 tab-dasktop" onclick="openCity(event, 'orders-5')">Experiences</button> */}
                      </div>}
                  </div>
                  {/* <div class="set">
                     <a  class={`tab-link ${showBookings ? 'active' : ''}`} onClick={this.handleBookings}>My Bookings <span class="a-icon"></span></a>
                     {showBookings &&
                     <div class="tab-content" style={{ display: 'block' }}>
                        <button class="tablinks bg-w2 tab-dasktop" onclick="openCity(event, 'bookings-1')">Flights</button>
                        <button class="tablinks bg-w3 tab-dasktop" onclick="openCity(event, 'bookings-2')">Hotels</button>
                        <button class="tablinks bg-w4 tab-dasktop" onclick="openCity(event, 'bookings-3')">Experiences</button>
                      </div>}
                  </div> */}
                  {/* <div class="set">
                     <a  class={`tab-link ${showEvents ? 'active' : ''}`} onClick={this.handleEvents}>My Events <span class="a-icon"></span></a> */}
                     {/* {showEvents &&
                     <div class="tab-content" style={{ display: 'block' }}>
                        <button class="tablinks bg-w2 tab-dasktop" onclick="openCity(event, 'events-1')">Events</button>
                        <button class="tablinks bg-w3 tab-dasktop" onclick="openCity(event, 'events-2')">Events</button>
                      </div>} */}
                  {/* </div> */}
                  {/* <div class="set">
                     <a  class={`tab-link ${showSurveys ? 'active' : ''}`} onClick={this.handleSurveys}>My Surveys <span class="a-icon"></span></a> */}
                     {/* {showSurveys &&
                     <div class="tab-content" style={{ display: 'block' }}>
                        <button class="tablinks bg-w2 tab-dasktop" onclick="openCity(event, 'surveys-1')">Surveys</button>
                        <button class="tablinks bg-w3 tab-dasktop" onclick="openCity(event, 'surveys-2')">Surveys</button>
                      </div>} */}
                  {/* </div> */}
                  <div class="set">
                     <a  class={`tab-link ${showGiftRecveived ? 'active' : ''}`} onClick={this.handleGiftRecveived}>Rewards <span class="a-icon"></span></a>
                     {showGiftRecveived &&
                     <div class="tab-content" style={{ display: 'block' }}>
                        <button class={`tablinks bg-w2 tab-dasktop ${myRGifts ? 'active' : ''} `} onClick={this.redirectToGiftsReceived}>Vouchers</button>
                        {/* <button class="tablinks bg-w3 tab-dasktop" onclick="openCity(event, 'gifts-2')">Gifts</button> */}
                      </div>}
                  </div> 
                  <div class="set">
                     <a  class={`tab-link ${showdetails ? 'active' : ''}`} onClick={this.handledetails}>Details <span class="a-icon"></span></a>
                     {(showdetails) &&    
                     <div class="tab-content" style={{ display: 'block' }}>
                        <button class={`tablinks bg-w5 tab-dasktop ${myProfile ? 'active' : ''} `}onClick={this.redirectToMyDetails}>Profile</button>
                        {/* <button class="tablinks bg-w6 tab-dasktop" onclick="openCity(event, 'details-2')">Payment Methods</button>
                        <button class="tablinks bg-w7 tab-dasktop" onclick="openCity(event, 'details-3')">Security Details</button>
                        <button class="tablinks bg-w8 tab-dasktop" onclick="openCity(event, 'details-4')">Preferences</button>
                        <button class="tablinks bg-w9 tab-dasktop" onclick="openCity(event, 'details-5')">Travellers</button> */}
                      </div>}
                   </div>
                  <div class="set">
                     <a class={`tab-link ${showHelpCentre ? 'active' : ''}`}  onClick={this.handleHelpCentre}>Help Centre <span class="a-icon"></span></a>
                     {showHelpCentre &&
                     <div class="tab-content" style={{ display: 'block' }}>
                        <button class={`tablinks bg-w11 tab-dasktop ${contactUs ? 'active' : ''} `} onClick={this.redirectToContactUs}>Contact Us</button>
                        {/* <button class="tablinks bg-w12 tab-dasktop" onclick="openCity(event, 'help-2')">My Messages</button> */}
                        </div>}
                  </div>
               </div>
        // </div>
    )
  }
}

export default SideNav
