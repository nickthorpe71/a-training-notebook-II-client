import React from 'react';
import Context from '../../MainContext';
import TokenService from '../../services/token-service'
import WorkoutsApiService from '../../services/workouts-api-service'
import './WorkoutView.css';

export default class WorkoutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: TokenService.getUserId(),
      title: '',
      workout_start_time: new Date().getTime(),
      workout_end_time: new Date().getTime(),
      workout_date: new Date(),
      exercises: '',
    };
  }

  static contextType = Context;

  componentDidMount = () => {
    if (this.props.match.params.workoutId !== 'new') {
      const workout_id = this.props.match.params.workoutId;
      WorkoutsApiService.getWorkoutById(workout_id)
        .then(workout => {
          this.setState({
            ...workout
          })
        })
    } else {
      this.setState({
        workout_date: this.extractDate(this.context.selectedDate),
        workout_start_time: this.extractTime(new Date()),
        workout_end_time: this.extractTime(new Date())
      });
    }
  }

  extractDate = (date) => {
    return date.toISOString().slice(0, 10);
  }

  extractTime = (date) => {
    return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.match.params.workoutId === 'new') {
      console.log('we are posting a new workout')
      WorkoutsApiService.postWorkout(this.state);
    } else {
      console.log('we are editing a workout')
      WorkoutsApiService.updateWorkout(this.state.id, this.state);
    }

    this.props.history.push('/');
  }

  handleDeleteClick = (event) => {
    event.preventDefault();
    WorkoutsApiService.deleteWorkout(this.state.id);
    this.props.history.push('/');
  }

  handleBackButton = () => {
    this.props.history.push('/');
  }

  handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;

    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  }

  getFromState = (key) => {
    return this.state[key];
  }

  renderDeleteButton = () => {
    return (
      <button
        className="unlit-button"
        onClick={this.handleDeleteClick}
      >delete
      </button>
    )
  }

  render() {
    return (
      <div className="workout-view" >
        <form
          className="card-container exercise-form"
          id="exercise-form"
          onSubmit={e => this.handleSubmit(e)}
        >
          <section className="workout-view-header">
            <label htmlFor="title"></label>
            <input
              name="title"
              type="text"
              className="workout-view-title"
              placeholder="Workout Title"
              defaultValue={this.getFromState('title')}
              onChange={this.handleChange}
            />
            <div className="time-date-container">
              <label htmlFor="workout_start_time">Start</label>
              <input
                name="workout_start_time"
                type="time"
                className="workout-view-time-date"
                onChange={this.handleChange}
                value={this.getFromState('workout_start_time')}
              />
              <label htmlFor="workout_end_time">End</label>
              <input
                name="workout_end_time"
                type="time"
                className="workout-view-time-date"
                onChange={this.handleChange}
                value={this.getFromState('workout_end_time')}
              />
              <label htmlFor="workout_date"></label>
              <input
                name="workout_date"
                type="date"
                className="workout-view-time-date"
                onChange={this.handleChange}
                value={this.getFromState('workout_date')}
              />
            </div>
          </section>
          <label htmlFor="exercises"></label>
          <textarea
            name="exercises"
            id="exercises"
            cols="30"
            rows="50"
            onChange={this.handleChange}
            value={this.getFromState('ecercises')}
          ></textarea>
          <section className="workout-view-footer">
            <div>
              <button
                className="workout-view-back"
                onClick={this.handlieBackButton}
              >back
              </button>
              <button className="lit-button">save</button>
              {this.props.match.params.workoutId !== 'new'
                ? this.renderDeleteButton()
                : <></>}
            </div>
          </section>
        </form>
      </div >
    );
  }
}

