import React, { Component } from 'react';

import './ActivityCounter.css';

class ActivityCounter extends Component {
  constructor () {
    super();
    this.state ={
      testData: ''
    }
    this.displayData = this.displayData.bind(this);
    this.incrementCount = this.incrementCount.bind(this);

  }

  //TODO: get rid of test data
  componentWillMount() {
    if(this.props.data) {
      if (!this.state.testData) {
        this.setState((prevState, props) => {
          return {testData: this.props.data};
        });
      }
    }

    if (!!this.props.profile && this.props.profile.sub !== this.token) {
      this.token = this.props.profile.sub;
      let userRequest = new Request('/api/user/' + this.props.profile.sub, {
        method: 'GET',
        // this header sends the user token from auth0
        headers: this.props.getAuthorizationHeader()
      });
      fetch(userRequest)
        .then(res => console.log(res))
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  // componentDidUpdate() {
  //   if (!!this.props.profile && this.props.profile.sub !== this.token) {
  //     this.token = this.props.profile.sub;
  //     fetch('/api/users/' + this.props.profile.sub)
  //       .then(res => res.json())
  //       .then(json => {
  //         this.setState({ suggestions: json });
  //         this.posts = json;
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // }
  incrementCount(type) {
    const update = this.state.testData;
    update.today[type]++;

    this.setState(prevState => {
      return {testData: update}
    });
  }

  displayData(data) {
    var info = Object.entries(data.today).map(([type, count], index)=>{
      var progress = Math.min(1, count/(data.yesterday[type]));
      progress = Math.max(0.001, progress);
      var progressPercent = progress*100 + "%";

      var color;
      if (progress < 0.50) {
        color = "#ff1a1a";
      } else if (progress >= 0.5 && progress < 1) {
        color = "#ff944d";
      } else {
        color = "#00e64d";
      }

      const progressBarStyle = {
        width: progressPercent,
        height: "30px",
        backgroundColor: color
      }

      return (
        <div key={index} className="progress-container">
          <div className="increment">
            <a className="button is-light" onClick={() => {this.incrementCount(type)}}>+</a>
          </div>
          <div className="progress">
            <div className="numbers">
              <span className="count">{count}</span>  <span className="type">{type}s</span>
              <span className="comparison">
                <span className="count">{data.yesterday[type]}</span><span className="type">{type}s</span>
              </span>
            </div>
            <div className="progress-bar-container">
              <div style={progressBarStyle}></div>
            </div>
          </div>
        </div>
      );
    });

    return info;
  }

  render() {

    if (this.state.testData){
      var displayData = this.displayData(this.state.testData);

      return (
        <div className="activity-counter">
          {displayData}
        </div>
      );
    }
    else {
      return (null);
    }
  }
}

export default ActivityCounter;
