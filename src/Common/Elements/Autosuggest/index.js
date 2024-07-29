import React from "react"
import get from "lodash/get"
import Input from "../Input"

export default class Autosuggest extends React.Component {
  state = {
    text: "",
    showSuggestions: false,
    initilize: false,
  }

  initilizeValue() {
    const { defaultValue, keepJson, customName } = this.props
    const { text, showSuggestions, initilize } = this.state
    this.setState({ initilize: true })
    if (defaultValue) {
      this.setState({ initilize: true })
      this.suggestionSelected(defaultValue, customName)
    }
  }

  searchSuggestions = (e) => {
    const { value } = e.target
    const { minLengthForApiCall, type } = this.props
    if (value.length >= minLengthForApiCall) {
      this.props.search({q:value, type: type})
      this.setState({ text: value, showSuggestions: true })
    } else {
      this.setState({ text: value, showSuggestions: false })
    }
  }

  renderSuggestions = (list) => {
    const { customName } = this.props
    if (list.length === 0) {
      return null
    }
    return (
      <ul className="position-relative">
        {list.map(item => <li key={item.id} onClick={() => this.suggestionSelected(item, customName)}>{get(item, customName, "")}</li>)}
      </ul>
    )
  }

  suggestionSelected = (value, customName) => {
    const { keepJson } = this.props
    this.setState({
      text: get(value, customName, ""),
      showSuggestions: false,
    })
    if (value) {
      if (keepJson) {
        this.props.input.onChange(value)
      } else {
        this.props.input.onChange(value.id)
      }
    }
  }

  render() {
    const { list, label, placeholder, name, className, subclassName, wrapclassName, isMandatory, readonly, isInvalid, error } = this.props
    const { text, initilize } = this.state
    if (!initilize) {
      this.initilizeValue()
    }
    const selectProps = {
      className: `search-img-style ${subclassName}`,
    }
    const wrapClassProps = {
      className: ` mb-3 as ${wrapclassName}`,
    }
    return (
      <div className={`as-wrap w-100 ${className}`}>
        {label && <label htmlFor={name}>{label}{isMandatory && <span className="mand-field">*</span>}</label>}
        <div {...wrapClassProps}>
          <Input className={`m-0 ${subclassName}`} readOnly={readonly} value={this.state.text} placeholder={placeholder} onChange={this.searchSuggestions} searchIcon="true" type="text" />
          <div className="list position-absolute">
            {this.state.showSuggestions && this.renderSuggestions(list)}
          </div>
        </div>
        {isInvalid && <small className="text-danger">{error}</small>}
      </div>
    )
  }
}
