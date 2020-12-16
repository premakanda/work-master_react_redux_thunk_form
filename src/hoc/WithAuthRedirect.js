import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

let mapStateToPropsRedirect = state => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export const WithAuthRedirect = (Component) => {
    class RedirectClass extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to={"./login"} />
            return <Component {...this.props} />
        }
    }
    return connect(mapStateToPropsRedirect)(RedirectClass);
}