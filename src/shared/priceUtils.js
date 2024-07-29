import { convertPrice } from "shared/helper"
const DEFAULT_CURRENCY = "INR"
const PRICE_SYMBOL = {
  INR: "\u20B9",
  USD: "\u0024",
}
export const kFormatter = num => num > 999 ? `${(num / 1000).toFixed(1)}k` : num

export const getFormattedPriceRange = (currentValue, exchangeRates, currency) => {
  if (currentValue[0] > 1000 || currentValue[1] > 1000) {
    const c0 = (convertPrice(currentValue[0], DEFAULT_CURRENCY, currency, exchangeRates) / 100).toFixed(0)
    const c1 = (convertPrice(currentValue[1], DEFAULT_CURRENCY, currency, exchangeRates) / 100).toFixed(0)
    return `${PRICE_SYMBOL[currency]} ${kFormatter(c0)} - ${PRICE_SYMBOL[currency]} ${kFormatter(c1)}`
  }
  return `${PRICE_SYMBOL[currency]} ${currentValue[0]} - ${PRICE_SYMBOL[currency]} ${currentValue[1]}`
}
