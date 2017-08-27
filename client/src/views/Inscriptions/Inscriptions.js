import React from 'react';
import { reduxForm } from 'redux-form'
import uuidv4 from 'uuid/v4';

import InfosPersonelles from './Formulaires/InfosPersonnelles';
import InfosCapoeira from './Formulaires/InfosCapoeira';
import Paiement from './Formulaires/Paiement';
import DossierInscription from './Formulaires/DossierInscription';
import { postInscription } from '../../actions/Membres'


let Inscriptions = props => {
  const { handleSubmit } = props
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 30 + 'px' }}>
          <button type="submit" className="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="top" title="Bientôt!">Nouvelle inscription</button>&nbsp;
          <button type="submit" className="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="top" title="Bientôt!">Modifier un profil déjà existant</button>
        </div>
        <InfosCapoeira />
        <InfosPersonelles />
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
  form: 'inscriptions',
  onSubmit: (values, dispatch) =>
    dispatch(postInscription({ ...values, id: uuidv4() })),
})(Inscriptions)

export default Inscriptions;