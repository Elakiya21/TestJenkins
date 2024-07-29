import React from "react"
import Input from "Common/Elements/Input"
import "./intlTelInput.css"

const RenderInputField = ({
  input,
  set,
  label,
  type,
  maxLength,
  placeholder,
  meta,
  submitOnEnter, //whether to submit value on enter key press
  actionOnEnter, //what action to be taken on enter key press
  subTitle, // This is used to show a text under the form field when there is no error - subHeader like
  title,
  className,
  readOnly,
  disabled,
  inputClassName,
  required,
  inputMode,
  autocomplete
}) => (
  <Input
    {...input}
    onChange={
      (event) => {
        const value = event.target ? event.target.value : event
        if ((maxLength && value.length <= maxLength) || !maxLength) {
          if (set) set(value)
          input.onChange(event)
        }
        if(inputMode == "numeric"){
          event.target.value = event.target.value.replace(/[^\d]/g,'');
          input.onChange(event)
        }
      }
    }
    onBlur={(event) => {
      const { target } = event
      const { value } = target
      target.value = value.trim()

      if (input.onBlur) input.onBlur(event)
    }}
    onKeyUp={(event) => {
      const { target } = event
      const { value } = target
      const newValue = value.replace(/\s\s+/g, " ")
      if (newValue !== value) {
        const oldLength = value.length
        const oldIdx = target.selectionStart
        const newIdx = Math.max(0, newValue.length - oldLength + oldIdx)

        target.value = newValue

        target.selectionStart = newIdx
        target.selectionEnd = newIdx
      }

      if (input.onKeyUp) input.onKeyUp(event)
      //submit value on Enter key press
      if (submitOnEnter && event.keyCode === 13) {
        actionOnEnter()
      }
    }}
    onFocus={(event) => {
      if (input.onFocus) input.onFocus(event)
    }}
    label={label}
    maxLength={maxLength}
    type={type}
    isInvalid={(meta.touched && (!meta.active || submitOnEnter) && !!meta.error)}
    error={meta.error}
    placeholder={placeholder}
    subTitle={subTitle}
    title={title}
    className={className}
    inputClassName={inputClassName}
    disabled={disabled}
    readOnly={readOnly}
    required={required}
    inputMode={inputMode}
    autocomplete={autocomplete}
  />
)

export default RenderInputField
