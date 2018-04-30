import React, { Component } from 'react';

import './ActivityCounter.css';

class ActivityCounter extends Component {
  constructor () {
    super();
    this.state ={
      data: ''
    }
    this.displayData = this.displayData.bind(this);
    this.incrementCount = this.incrementCount.bind(this);

  }

  //TODO: get rid of test data
  componentWillMount() {
    if(this.props.data) {
      if (!this.state.data) {
        this.setState((prevState, props) => {
          return {data: this.props.data};
        });
      }
    }
  }

  //TODO: update DB
  incrementCount(type) {
    const update = this.state.data;
    update.today[type]++;

    this.setState(prevState => {
      return {data: update}
    });
  }

  displayData(data) {
    var info = Object.entries(data.entries).map(([type, count], index)=>{
  //var info = data.entries.map(([type, count], index)=>{

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

    if (this.state.data){
      var displayData = this.displayData(this.state.data);

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
