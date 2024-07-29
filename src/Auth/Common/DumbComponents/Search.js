import React, { Component } from "react"
import Input from "Common/Elements/Input"

class Search extends Component {
  handleSearch = (event) => {
    const { value } = event.target
    const { setSearchInput, getAll } = this.props
    if (!value) {
      setSearchInput("")
    } else {
      setSearchInput(value)
    }
    getAll()
  }
  render() {
    const { className } = this.props
    const selectProps = {
      className: `form-group pull-right ml-3 ${className}`,
    }
    return (
      <Input
        type="text"
        name="search"
        { ...selectProps}
        onChange={this.handleSearch}
        placeholder="Search"
      />
    )
  }
}

export default Search
