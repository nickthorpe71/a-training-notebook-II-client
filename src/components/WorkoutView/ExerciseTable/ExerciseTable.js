import React from 'react';
import ExerciseTableHeader from '../ExerciseTableHeader/ExerciseTableHeader'
import Exercise from '../Exercise/Exercise'
import './ExerciseTable.css';

export default function ExerciseTable(props) {

  let exerciseRows = [];

  for (let i = 0; i < props.exercises; i++) {
    let thisExercise = {
      title: '',
      sets: []
    };

    if (props.workout && props.workout.exercises && props.workout.exercises[i]) {
      thisExercise = props.workout.exercises[i];
    }

    exerciseRows.push(
      <Exercise
        key={i}
        exerciseNumber={i}
        onChange={props.onChange}
        sets={props.sets}
        exercise={thisExercise}
      />
    );
  }

  return (
    <div className="exercise-table-container">
      <table className="workout-view-exercises">
        <ExerciseTableHeader sets={props.sets} />
        <tbody>
          {exerciseRows}
        </tbody>
      </table>
    </div>
  );
}
