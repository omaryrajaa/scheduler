import React, { useState, useEffect } from "react";

const axios = require('axios').default;

export default function useApplicationData() {
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

return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}