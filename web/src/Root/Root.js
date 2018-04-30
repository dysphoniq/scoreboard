import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.css';
import ActivityCounter from '../ActivityCounter';
import update from 'immutability-helper';

class RootContainer extends Component {
  constructor () {
    super();
    this.state = {
                    data: '',
                    profile: ''
                  }
  }

  componentWillMount() {
    if (!!this.props.profile && this.props.profile.sub !== this.token) {
      this.token = this.props.profile.sub;
      let userRequest = new Request('/api/user/' + this.props.profile.sub, {
        method: 'GET',
        // this header sends the user token from auth0
        headers: this.props.getAuthorizationHeader()
      });
      fetch(userRequest)
        .then(res => {
          return res.json();
        })
        .then(json => {
          let newState = update(this.state, {
            profle: { $set: json}
          });
          this.setState(newState);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    fetch('/api/today/' + this.props.profile.sub, {method: "GET"})
    .then(res => res.json())
    .then(json => {
      this.setState({
        data: json
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return(
      <div className="container is-fluid">
        <Root data={this.state.data} profile={this.state.profile} {...this.props} />
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
