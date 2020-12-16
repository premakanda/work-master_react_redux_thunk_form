import React from 'react'
import {createField, Input} from '../../common/FormsControls/FormsControls';
import {requairedField} from '../../../utils/validators/validators';
import {Field, reduxForm} from "redux-form";
import style from '../../common/FormsControls/FormsControls.module.css';

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {error && <span className={style.formSummaryError}>
                {error}
            </span>}
            {createField("username", "username", [requairedField], Input)}
            {createField("Password", "password", [requairedField], Input, {type: "password"})}
            <div>
                <button>Войти</button>
            </div>
        </form>
    )
}

export default reduxForm({form: 'login'})(LoginForm)


