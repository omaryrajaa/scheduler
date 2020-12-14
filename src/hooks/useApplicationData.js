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

  console.log("state.day = ", state.day)
  console.log("state.days = ", state.days)
  
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