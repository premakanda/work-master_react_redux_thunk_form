import React from 'react';
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {Form, reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormsControls.module.css"
import {requairedField} from "../../../utils/validators/validators";

const EditTask = ({handleSubmit, error, editTask, isAuth}) => {
    return (
        <div className={style.editTaskForm}>
            <Form onSubmit={handleSubmit}>
                <button className={style.closeEditTaskForm} onClick={() => {
                    editTask()
                }}>X
                </button>
                {error && <div className={style.formSummaryError}>{error}</div>}
                <div>
                    <b>Text:</b>
                    {createField("Text", "text", [requairedField], Textarea)}
                </div>

                <div className={style.status}>
                    <b>Status:</b>
                    {createField("", "status", [], Input, {type: "checkbox"})}
                </div>
                <div>
                    <button disabled={isAuth ? false : true} onClick={() => {
                    }}>{isAuth ? 'Редактировать' : 'Авторизируйся'}
                    </button>
                </div>
            </Form>
        </div>
    )
}


export default reduxForm({form: 'edit-form'})(EditTask)