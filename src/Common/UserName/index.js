import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { startCase } from 'lodash';

const BASE_URL = process.env.REACT_APP_PROFILE_API_URL;
class UserName extends React.Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      userId: props.userId,
      isLoading: false,
    };
  }

  getUserInfo() {
    this.setState({
      isLoading: true,
      value: '',
    });

    const { userId } = this.state;
    if (userId == null) return;
    axios
      .get(`${BASE_URL}/sso-user-retrieval/api/v1.0.0/users?id=${userId}`)
      .then(response => {
        const data = response.data.userInfo || [];

        if (data.length > 0) {
          const name = startCase(data[0].userName);
          if (this.isMounted) {
            this.setState({
              isLoading: false,
              value: name,
            });
          }
        }
      })
      .catch(error => {
        if (this.isMounted) {
          this.setState({
            isLoading: false,
            value: '',
            error,
          });
        }
      })
      .finally(() => {
        // always executed
      });
  }

  componentDidMount() {
    this.getUserInfo();
    this.isMounted = true;
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userId !== prevState.userId) {
      return { userId: nextProps.userId };
    }
    return null;
  }

  componentDidUpdate(prevProps /* , prevState */) {
    if (prevProps.userId !== this.props.userId) {
      this.state = { userId: this.props.userId };
      this.getUserInfo();
    }
  }

  render() {
    const { value } = this.state;

    return <React.Fragment>{value}</React.Fragment>;
  }
}

UserName.propTypes = {
  userId: PropTypes.string,
};

export default UserName;
