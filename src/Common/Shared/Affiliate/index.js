import React, { Component } from "react"
import WidgetPanel from "./Widget"
import Container from "App/Components"
import CMSAPI from "api/cmsApi"
import _has from "lodash/has"
import moment from "moment/min/moment.min"
import { API_DATE_FORMAT, VIEW_DATE_FORMAT } from "consts"

class WidgetWrapper extends Component {
  state={
    content: null,
  }

  componentWillMount() {
    const {
      query,
    } = this.props.location

    if (_has(query, "origin")) {
      this.props.setOrigin(query.origin)
    }

    if (_has(query, "destination")) {
      this.props.setDestination(query.destination)
    }

    if (_has(query, "travel_date")) {
      const startDate = query.travel_date ? moment(query.travel_date, API_DATE_FORMAT).format(VIEW_DATE_FORMAT) : null
      this.props.setTravelDate(startDate)
    }

    if (_has(query, "return_date")) {
      const endDate = query.return_date ? moment(query.return_date, API_DATE_FORMAT).format(VIEW_DATE_FORMAT) : null
      this.props.setReturnDate(endDate)
    }

    if (_has(query, "class_type")) {
      this.props.setClassType(query.class_type)
    }

    if (_has(query, "passenger_type")) {
      this.props.setPassengersCount(query.passenger_type, query.count)
    }
  }

  componentDidMount() {
    CMSAPI("homepage_hero_section")
    .then((data) => {
      if (data.Content) {
        let content

        try {
          content = JSON.parse(data.Content.Value)
        } catch (e) {
          content = null
        }

        this.setState({ content })
      }
    })
  }

  render() {
    const {
      content,
    } = this.state
    const image = content ? content.heroImage : {}
    const { query, pathname } = this.props.location

    return (
      <div className="viewport">
        <div className="mobile">
          <WidgetPanel image={image} query={query} pathname={pathname} />
        </div>
      </div>
    )
  }
}

export default Container(WidgetWrapper)
