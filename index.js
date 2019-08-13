import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './src/comment.js'
import './css/layout.css';

class Draft extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      draftContent: '',
      draftOriginContent: '',
      draftInfo: {},
      isLoading: true,
      isShowDiff: true,
      showDiffTip: false,
      activeTab: true,
      originRepoName: '',
      isShowCommentDialog: false,
      activeItem: null,
      historyList: [],
      showReviewerDialog: false,
      reviewers: [],
      inResizing: false,
      rightPartWidth: 30,
      freezePublish: false
    };
    this.quote = 'Hello Michael An';
  }

  handleClick(e) {
    // console.log(e.target);
    this.setState({
      activeTab: !this.state.activeTab
    });
  }

  componentWillMount() {
    console.log('test webpack and babel');
    this.quote = {
      name: 'Michale',
      age: 20,
      hobby: 'coding'
    };
  }

  render() {
    // console.log(this.quote);
    let { name, age, hobby } = this.quote;
    // console.log(name, age, hobby);
    return (
      <div className="test">
        <button onClick={this.handleClick.bind(this)}>test</button>
        {this.state.activeTab && <span>{name}</span>}
        <Comment/>
      </div>
    );
  }
}

ReactDOM.render (
  <Draft />,
  document.getElementById('wrapper')
);