import React from 'react';
import { connect } from 'react-redux'
import { Field, FieldArray, formValueSelector } from 'redux-form'

var PRIX_COURS = [
    { prix: 175, categorie: 'eveil', frequence: 1, formeLongue: '1 fois par semaine' },
    { prix: 185, categorie: 'enfants', frequence: 1, formeLongue: '1 fois par semaine' },
    { prix: 195, categorie: 'adolescents', frequence: 1, formeLongue: '1 fois par semaine' },
    { prix: 220, categorie: 'adultes', frequence: 1, formeLongue: '1 fois par semaine' },
    { prix: 308, categorie: 'enfants', frequence: 2, formeLongue: '2 fois par semaine' },
    { prix: 175, categorie: 'adolescents', frequence: 2, formeLongue: '2 fois par semaine' },
    { prix: 175, categorie: 'adultes', frequence: 2, formeLongue: '2 fois par semaine' }
];

let renderCheques = ({ fields }) => (
    <div>
        <div className="form-group row">
            <div className="form-group col-md-9">
                <button type="button" className="btn btn-info" onClick={() => fields.push()}>Ajouter chèque</button>
            </div>
        </div>
        {fields.map((field, index) => (
            <div>
        <i className="fa fa-remove" onClick={() => fields.remove(index)}></i>
            <div className="form-group row">
                <div className="col-md-2">
                    <button type="button" className="btn btn-danger" onClick={() => fields.remove(index)}>Supprimer</button>
                </div>
                <label className="col-md-2 form-control-label" htmlFor="text-input">Chèque n°</label>
                <div className="col-md-8">
                    <Field
                        component="input"
                        type="text"
                        id="text-input"
                        name="text-input"
                        className="form-control"
                        placeholder="" />
                </div>
                <div className="col-md-2">
                </div>
                <label className="col-md-2 form-control-label" htmlFor="text-input">Somme</label>
                <div className="col-md-8">
                    <Field
                        component="input"
                        type="text"
                        id="text-input"
                        name="text-input"
                        className="form-control"
                        placeholder="" />
                </div>
                <div className="col-md-2"/>
                <label className="col-md-2 form-control-label" htmlFor="text-input">Date d'encaissement</label>
                <div className="col-md-8">
                    <Field
                        component="input"
                        type="text"
                        id="text-input"
                        name="text-input"
                        className="form-control"
                        placeholder="" />
                </div>
            </div>
            </div>
        ))
        } </div>
)

let filtered_with_type_paiement = (type_paiement) => (
    type_paiement === "cheque" ? <FieldArray name="cheques" component={renderCheques} /> : null
)

let filter_with_category_and_nb_of_classes = (categorie, cours, liste) => {
    console.log("I received category ", categorie, " cours ", cours, " liste ", liste)
    return (
        PRIX_COURS.filter((element) =>
            !categorie || (element.categorie === categorie && cours && cours.length === element.frequence))
    )
}


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
                        <label className="col-md-3 form-control-label" htmlFor="text-input">Somme</label>
                        <div className="col-md-9">
                            <Field component="select" id="select" name="selectPrix" className="form-control">
                                {filter_with_category_and_nb_of_classes(categorie, cours, PRIX_COURS).map((c, idx) => (
                                    <option key={idx} value={c.prix}>{c.prix} € : {c.categorie}, {c.formeLongue}</option>
                                ))}
                            </Field>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="text-input">Moyen de paiement</label>
                        <div className="col-md-9">
                            <Field component="select" id="multiple-select" name="selectTypePaiement" className="form-control">
                                <option name="typePaiement" value="">Dérouler...</option>
                                <option name="typePaiement" value="cheque">Chèque</option>
                                <option name="typePaiement" value="liquide">Liquide</option>
                                <option name="typePaiement" value="virement">Virement</option>
                            </Field>
                        </div>
                    </div>
                    {filtered_with_type_paiement(typePaiement)}
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