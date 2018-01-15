import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Statistiques from './Statistiques';
import moment from 'moment'
import { connect } from 'react-redux'

const PAIEMENT = {
  "EVEIL_1": 175,
  "ENFANT_1": 185,
  "ENFANT_2": 308,
  "ADO_1": 195,
  "ADO_2": 325,
  "ADULTE_1": 220,
  "ADULTE_2": 359
}

const filter_members = (members) => {
  var people = [];
  for (const key of Object.keys(members)) {
    if (members[key].status === 'success') {
      people.push(members[key]);
    }
  }
  return people;
}

const calculeCombienManque = (eleve) => {
  if (eleve.paiements.length === 0) {
    return "la totalité"
  } else {
    let total = 0;
    for (var i = 0; i < eleve.paiements.length; i++) {
      total += eleve.paiements[i].somme;
    }
    if (total < PAIEMENT[eleve.categorie + "_" + eleve.cours.length]) {
      return (PAIEMENT[eleve.categorie + "_" + eleve.cours.length] - total) + "€";
    }
  }
}

const renderToolTipEleve = (eleve) => {
  let missingItems = ""
  if (!eleve.fiche_adhesion)
    missingItems += "- Fiche adhésion\n"
  if (!eleve.certificat_medical)
    missingItems += "- Certificat médical\n"
  if (!eleve.photo)
    missingItems += "- Photo\n"
  if (!paiementFait(eleve))
    missingItems += "- Paiement : manque " + calculeCombienManque(eleve) + "\n"
  if (!paiementEncaisse(eleve)) {
    missingItems += "- " + ditQuoiPasEncaisse(eleve) 
  }
  return (missingItems)
}

const dossierComplet = (eleve) => eleve.fiche_adhesion && eleve.certificat_medical && eleve.photo;

const paiementEncaisse = (eleve) => {
  if (eleve.paiements.length === 0) {
    return true // si pas de paiements, pas besoin de surveiller l'encaissement...
  } else {
    for (var i = 0; i < eleve.paiements.length; i ++) {
      if (eleve.paiements[i].methode === "CHEQUE" & !eleve.paiements[i].encaisse) {
        return false
      }      
    }
  }
  return true
}

const ditQuoiPasEncaisse = (eleve) => {
  var quoi = "";
  if (eleve.paiements.length != 0) {
    for (var i = 0; i < eleve.paiements.length; i ++) {
      var paiement = eleve.paiements[i]
      if (paiement.methode === "CHEQUE" & !paiement.encaisse) {
        quoi += "Chèque de " + paiement.somme + "€ non encaissé\n"
      }      
    }
  }
  return quoi
}

const paiementFait = (eleve) => {
  if (eleve.paiements.length === 0) {
    return false
  } else {
    let total = 0;
    for (var i = 0; i < eleve.paiements.length; i++) {
      total += eleve.paiements[i].somme;
    }
    if (total < PAIEMENT[eleve.categorie + "_" + eleve.cours.length]) {
      return false;
    } else {
      return true;
    }
  }
}

let determinerIconeStatutInscription = (eleve) => {
  let iconDescription = "";
  if (paiementFait(eleve)) {
    if (dossierComplet(eleve)) {
      iconDescription = "icon-check bg-success"
    } else {
      iconDescription = "icon-bell bg-warning"
    }
  } else {
    iconDescription = "icon-bell bg-danger"
  }
  return iconDescription
}

const renderEleve = (eleve, idx) =>
  <NavLink to={'/inscriptions/' + eleve.id} className="nav-link" activeClassName="active" key={idx}>
    <li>
      <i className={determinerIconeStatutInscription(eleve)}
        data-toggle="tooltip"
        data-placement="top"
        title={renderToolTipEleve(eleve)} />
      <div className="desc">
        <div className="title">{eleve.prenom} {eleve.nom}</div>
        <small>{eleve.surnom}</small>
      </div>
      <div
        className="actions"
        style={{
          marginTop: 10 + 'px'
        }}>
      </div>
    </li>
  </NavLink>


class Dashboard extends Component {
  render() {
    const { members = [] } = this.props;
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
              <div className="card-block">
                {/* <NavLink to={'/inscriptions/'+id} className="nav-link text-white" activeClassName="active"> */}
                <h3>
                  <i className="fa fa-edit" style={{ marginRight: 10 + 'px' }} ></i>
                  Modifier inscription pré-existante</h3>
                {/* </NavLink> */}
              </div>
              <div className="card-block" style={{ marginTop: 0 + 'px' }}>
                <div className="col-md-12" id="InscriptionsPreExistantes">
                  <ul className="icons-list">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Chercher nom"
                      id="example-search-input" />
                    {filter_members(members).map(renderEleve)}
                  </ul>
                </div>
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

Dashboard = connect(
  state => {
    return {
      members: state.membres
    }
  }
)(Dashboard)

export default Dashboard;
