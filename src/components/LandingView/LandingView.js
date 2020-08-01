import React from 'react';
import './LandingView.css';
import { Link } from 'react-router-dom';

export default function LandingView(props) {
  return (
    <div class="landing-page">
      <h1>A simple way to track your workouts</h1>
      <p>A training notebook is the easiest way to track, store and plan your workouts.</p>
      <div>
        <Link to='/signup'>
          <button
            type="button"
            class="lit-button landing-button">
            Sign up
        </button>
        </Link>
        <Link to='/login'>
          <button
            type="button"
            class="unlit-button landing-button">
            Log in
        </button>
        </Link>
      </div>
    </div>
  );
}

