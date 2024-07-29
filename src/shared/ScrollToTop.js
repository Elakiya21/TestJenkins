import React from "react"
import { reloadWebengage } from "trackingToolUtils/webengage"

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
      reloadWebengage()
    }
  }

  render() {
    return this.props.children
  }
}

export default ScrollToTop
