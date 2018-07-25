import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment'

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    return (

      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to={'/dashboard'} className="nav-link" activeClassName="active"><i className="icon-home"></i> Accueil</NavLink>
            </li>
            <li className="nav-title">Quotidien</li>
            <li className="nav-item">
              <NavLink to={'/appel/' + moment().format('YYYY-MM-DD')} className="nav-link" activeClassName="active"><i className="fa fa-hand-paper-o"></i>Faire l'appel</NavLink>
            </li>
            <li className="nav-title">Inscriptions</li>
            <li className="nav-item">
              <a href='/inscriptions/' className="nav-link" activeClassName="active"><i className="icon-plus"></i>Nouvelle inscription</a>
            </li>
            <li className="nav-item">
              <a href='/modifierinscription/' className="nav-link" activeClassName="active"><i className="fa fa-edit"></i>Reprendre inscription</a>
            </li>
            <li className="nav-title">Aide à la gestion</li>
            <li className="nav-item">
              <a href='/statistiques/' className="nav-link" activeClassName="active"><i className="fa fa-area-chart"></i>Statistiques</a>
            </li>
            <li className="nav-item">
              <a href='/touspaiements/' className="nav-link" activeClassName="active"><i className="fa fa-money"></i>Statut des paiements</a>
            </li>
            <li className="nav-title">Avancé</li>
            <li className="nav-item">
              <a href='/admin/' className="nav-link" activeClassName="active"><i className="icon-paper-plane"></i> Admin</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
