import React, { Component } from 'react';

class ActivityCounter extends Component {
  constructor () {
    super();
    this.displayData = this.displayData.bind(this);
  }


  displayData(data) {
    // var info = [];
    // for (var key in data) {
    //   info.push(<p key={key}>{key} : {data[key]}</p>);
    // }
    // return (
    //   <div className="data-item" >{info}</div>
    // );
    var info = Object.entries(data.today).map(([type, count], index)=>{
      return (
        <div key={index}>{type} : {count} </div>
      );
    });

    return info;
  }

  render() {

    if (this.props.data){

      var displayData = this.displayData(this.props.data);

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
