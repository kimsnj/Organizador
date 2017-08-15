import React from 'react';
import { reduxForm } from 'redux-form'

import InfosPersonelles from './Formulaires/InfosPersonnelles';
import InfosCapoeira from './Formulaires/InfosCapoeira';
import Paiement from './Formulaires/Paiement';
import DossierInscription from './Formulaires/DossierInscription';

let Inscriptions = props => {
  const { handleSubmit } = props
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <InfosPersonelles />
        <InfosCapoeira />
        <DossierInscription />
        <Paiement />
        <div style={{ marginBottom: 30 + 'px' }}>
          <button type="submit" className="btn btn-sm btn-primary col-md-12">Enregistrer</button>
        </div>
      </form>
    </div>
  )
}



Inscriptions = reduxForm({
  form: 'inscriptions'
})(Inscriptions)

export default Inscriptions;