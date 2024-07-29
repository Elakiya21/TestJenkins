import React from "react"
import Checkbox from "Common/Elements/Checkbox"

const RenderCheckbox = ({ input, label, checked, className, wrapperClassName }) => (
  <Checkbox
    {...input}
    label={label}
    checked={checked}
    className={className}
    wrapperClassName={wrapperClassName}
  />
)

export default RenderCheckbox
