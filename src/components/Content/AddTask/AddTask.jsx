import React, {useState} from 'react';
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {Form, reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormsControls.module.css"
import {requairedField} from "../../../utils/validators/validators";

const AddTask = ({handleSubmit, error, closeTask}) => {
    return (
        <div className={style.addTaskForm}>
            <Form onSubmit={handleSubmit}>
                <div>
                    <button className={style.closeAddTaskForm} onClick={() => {
                        closeTask(false)
                    }}>X
                    </button>
                </div>
                {error && <div className={style.formSummaryError}>{error}</div>}
                <div>
                    {createField("Username", "username", [requairedField], Input)}
                </div>
                <div>
                    {createField("Email", "email", [requairedField], Input)}
                </div>
                <div>
                    {createField("Text", "text", [requairedField], Textarea)}
                </div>

                <div>
                    <button onClick={() => {
                    }}>Добавить задание
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default reduxForm({form: 'add-form'})(AddTask)