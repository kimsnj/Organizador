import React, { Component } from 'react';
import { Progress } from 'reactstrap';

class Statistiques extends Component {

    render() {
        return (

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            Statistiques
                        </div>
                        <div className="card-block">
                            <div className="row">
                                <div className="col-sm-12 col-lg-8">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="callout callout-info">
                                                <small className="text-muted">Total des élèves élèves</small><br />
                                                <strong className="h4">163</strong>
                                                <div className="chart-wrapper">
                                                    <canvas id="sparkline-chart-1" width="100" height="30"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="callout callout-danger">
                                                <small className="text-muted">Elèves adultes</small><br />
                                                <strong className="h4">25</strong>
                                                <div className="chart-wrapper">
                                                    <canvas id="sparkline-chart-2" width="100" height="30"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="mt-0" />
                                    <ul className="horizontal-bars">
                                        <li>
                                            <div className="title">
                                                Lundi
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
                                        </li>
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
                                                <small className="text-muted">Présences</small><br />
                                                <strong className="h4">78,623</strong>
                                                <div className="chart-wrapper">
                                                    <canvas id="sparkline-chart-3" width="100" height="30"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="callout callout-success">
                                                <small className="text-muted">Absences</small><br />
                                                <strong className="h4">49,123</strong>
                                                <div className="chart-wrapper">
                                                    <canvas id="sparkline-chart-4" width="100" height="30"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="mt-0" />
                                    <ul className="horizontal-bars type-2">
                                        <li>
                                            <i className="icon-user"></i>
                                            <span className="title">Masculin</span>
                                            <span className="value">50%</span>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="warning" value="50" />
                                            </div>
                                        </li>
                                        <li>
                                            <i className="icon-user-female"></i>
                                            <span className="title">Féminin</span>
                                            <span className="value">50%</span>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="warning" value="50" />
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <span className="title">Eveil</span>
                                            <span className="value">191,235
                                                <span className="text-muted small">(56%)</span>
                                            </span>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="success" value="56" />
                                            </div>
                                        </li>
                                        <li>
                                            <span className="title">Enfants</span>
                                            <span className="value">51,223
                                                <span className="text-muted small">(15%)</span>
                                            </span>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="success" value="15" />
                                            </div>
                                        </li>
                                        <li>
                                            <span className="title">Ados</span>
                                            <span className="value">37,564
                                                <span className="text-muted small">(11%)</span>
                                            </span>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="success" value="11" />
                                            </div>
                                        </li>
                                        <li>
                                            <span className="title">Adultes</span>
                                            <span className="value">27,319
                                                <span className="text-muted small">(8%)</span>
                                            </span>
                                            <div className="bars">
                                                <Progress className="progress-xs" color="success" value="8" />
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

export default Statistiques;