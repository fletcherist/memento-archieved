import React, { Component } from 'react'
import {Editor, EditorState, ContentState} from 'draft-js';

class Answer extends Component {
  constructor(props) {
    super(props);

    console.log(props)
    const content = ContentState.createFromText(props.answer.text)
    this.state = {
      editorState: EditorState.createWithContent(content),
      isReadOnly: true
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleEditingMode = this.handleEditingMode.bind(this)
  }

  handleEditingMode() {
    this.setState({isReadOnly: false})
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

export default Answer
