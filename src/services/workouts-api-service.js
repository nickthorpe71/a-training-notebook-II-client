import config from '../config'
import TokenService from './token-service';

const WorkoutsApiService = {
  getWorkoutsByDate(date) {
    const userId = Number(TokenService.getUserId());
    return fetch(`${config.API_ENDPOINT}/workouts/${userId}?workout_date=${date}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getWorkoutsByMonth(month) {
    const userId = Number(TokenService.getUserId());
    return fetch(`${config.API_ENDPOINT}/workouts/${userId}?month=${month}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getWorkoutById(id) {
    const userId = Number(TokenService.getUserId());
    return fetch(`${config.API_ENDPOINT}/workouts/${userId}?workout_id=${id}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postWorkout(newWorkout) {
    return fetch(`${config.API_ENDPOINT}/workouts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(newWorkout),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  deleteWorkout(workout_id) {
    const user_id = Number(TokenService.getUserId());
    return fetch(`${config.API_ENDPOINT}/workouts/${user_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ user_id, workout_id }),
    })
  },

  updateWorkout(workout_id, updatedWorkout) {
    return fetch(`${config.API_ENDPOINT}/workouts/?workout_id=${workout_id}`, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(updatedWorkout),
    })
  }
}

export default WorkoutsApiService;