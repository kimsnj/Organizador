import React from 'react';
import { Field } from 'redux-form'

let InfosPersonnelles = (props) => (
    <div className="row">
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <h4><i className="fa fa-user"></i> Informations personnelles</h4>
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
                            <Field component="textarea" name="textarea-input" rows="9" className="form-control" placeholder="Content.." />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label">Droit à l'image</label>
                        <div className="col-md-9">
                            <div className="checkbox">
                                <label htmlFor="checkbox1">
                                    <Field component="radio" name="checkbox1" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label">Contact d'urgence</label>
                        <div className="col-md-9">
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                    <Field component="input" name="username" className="form-control" placeholder="Nom" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                    <Field component="input" name="telephone" className="form-control" placeholder="Téléphone" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default InfosPersonnelles;