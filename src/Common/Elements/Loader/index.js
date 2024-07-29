import React from "react"
import "./styles.css"

const Loader = ({ primaryClass, secondaryClas }) => (
  <div className={`${primaryClass}`}>
    <div className={`${secondaryClas ? `spinner-border mt-3 ${secondaryClas}` : "spinner-border btn-spinner-border"} loader`}>
    </div>
  </div>
)

export default Loader