import React from 'react';
import { connect } from 'react-redux'
import { Field, FieldArray, formValueSelector } from 'redux-form'

var key_eveil = "EVEIL"
var key_enfants = "ENFANT"
var key_ado = "ADO"
var key_adulte = "ADULTE"

let renderPaiement = ({ fields }) => (
    <div>
        <div className="form-group row">
            <label className="col-md-3 form-control-label" htmlFor="text-input"/>
            <div className="form-group col-md-9">
                <button type="button" className="btn btn-info" onClick={() => fields.push({methode: 'CHEQUE'})}>Ajouter paiement</button>
            </div>
        </div>
        {fields.map((field, index) => (
            <div>
                <i className="fa fa-remove" onClick={() => fields.remove(index)}></i>
                <div className="form-group row">
                    <div className="col-md-2">
                        <button type="button" className="btn btn-danger" onClick={() => fields.remove(index)}>Supprimer</button>
                    </div>
                    <div className="col-md-9">
                        {/* Please leave me here, I am necessary and empty in the same time */}
                    </div>
                    <label className="col-md-2 form-control-label" htmlFor="text-input">Type</label>
                    <div className="col-md-9">
                        <Field component="select" id="multiple-select-classes" type="text" name={`${field}.methode`} className="form-control">
                            <option key="cheque" value="CHEQUE">Chèque</option>
                            <option key="liquide" value="ESPECE">Liquide</option>
                            <option key="virement" value="VIREMENT">Virement</option>
                        </Field>
                    </div>
                    <label className="col-md-2 form-control-label" htmlFor="text-input">Somme</label>
                    <div className="col-md-9">
                        <Field component="input" type="text" name={`${field}.somme`} className="form-control"/>
                    </div>
                    <label className="col-md-2 form-control-label" htmlFor="text-input">Date d'encaissement</label>
                    <div className="col-md-9">
                        <Field component="input" type="date" name={`${field}.encaissement`} className="form-control"/>
                    </div>
                    <label className="col-md-2 form-control-label" htmlFor="text-input">Encaissé</label>
                    <div className="col-md-9">
                        <Field component="input" type="checkbox" name={`${field}.encaisse`} className="form-control"/>
                    </div>
                </div>
            </div>
        ))
        }
        </div>
)

let filtered_with_type_paiement = (type_paiement) => (
    <FieldArray name="paiements" component={renderPaiement}/>
)

let Paiement = ({ typePaiement, categorie, cours }) => (
    <div className="row">
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <h4>
                        <i className="fa fa-money"></i>
                        Paiement</h4>
                </div>
                <div className="card-block">
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="text-input">Somme totale</label>
                        <div className="col-md-9">
                            <Field component="input" id="select" name="selectPrix" className="form-control"></Field>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="text-input">Paiements</label>
                        {filtered_with_type_paiement(typePaiement)}
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const selector = formValueSelector('inscriptions')
Paiement = connect(
    state => {
        const typePaiement = selector(state, 'selectTypePaiement') // a travers la fonctionnalite selector de reduxform, accède au champ dont name="categorie"
        const categorie = selector(state, 'categorie')
        const cours = selector(state, 'cours')
        return {
            typePaiement, categorie, cours
        }
    }
)(Paiement)

export default Paiement;