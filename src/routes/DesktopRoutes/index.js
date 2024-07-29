import React from "react"
import { Switch } from "react-router"

import DefaultLayout from "App/DumbComponents/Desktop"

const Routes = props => (
  <Switch>
    <DefaultLayout {...props} />
  </Switch>
)

export default Routes
