import React from "react"
import Autosuggest from "Common/Elements/Autosuggest"

const RenderAutosuggestField = ({
  input,
  label,
  defaultValue,
  list,
  meta,
  search,
  minLengthForApiCall,
  placeholder,
  customName,
  className,
  keepJson,
  type,
}) => (
  <Autosuggest
    input={input}
    list={list}
    placeholder={placeholder}
    defaultValue={defaultValue}
    label={label}
    isInvalid={meta.touched && !meta.active && !!meta.error}
    error={meta.error}
    search={search}
    minLengthForApiCall={minLengthForApiCall}
    customName={customName}
    className={className}
    keepJson={keepJson}
    type={type}
  />
)

export default RenderAutosuggestField
