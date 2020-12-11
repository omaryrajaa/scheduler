import React from "react";

import "./styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";


import  useVisualMode  from "../../hooks/useVisualMode.js"
import { create } from "react-test-renderer";


export default function Appointment (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const create = () => transition(CREATE);
  const cancel = () => back();

    return (
      <article className="appointment">
      <Header time={props.time}/>

      {mode === EMPTY && 
      <Empty onAdd={create} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={[]}
        />

      )}

      {mode === CREATE &&
        <Form interviewers={props.interviewers}
        onCancel={cancel}
        />
      } 
    </article>
    )

  
}

