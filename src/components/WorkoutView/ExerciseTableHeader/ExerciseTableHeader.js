import React from 'react';

export default function WorkoutHeader(props) {

  let sets = [];

  for (let i = 0; i < props.sets; i++) {
    sets.push(<th key={i} className="set-col">{`Set ${i + 1}`}</th>)
  }

  return (
    <thead>
      <tr>
        <th className="exercise-col">Exercise</th>
        {sets}
      </tr>
    </thead>
  )
}