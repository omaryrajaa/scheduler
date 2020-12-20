/**
 * Returns appointments for day
 * @param {*} state 
 * @param {*} day 
 */
export function getAppointmentsForDay(state, day) {
  const dayFound = state.days.find((currentDay) => currentDay.name === day);

  if (!dayFound) {
    return [];
  }
  const listAppointnments = dayFound.appointments;

  if (listAppointnments) {
    const appointments = dayFound.appointments.map(
      (appointmentId) => state.appointments[appointmentId]
    );

    return appointments;
  } else {
    return [];
  }
}

/**
 * Returns an array of interviewer object of day
 * @param {*} state 
 * @param {*} day 
 */
export function getInterviewersForDay(state, day) {
  const dayFound = state.days.find((currentDay) => currentDay.name === day);

  if (!dayFound) {
    return [];
  }
  const listInterviewers = dayFound.interviewers;

  if (listInterviewers) {
    const interviewers = dayFound.interviewers.map(
      (interviewId) => state.interviewers[interviewId]
    );

    return interviewers;
  } else {
    return [];
  }
}


/**
 * Returns interviews correspoind to interview id
 * @param {*} state 
 * @param {*} interview 
 */
export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar,
      },
    };
  } else {
    return null;
  }
}
