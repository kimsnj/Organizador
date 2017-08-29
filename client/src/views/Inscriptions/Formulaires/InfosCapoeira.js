import React from 'react';
import { connect } from 'react-redux'
import { Field, formValueSelector } from 'redux-form'

var key_eveil = "EVEIL"
var key_enfants = "ENFANT"
var key_ado = "ADO"
var key_adulte = "ADULTE"

var CORDES = [
    { couleur: 'Sem corda', categorie: 'all' },
    { couleur: '5 ans', categorie: key_enfants },
    { couleur: '6 ans', categorie: key_enfants },
    { couleur: '7 ans', categorie: key_enfants },
    { couleur: '8 ans', categorie: key_enfants },
    { couleur: '9 ans', categorie: key_enfants },
    { couleur: '10 ans', categorie: key_enfants },
    { couleur: '11 ans', categorie: key_ado },
    { couleur: '12 ans', categorie: key_ado },
    { couleur: '13 ans', categorie: key_ado },
    { couleur: '14 ans', categorie: key_ado },
    { couleur: '15 ans', categorie: key_ado },
    { couleur: '16 ans', categorie: key_ado },
    { couleur: 'Azul', categorie: key_adulte },
    { couleur: 'Laranja', categorie: key_adulte },
    { couleur: 'Laranja Marron', categorie: key_adulte },
    { couleur: 'Marron', categorie: key_adulte },
    { couleur: 'Marron Roxa', categorie: key_adulte },
];

let filtered_with_all = (categorie, liste) => ( 
    liste.filter((element) => (
        !categorie || element.categorie === categorie || element.categorie === 'all'
    )
)
)

let InfosCapoeira = ({categorie, cours}) => (
    <div className="row">
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <h4><i className="fa fa-mortar-board"></i> Informations cours</h4>
                </div>
                <div className="card-block">
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="text-input">Apellido</label>
                        <div className="col-md-9">
                            <Field component="input"
                                type="text"
                                id="text-input"
                                name="surnom"
                                className="form-control"
                                placeholder="" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label">Type de cours</label>
                        <div className="col-md-9">
                            <label className="radio-inline" htmlFor="inline-radio1">
                                <Field component="input" type="radio" id="inline-radio1" name="categorie" value={key_eveil}/> Eveil
                            </label>
                            <label className="radio-inline" htmlFor="inline-radio2" style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id="inline-radio2" name="categorie" value={key_enfants}/> Enfants
                                </label>
                            <label className="radio-inline" htmlFor="inline-radio3" style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id="inline-radio3" name="categorie" value={key_ado}/> Adolescents
                                </label>
                            <label className="radio-inline" htmlFor="inline-radio3" style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id="inline-radio3" name="categorie" value={key_adulte}/> Adultes
                                </label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="multiple-select">Cours</label>
                        <div className="col-md-9">
                            {/* Filtered from database values */}
                            <Field component="select" id="multiple-select-classes" name="cours" className="form-control" size="5" multiple>
                                {
                                    filtered_with_all(categorie, Object.values(cours))
                                        .map((c, idx) => (
                                            <option key={idx} value={c.id}>{c.categorie}, {c.horaire} à {c.salle} </option>
                                        ))
                                }
                            </Field>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="select">Corde</label>
                        <div className="col-md-9">
                            {/* Filtered from static application values */}
                            <Field component="select" id="select" name="corde" className="form-control">
                                {
                                    filtered_with_all(categorie, CORDES)
                                        .map((c, idx) => (
                                            <option key={idx} value={c.couleur}>{c.couleur}</option>
                                        ))
                                }
                            </Field>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label">Taille d'abada</label>
                        <div className="col-md-9">
                            <label className="radio-inline" htmlFor="inline-radio1">
                                <Field component="input" type="radio" id="inline-radio1" name="taille_abada" value="P" /> P
                                </label>
                            <label className="radio-inline" htmlFor="inline-radio2" style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id="inline-radio2" name="taille_abada" value="M" /> M
                                </label>
                            <label className="radio-inline" htmlFor="inline-radio3" style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id="inline-radio3" name="taille_abada" value="G" /> G
                                </label>
                            <label className="radio-inline" htmlFor="inline-radio3" style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id="inline-radio3" name="taille_abada" value="GG" /> GG
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)


const selector = formValueSelector('inscriptions')
InfosCapoeira = connect(
    state => {
        const categorie = selector(state, 'categorie') // a travers la fonctionnalite selector de reduxform, accède au champ dont name="categorie"
        return {
            categorie,
            cours: state.cours
        }
    }
)(InfosCapoeira)

export default InfosCapoeira;