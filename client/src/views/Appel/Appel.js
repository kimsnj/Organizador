import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Progress} from 'reactstrap'

var ELEVES = [
  {
    nom: 'Duquaire',
    prenom: 'Pascale',
    surnom: 'Violinha',
    evenements: 'Dossier'
  }, {
    nom: 'Luiggi',
    prenom: 'Isabelle',
    surnom: 'Troca troca'
  }, {
    nom: 'Senhaji',
    prenom: 'Karim',
    surnom: 'Abutre',
    evenements: 'Paiement'
  }, {
    nom: 'Nom3',
    prenom: 'Prénom3',
    surnom: '',
    evenements: 'Dossier Paiement'
  }
];

let validate = values => {
  let errors = {};
  if (!values.lastName) {
    errors.lastName = "Comment tu t'appelles?";
  }
  return errors;
}

let AppelForm = props => {
  const {handleSubmit} = props
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4>
              <i className="fa fa-users"></i>
              Appel</h4>
          </div>
          <div className="card-block">
            <div className="row">
              <div className="col-sm-6 col-lg-4">
                <div className="form-group row">
                  <label className="col-md-3 form-control-label" htmlFor="text-input">Cours de...
                  </label>
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
              </div>

              <div className="col-sm-6 col-lg-4">
                <ul className="icons-list">
                  <li>
                    <i className="icon-check bg-success"></i>
                    <div className="desc">
                      <div className="title">Pascale Ducaire</div>
                      <small>Violinha</small>
                    </div>
                    <div
                      className="actions"
                      style={{
                      marginTop: 10 + 'px'
                    }}>
                      <label className="switch switch-3d switch-success">
                        <input type="checkbox" className="switch-input"/>
                        <span className="switch-label" data-on="On" data-off="Off"></span>
                        <span className="switch-handle"></span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <i className="icon-bell bg-warning"></i>
                    <div className="desc">
                      <div className="title">Isabelle Blonde</div>
                      <small>Bonbon</small>
                    </div>
                    <div
                      className="actions"
                      style={{
                      marginTop: 10 + 'px'
                    }}>
                      <label className="switch switch-3d switch-success">
                        <input type="checkbox" className="switch-input"/>
                        <span className="switch-label" data-on="On" data-off="Off"></span>
                        <span className="switch-handle"></span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <i className="icon-close bg-danger"></i>
                    <div className="desc">
                      <div className="title">Julien Quelquechose</div>
                      <small>Asejere</small>
                    </div>
                    <div
                      className="actions"
                      style={{
                      marginTop: 10 + 'px'
                    }}>
                      <label className="switch switch-3d switch-success">
                        <input type="checkbox" className="switch-input"/>
                        <span className="switch-label" data-on="On" data-off="Off"></span>
                        <span className="switch-handle"></span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <i className="icon-check bg-success"></i>
                    <div className="desc">
                      <div className="title">Marion Hoogstoel</div>
                      <small>Camaleaon</small>
                    </div>
                    <div
                      className="actions"
                      style={{
                      marginTop: 10 + 'px'
                    }}>
                      <label className="switch switch-3d switch-success">
                        <input type="checkbox" className="switch-input"/>
                        <span className="switch-label" data-on="On" data-off="Off"></span>
                        <span className="switch-handle"></span>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="col-sm-6 col-lg-4">
                <ul className="horizontal-bars type-2">
                  <li>
                    <i className="icon-user"></i>
                    <span className="title">Présents</span>
                    <span className="value">3/4</span>
                    <div className="bars">
                      <Progress className="progress-xs" color="success" value="43"/>
                    </div>
                  </li>
                  <li className="divider"></li>
                  <button type="submit" className="btn btn-sm btn-primary col-md-9" style={{display : 'block', margin: 'auto'}}>Enregistrer</button>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AppelForm = reduxForm({form: 'appel', deleteOnComponentUnmont: false, validate})(AppelForm)

export default AppelForm;