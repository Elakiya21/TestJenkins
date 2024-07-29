import React, { Component } from "react"
import "./styles.css"
import { isEmpty } from "lodash"
class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.name,
    }
  }

  onClearInput = () => {
    const { onChange } = this.props
    if (onChange) onChange("")
  }

  render() {
    const {
      name,
      type,
      label,
      error,
      isInvalid,
      hasPlaceholder,
      renderInput,
      value,
      subTitle,
      className,
      readOnly,
      disabled,
      inputClassName,
      required,
      inputMode,
      autocomplete,
      ...props
    } = this.props
    const inputProps = {
      ...props,
      className: `form-control ${name} ${className}`,
      value,
      ref: (input) => {
        this.input = input
      },
      type: type || "text",
      id: this.state.id,
      readOnly,
      disabled,
      autocomplete
    }
    if(!isEmpty(inputMode))
      inputProps.inputMode = inputMode
    return (
      <div className={`${inputClassName ? inputClassName : "mb-3"}`}>
        {label && <label htmlFor={name}>{label}{required && <span className="text-danger">*</span>}</label>}
        {/* <div class={inputClassName}> */}
          <input {...inputProps} />
          {isInvalid && <div className="text-start text-danger">{error}</div>}
          {/* {isInvalid && <small className="text-danger">{error}</small>} */}
        {/* </div> */}
      </div>

    )
  }
}

export default Input
