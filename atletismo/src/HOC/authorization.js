import React from 'react';
import {connect} from 'react-redux';

const Authorization = (allowedRoles) =>
  (WrappedComponent) =>
{

  class WithAuthorization extends React.Component {

    render() {
      const { userRole } = this.props;
      if (allowedRoles.includes(userRole)) {
        return <WrappedComponent {...this.props} />
      } else {
        return <h1>No page for you!</h1>
      }
    }
  }

  function mapStateToProps(state){
    return {
      userRole: state.userRole
    };
  }

  return connect(mapStateToProps)(WithAuthorization)

};

export default Authorization;
