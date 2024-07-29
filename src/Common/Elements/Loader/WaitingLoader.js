import React from "react"

export const Loader = ({ primaryClass, secondaryClas }) => (
  <div className={`rechecking ${primaryClass}`}>
    <span className={`bullet ${secondaryClas}`}>&bull;</span>
    <span className={`bullet ${secondaryClas}`}>&bull;</span>
    <span className={`bullet ${secondaryClas}`}>&bull;</span>
  </div>
)

const WaitingLoader = ({ label }) => (
  <div className="checking_fare_loader">
    {label || "Rechecking Fares"}
    <Loader />
  </div>
)

export default WaitingLoader
