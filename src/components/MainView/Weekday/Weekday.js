import React from 'react';
import './Weekday.css'

export default function Weekday(props) {
  return (
    <div aria-label={props.label} className="weekday">
      {props.title}
    </div>
  )
}