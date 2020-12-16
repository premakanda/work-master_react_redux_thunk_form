import React from "react";
import styles from './FormsControls.module.css';
import { requairedField } from "../../../utils/validators/validators";
import { Field } from "redux-form";

const FormContorll = ({ input, meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControll + " " + (hasError ? styles.error : '')}>
            <div>  {children}</div>
            {hasError ? <span>{error}</span> : ''}
        </div>
    )
}

export const Textarea = props => {
    const { input, meta, ...restProps } = props;
    return <FormContorll {...props}> <textarea {...input} {...restProps} /></FormContorll>
}

export const Input = props => {
    const { input, meta, ...restProps } = props;
    return <FormContorll {...props}><input {...input} {...restProps} /></FormContorll>
}

export const createField = (placeholder, name, validateArray, component, props = {}, text = "") => <div><Field
    placeholder={placeholder}
    name={name}
    validate={validateArray}
    component={component} {...props} /> {text}
</div>
