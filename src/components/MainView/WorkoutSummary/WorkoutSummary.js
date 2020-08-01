import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import WorkoutsApiService from '../../../services/workouts-api-service';
import { IoIosTrash, IoMdCreate } from "react-icons/io";
import Context from '../../../MainContext';

export default function WorkoutSummary(props) {

  const context = useContext(Context);

  function handleDeleteClick() {
    WorkoutsApiService.deleteWorkout(props.workoutId);
    window.location.reload(true);
  }

  return (
    <li>
      <div className="workout-preview-title-container">
        <Link to={`/workout/${props.workoutId}`}>
          <h3 className="workout-preview-title">{props.workoutTitle}</h3>
        </Link>
        <p className="workout-preview-time">{/*add time here later*/}</p>
        <Link to={`/workout/${props.workoutId}`}>
          <button className="unlit-button"><IoMdCreate></IoMdCreate></button>
        </Link>
        <button
          onClick={handleDeleteClick}
          className="unlit-button">
          <IoIosTrash></IoIosTrash>
        </button>
      </div>
      <p className="workout-preview-description"></p>
    </li >
  );
}

