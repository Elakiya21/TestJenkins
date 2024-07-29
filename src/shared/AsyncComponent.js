import React from "react"

const AsyncComponentWrapper = (getComponent, Loader = null) => (
  class AsyncComponent extends React.Component {
    state = { Component: null }

    componentWillMount() {

    }

    componentDidMount() {
      /**
       * do not use this.isMounted. Its a reserved keyword
       * in react
       */
      this.isMountedComp = true
      if (!this.state.Component) {
        getComponent().then((Component) => {
          if (this.isMountedComp) {
            this.setState({ Component })
          }
        })
      }
    }

    componentWillUnmount() {
      this.isMountedComp = false
    }

    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      if (Loader) {
        return Loader
      }
      return null
    }
  }
)

export default AsyncComponentWrapper
