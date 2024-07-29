import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import { isValid, submit, getFormValues } from "redux-form";
import { getCrudActionsForDispatch } from "Auth/Common/helpers";
import { registrationForm } from "../consts";
import * as actions from "./actions";

const mapStateToProps = (state) => {
  const { magicLink } = state.userProfile;
  const { getMagicLinkDetails} = magicLink;
  const createFormIsValid = isValid(registrationForm)(state);
  const createFormValues = getFormValues(registrationForm)(state);
  return {
    createFormValues,
    getMagicLinkDetails,
    magicLinkDetails: get(getMagicLinkDetails, "data", {}),
    magicLinkDetailsMessage: get(
      getMagicLinkDetails.data,
      "statusMessage.description",
      ""
    ),
    magicLinkDetailsErr: get(
      getMagicLinkDetails.error,
      "statusMessage.description",
      ""
    )
  };
};

const mapDispatchToProps = (dispatch) => {
  const crudActionsWithDispatch = getCrudActionsForDispatch(actions, dispatch);
  const otherActions = bindActionCreators({ ...actions, submit }, dispatch);
  return {
    ...crudActionsWithDispatch,
    ...otherActions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
