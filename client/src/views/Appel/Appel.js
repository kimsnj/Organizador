import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Progress } from 'reactstrap'
import uuidv4 from 'uuid/v4';

import { putAppel } from '../../actions/Membres'

const validate = values => {
  let errors = {};
  return errors;
}

const dossierComplet = (eleve) => eleve.fiche_adhesion && eleve.certificat_medical && eleve.photo;

const renderEleve = (eleve, idx) =>
  <li key={idx}>
    <i className={dossierComplet(eleve) ? "icon-check bg-success" : "icon-bell bg-warning"}></i>
    <div className="desc">
      <div className="title">{eleve.prenom} {eleve.nom}</div>
      <small>{eleve.surnom}</small>
    </div>
    <div
      className="actions"
      style={{
        marginTop: 10 + 'px'
      }}>
      <label className="switch switch-3d switch-success">
        <Field component="input" type="checkbox" className="switch-input" name={eleve.id} />
        <span className="switch-label" data-on="On" data-off="Off"></span>
        <span className="switch-handle"></span>
      </label>
    </div>
  </li>

let AppelForm = ({ handleSubmit, courses, classes, index, inscrits, presents, props }) => {
  return (
  <div className="row">
    <form onSubmit={handleSubmit}>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4>
              <i className="fa fa-users"></i>
              Appel</h4>
          </div>
          <div className="card-block">
            <div className="row">
              <div className="col-sm-6 col-lg-4 btn-group-vertical">
                {classes.map((classe, idx) => {
                  console.log(classe)
                  let cours = courses[classe.cours] || {}
                  return <a key={idx} role="button"
                    className={idx === index ? "btn btn-primary btn-block" : "btn btn-outline-secondary btn-block"}
                    href={"/appel/" + classe.date + "/" + idx}>
                    Cours {cours.categorie} de {cours.horaire} à {cours.salle}
                  </a>
                })}
              </div>

              <div className="col-sm-6 col-lg-4" style={{ marginTop: '20px' }}>
                <ul className="icons-list">
                  {inscrits.map(renderEleve)}
                </ul>
              </div>

              <div className="col-sm-6 col-lg-4">
                <ul className="horizontal-bars type-2">
                  <li>
                    <i className="icon-user"></i>
                    <span className="title">Présents</span>
                    <span className="value">{presents}/{inscrits.length}</span>
                    <div className="bars">
                      <Progress className="progress-xs" color="success" value={100 * presents / inscrits.length} />
                    </div>
                  </li>
                  <li className="divider"></li>
                  <button type="submit" className="btn btn-sm btn-primary col-md-9" style={{ display: 'block', margin: 'auto' }}>Enregistrer</button>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
</div>)
}

AppelForm = reduxForm({
  form: 'appel',
  enableReinitialize: true,
  validate,
  onSubmit: (values, dispatch) =>
    dispatch(putAppel({ ...values, id: uuidv4() }))
})(AppelForm)

AppelForm = connect(
  (state, ownProps) => {
    const values = (state.form.appel && state.form.appel.values) || {}
    const presents = Object.values(values).filter(val => (val === true)).length

    const date = ownProps.match.params.date;
    const index = ownProps.match.params.index || 0;
    const classes = state.dates[date] || [];
    const classe = index < classes.length
      ? classes[index]
      : {};
    const inscrits_id = (state.cours[classe.cours] || {}).inscrits || []
    const inscrits = inscrits_id
      .map(id => state.membres[id])
      .filter(membre => membre && !membre.error);

    const initialValues = {
      id: classe.id
    }

    return {
      ...ownProps,
      courses: state.cours,
      classes: classes,
      index,
      inscrits,
      presents,
      initialValues
    };
  }
)(AppelForm)

export default AppelForm;