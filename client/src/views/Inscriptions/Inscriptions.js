import React from 'react';
import {reduxForm, reset} from 'redux-form'
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux'

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

Inscriptions = connect(
    (state, ownProps) => {
        const id = ownProps.match.params.id;

        return {
          initialValues: state.membres[id]
        }
    }
)(Inscriptions)

export default Inscriptions;