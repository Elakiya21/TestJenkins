import React from "react"
import Select from "Common/Elements/Select"

const RenderSelectField = ({
  input,
  label,
  defaultValue,
  list,
  set,
  meta,
  placeholder,
  className,
  selectClassName,
  customId,
  customName,
  isName,
  required,
  disabled,
}) => {
  const onChange = (code) => {
    if (set) set(code)
    input.onChange(code)
  }
  return (
    <Select
      list={list}
      className={className}
      selectClassName={selectClassName}
      placeholder={placeholder}
      defaultValue={defaultValue}
      label={label}
      isInvalid={meta.touched && !meta.active && !!meta.error}
      error={meta.error}
      customId={customId}
      customName={customName}
      isName={isName}
      disabled={disabled}
      required={required}
      onChange={(data) => {
        onChange(data)
      }}
    />
  )
}

export default RenderSelectField
