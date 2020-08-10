import React, { useContext } from 'react';
import Context from '../../../MainContext';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import WorkoutsApiService from '../../../services/workouts-api-service';
import { IoIosTrash, IoMdCreate } from "react-icons/io";
import './WorkoutSummary.css';


export default function WorkoutSummary(props) {
  const context = useContext(Context);
  const history = useHistory();

  function handleDeleteClick() {

    context.setLoading(true);
    WorkoutsApiService.deleteWorkout(props.workoutId)
      .then(() => {
        context.setLoading(false);
        history.push('/');
      });
  }

  return (
    <li className="workout-preview-item">
      <div className="workout-preview-title-container">
        <Link to={`/workout/${props.workoutId}`}>
          <p className="workout-preview-title">{props.workoutTitle}</p>
        </Link>
        <div className="change-buttons">
          <Link to={`/workout/${props.workoutId}`}>
            <button className="edit-button"><IoMdCreate></IoMdCreate></button>
          </Link>
          <div>
            <button
              className="delete-button"
              onClick={handleDeleteClick}>
              <IoIosTrash></IoIosTrash>
            </button>
          </div>
        </div>
      </div>
      <p className="workout-preview-description">{props.exercises}</p>
    </li >
  );
}

