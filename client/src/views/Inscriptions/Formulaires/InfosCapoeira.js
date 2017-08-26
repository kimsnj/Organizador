import React from 'react';
import { connect } from 'react-redux'
import { Field, formValueSelector } from 'redux-form'

var COURS = [
    { id: 1, jour: 'Lundi', horaire: '17h-18h30', lieu: 'Ranguin', type: 'adolescents' },
    { id: 2, jour: 'Lundi', horaire: '20h-21h30', lieu: 'Ranguin', type: 'adultes' },
    { id: 3, jour: 'Mercredi', horaire: '18h30-19h30', lieu: 'Pégomas', type: 'adolescents' },
    { id: 4, jour: 'Mercredi', horaire: '17h-18h15', lieu: 'Auribeau', type: 'enfants' },
    { id: 5, jour: 'Jeudi', horaire: '17h-18h', lieu: 'Pégomas', type: 'eveil' },
    { id: 6, jour: 'Jeudi', horaire: '18h-19h30', lieu: 'Pégomas', type: 'enfants' },
    { id: 7, jour: 'Jeudi', horaire: '20h-21h30', lieu: 'Auribeau', type: 'adultes' },
    { id: 8, jour: 'Vendredi', horaire: '17h-18h', lieu: 'Pégomas', type: 'eveil' },
    { id: 9, jour: 'Vendredi', horaire: '18h-19h', lieu: 'Pégomas', type: 'all' }
];

var CORDES = [
    { couleur : 'sem corda', type: 'all'},
    { couleur : '5 ans', type: 'enfants'},
    { couleur : '6 ans', type: 'enfants'},
    { couleur : '7 ans', type: 'enfants'},
    { couleur : '8 ans', type: 'enfants'},
    { couleur : '9 ans', type: 'enfants'},
    { couleur : '10 ans', type: 'enfants'},
    { couleur : '11 ans', type: 'adolescents'},
    { couleur : '12 ans', type: 'adolescents'},
    { couleur : '13 ans', type: 'adolescents'},
    { couleur : '14 ans', type: 'adolescents'},
    { couleur : '15 ans', type: 'adolescents'},
    { couleur : '16 ans', type: 'adolescents'},
    { couleur : 'Azul', type: 'adultes'},
    { couleur : 'Laranja', type: 'adultes'},
    { couleur : 'Laranja Marron', type: 'adultes'},
    { couleur : 'Marron', type: 'adultes'},
    { couleur : 'Marron Roxa', type: 'adultes'},
];

let filtered_with_all = (categorie, liste) => (
    
    liste.filter((element) => (
        !categorie || element.type === categorie || element.type === 'all'
    ))
)

let InfosCapoeira = ({ categorie }) => (
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
                                <Field component="input" type="radio" id="inline-radio1" name="categorie" value="eveil" /> Eveil
                            </label>
                            <label className="radio-inline" htmlFor="inline-radio2" style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id="inline-radio2" name="categorie" value="enfants" /> Enfants
                                </label>
                            <label className="radio-inline" htmlFor="inline-radio3" style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id="inline-radio3" name="categorie" value="adolescents" /> Adolescents
                                </label>
                            <label className="radio-inline" htmlFor="inline-radio3" style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id="inline-radio3" name="categorie" value="adultes" /> Adultes
                                </label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="multiple-select">Cours</label>
                        <div className="col-md-9">
                            <Field component="select" id="multiple-select" name="cours" className="form-control" size="5" multiple>
                                {
                                    filtered_with_all(categorie, COURS)
                                        .map((c, idx) => (
                                            <option value={c.id}>{c.jour} {c.horaire} à {c.lieu} </option>
                                        ))
                                }
                            </Field>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="select">Corde</label>
                        <div className="col-md-9">
                            <Field component="select" id="select" name="corde" className="form-control">
                                {
                                    filtered_with_all(categorie, CORDES)
                                        .map((c, idx) => (
                                            <option value={c.couleur}>{c.couleur}</option>
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
            categorie
        }
    }
)(InfosCapoeira)

export default InfosCapoeira;