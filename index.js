import React from 'react';
import ReactDOM from 'react-dom';
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

  handleClick() {
    this.setState({
      activeTab: !this.state.activeTab
    });
  }

  render() {
    return (
      <div className="test">
      {
        this.state.activeTab && <span>{this.quote}</span>
      }
      <button onClick={this.handleClick.bind(this)}>test</button>
      </div>
    );
  }
}

ReactDOM.render (
  <Draft />,
  document.getElementById('wrapper')
);