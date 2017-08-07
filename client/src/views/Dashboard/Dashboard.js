import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Dashboard extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-block">
                {/* <a href="#">
                  <h3 className="card-title">Nouvelle inscription</h3>
                </a> */}
                <NavLink to={'/inscriptions'} className="nav-link" activeClassName="active"><h3>Nouvelle inscription</h3></NavLink>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-block">
                <NavLink to={'/appel'} className="nav-link" activeClassName="active"><h3>Faire l'appel</h3></NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-block">
                <h3 className="card-title">Alertes</h3>
                <p className="card-text">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-action">Paiement <span className="badge badge-default badge-pill">2</span></li>
                    <li className="list-group-item list-group-item-action">Retards</li>
                    <li className="list-group-item list-group-item-action">Dossiers incomplets <span className="badge badge-default badge-pill">5</span></li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-block">
                <h3 className="card-title">Statistiques</h3>
                <p>
                  <div className="card">
                    <div className="card-block">
                      <p> 1er : Katia </p>
                      <p> 2e : Violinha </p>
                      <p> 3e : Troca troca </p>
                    </div>
                  </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Dashboard;
