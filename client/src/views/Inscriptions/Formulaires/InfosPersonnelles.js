import React from 'react';
import { connect } from 'react-redux'
import {Field, formValueSelector} from 'redux-form'

let filter_all_valid_members = (members) => {
    var people = [];
    for (const key of Object.keys(members)) {
        if (members[key].status === 'success') {
            people.push(members[key]);
        }       
    }
    return people;
}

let InfosPersonnelles = ({categorie, members}) => (
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
                                type="date"
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
                            <Field component="select" id="multiple-select-emergency" name="emergency" className="form-control" size="5" multiple>
                                {filter_all_valid_members(members).map((c, idx) => (
                                            <option value={c.id} key={c.id}>{c.prenom} {c.nom} </option>
                                        ))}
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
            categorie,
            members: state.membres
        }
    }
)(InfosPersonnelles)

export default InfosPersonnelles;