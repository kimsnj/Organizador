import React from 'react';
import { connect } from 'react-redux'
import {Field, formValueSelector} from 'redux-form'

let InfosPersonnelles = ({categorie}) => (
    <div className="row">
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <h4>
                        <i className="fa fa-user"></i>
                        Informations personnelles</h4>
                </div>
                <div className="card-block">
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="text-input">Nom</label>
                        <div className="col-md-9">
                            <Field
                                component="input"
                                type="text"
                                name="nom"
                                className="form-control"
                                placeholder="" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="text-input">Prénom</label>
                        <div className="col-md-9">
                            <Field
                                component="input"
                                type="text"
                                name="prenom"
                                className="form-control"
                                placeholder="" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="text-input">Date de naissance</label>
                        <div className="col-md-9">
                            <Field
                                component="input"
                                type="text"
                                name="date_naissance"
                                className="form-control"
                                placeholder="" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="text-input">Numéro de téléphone</label>
                        <div className="col-md-9">
                            <Field
                                component="input"
                                type="text"
                                name="telephone"
                                className="form-control"
                                placeholder="" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="text-input">Adresse</label>
                        <div className="col-md-9">
                            <Field
                                component="textarea"
                                name="adresse"
                                rows="9"
                                className="form-control"
                                placeholder="Content.."/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label">Droit à l'image</label>
                        <div className="col-md-9">
                            <label className="form-check-label">
                                <Field
                                    component="input"
                                    name="droit_image"
                                    className="form-check-input"
                                    style={{
                                    marginRight: 5 + 'px'
                                }}
                                    type="checkbox"/>
                            </label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label">Contact d'urgence</label>
                        <div className="col-md-9">
                            <Field component="select" id="multiple-select" name="cours" className="form-control" size="5" multiple>
                                <option value="personne 1">Personne 1</option>
                                <option value="personne 2">Personne 2</option>
                                <option value="personne 3">Personne 3</option>
                                <option value="personne 4">Personne 4</option>
                            </Field>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const selector = formValueSelector('inscriptions')
InfosPersonnelles = connect(
    state => {
        const categorie = selector(state, 'categorie')
        return {
            categorie
        }
    }
)(InfosPersonnelles)

export default InfosPersonnelles;