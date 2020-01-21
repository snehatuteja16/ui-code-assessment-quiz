import React, { Component } from "react";
import { formatQuestion } from "../helper";

export default class BooleanQuestion extends Component {

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(e.target.elements['boolQuestion'].value);
    e.target.reset();
  };

  render() {
    const { question } = this.props;
    return(
      <form onSubmit={this.onSubmit}>
        <p>{formatQuestion(question.question)}</p>
        <input required type="radio" name="boolQuestion" value="True" /> True<br/>
        <input type="radio" name="boolQuestion" value="False"/> False<br/>
        <button type="submit">Next</button>
      </form>
    );
  }
}
