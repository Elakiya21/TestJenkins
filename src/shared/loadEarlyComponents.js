
function loadEarlyComponents(preloadComp) {
  if (!preloadComp || preloadComp.length === 0) {
    return
  }
  Promise.all(preloadComp.map(f => f())).then(() => {
    this.setState({
      preLoadedComp: true,
    })
  })
}
export default loadEarlyComponents
