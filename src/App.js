import React, { Component } from 'react'
import Question from './components/question'
import Answer from './components/answer'
import './App.css'
import {Editor, EditorState, ContentState} from 'draft-js';
import { database } from './firebase'

class App extends Component {
  constructor() {
    super()

    this.state = {
      currentQuestion: 0,
      isQuestionsLoaded: false,
      questions: []
    }
    this._loadQuestions = this._loadQuestions.bind(this)
    this.updateQuestionData = this.updateQuestionData.bind(this)
    this.updateAnswerData = this.updateAnswerData.bind(this)
  }
  async _loadQuestions() {
    const rur = (await database.ref('/users/1/questions/rurplay').once('value')).val()
    const questions = Object.keys(rur).map(key => {
      return {
        id: key,
        ...rur[key]
      }
    })
    this.setState({
      questions: questions,
      isQuestionsLoaded: true
    })
  }

  async _updateRawData(path, rawData) {
    database.ref(path).update({raw: rawData})
  }

  async updateQuestionData(questionId, rawData) {
    this._updateRawData(`/users/1/questions/rurplay/${questionId}/question`, rawData)
  }

  async updateAnswerData(questionId, rawData) {
    this._updateRawData(`/users/1/questions/rurplay/${questionId}/answer`, rawData)
  }

  componentWillMount() {
    this._loadQuestions()
    window.addEventListener('keydown', event => {
      // handle space
      if (event.keyCode === 32) {
        console.log('enter')
        return
      }
      if (event.keycode === 39) {
        console.log('arrow right')
      }
    })
  }
  render() {
    if (!this.state.isQuestionsLoaded) {
      return (
        <div>
          Questions are loading..
        </div>
      )
    }
    const currentQuestion = this.state.questions[this.state.currentQuestion]
    return (
      <div className="App">
        <main>
          <Question
            questionId={currentQuestion.id}
            {...currentQuestion}
            updateQuestionData={this.updateQuestionData}
          />
          <Answer
            questionId={currentQuestion.id}
            {...currentQuestion}
          />
        </main>
      </div>
    );
  }
}

export default App;
