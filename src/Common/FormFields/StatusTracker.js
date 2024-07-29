import React, { Component } from "react"
import get from "lodash/get"
import Tracker from "Common/Elements/StatusTracker"

class StatusTracker extends Component {


  render() {
    const {
      list,
      status,
      name,
      disabled
    } = this.props
   
    return (
      <div>
        <Tracker
        disabled={disabled}
        status = {status}
        name = {name}
        list = {list}
        />
      </div>
    )
  }
}

export default StatusTracker
