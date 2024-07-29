const criteoTracking = (email, data, TransactionID) => {
  const pathname = window.location.pathname
  window.dataLayer = window.dataLayer || []
  if (pathname === "/") {
    window.dataLayer.push({
      PageType: "HomePage",
      email,
    })
  } else if (pathname.includes("flights/search")) {
    window.dataLayer.push({
      PageType: "ListingPage",
      email,
      ProductIDList: data,
    })
  } else if (pathname.includes("your-flight")) {
    window.dataLayer.push({
      PageType: "BasketPage",
      email,
      ProductBasketProducts: data,
    })
  } else if (pathname.includes("flights/confirmation")) {
    window.dataLayer.push({
      PageType: "TransactionPage",
      email,
      ProductTransactionProducts: data,
      TransactionID,
    })
  }
}

export default criteoTracking
