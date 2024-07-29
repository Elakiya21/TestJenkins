import React from "react"

const Radio = ({ value, checked, name, id, onChange, children, disabled, ...props, title }) => (
  <label htmlFor={id}>
    <input
      {...props}
      type="radio"
      id={id}
      name={name}
      checked={checked}
      disabled={disabled}
      value={value}
      onChange={onChange}
    />
    <span>{title}</span>
    <span className="p-2">{children}</span>
  </label>
)

export default Radio
