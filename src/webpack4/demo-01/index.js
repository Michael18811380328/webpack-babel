import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './src/comment.js'
import './css/layout.css';

class Draft extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: true,
    };
    this.quote = {
      name: 'Michale',
      age: 20,
      hobby: 'coding'
    };
  }

  handleClick(e) {
    this.setState({ activeTab: !this.state.activeTab });
  }

  componentWillMount() {
    console.log('component will mount');
  }

  componentDidMount() {
    console.log('component did mount');
  }

  render() {
    console.log('render');
    let { name } = this.quote;
    return (
      <div className="test">
        <button onClick={this.handleClick.bind(this)}>test</button>
        {this.state.activeTab && <span>{name}</span>}
        <Comment/>
      </div>
    );
  }
}

ReactDOM.render(<Draft />, document.getElementById('wrapper'));
