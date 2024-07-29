import React from "react"
import { Switch } from "react-router"
import DefaultAdaptiveLayout from "App/DumbComponents/Adaptive"
import ScrollToTop from "shared/ScrollToTop"
class AdaptiveRoutes extends React.Component {
  componentDidMount() {
    sessionStorage.removeItem("reduxPes")
  }
  render() {
    const propsAdaptive = this.props

    return (
      <ScrollToTop>
        <Switch>
            <DefaultAdaptiveLayout {...propsAdaptive} />
        </Switch>
      </ScrollToTop>

    )
  }
}

export default AdaptiveRoutes
