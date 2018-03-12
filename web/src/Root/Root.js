import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.css';
import ActivityCounter from '../ActivityCounter';

class RootContainer extends Component {
  constructor () {
    super();
    this.state = { data: '' }
  }

  componentDidMount() {
    fetch('/api/testData')
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: json
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return(
      <div className="container is-fluid">
        <Root data={this.state.data} {...this.props} />
      </div>
    );
  }
}

class Root extends Component {
  render () {
    if (this.props.data) {
      return (
        <div className="container is-fluid">
          <ActivityCounter {...this.props} />
        </div>);
    } else {
      return null;
    }
  }
}

export default RootContainer;
