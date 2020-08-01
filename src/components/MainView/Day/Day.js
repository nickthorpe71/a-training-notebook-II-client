import React, { useContext } from 'react';
import Context from '../../../MainContext';

import './Day.css'

export default function Day(props) {
  const context = useContext(Context);

  if (props.fullDate == null) {
    return <div className="empty-state-day" />
  }

  const date = props.fullDate.getDate();
  let className = 'day';

  if (props.selected) {
    className = 'day day-selected'
  } else if (props.hovering) {
    className = 'day day-hovering'
  }

  return (
    <button
      className={className}
      onClick={context.handleDayClick.bind(this, date)}
      onMouseEnter={props.onMouseEnter.bind(this, date)}
      onMouseLeave={props.onMouseLeave}
    >
      {date}
      <div className='dot'>
        {props.dots[String(date).padStart(2, '0')]}
      </div>
    </button>
  );
}