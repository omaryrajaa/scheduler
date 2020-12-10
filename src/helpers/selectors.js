
export function getAppointmentsForDay(state, day) {


  const dayFound = state.days.find(currentDay => currentDay.name === day)

  if(!dayFound) {
    return [];
  }
    const listAppointnments = dayFound.appointments;
   
    if (listAppointnments) {
      
      const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId])

      return appointments
    }  else {
        return [];
    }   
  };

export function getInterview(state, interview) {

  if (interview) {

    return {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      }
    }    

  } else {

    return null;

  }
}
