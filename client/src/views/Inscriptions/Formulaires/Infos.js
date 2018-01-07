import React from 'react';
import { connect } from 'react-redux'
import { Field, formValueSelector } from 'redux-form'

var key_eveil = "EVEIL"
var key_enfants = "ENFANT"
var key_ado = "ADO"
var key_adulte = "ADULTE"
var all_keys_with_order = [key_eveil, key_enfants, key_ado, key_adulte]

var CORDES = [
    { couleur: 'Sem corda', categorie: 'all' },
    { couleur: '5 ans : Pointes bleues', categorie: key_enfants },
    { couleur: '6 ans : Pointes bleu-jaune', categorie: key_enfants },
    { couleur: '7 ans : Pointes jaunes', categorie: key_enfants },
    { couleur: '8 ans : Pointes jaune-orange', categorie: key_enfants },
    { couleur: '9 ans : Pointes orange', categorie: key_enfants },
    { couleur: '10 ans : Pointes orange-bleu', categorie: key_enfants },
    { couleur: '11 ans : Blanc-bleu', categorie: key_ado },
    { couleur: '12 ans : Jaune-bleu', categorie: key_ado },
    { couleur: '13 ans : Blanc-jaune', categorie: key_ado },
    { couleur: '14 ans : Jaune-orange', categorie: key_ado },
    { couleur: '15 ans : Blanc-orange', categorie: key_ado },
    { couleur: '16 ans : Orange-bleu', categorie: key_ado },
    { couleur: 'Bleu', categorie: key_adulte },
    { couleur: 'Orange', categorie: key_adulte },
    { couleur: 'Orange-marron', categorie: key_adulte },
    { couleur: 'Marron', categorie: key_adulte },
    { couleur: 'Marron-Violet', categorie: key_adulte },
];

var SEMAINE = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']

let filtered_with_all = (categorie, liste, adjacent) => {
    if (adjacent) {
        var next_cat = all_keys_with_order[all_keys_with_order.indexOf(categorie) + 1]
    }
    return (
        liste.filter((element) => (
            !categorie || element.categorie === categorie || element.categorie === 'all' || (adjacent && element.categorie === next_cat)
        )))
}

// eslint-disable-next-line
let filter_all_valid_members = (members) => {
    var people = [];
    for (const key of Object.keys(members)) {
        if (members[key].status === 'success') {
            people.push(members[key]);
        }
    }
    return people;
}

const BasicLabel = ({ labelText, fieldName }) => (
    <label className="col-md-3 form-control-label" htmlFor={fieldName}>{labelText}</label>
)

const BasicInputField = ({ fieldName, fieldType = "input", fieldPlaceHolder = "" }) => (
    <div className="col-md-9">
        <Field
            component="input"
            id={fieldName}
            type={fieldType}
            name={fieldName}
            className="form-control"
            placeholder={fieldPlaceHolder} />
    </div>
)

const BasicLabelAndInput = (props) =>
    <div className="form-group row">
        <BasicLabel {...props} />
        <BasicInputField {...props} />
    </div>

const renderContactAdule = () =>
    <div>
        <BasicLabelAndInput labelText="Téléphone" fieldName="telephone" />

        <BasicLabelAndInput labelText="Nom contact urgence" fieldName="contact_nom" />
        <BasicLabelAndInput labelText="Téléphone urgence" fieldName="contact_principal_tel" />
    </div>

const renderContactMineur = () =>
    <div>

        <BasicLabelAndInput labelText="Nom du tuteur" fieldName="contact_nom" />
        <BasicLabelAndInput labelText="Téléphone principal" fieldName="contact_principal_tel" />
        <BasicLabelAndInput labelText="Téléphone secondaire" fieldName="contact_secondaire_tel" />

        <BasicLabelAndInput labelText="Téléphone de l'élève" fieldName="telephone" />
    </div>


