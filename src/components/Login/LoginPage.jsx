import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {loginMeThunk} from "../../redux/auth-reducer";
import style from './Login.module.css';
import LoginForm from '../Login/AddLoginForm/AddLoginForm';
import {Redirect} from 'react-router';

const LoginPage = props => {
    const login = (formData) => {
        props.loginMeThunk(formData);
    }
    if (props.isAuth) {
        return <Redirect to={"/"}/>
    }
    return (
        <div className={`${style.color} ${style.login}`}>
            <div className={style.loginForm}>
                <h2>ВХОД</h2>
                <LoginForm onSubmit={login}/>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default compose(connect(mapStateToProps, {loginMeThunk}))(LoginPage)





