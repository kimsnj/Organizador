import React from 'react';
import { reduxForm, reset } from 'redux-form'
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux'

import Infos from './Formulaires/Infos';
import Paiement from './Formulaires/Paiement';
import DossierInscription from './Formulaires/DossierInscription';
import { postInscription, putInscription } from '../../actions/Membres'

let Inscriptions = props => {
  const { handleSubmit, pristine, reset, submitting } = props

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Infos />
        <DossierInscription />
        <Paiement />
        <div style={{
          marginBottom: 30 + 'px'
        }}>
          <button
            type="submit"
            className="btn btn-sm btn-primary"
            id="notify"
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
  initNotify();
  notify();
}

function initNotify(){  // Onload du body
	var btn = document.getElementById('notify');
	if(window.Notification){
		Notification.requestPermission(function (status) {
			if(status === 'granted'){
				btn.disabled = false;
				btn.onclick = notify;
			}
			else{
				btn.disabled = true;
				btn.onclick = undefined;
			}
		});
	}
	else{
		btn.disabled = true;
		btn.onclick = undefined;
		alert('Votre navigateur est trop ancien (ou est Internet Explorer) pour supporter cette fonctionnalité !');
	}
}

function notify(){
	var n = new Notification('Enregistrement', {
		body: 'Les modifications ont été prises en compte!'
		//icon: 'dvp.gif'
	});
}

Inscriptions = reduxForm({
  form: 'inscriptions',
  onSubmit: (values, dispatch, props) => {
    if (values.id) {
      dispatch(putInscription(values));
      props.history.push(props.url);
    } else {
      dispatch(postInscription({
        ...values,
        id: uuidv4()
      }));
      dispatch(reset("inscriptions"));
    }
  }
})(Inscriptions)

Inscriptions = connect((state, ownProps) => {
  let id = ownProps.match.params.id;
  return { initialValues: state.membres[id] }
})(Inscriptions)

export default Inscriptions;