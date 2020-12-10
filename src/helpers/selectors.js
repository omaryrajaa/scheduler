


export function getAppointmentsForDay(state, day) {
  const appointmentsArray = [];

  const filteredAppointments = state.days.filter(elt => elt.name === day)

  if(filteredAppointments.length > 0) {
    const listAppointnments = filteredAppointments[0].appointments;
   
    if (listAppointnments) {
      for(const apt of listAppointnments) {
        if(state.appointments.hasOwnProperty(apt)) {
          appointmentsArray.push(state.appointments[apt])
        }
      }
      return appointmentsArray
    } 
  }  

  return [];
    
};
