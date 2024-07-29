import React from "react"
import Radio from "Common/Elements/Radio"

const RenderRadioFields = ({ input, placeholder, options, meta, className, label }) => {
  const { value } = input
  return (
    <div className="mb-3">
      {label && <label htmlFor={label}>{label}</label>}
      <div>
        {options.map((option) => {
          const { name, type } = option
          return (
            <Radio
              {...input}
              key={type}
              placeholder={placeholder}
              className={className}
              isInvalid={meta.touched && !meta.active && !!meta.error}
              error={meta.error}
              value={value}
              checked={value === type}
              onBlur={e => e.preventDefault()}
              onChange={() => input.onChange(type)}
            >
              {name}
            </Radio>
          )
        })}
      </div>
    </div>
  )
}
export default RenderRadioFields
