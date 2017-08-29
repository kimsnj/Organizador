import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';

import Dashboard from '../../views/Dashboard/';
import Inscriptions from '../../views/Inscriptions';
import Appel from '../../views/Appel'

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                <Route path="/inscriptions" name="Inscriptions" component={Inscriptions} />
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

export default Full;
