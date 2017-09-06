import React from 'react';
import {reduxForm, reset} from 'redux-form'
import uuidv4 from 'uuid/v4';

import InfosPersonelles from './Formulaires/InfosPersonnelles';
import InfosCapoeira from './Formulaires/InfosCapoeira';
import Paiement from './Formulaires/Paiement';
import DossierInscription from './Formulaires/DossierInscription';
import {postInscription} from '../../actions/Membres'

let Inscriptions = props => {
  const {handleSubmit, pristine, reset, submitting} = props
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* <div style={{ marginBottom: 30 + 'px' }}>
          <button type="submit" className="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="top" title="Bientôt!">Nouvelle inscription</button>&nbsp;
          <button type="submit" className="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="top" title="Bientôt!">Modifier un profil déjà existant</button>
        </div> */}
        <ChargerPersonne/>
        <InfosCapoeira/>
        <InfosPersonelles/>
        <DossierInscription/>
        <Paiement/>
        <div style={{
          marginBottom: 30 + 'px'
        }}>
          <button
            type="submit"
            className="btn btn-sm btn-primary"
            disabled={pristine || submitting}
            onClick={handleClick}>Enregistrer</button>
          <button
            type="button"
            className="btn btn-sm"
            disabled={pristine || submitting}
            onClick={reset}>
            Effacer les valeurs
          </button>
        </div>
      </form>
    </div>
  )
}

let handleClick = () => {
   window.scrollTo(0, 0)
}

Inscriptions = reduxForm({
  form: 'inscriptions',
  onSubmit: (values, dispatch) => {
    dispatch(postInscription({
      ...values,
      id: uuidv4()
    }))
    dispatch(reset("inscriptions"));
  }
})(Inscriptions)

export default Inscriptions;