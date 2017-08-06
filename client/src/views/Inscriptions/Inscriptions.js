import React, { Component } from 'react';
import InfosPersonelles from './Formulaires/InfosPersonnelles';
import InfosCapoeira from './Formulaires/InfosCapoeira';
import Paiement from './Formulaires/Paiement';
import DossierInscription from './Formulaires/DossierInscription';

class Inscriptions extends Component {
  render() {
    return (
        <div className="container">
            <InfosPersonelles/>
            <InfosCapoeira/>
            <DossierInscription/>
            <Paiement/>
            <div style={{marginBottom: 30 + 'px'}}>
              <button type="button" className="btn btn-sm btn-primary col-md-12">Enregistrer</button>
            </div>
        </div>
    )
  }
}

export default Inscriptions;