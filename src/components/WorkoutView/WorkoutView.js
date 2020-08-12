import React from 'react';
import Context from '../../MainContext';
import TokenService from '../../services/token-service';
import WorkoutsApiService from '../../services/workouts-api-service';
import './WorkoutView.css';

export default class WorkoutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: TokenService.getUserId(),
      title: '',
      workout_start_time: this.extractTime(new Date()),
      workout_end_time: this.extractTime(new Date()),
      workout_date: this.extractDate(new Date()),
      exercises: '',
    };
  }

  static contextType = Context;

  componentDidMount = () => {

    if (this.props.match.params.workoutId !== 'new') {
      const workout_id = this.props.match.params.workoutId;
      WorkoutsApiService.getWorkoutById(workout_id)
        .then(workout => {
          const workoutToInsert = {
            id: workout[0].id,
            user_id: workout[0].user_id,
            title: workout[0].title,
            workout_start_time: (workout[0].workout_start_time).slice(0, 5),
            workout_end_time: (workout[0].workout_end_time).slice(0, 5),
            workout_date: this.extractDate(new Date(workout[0].workout_date)),
            exercises: workout[0].exercises,
          };

          this.setState({
            ...workoutToInsert
          });
        });
    }
    this.setState({
      workout_date: this.extractDate(this.context.selectedDate),
    });

  };

  extractDate = (date = new Date()) => {
    return date.toISOString().slice(0, 10);
  };

  extractTime = (date) => {
    return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.match.params.workoutId === 'new') {
      this.context.setLoading(true);
      WorkoutsApiService.postWorkout(this.state)
        .then(() => {
          this.props.history.push('/');
          this.context.setLoading(false);
        });
    } else {
      this.context.setLoading(true);
      WorkoutsApiService.updateWorkout(this.state.id, this.state)
        .then(() => {
          this.props.history.push('/');
          this.context.setLoading(false);
        });
    }
  };

  handleDeleteClick = (event) => {
    event.preventDefault();
    this.context.setLoading(true);
    WorkoutsApiService.deleteWorkout(this.state.id)
      .then(() => {
        this.props.history.push('/');
        this.context.setLoading(false);
      });
  };

  handleBackButton = () => {
    this.props.history.push('/');
  };

  handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;

    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  };

  getFromState = (key) => {
    return this.state[key];
  };

  renderDeleteButton = () => {
    return (
      <button
        className="unlit-button"
        onClick={this.handleDeleteClick}
      >delete
      </button>
    );
  };

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
              placeholder="Title"
              defaultValue={this.getFromState('title')}
              onChange={this.handleChange}
              required
            />
            <div className="time-date-container">
              <label htmlFor="workout_date"></label>
              <input
                name="workout_date"
                type="date"
                className="workout-view-time-date"
                onChange={this.handleChange}
                value={this.getFromState('workout_date')}
              />
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
            </div>
          </section>
          <div className="exercise-area-container">
            <label htmlFor="exercises"></label>
            <textarea
              className="exercise-area"
              name="exercises"
              id="exercises"
              onChange={this.handleChange}
              value={this.getFromState('exercises')}
              required
            ></textarea>
          </div>
          <section className="workout-view-footer">
            <div>
              <button type="submit" className="lit-button">save</button>
              <button
                className="workout-view-back unlit-button"
                onClick={this.handleBackButton}
              >back
              </button>
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

