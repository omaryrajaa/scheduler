import React from "react";

import "./styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm"


import  useVisualMode  from "../../hooks/useVisualMode.js"
import Status from "./Status";




export default function Appointment (props) {

  //modes list
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const create = () => transition(CREATE);
  const cancel = () => back();
  const deleteInterview = () => transition(CONFIRM)

  const edit = () => transition(EDIT);
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id,interview)
    .then(() => transition(SHOW))
    .catch(error => console.log("Save  error: ", error));
  }

  const confirmDeleteInterview = () => {

    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => console.log("Confirm Delete error: ", error));
    }

    return (
      <article className="appointment">
      <Header time={props.time}/>

      {mode === EMPTY && 
      <Empty onAdd={create} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
          onEdit={edit}
        />

      )}

{mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onCancel={cancel}
          onConfirm={confirmDeleteInterview}
        />

      )}

      {mode === CREATE &&
        <Form interviewers={props.interviewers}
        onCancel={cancel}
        onSave={save}
        />
      } 

      {mode === EDIT &&
        <Form interviewers={props.interviewers}
        onCancel={cancel}
        onSave={save}

        interviewer={props.interview.interviewer.id}
        name={props.interview.student}

        />
      } 

      {mode === SAVING &&
        <Status 
        message={"Saving"}
        />
      } 

{mode === DELETING &&
        <Status 
        message={"Deleting"}
        />
      } 

    </article>
    )

  
}

