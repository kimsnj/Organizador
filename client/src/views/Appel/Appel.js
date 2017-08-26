import React from 'react'
import { Field, reduxForm } from 'redux-form'

var ELEVES = [
  {nom: 'Duquaire', prenom:'Pascale', surnom:'Violinha', evenements: 'Dossier'},
  {nom: 'Luiggi', prenom:'Isabelle', surnom:'Troca troca'},
  {nom: 'Senhaji', prenom:'Karim', surnom:'Abutre', evenements: 'Paiement'},
  {nom: 'Nom3', prenom:'Prénom3', surnom:'', evenements: 'Dossier Paiement'},
];

let validate = values => {
  let errors = {};
  if (!values.lastName) {
    errors.lastName = "Comment tu t'appelles?";
  }
  return errors;
}


let AppelForm = props => {
  const { handleSubmit } = props
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4><i className="fa fa-users"></i> Appel</h4>
          </div>
          <div className="card-block">
            <div className="form-group row">
              <label className="col-md-3 form-control-label" htmlFor="text-input">Pour le cours de... </label>
              <div className="col-md-9">
                <Field component="select" id="select" name="corde" className="form-control">
                    <option>Aujourd'hui</option>
                    <option>Aujourd'hui 17h</option>
                    <option>Vendredi 18h</option>
                    <option>Vendredi 17h</option>
                    <option>...</option>
                </Field>
              </div>
              </div>
              {
                ELEVES.map((c, index) => (
                  <div className="form-group row">
                    <div className="col-md-1"/>
                    <div className="col-md-9">
                      <label className="form-check-label">
                          <input className="form-check-input" style={{ marginRight: 5 + 'px' }} type="checkbox"/>{c.surnom? c.surnom : c.prenom + ' ' + c.nom}
                      </label>
                    </div>
                  </div>
              ))
              }
              <div style={{ marginBottom: 30 + 'px' }}>
                <button type="submit" className="btn btn-sm btn-primary col-md-12">Enregistrer</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AppelForm = reduxForm({
  form: 'appel',
  deleteOnComponentUnmont: false,
  validate
})(AppelForm)

export default AppelForm;