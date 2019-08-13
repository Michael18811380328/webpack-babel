import React from 'react';
import '../css/layout.css';

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({ comment:value });
  }

  render() {
    return (
      <div className="comment">
        <span>This is comment Component</span>
        <input value={this.state.comment} onChange={(event) => this.handleChange(event)} type="text"></input>
      </div>
    );
  }
}

export default Comment;