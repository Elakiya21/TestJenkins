import React from "react"

const Checkbox = ({ checked, name, label, onChange, className, wrapperClassName, disabled, ...props }) => (
  <div className={wrapperClassName}>
    <input
      {...props}
      id={name}
      type="checkbox"
      onChange={onChange}
      checked={checked}
      disabled={disabled}
    />
    <label htmlFor={name}><span className="p-2">{label}</span></label>
  </div>
  )

export default Checkbox
