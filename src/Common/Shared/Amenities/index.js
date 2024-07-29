import React, { Component } from "react"
import AmenitiesList from "Hotels/dumbComponents/Common/AmenitiesList"

class Amenities extends Component {
  state = { expanded: false }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { amenities, className, limit = 4, row = 2 } = this.props
    const { expanded } = this.state
    return (
      <div className={className}>
        <AmenitiesList
          all={expanded}
          row={row}
          amenities={amenities}
          limit={limit}
          className="adaptive_amenities"
        />
        {amenities.length > (row * limit) && <span>
          {!expanded && <a onClick={() => this.toggleExpand()}>More</a>}
          {expanded && <a onClick={() => this.toggleExpand()}>Less</a>}
        </span>}
      </div>
    )
  }
}

export default Amenities
