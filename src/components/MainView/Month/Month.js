import React from 'react';
import Weekday from '../Weekday/Weekday'
import WorkoutsApiService from '../../../services/workouts-api-service';
import Day from '../Day/Day'
import Context from '../../../MainContext';
import './Month.css'
import { Icon } from '@iconify/react';
import circleFill from '@iconify/icons-bi/circle-fill';

export default class Month extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredDate: null,
      dateDots: {}
    }
  }

  static contextType = Context;

  componentDidMount() {
    this.determineWorkoutDots();
  }

  determineWorkoutDots = () => {
    const searchMonth = this.context.selectedDate.getMonth() + 1;

    let dateDots = {}

    WorkoutsApiService.getWorkoutsByMonth(searchMonth)
      .then(res => {
        let count = res.length;
        for (let i = 0; i < count; i++) {
          const workoutDay = String(res[i].workout_date.slice(8, 10)).padStart(2, '0')
          dateDots[workoutDay] = <Icon color={'aqua'} icon={circleFill} />
        }
        for (let i = 1; i < 31; i++) {
          const iKey = String(i).padStart(2, '0');
          if (!(iKey in dateDots)) {
            dateDots[iKey] = <Icon color={'white'} icon={circleFill} />;
          }
        }

        this.setState({ dateDots });
      });
  }

  render() {
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    const { month, year } = this.props;

    const weekdaysMarkup = weekdays.map(weekday => {
      return (
        <Weekday
          key={weekday}
          title={weekdayAbbreviation(weekday)}
          label={weekday}
        />
      )
    });

    const weeks = getWeeksForMonth(month, year);

    const weeksMarkup = weeks.map((week, index) => {
      return (
        <div role="row" className="week" key={index}>
          {week.map(this.renderWeek)}
        </div>
      )
    });

    return (
      <>
        <div className="weekday-container">
          {weekdaysMarkup}
        </div>
        {weeksMarkup}
      </>
    )
  }

  renderWeek = (fullDate, dayIndex) => {
    const { hoverDate } = this.state;
    if (fullDate == null) {
      return <Day key={dayIndex} />
    }

    const date = fullDate.getDate();
    return (
      <Day
        key={dayIndex}
        fullDate={fullDate}
        dots={this.state.dateDots}
        selected={date === this.props.date}
        hovering={date === hoverDate}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    )
  }

  handleMouseEnter = (date) => {
    this.setState({
      hoverDate: date,
    })
  }

  handleMouseLeave = () => {
    this.setState({
      hoverDate: null,
    })
  }

}

//returns only the first three letters of the weekday title
function weekdayAbbreviation(weekday) {
  return weekday.substring(0, 2);
}

function getWeeksForMonth(month, year) {
  const WEEK_LENGTH = 7;

  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay();
  const weeks = [[]];

  let currentWeek = weeks[0];
  let currentDate = firstOfMonth;

  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  while (currentDate.getMonth() === month) {
    if (currentWeek.length === WEEK_LENGTH) {
      currentWeek = [];
      weeks.push(currentWeek);
    }

    currentWeek.push(currentDate);
    currentDate = new Date(year, month, currentDate.getDate() + 1);

  }

  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }

  return weeks;

}

