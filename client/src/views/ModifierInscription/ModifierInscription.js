import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {NavLink} from 'react-router-dom';

const PAIEMENT = {
    "EVEIL_1": 175,
    "ENFANT_1": 185,
    "ENFANT_2": 308,
    "ADO_1": 195,
    "ADO_2": 325,
    "ADULTE_1": 220,
    "ADULTE_2": 359
}

const calculeCombienManque = (eleve) => {
    if (eleve.paiements.length === 0) {
        return "la totalité"
    } else {
        let sommedue = eleve.somme_totale === null
            ? PAIEMENT[eleve.categorie + "_" + eleve.cours.length]
            : eleve.somme_totale;

        let sommeversee = 0;
        for (var i = 0; i < eleve.paiements.length; i++) {
            sommeversee += eleve.paiements[i].somme;
        }

        if (sommeversee <= sommedue) {
            return (sommedue - sommeversee) + "€";
        }
    }
}

const renderToolTipEleve = (eleve) => {
    let missingItems = ""
    if (!eleve.fiche_adhesion) 
        missingItems += "- Fiche adhésion\n"
    if (!eleve.certificat_medical) 
        missingItems += "- Certificat médical\n"
    if (!eleve.photo) 
        missingItems += "- Photo\n"
    if (!paiementFait(eleve)) 
        missingItems += "- Paiement : manque " + calculeCombienManque(eleve) + "\n"
    if (!paiementEncaisse(eleve)) {
        missingItems += "- " + ditQuoiPasEncaisse(eleve)
    }
    return (missingItems)
}

const paiementEncaisse = (eleve) => {
    if (eleve.paiements.length === 0) {
        return true // si pas de paiements, pas besoin de surveiller l'encaissement...
    } else {
        for (var i = 0; i < eleve.paiements.length; i++) {
            if (eleve.paiements[i].methode === "CHEQUE" & !eleve.paiements[i].encaisse) {
                return false
            }
        }
    }
    return true
}

const ditQuoiPasEncaisse = (eleve) => {
    var quoi = "";
    if (eleve.paiements.length !== 0) {
        for (var i = 0; i < eleve.paiements.length; i++) {
            var paiement = eleve.paiements[i]
            if (paiement.methode === "CHEQUE" & !paiement.encaisse) {
                quoi += "Chèque de " + paiement.somme + "€ non encaissé\n"
            }
        }
    }
    return quoi
}

const paiementFait = (eleve) => {
    if (eleve.paiements.length === 0) {
        return false
    } else {
        let sommeversee = 0;
        for (var i = 0; i < eleve.paiements.length; i++) {
            sommeversee += eleve.paiements[i].somme;
        }

        let sommedue = eleve.somme_totale == null
            ? PAIEMENT[eleve.categorie + "_" + eleve.cours.length]
            : eleve.somme_totale;

        if (sommeversee < sommedue) {
            return false;
        } else {
            return true;
        }
    }
}

const filter_members = (members) => {
    var people = [];
    for (const key of Object.keys(members)) {
        if (members[key].status === 'success') {
            people.push(members[key]);
        }
    }
    return people;
}

const renderEleve = (eleve, idx) => <NavLink
    to={'/inscriptions/' + eleve.id}
    className="nav-link"
    activeClassName="active"
    key={idx}>
    <li>
        <i
            className={determinerIconeStatutInscription(eleve)}
            data-toggle="tooltip"
            data-placement="top"
            title={renderToolTipEleve(eleve)}/>
        <div className="desc">
            <div className="title">{eleve.prenom} {eleve.nom}</div>
            <small>{eleve.surnom}</small>
        </div>
        <div className="actions" style={{
            marginTop: 10 + 'px'
        }}></div>
    </li>
</NavLink>

let determinerIconeStatutInscription = (eleve) => {
    let iconDescription = "";
    if (paiementFait(eleve)) {
        if (dossierComplet(eleve)) {
            iconDescription = "icon-check bg-success"
        } else {
            iconDescription = "icon-bell bg-warning"
        }
    } else {
        iconDescription = "icon-bell bg-danger"
    }
    return iconDescription
}

const dossierComplet = (eleve) => eleve.fiche_adhesion && eleve.certificat_medical && eleve.photo;

class ModifierInscription extends Component {
    render() {
        const {
            members = []
        } = this.props;
        return (
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <h3>
                                <i
                                    className="fa fa-edit"
                                    style={{
                                    marginRight: 10 + 'px'
                                }}></i>
                                Reprendre une inscription</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="col-md-12" id="InscriptionsPreExistantes">
                                <ul className="icons-list">
                                    {filter_members(members).map(renderEleve)}
                                </ul>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

ModifierInscription = reduxForm({form: 'modifierinscription', enableReinitialize: true})(ModifierInscription)

ModifierInscription = connect((state, ownProps) => {

    return {
        ...ownProps,
        members: state.membres
    };
})(ModifierInscription)

export default ModifierInscription;