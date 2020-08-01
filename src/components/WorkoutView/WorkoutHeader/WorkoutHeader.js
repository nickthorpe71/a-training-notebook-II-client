import React, { useContext } from 'react';
import Context from '../../../MainContext';
import './WorkoutHeader.css';

export default function WorkoutHeader(props) {

  const date = new Date();
  const context = useContext(Context);

  // const currentDate = convertDate(date);

  function getTime() {
    return date.getHours() + ":" + date.getMinutes()
  }

  function determineDate() {
    if (props.workout.workout_date) {
      const thisDate = new Date(props.workout.workout_date)
      return convertDate(thisDate);
    }
    return convertDate(context.selectedDate);
  }

  function convertDate(date) {
    const newDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
      '-' + date.getDate().toString().padStart(2, 0);
    return newDate;
  }

  return (
    <section className="workout-view-header">
      <label htmlFor="workoutTitle"></label>
      <input
        name="workoutTitle"
        type="text"
        className="workout-view-title"
        placeholder="Workout Title"
        defaultValue={props.workout.title}
        onChange={props.onChange}
      />
      <div className="time-date-container">
        <label htmlFor="workoutTime"></label>
        <input
          name="workoutTime"
          type="time"
          className="workout-view-time-date"
          placeholder="time"
          onChange={props.onChange}
          defaultValue={getTime()} //need to adjust this to consider editing
        />
        <label htmlFor="workoutDate"></label>
        <input
          name="workoutDate"
          type="date"
          className="workout-view-time-date"
          placeholder="date"
          onChange={props.onChange}
          value={determineDate()}
        />
      </div>
    </section>
  )
}