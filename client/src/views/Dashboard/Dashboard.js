import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Statistiques from './Statistiques';
import moment from 'moment'

class Dashboard extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card bg-primary">
              <div className="card-block">
                <NavLink to={'/inscriptions'} className="nav-link text-white" activeClassName="active">
                  <h3>
                    <i className="fa fa-flag" style={{ marginRight: 10 + 'px' }} ></i>
                    Inscriptions</h3>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-success">
              <div className="card-block">
                <NavLink to={'/appel/' + moment().format('YYYY-MM-DD')} className="nav-link text-white" activeClassName="active">
                  <h3>
                    <i className="fa fa-hand-paper-o" style={{ marginRight: 10 + 'px' }} ></i>
                    Faire l'appel</h3>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-block social-box facebook">
                <h3 className="card-title">Alertes</h3>
                <p className="card-text">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-action">Paiement
                      <span className="badge badge-warning badge-pill" style={{ marginLeft: 5 + 'px' }}>4</span>
                    </li>
                    <li className="list-group-item list-group-item-action">Dossiers incomplets
                      <span className="badge badge-danger badge-pill" style={{ marginLeft: 5 + 'px' }}>5</span>
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Statistiques />
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
