import React from "react"
import classnames from "classnames"
import "./style.css"

const Toggle = (props) => {
  const { checked, name, label, onChange, className, wrapperClassName, disabled, defaultChecked, } = props
  return (
    <label htmlFor={name} role="switch">
     <input
      type="checkbox"
      onChange={onChange}
      checked={checked}
      value={checked ? true : false}
      className="form-check-input"
     // disabled={disabled}
    />
    <span className={`${className} p-2 slider`}></span>
  </label>
  )
}

export default Toggle
