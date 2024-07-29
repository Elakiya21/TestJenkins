import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Container from "../Components";
import Button from "Common/Elements/Button";
import IntlTelInput from "react-intl-tel-input";
import isEmpty from "lodash/isEmpty";
import { registrationForm } from "../consts";
import queryString from "query-string";
import TermsAndPrivacy from "../../Common/DumbComponents/TermsAndPrivacy";
import RenderInputField from "Common/FormFields/RenderInputField";
const userAlreadyExistErr = 'User profile already exists with given phone number'
class UnknownUserMagicLinkPage extends Component {
  state = {
    showErr: false,
    showMsg: "",
  };

  componentDidMount = () => {
    const { getMagicLinkDetails, dispatch, replace, initialize, match, history } =this.props;
    const { id } = match.params;
    dispatch(initialize(registrationForm, {}));
    let param = queryString.parse(location.search);
    let deviceId = param && param.device_id || ""
    getMagicLinkDetails.request({id: id, history: history, deviceId: deviceId, unKnownUser: true})
  };


  render() {
    return (
      <div className="container auth-self-registration pt-5">
        
      </div>
    );
  }
}
const form = reduxForm({
  form: registrationForm,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: () => {},
})(UnknownUserMagicLinkPage);

export default Container(form);
