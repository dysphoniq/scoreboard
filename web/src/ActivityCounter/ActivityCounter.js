import React, { Component } from 'react';

class ActivityCounter extends Component {
  constructor () {
    super();
    this.displayData = this.displayData.bind(this);
  }


  displayData(data) {
    return data;
  }

  render() {

    if (this.props.data){

      var displayData = this.displayData(this.props.data);
      return (
        <div className="activity-counter">
          {this.props.data.today.CR}
        </div>
      );
    }
    else {
      return (null);
    }
  }
}

export default ActivityCounter;
