import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../../MainContext';
import WorkoutSummary from '../WorkoutSummary/WorkoutSummary';
import { IoIosAddCircleOutline } from "react-icons/io";
import './DayPreview.css';

export default function DayPreview(props) {

  const context = useContext(Context);

  const day = [];
  day[0] = "Sun";
  day[1] = "Mon";
  day[2] = "Tue";
  day[3] = "Wed";
  day[4] = "Thur";
  day[5] = "Fri";
  day[6] = "Sat";

  const todaysDate = ` ${context.selectedDate.getMonth() + 1}/${context.selectedDate.getDate()}`;
  const displayDate = day[context.selectedDate.getDay()];

  function renderWorkouts() {
    const { matchingWorkouts } = context;
    return matchingWorkouts.map((workout, index) =>
      <WorkoutSummary
        key={index}
        workoutTitle={workout.title}
        exercises={workout.exercises}
        workoutId={workout.id} />
    );
  }

  return (
    <section className="note-preview">
      <div className="date-container">
        <p>{displayDate}
          {todaysDate}</p>
      </div>
      <div className="right-container">
        <Link to='/workout/new'>
          <button className="add-button"><IoIosAddCircleOutline></IoIosAddCircleOutline></button>
        </Link>
        <ul className="workout-preview-list">
          {renderWorkouts()}
        </ul>
      </div>
    </section>
  );
}

