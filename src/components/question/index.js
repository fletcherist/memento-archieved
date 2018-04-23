import React, { Component } from 'react'
import {Editor, EditorState, ContentState, convertFromRaw, convertToRaw} from 'draft-js';

class Question extends Component {
  constructor(props) {
    super(props);

    const content = convertFromRaw(JSON.parse(props.question.raw))
    this.state = {
      editorState: EditorState.createWithContent(content),
      isReadOnly: true
    };
    this.onChange = (editorState) => {
      this.setState({editorState})
      this.handleSaveUpdates(editorState)
    };
    this.handleEditingMode = this.handleEditingMode.bind(this)
  }

  handleEditingMode() {
    this.setState({isReadOnly: false})
  }

  handleSaveUpdates(editorState) {
    const raw = convertToRaw(editorState.getCurrentContent())
    this.props.updateQuestionData(this.props.questionId, JSON.stringify(raw))
  }

  render() {
    return (
      <div onClick={this.handleEditingMode} className='App-question'>
        <Editor
          editorState={this.state.editorState}
          textAlignment='center'
          readOnly={this.state.isEditing}
          placeholder='Tell a question..'
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Question
