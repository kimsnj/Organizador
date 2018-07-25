import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import {connect} from 'react-redux';
import {Bar, Line} from 'react-chartjs-2';
import {
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Progress,
  Row
} from 'reactstrap';

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const addInArrayAndComputeMean = (array, index, value) => {
  console.log("addInArray, ", array, " index ", index, " value ", value)
  if (array.length >= index) {
    console.log("adding!")
    array[index - 1] = ((array[index - 1]) + value)/2;
  } else {
    console.log("pushing!")
    array.push(value);
  }
}

const createData = (type, dates) => {
  var listePresents = [];
  for (const key of Object.keys(dates)) {
    for (var i = 0; i < dates[key].length; i++) {
      var mapKey = dates[key][i].cours;
      var month = parseInt(dates[key][i].date.split("-")[1]);
      if (mapKey === type) {
        addInArrayAndComputeMean(listePresents, month, dates[key][i].presents.size);
      }
    }
  }
  console.log("createData, for type ", type, " ", listePresents)
  return listePresents;
}

const createLabels = (dates) => {
  var datesdecours = [];
  var firstDay = "";
  var lastDay = "";
  var month = "";

  for (const key of Object.keys(dates)) {

    var dayNb = parseInt(key.split('-')[2]);
    var monthNb = parseInt(key.split('-')[1]);

    if (month === "") {
      month = monthNb
    } else {
      if (month !== monthNb) { // we changed month
        datesdecours.push("Du " + firstDay + "/" + month + " au " + lastDay + "/" + month);
        firstDay = "";
        month = monthNb;
      }
    }

    if (firstDay === "") {
      firstDay = dayNb;
    } else {
      lastDay = dayNb;
    }
  }

  // get last value
  datesdecours.push("Du " + firstDay + "/" + month + " au " + lastDay + "/" + month);
  return datesdecours;
}

const mainChart = (dates) => ({
  labels: createLabels(dates),
  datasets: [
    {
      label: 'Adultes',
      borderColor: "#4dbd74",
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: createData(4, dates)
    }, {
      label: 'Ados',
      backgroundColor: 'transparent',
      borderColor: "#63C2DE",
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: createData(3, dates)
    }, {
      label: 'Enfants',
      backgroundColor: 'transparent',
      borderColor: "#F8CB00",
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      data: createData(2, dates)
    }, {
      label: 'Eveil',
      backgroundColor: 'transparent',
      borderColor: "#F86C6B",
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      data: createData(1, dates)
    }
  ]
});

const mainChartOpts = {
  tooltips: {
    enabled: true,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return {
          backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor
        }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 10,
          stepSize: 2,
          max: 20
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

const compterEleves = (type, cours) => {
  var compteur = 0;
  for (const key of Object.keys(cours)) {
    if (cours[key].categorie === type) {
      compteur += cours[key].inscrits.length;
    }
  }

  return compteur;
}

const pourcentage = (type, cours) => {
  var resultat = 0;
  var nbAdultes = compterEleves("ADULTE", cours);
  var nbAdos = compterEleves("ADO", cours);
  var nbEnfants = compterEleves("ENFANT", cours);
  var nbEveil = compterEleves("EVEIL", cours);
  var nbTotal = nbAdultes + nbAdos + nbEnfants + nbEveil;

  if (type === "ADULTE") {
    resultat = nbAdultes / nbTotal * 100;
  } else if (type === "ADO") {
    resultat = nbAdos / nbTotal * 100;
  } else if (type === "ENFANT") {
    resultat = nbEnfants / nbTotal * 100;
  } else if (type === "EVEIL") {
    resultat = nbEveil / nbTotal * 100;
  }

  return resultat.toPrecision(2);
}

class Dashboard extends Component {
  render() {
    const {
      membres = [],
      cours = [],
      dates = []
    } = this.props;
    return (
      <div className="container">
        <Row>
          <Col xs="12" sm="12" lg="4">
            <Card color="success">
              <div className="card-block">
                <NavLink
                  to={'/appel/' + moment().format('YYYY-MM-DD')}
                  className="nav-link text-white"
                  activeClassName="active">
                  <h3>
                    <i
                      className="fa fa-hand-paper-o"
                      style={{
                      marginRight: 10 + 'px'
                    }}/>
                    Faire l'appel du jour</h3>
                </NavLink>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="12" lg="4">
            <Card color="primary">
              <div className="card-block">
                <NavLink
                  to={'/inscriptions'}
                  className="nav-link text-white"
                  activeClassName="active">
                  <h3>
                    <i
                      className="fa fa-plus-circle"
                      style={{
                      marginRight: 10 + 'px'
                    }}/>
                    Inscrire un nouvel élève</h3>
                </NavLink>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="12" lg="4">
            <Card color="warning">
              <div className="card-block">
                <NavLink
                  to={'/touspaiements'}
                  className="nav-link text-white"
                  activeClassName="active">
                  <h3>
                    <i
                      className="fa fa-money"
                      style={{
                      marginRight: 10 + 'px'
                    }}/>
                    Statut des paiements</h3>
                </NavLink>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col >
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Moyennes de présence par mois</CardTitle>
                    <div className="small text-muted">6 derniers mois</div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    {/* <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button> */}
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      {/* <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
                      </ButtonGroup> */}
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div
                  className="chart-wrapper"
                  style={{
                  height: 300 + 'px',
                  marginTop: 10 + 'px'
                }}>
                  <Line data={mainChart(dates)} options={mainChartOpts} height={300}/>
                </div>
              </CardBody>
              <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Cours Adultes</div>
                    <strong>{compterEleves("ADULTE", cours)} élèves inscrits ({pourcentage("ADULTE", cours)}%)</strong>
                    <Progress className="progress-xs mt-2" color="success" value="40"/>
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Cours Ados</div>
                    <strong>{compterEleves("ADO", cours)} élèves inscrits ({pourcentage("ADO", cours)}%)</strong>
                    <Progress className="progress-xs mt-2" color="info" value="20"/>
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Cours Enfants</div>
                    <strong>{compterEleves("ENFANT", cours)} élèves inscrits ({pourcentage("ENFANT", cours)}%)</strong>
                    <Progress className="progress-xs mt-2" color="warning" value="60"/>
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Cours Eveil</div>
                    <strong>{compterEleves("EVEIL", cours)} élèves inscrits ({pourcentage("EVEIL", cours)}%)</strong>
                    <Progress className="progress-xs mt-2" color="danger" value="80"/>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

Dashboard = connect((state, ownProps) => {

  return {
    ...ownProps,
    membres: state.membres,
    cours: state.cours,
    dates: state.dates
  };
})(Dashboard)

export default Dashboard;
