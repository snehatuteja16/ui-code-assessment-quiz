import React, { Component } from "react";
import { shuffle, formatQuestion } from '../helper';

export default class MultipleChoice extends Component {

  getSetOfAns(question) {
    let answersArr = question.incorrect_answers;
    answersArr.push(question.correct_answer);
    return shuffle(answersArr);
  }

  getMultipleChoiceAns = (setOfAnswers) => {
    const htmlText = [];
    setOfAnswers && setOfAnswers.map((answer, i) => {
      htmlText.push(
        <p key={i}>
          <input required value={answer} type="radio" id={i} name="multipleChoiceQues"/>
          <label htmlFor={i}>{answer}</label>
        </p>
      )
    });
    return htmlText;
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(e.target.elements['multipleChoiceQues'].value);
    e.target.reset();
  };

  render() {
    const { question } = this.props;
    const answers = this.getSetOfAns(question);
    return(
      <form onSubmit={this.onSubmit}>
        <p>{formatQuestion(question.question)}</p>
        {this.getMultipleChoiceAns(answers)}
        <button type ="submit">Next</button>
      </form>
    );
  }
}

