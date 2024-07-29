import React from "react"
import Input from "Common/Elements/Input"

const RenderInputField = ({
  input,
  label,
  type,
  maxLength,
  placeholder,
  meta,
  actualFieldName,
  change,
}) => (
  <Input
    {...input}
    onChange={
      (event) => {
        if (type === "file") {
          const files = event.target.files
          const reader = new FileReader()
          reader.readAsDataURL(files[0])
          change(actualFieldName, files[0])
        }
      }
    }
    onBlur={() => {
    }}
    onFocus={() => {
    }}
    label={label}
    maxLength={maxLength}
    type={type}
    isInvalid={(meta.touched && (!meta.active) && !!meta.error)}
    error={meta.error}
    placeholder={placeholder}
  />
)

export default RenderInputField