let Infos = ({ categorie, droit_image, members, load, cours }) => (
    <div className="row">
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <h4>
                        <i className="fa fa-user" style={{ marginRight: 5 + 'px' }}></i>
                        Informations élève</h4>
                </div>
                <div className="card-block">
                    <div className="form-group row">
                        <BasicLabel labelText="Catégorie de l'élève" />
                        <div className="col-md-9">
                            <label className="radio-inline" htmlFor={key_eveil}>
                                <Field component="input" type="radio" id={key_eveil} name="categorie" value={key_eveil} /> Eveil
                            </label>
                            <label className="radio-inline" htmlFor={key_enfants} style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id={key_enfants} name="categorie" value={key_enfants} /> Enfant
                                </label>
                            <label className="radio-inline" htmlFor={key_ado} style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id={key_ado} name="categorie" value={key_ado} /> Adolescent
                                </label>
                            <label className="radio-inline" htmlFor={key_adulte} style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id={key_adulte} name="categorie" value={key_adulte} /> Adulte
                                </label>
                        </div>
                    </div>
                    <BasicLabelAndInput labelText="Nom" fieldName="nom" />
                    <BasicLabelAndInput labelText="Prénom" fieldName="prenom" />
                    <BasicLabelAndInput labelText="Date de naissance" fieldName="date_naissance" fieldType="date" />
                    <BasicLabelAndInput labelText="Apellido" fieldName="surnom" fieldPlaceHolder="Optionnel" />
                    <div className="form-group row">
                        <BasicLabel labelText="Corde" />
                        <div className="col-md-9">
                            <Field component="select" id="select" name="corde" className="form-control">
                                {
                                    filtered_with_all(categorie, CORDES, false)
                                        .map((c, idx) => (
                                            <option key={idx} value={c.couleur}>{c.couleur}</option>
                                        ))
                                }
                            </Field>
                        </div>
                    </div>
                    <div className="form-group row">
                        <BasicLabel labelText="Taille d'abada" />
                        <div className="col-md-9">
                            <label className="radio-inline" htmlFor="taille_abada_P">
                                <Field component="input" type="radio" id="taille_abada_P" name="taille_abada" value="P" /> P
                            </label>
                            <label className="radio-inline" htmlFor="taille_abada_M" style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id="taille_abada_M" name="taille_abada" value="M" /> M
                            </label>
                            <label className="radio-inline" htmlFor="taille_abada_G" style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id="taille_abada_G" name="taille_abada" value="G" /> G
                            </label>
                            <label className="radio-inline" htmlFor="taille_abada_GG" style={{ marginLeft: 5 + 'px' }}>
                                <Field component="input" type="radio" id="taille_abada_GG" name="taille_abada" value="GG" /> GG
                            </label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <BasicLabel labelText="Adresse" />
                        <div className="col-md-9">
                            <Field
                                component="textarea"
                                name="adresse"
                                rows="4"
                                className="form-control" />
                        </div>
                    </div>
                    <hr />
                    {(categorie === key_adulte) ? renderContactAdule() : renderContactMineur()}
                    <hr />

                    <div className="form-group row">
                        <BasicLabel labelText="Droit à l'image" fieldName="droit_image" />
                        <div className="col-md-9">
                            <label className="form-check-label">
                                <Field
                                    component="input"
                                    name="droit_image"
                                    id="droit_image"
                                    className="form-check-input"
                                    style={{
                                        marginRight: 5 + 'px'
                                    }}
                                    type="checkbox" />
                            </label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label" htmlFor="multiple-select">Cours</label>
                        <div className="col-md-9">
                            {/* Filtered from database values */}
                            <Field component="select" id="multiple-select-classes" name="cours" className="form-control" size="5" multiple>
                                {
                                    filtered_with_all(categorie, Object.values(cours), true)
                                        .map((c, idx) => (
                                            <option key={idx} value={c.id}>{c.categorie}, le {SEMAINE[c.jour]} à {c.horaire}, à {c.salle}</option>
                                        ))
                                }
                            </Field>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const selector = formValueSelector('inscriptions')
Infos = connect(
    (state, ownProps) => {
        const categorie = selector(state, 'categorie')
        const droit_image = selector(state, 'droit_image')

        return {
            categorie,
            droit_image,
            members: state.membres,
            cours: state.cours
        }
    }
)(Infos)

export default Infos;