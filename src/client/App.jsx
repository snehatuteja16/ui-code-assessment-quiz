import * as React from 'react';
import { getQuestions, getRandomQues } from './helper';
import MultipleChoice from './Components/MultipleChoice';
import BooleanQuestion from './Components/BooleanQuestion';
import TextQuestion from './Components/TextQuestion';
import Summary from './Components/Summary';
import styles from './styles.css';


export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      question: {},
      correctAnswers: 0,
      wrongAnswers: 0,
      quizEnded: false,
      quizOnGoing: true,
      setOfQuestions: []
    }
  }

  componentDidMount() {
    //fetch call to server to get the questions
    getQuestions().then(res => {
      const results = res.results;
      const [question, setOfQuestions] = getRandomQues(results);
      this.setState({ question, setOfQuestions });
    })
  }

  onSubmit = (value) => {
    if (value === this.state.question.correct_answer) {
      this.setState(prevState => {
        return {correctAnswers: prevState.correctAnswers + 1}
      })
    } else {
      this.setState(prevState => {
        return {wrongAnswers: prevState.wrongAnswers + 1}
      })
    }
    if(this.state.correctAnswers + this.state.wrongAnswers === 49){
      //end the quiz
      this.endQuiz()
    }
    else{
      const [question, setOfQuestions] = getRandomQues(this.state.setOfQuestions);
      this.setState({ question, setOfQuestions });
    }
  };

  endQuiz = () => {
    this.setState({
      question: {},
      quizEnded: true,
      quizOnGoing: false
    })
  };

  restartQuiz = () => {
    const [question, setOfQuestions] = getRandomQues(this.state.setOfQuestions);
    this.setState({
      quizEnded: false,
      quizOnGoing: true,
      question, setOfQuestions,
      correctAnswers: 0,
      wrongAnswers: 0
    })
  };

  render(){
    const { question, correctAnswers, wrongAnswers, quizEnded, quizOnGoing } = this.state;
    const type = question.type;
    return(
      <div>
        <h3>Lucid UI Assessment Quiz</h3>
        {type === 'multiple' && <MultipleChoice question = {question} onSubmit = {this.onSubmit}/>}
        {type === 'boolean' && <BooleanQuestion question = {question} onSubmit = {this.onSubmit}/>}
        {type === 'text' && <TextQuestion question = {question} onSubmit = {this.onSubmit} />}
        {quizOnGoing && <button onClick={this.endQuiz}>End Quiz</button>}
        {!quizOnGoing && <button onClick={this.restartQuiz}>Restart Quiz</button>}
        {quizEnded &&
        <Summary
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}/>
        }
      </div>
    )
  }
}
