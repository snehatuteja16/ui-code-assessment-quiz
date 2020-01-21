import React, { Component } from "react";
import { getPercent } from '../helper';

export default class Summary extends Component {
  render() {
    const { correctAnswers, wrongAnswers } = this.props;
    return (
      <div style = {{width: '50%', textAlign: 'left', margin: 'auto'}}>
        <h3>SUMMARY</h3>
        <p>
          Correct: <strong>{correctAnswers}</strong>
        </p>
        <p>
          Wrong: <strong>{wrongAnswers}</strong>
        </p>
        <p>
          Questions Answered: <strong>{correctAnswers + wrongAnswers}</strong>
        </p>
        <p>
          Final Score: <strong>{getPercent(correctAnswers, wrongAnswers)}</strong>
        </p>
      </div>
    );
  }
}
