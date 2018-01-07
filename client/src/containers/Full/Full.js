import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';

import Dashboard from '../../views/Dashboard/';
import Inscriptions from '../../views/Inscriptions';
import Appel from '../../views/Appel'

import { isLoggedIn, getAuthorizationHeader } from '../../authentication'
import { init } from '../../actions/common'


class Full extends Component {

  initialize(dispatch) {
    fetch('/api/init/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': getAuthorizationHeader()
      },
      method: 'GET'
    })
      .then(response => response.json()
        .then(json => ({
          ok: response.ok,
          status: response.status,
          json
        })))
      .then(response => {
        if (response.ok) {
          dispatch(init(response.json))
        }
      }).catch(reason => {
        console.log('Failed to initialize: ', reason);
      })
  }

  componentDidMount() {
    const { dispatch, history } = this.props
    if (isLoggedIn()) {
      this.initialize(dispatch)
    }
    else {
      history.push('/login')
    }
  }

  render() {
    return (
      <div className="app">
        <Header history={this.props.history} />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                <Route path="/inscriptions/:id?" name="Inscriptions" component={Inscriptions} />
                <Route path="/appel/:date/:index?" name="Appel" component={Appel} />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </div>
          </main>
          <Aside />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => props
const mapDispatchToProps = dispatch => ({ dispatch })

Full = connect(mapStateToProps, mapDispatchToProps)(Full)

export default Full;
