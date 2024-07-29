import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as actions from "./actions"

const mapStateToProps = (state) => {
  const { pagination } = state
  return {
    pagination,
  }
}

const mapDispatchToProps = (dispatch) => {
  const otherActions = bindActionCreators({ ...actions }, dispatch)
  return {
    ...otherActions,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
