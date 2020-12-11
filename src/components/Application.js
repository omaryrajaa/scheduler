import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay , getInterview } from '../helpers/selectors.js';
const axios = require('axios').default;


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios({
        method: "GET",
        url: `/api/days`
      }),
  
      axios({
        method: "GET",
        url: `/api/appointments`
      }),
  
      axios({
        method: "GET",
        url: `/api/interviewers`
      })
    ]).then((all) => {  
          setState(prev => ({ 
          ...prev, 
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
          }));
     
    })
  
  }, [])

  function bookInterview(id, interview) {
  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state, 
      appointments
    });

    return axios.put(`/api/appointments/${id}`, { interview: interview });
    
  }

  const cancelInterview = (id) => {
    const appointments = {...state.appointments};
    appointments[id].interview = null
    setState({
      ...state, 
      appointments
    });
    return axios.delete(`/api/appointments/${id}`);
  }



const setDay = day => setState({ ...state, day });
const interviewers = getInterviewersForDay(state, state.day);

const parsedAppointments = getAppointmentsForDay(state, state.day).map(appointment => {
  const interview = getInterview(state, appointment.interview);
  return (
    <Appointment       
      key={appointment.id}
      {...appointment}
      interview={interview} 
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}


    />
  );
});


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
