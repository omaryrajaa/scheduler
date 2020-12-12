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
  return axios.put(`/api/appointments/${id}`, { interview: interview }).then(res => {
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

});
}

const cancelInterview = (id) => {
  return axios.delete(`/api/appointments/${id}`).then(res => {
  const appointments = {...state.appointments};
  appointments[id].interview = null
  setState({
    ...state, 
    appointments
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