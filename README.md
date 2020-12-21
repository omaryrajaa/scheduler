# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Behavioural Requirements

- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
-  A user can book an interview in an empty appointment slot.
- Iterviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## ScreenShots

### Opening page
![Opening page](https://raw.githubusercontent.com/omaryrajaa/scheduler/master/docs/Opening%20page.png)

### Create new appointment
![Create appoitment1](https://raw.githubusercontent.com/omaryrajaa/scheduler/master/docs/Create%20appointment.png)
![Create appoitment2](https://raw.githubusercontent.com/omaryrajaa/scheduler/master/docs/Confirm%20create%20appointment.png)

### Edit appointment
![Edit an appoitment1](https://raw.githubusercontent.com/omaryrajaa/scheduler/master/docs/Edit%20appointment1.png)
![Edit an appoitment2](https://raw.githubusercontent.com/omaryrajaa/scheduler/master/docs/Edit%20appointment2.png)
![Edit an appoitment3](https://raw.githubusercontent.com/omaryrajaa/scheduler/master/docs/Save%20edit%20appointment.png)

### Cancel appointment
![Cancel an appointment1](https://raw.githubusercontent.com/omaryrajaa/scheduler/master/docs/Delete%20appointment1.png)
![Cancel an appointment2](https://raw.githubusercontent.com/omaryrajaa/scheduler/master/docs/Delete%20appointment%20confirm%20message.png)
![Cancel an appointment3](https://raw.githubusercontent.com/omaryrajaa/scheduler/master/docs/Transition.png)
![Cancel an appointment3](https://raw.githubusercontent.com/omaryrajaa/scheduler/master/docs/Appointment%20deleted.png)

### Error message
![Error message](https://raw.githubusercontent.com/omaryrajaa/scheduler/master/docs/Error%20message.png)
