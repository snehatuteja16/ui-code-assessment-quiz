import React, { Component } from "react";
import { formatQuestion } from "../helper";

export default class TextQuestion extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputVal : ''
    }
  }

  onChange = (e) => {
    this.setState({
      inputVal : e.target.value
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputVal);
  };

  render() {
    const { question } = this.props;
    return(
      <form onSubmit ={this.onSubmit}>
        <p>{formatQuestion(question.question)}</p>
        <input required value = {this.state.inputVal} onChange = {this.onChange} name ="textQuestion"/>
        <p><button type="submit">Next</button></p>
      </form>
    );
  }
}
