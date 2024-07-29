export function logUrlChangesToGTM() {
  const {
    pathname, search, href,
  } = window.location

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    "url-update": { pathname, search, href },
  })
}

export function logPromoCodeToGA(
  promoCodeStatus,
  product,
  promoCodeValue,
  totalAmountBeforeDiscount,
  totalAmountAfterDiscount,
  promoCodeDiscount
) {
  // GA tracking
  window.dataLayer = window.dataLayer || []
  if (promoCodeStatus === 1) { // Promo code applied
    window.dataLayer.push({
      promoCode: promoCodeValue,
      message: `Congrats! You just saved ₹ ${promoCodeDiscount / 100} on your booking`,
      discount: promoCodeDiscount / 100,
      totalAmountBeforeDiscount: totalAmountBeforeDiscount / 100,
      totalAmountAfterDiscount: totalAmountAfterDiscount / 100,
      product,
      event: "promoCodeApplied",
    })
  } else if (promoCodeStatus === 2) { // Promo removal
    window.dataLayer.push({
      promoCode: promoCodeValue,
      product,
      event: "promoCodeRemoved",
    })
  } else if (promoCodeStatus === 3) { // Promo invalid
    window.dataLayer.push({
      promoCode: promoCodeValue,
      product,
      event: "promoCodeInvalid",
    })
  } else {  // Promo not applicable
    window.dataLayer.push({
      promoCode: promoCodeValue,
      product,
      event: "promoCodeNotApplicable",
    })
  }
}

export function logPaybackToGA(paybackStatus, product, pointsAvailable) {
  // GA tracking
  window.dataLayer = window.dataLayer || []
  if (paybackStatus) { // Payback applied
    window.dataLayer.push({
      message: "PAYBACK card applied",
      product,
      pointsAvailable,
      event: "paybackApplied",
    })
  } else { // Payback removal
    window.dataLayer.push({
      message: "",
      product,
      pointsAvailable: "",
      event: "paybackRemoved",
    })
  }
}
