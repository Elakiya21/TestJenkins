import React from "react"
import get from "lodash/get"
import "./styles.css";

const Select = (props) => {
  const { list, placeholder, defaultValue, label, name, isInvalid, error, className, selectClassName, customId, customName, required, isName } = props
  let classValues = `fm-in`;
  if (selectClassName) {
    classValues = `${classValues} ${selectClassName}`;
  }
  const selectProps = {
    ...props,
    className: classValues,
  }
  return (
    <div className={"mb-3"}>
      {label && <label htmlFor={name}>{label}{required && <span className="text-danger">*</span>}</label>}
      <select {...selectProps} className={`form-select ${className}`}>
        <option value="" hidden selected>{placeholder}</option>
        {list && list.map(data => {
           const value = isName ? get(data, customName, "") : get(data, customId, "");
         return(
           value === defaultValue
          ? <option selected value={value} key={get(data, customId, "") || data.id}>{get(data, customName, "") || data.name}</option>
          : <option value={value} key={get(data, customId, "") || data.id}>{get(data, customName, "") ||data.name}</option>
         )
        })}
      </select>
      {isInvalid && <small className="text-danger">{error}</small>}
    </div>
  )
}

export default Select
