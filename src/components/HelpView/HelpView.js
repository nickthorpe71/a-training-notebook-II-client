import React from 'react';
import { Link } from 'react-router-dom';
import './HelpView.css';

export default function HelpView(props) {
  return (
    <div className="help-page">
      <div className="help-container">
        <h2 className="help-page-title">How to use a training notebook</h2>
        <ol className="help-page-list">
          <li className="help-page-list">
            <p>select which day you are recording a workout to</p>
          </li>
          <li>
            <p>tap the plus button</p>
          </li>
          <li>
            <p>record all exercises, sets and weights</p>
          </li>
          <li>
            <p>We will take care of the rest!</p>
          </li>
        </ol>
        <div className="help-page-footer">
          <Link to='/'>
            <button className="help-page-next-button lit-button">continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

