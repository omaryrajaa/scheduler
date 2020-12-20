import React, { useState, useEffect } from "react";

import axios from 'axios';

export default function useApplicationData() {
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

useEffect(() => {
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers'),
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
  return axios.put(`/api/appointments/${id}`, { interview: interview }).then(res => {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
    const mapDays = [...state.days].map((day) => {
      if (!state.appointments[id].interview && day.name ===  state.day) {
        day.spots -= 1;
      }
    return day;
    });
    
  const days = [...mapDays];
  setState({
    ...state, 
    appointments,
    days
  });

});
}

const cancelInterview = (id) => {
  return axios.delete(`/api/appointments/${id}`).then(res => {
  const appointments = {...state.appointments};
  appointments[id].interview = null;

  const mapDays = [...state.days].map((day) => {
    if(day.name ===  state.day) {
      day.spots += 1;
    }
    return day;
  });

  const days = [...mapDays];

  setState({
    ...state, 
    appointments,
    days
  });
});
}


const setDay = day => setState({ ...state, day });

return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}