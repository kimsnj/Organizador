import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

var key_eveil = "EVEIL"
var key_enfants = "ENFANT"
var key_ado = "ADO"
var key_adulte = "ADULTE"

const countMembers = (membres, categorie) => {
    var counter = 0;
    for (var id in membres) {
        if (membres.hasOwnProperty(id)) {
            if (membres[id].categorie === categorie) {
                counter++;
            }
        }
    }
    return counter;
}

const countPercentageMembers = (membres, categorie) => {
    var nb_categorie = countMembers(membres, categorie);
    var nb_total = Object.keys(membres).length;
    return nb_categorie * 100 / nb_total;
}

const count_surnoms = (membres, withSurnom) => {
    var counter = 0;
    var nb_total = Object.keys(membres).length;
    var answer = 0;
    
    if (nb_total !== 0) {
        for (var id in membres) {
            if (membres.hasOwnProperty(id)) {
                if (membres[id].surnom) {
                    counter++;
                }
            }
        }

        if (withSurnom) {
            answer = counter * 100 / nb_total;
        } else {
            answer = 100 - (counter * 100 / nb_total);
        }
    } 
    return answer;
}

class Statistiques extends Component {
    render() {
        const { membres = [] } = this.props;
        const { cours = [] } = this.props;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4><i className="fa fa-area-chart" style={{ marginRight: 10 + 'px' }} ></i>Statistiques</h4>
                        </div>
                        <div className="card-block">
                            <div className="row">
                                <div className="col-sm-12 col-lg-8">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="callout callout-info">
                                                <small className="text-muted">Nombre total d'élèves</small><br />
                                                <strong className="h4">{Object.keys(membres).length}</strong>
                                                <div className="chart-wrapper">
                                                    <canvas id="sparkline-chart-1" width="100" height="30"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row">
                                        <div className="col-sm-6">
                                            <div className="callout callout-danger">
                                                <small className="text-muted">Nombre d'adultes</small><br />
                                                <strong className="h4">{countMembers(membres, key_adulte)}</strong>
                                                <div className="chart-wrapper">
                                                    <canvas id="sparkline-chart-2" width="100" height="30"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="callout callout-danger">
                                                <small className="text-muted">Nombre d'ados</small><br />
                                                <strong className="h4">{countMembers(membres, key_ado)}</strong>
                                                <div className="chart-wrapper">
                                                    <canvas id="sparkline-chart-2" width="100" height="30"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="callout callout-danger">
                                                <small className="text-muted">Nombre d'enfants</small><br />
                                                <strong className="h4">{countMembers(membres, key_enfants)}</strong>
                                                <div className="chart-wrapper">
                                                    <canvas id="sparkline-chart-2" width="100" height="30"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="callout callout-danger">
                                                <small className="text-muted">Nombre d'éveil</small><br />
                                                <strong className="h4">{countMembers(membres, key_eveil)}</strong>
                                                <div className="chart-wrapper">
                                                    <canvas id="sparkline-chart-2" width="100" height="30"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <hr className="mt-0" />
                                    <ul className="horizontal-bars">
                                        <li>
                                            <div className="title">
                                                Lundi ados
                                            </div>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="info" value="34" />
                                                <Progress className="progress-xs" color="danger" value="78" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="title">
                                                Mardi
                                            </div>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="info" value="56" />
                                                <Progress className="progress-xs" color="danger" value="94" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="title">
                                                Mercredi
                                            </div>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="info" value="12" />
                                                <Progress className="progress-xs" color="danger" value="67" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="title">
                                                Jeudi
                                            </div>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="info" value="43" />
                                                <Progress className="progress-xs" color="danger" value="91" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="title">
                                                Vendredi
                                            </div>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="info" value="22" />
                                                <Progress className="progress-xs" color="danger" value="73" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="title">
                                                Saturday
                                            </div>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="info" value="53" />
                                                <Progress className="progress-xs" color="danger" value="82" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="title">
                                                Sunday
                                            </div>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="info" value="9" />
                                                <Progress className="progress-xs" color="danger" value="69" />
                                            </div>
                                        </li> */}
                                        <li className="legend">
                                            <span className="badge badge-pill badge-info"></span>
                                            <small>New clients</small>
                                            &nbsp;
                                            <span className="badge badge-pill badge-danger"></span>
                                            <small>Recurring clients</small>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="callout callout-warning">
                                                <small className="text-muted">Présences sur l'année</small><br />
                                                <strong className="h4">A faire</strong>
                                                <div className="chart-wrapper">
                                                    <canvas id="sparkline-chart-3" width="100" height="30"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="callout callout-success">
                                                <small className="text-muted">Absences sur l'année</small><br />
                                                <strong className="h4">A faire</strong>
                                                <div className="chart-wrapper">
                                                    <canvas id="sparkline-chart-4" width="100" height="30"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="mt-0" />
                                    <ul className="horizontal-bars type-2">
                                        <li>
                                            <i className="icon-check"></i>
                                            <span className="title">Avec surnom</span>
                                            <span className="value">
                                                <span className="text-muted small"> ({count_surnoms(membres, true).toPrecision(2)}%)</span>
                                            </span>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="warning" value={count_surnoms(membres, true)} />
                                            </div>
                                        </li>
                                        <li>
                                            <i className="icon-question"></i>
                                            <span className="title">Sans surnom</span>
                                            <span className="value">
                                                <span className="text-muted small"> ({count_surnoms(membres, false).toPrecision(2)}%)</span>
                                            </span>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="warning" value={count_surnoms(membres, false)} />
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <b>Répartition des élèves par âge</b>
                                        <li>
                                            <span className="title">Eveil</span>
                                            <span className="value">{countMembers(membres, key_eveil)} 
                                                <span className="text-muted small"> ({countPercentageMembers(membres, key_eveil).toPrecision(2)}%)</span>
                                            </span>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="success" value={countPercentageMembers(membres, key_eveil)} />
                                            </div>
                                        </li>
                                        <li>
                                            <span className="title">Enfants</span>
                                            <span className="value">{countMembers(membres, key_enfants)} 
                                                <span className="text-muted small"> ({countPercentageMembers(membres, key_enfants).toPrecision(2)}%)</span>
                                            </span>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="success" value={countPercentageMembers(membres, key_enfants)} />
                                            </div>
                                        </li>
                                        <li>
                                            <span className="title">Ados</span>
                                            <span className="value">{countMembers(membres, key_ado)} 
                                                <span className="text-muted small"> ({countPercentageMembers(membres, key_ado).toPrecision(2)}%)</span>
                                            </span>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="success" value={countPercentageMembers(membres, key_ado)} />
                                            </div>
                                        </li>
                                        <li>
                                            <span className="title">Adultes</span>
                                            <span className="value">{countMembers(membres, key_adulte)} 
                                                <span className="text-muted small"> ({countPercentageMembers(membres, key_adulte).toPrecision(2)}%)</span>
                                            </span>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="success" value={countPercentageMembers(membres, key_adulte)} />
                                            </div>
                                        </li>
                                        <li className="divider text-center">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-link text-muted"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title=""
                                                data-original-title="show more">
                                                <i className="icon-options"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <br />
                            <table className="table table-hover table-outline mb-0 hidden-sm-down">
                                <thead className="thead-default">
                                    <tr>
                                        <th className="text-center">
                                            Classement présence
                                        </th>
                                        <th>Prénom</th>
                                        <th className="text-center">Apellido</th>
                                        <th>Type</th>
                                        <th className="text-center">Présences</th>
                                        <th>Absences</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">
                                            1
                                        </td>
                                        <td>
                                            <div>Pascale</div>
                                        </td>
                                        <td className="text-center">
                                            <div>Violinha</div>
                                        </td>
                                        <td>
                                            <div>Adulte</div>
                                        </td>
                                        <td className="text-center">
                                            35
                                        </td>
                                        <td>
                                            <div>5</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            2
                                        </td>
                                        <td>
                                            <div>Raph</div>
                                        </td>
                                        <td className="text-center">
                                            <div>Marinhero</div>
                                        </td>
                                        <td>
                                            <div>Adulte</div>
                                        </td>
                                        <td className="text-center">
                                            30
                                        </td>
                                        <td>
                                            <div>10</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Statistiques = reduxForm({
    form: 'statistiques',
    enableReinitialize: true
  })(Statistiques)

Statistiques = connect((state, ownProps) => {

    return {
        ...ownProps,
        membres: state.membres,
        cours: state.cours
      };
    })(Statistiques)
    

export default Statistiques;