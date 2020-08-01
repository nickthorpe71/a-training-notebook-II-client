import React from 'react';

export default function Set(props) {

  let placeholderWeight = '';
  let placeholderReps = '';

  if (props.exerciseNumber === 0) {
    placeholderWeight = 'Weight';
    placeholderReps = 'Reps';
  }

  function getWeight() {
    if (props.thisSet && 'weight' in props.thisSet)
      return props.thisSet.weight;
  }

  function getReps() {
    if (props.thisSet && 'reps' in props.thisSet)
      return props.thisSet.reps;
  }

  return (
    <td className="set-col">
      <div>
        <div>
          <label htmlFor={`weight${props.exerciseNumber}_${props.setNumber}`}></label>
          <input
            className="set-input"
            name={`weight${props.exerciseNumber}_${props.setNumber}`}
            type="text" placeholder={placeholderWeight}
            value={getWeight()}
            onChange={props.onChange}
          />
        </div>
        <div>
          <label htmlFor={`reps${props.exerciseNumber}_${props.setNumber}`}></label>
          <input
            className="set-input"
            name={`reps${props.exerciseNumber}_${props.setNumber}`}
            type="text" placeholder={placeholderReps}
            value={getReps()}
            onChange={props.onChange}
          />
        </div>
      </div>
    </td>
  );
}
