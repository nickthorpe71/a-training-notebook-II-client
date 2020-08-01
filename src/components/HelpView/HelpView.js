import React from 'react';
import './HelpView.css';

export default function HelpView(props) {
  return (
    <div class="help-page">
      <div class="help-container">
        <h2 class="help-page-title">How to use a training notebook</h2>
        <ol class="help-page-list">
          <li class="help-page-list">
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
        <div class="help-page-footer">
          <button class="help-page-next-button">continue</button>
        </div>
      </div>
    </div>
  );
}

