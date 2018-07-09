import React from 'react';
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

const PAIEMENT = {
  "EVEIL_1": 175,
  "ENFANT_1": 185,
  "ENFANT_2": 308,
  "ADO_1": 195,
  "ADO_2": 325,
  "ADULTE_1": 220,
  "ADULTE_2": 359
}

let TousPaiements = ({members}) => (
  <Card>
    <CardHeader>
      <i className="fa fa-align-justify"></i> Tous les paiements
    </CardHeader>
    <CardBody>
      <Table hover bordered responsive size="sm">
        <thead>
        <tr>
          <th className="text-center">Statut</th>
          <th className="text-center">Personne</th>
          <th className="text-center">Surnom</th>
          <th className="text-center">Somme payée</th>
          <th className="text-center">Manque à payer</th>
          <th className="text-center">Chèque encaissé?</th>
        </tr>
        </thead>
        <tbody>
          {filter_members(members).map(generer_statut_paiement)}  
        </tbody>
      </Table>
  </CardBody>
  </Card>
)

let filter_members = (members) => {
  var people = [];
  for (const key of Object.keys(members)) {
    if (members[key].status === 'success') {
      people.push(members[key]);
    }
  }
  return people;
}

let dit_identite = (membre) => {
  return (membre.prenom + " " + membre.nom)
}

let calcule_somme_versee = (member) => {
  if (member.paiements.length === 0) {
    return "0€"
  } else {    
    let sommeversee = 0;
    for (var i = 0; i < member.paiements.length; i++) {
      sommeversee += member.paiements[i].somme;
    }
    
    return sommeversee + "€";
  }
}

let calcule_combien_manque = (eleve) => {
  if (eleve.paiements.length === 0) {
    return eleve.somme_totale === null ? PAIEMENT[eleve.categorie + "_" + eleve.cours.length] : eleve.somme_totale;
  } else {
    let sommedue = eleve.somme_totale === null ? PAIEMENT[eleve.categorie + "_" + eleve.cours.length] : eleve.somme_totale;
    
    let sommeversee = 0;
    for (var i = 0; i < eleve.paiements.length; i++) {
      sommeversee += eleve.paiements[i].somme;
    }
    
    if (sommeversee <= sommedue) {
      return (sommedue - sommeversee) + "€";
    }
  }
}

let dit_cheque_encaisse = (member) => {
  let reponse = ""
  if (member.paiements.length === 0) {
    reponse = "Pas de paiement" // si pas de paiements, pas besoin de surveiller l'encaissement...
  } else {
    for (var i = 0; i < member.paiements.length; i ++) {
      if (member.paiements[i].methode === "CHEQUE" & !member.paiements[i].encaisse) {
        reponse += "Chèque de " + member.paiements[i].somme + "€ non encaissé"
      }      
    }

    if (reponse == "") {
      reponse += "Oui"
    }
  }
  return reponse
}

const paiementComplet = (eleve) => {
  
    let sommeversee = 0;
    for (var i = 0; i < eleve.paiements.length; i++) {
      sommeversee += eleve.paiements[i].somme;
    }

    let sommedue = eleve.somme_totale == null ? PAIEMENT[eleve.categorie + "_" + eleve.cours.length] : eleve.somme_totale;

    if (sommeversee < sommedue) {
      return false;
    } else {
      return true;
    }
}

let genere_statut = (member) => {
  // Problèmes possibles : 
  // - paiement absent
  // - paiement incomplet
  // - chèque non encaissé
  // - pas de paiement

  // Si pas de paiement, badge rouge "Pas de paiement"
  // Si paiement :
  //    Si paiement incomplet, badge jaune "paiement incomplet"
  //    Si paiement complet :
  //      Si chèque non encaissé, badge gris "chèque à encaisser"
  //      Si chèque encaissé, badge vert "OK"
  if (member.paiements.length === 0) {
    return <Badge color="danger">Pas de paiement</Badge>
  } else {
    if (!paiementComplet(member)) {
      if (dit_cheque_encaisse(member) == "Oui") {
        return <Badge color="warning">Paiement incomplet</Badge>;
      } else {
        return <div><Badge color="warning">Paiement incomplet</Badge><br/><Badge color="info">Chèque à encaisser</Badge></div>;
      }
    } else {
      if (dit_cheque_encaisse(member) == "Oui") {
        return <Badge color="success">OK, payé et chèque encaissé</Badge>;
      } else {
        return <Badge color="info">Chèque à encaisser</Badge>;
      }
    }
  }


  //return paiementFait(member) ? (dit_cheque_encaisse(member) == "Oui" ? <Badge color="success">OK, chèque payé et encaissé</Badge> : <Badge color="warning">Chèque non encaissé</Badge>) : <Badge color="danger">Pas de paiement</Badge>;
}

let generer_statut_paiement= (member) => 
    <tr>
      <td className="text-center ">
        <div>{genere_statut(member)}</div>
      </td>
      <td className="text-center ">
        <div>{dit_identite(member)}</div>
      </td>
      <td className="text-center">
        <div>{member.surnom == null ? "N/A" : member.surnom}</div>
      </td>
      <td className="text-center">
        <div>{calcule_somme_versee(member)}</div>
      </td>
      <td className="text-center">
          <div>{calcule_combien_manque(member)}</div>
      </td>
      <td className="text-center">
          <div>{dit_cheque_encaisse(member)}</div>
      </td>
    </tr>
 
TousPaiements = reduxForm({
    form: 'touspaiements',
    }
  )(TousPaiements)
  
TousPaiements = connect((state, ownProps) => {
  console.log("coucou ", state.membres)
  return { members : state.membres};
})(TousPaiements)

export default TousPaiements;