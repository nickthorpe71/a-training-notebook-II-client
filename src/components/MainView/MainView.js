import React, { useContext } from 'react';
import Context from '../../MainContext';
import Calendar from './Calendar/Calendar';
import DayPreview from './DayPreview/DayPreview';
import './MainView.css';

export default function MainView(props) {

  const context = useContext(Context);

  return (
    <div className="main-content">
      <section className="calendar">
        <Calendar fullDate={context.selectedDate} onDayClick={context.handleDayClick} />
      </section>
      <DayPreview />
    </div>
  );
}

