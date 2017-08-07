import React, {Component} from 'react';

var COURS = {
  '1': {id: 1, jour: 'Lundi', horaire: '17h-18h30', lieu: 'Ranguin', type: 'Adolescents'},
  '2': {id: 2, jour: 'Lundi', horaire: '20h-21h30', lieu: 'Ranguin', type: 'Adultes'},
  '3': {id: 3, jour: 'Mercredi', horaire: '18h30-19h30', lieu: 'Pégomas', type: 'Ados'},
  '4': {id: 4, jour: 'Mercredi', horaire: '17h-18h15', lieu: 'Auribeau', type: 'Enfants'},
  '5': {id: 5, jour: 'Jeudi', horaire: '17h-18h', lieu: 'Pégomas', type: 'Eveil'},
  '6': {id: 6, jour: 'Jeudi', horaire: '18h-19h30', lieu: 'Pégomas', type: 'Enfants'},
  '7': {id: 7, jour: 'Jeudi', horaire: '20h-21h30', lieu: 'Auribeau', type: 'Adultes'},
  '8': {id: 8, jour: 'Vendredi', horaire: '17h-18h', lieu: 'Pégomas', type: 'Eveil'},
  '9': {id: 9, jour: 'Vendredi', horaire: '18h-19h', lieu: 'Pégomas', type:  'Roda'}
};

class InfosCapoeira extends Component {
    constructor(props) {
        super(props);
        this.onCoursChanged = this.onCoursClicked.bind(this);
        this.onTypeCoursChanged = this.onTypeCoursChanged.bind(this);
        this.onCordaSelected = this.onCordaSelected.bind(this);
        this.onTailleAbadaChanged = this.onTailleAbadaChanged.bind(this);
    }

    onTypeCoursChanged(e) {
        console.log('onTypeCoursChanged'); // TODO sort...
    }

    onCoursClicked(e) {
        console.log('onCoursClicked');
    }

    onCordaSelected(e) {
        console.log('onCordaSelected');
    }

    onTailleAbadaChanged(e) {
        console.log('onTailleAbadaChanged ' + e.target.value);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4><i className="fa fa-mortar-board"></i> Informations cours</h4>
                        </div>
                        <div className="card-block">
                            <form
                                action=""
                                method="post"
                                encType="multipart/form-data"
                                className="form-horizontal">
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Apellido</label>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            id="text-input"
                                            name="text-input"
                                            className="form-control"
                                            placeholder="Champ optionnel"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label">Type de cours</label>
                                    <div className="col-md-9">
                                        <label className="radio-inline" htmlFor="inline-radio1">
                                            <input type="radio" id="inline-radio1" name="inline-radios" value="eveil" onChange={this.onTypeCoursChanged}/> Eveil 
                                        </label>
                                        <label className="radio-inline" htmlFor="inline-radio2" style={{marginLeft: 5 + 'px'}}>
                                            <input type="radio" id="inline-radio2" name="inline-radios" value="enfants" onChange={this.onTypeCoursChanged}/> Enfants 
                                        </label>
                                        <label className="radio-inline" htmlFor="inline-radio3" style={{marginLeft: 5 + 'px'}}>
                                            <input type="radio" id="inline-radio3" name="inline-radios" value="adolescents" onChange={this.onTypeCoursChanged}/> Adolescents 
                                        </label>
                                        <label className="radio-inline" htmlFor="inline-radio3" style={{marginLeft: 5 + 'px'}}>
                                            <input type="radio" id="inline-radio3" name="inline-radios" value="adultes" onChange={this.onTypeCoursChanged}/> Adultes 
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="multiple-select">Cours</label>
                                    <div className="col-md-9">
                                    <select id="multiple-select" name="multiple-select" className="form-control" size="5" multiple>
                                        <option value="1" onClick={this.onCoursClicked}>TODO liste intelligente en fonction du type de cours choisi</option>
                                        <option value="2" onClick={this.onCoursClicked}>Lundi 17h-18h30 Ranguin Adolescents</option>
                                        <option value="3" onClick={this.onCoursClicked}>Lundi 20h-21h30 Ranguin Adultes</option>
                                        <option value="4" onClick={this.onCoursClicked}>Mercredi 18h30-19h30 Pégomas Ados</option>
                                        <option value="5" onClick={this.onCoursClicked}>Mercredi 17h-18h15 Auribeau Enfants débutants</option>
                                        <option value="6" onClick={this.onCoursClicked}>Jeudi 17h-18h Pégomas Eveil</option>
                                        <option value="7" onClick={this.onCoursClicked}>Jeudi 18h-19h30 Pégomas Enfants avancés</option>
                                        <option value="8" onClick={this.onCoursClicked}>Jeudi 20-21h30 Auribeau Adultes</option>
                                        <option value="9" onClick={this.onCoursClicked}>Vendredi 17h-18h Pégomas Eveil</option>
                                        <option value="10" onClick={this.onCoursClicked}>Vendredi 18h-19h Pégomas Roda</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="select">Corde</label>
                                    <div className="col-md-9">
                                        <select id="select" name="select" className="form-control">
                                            <option value="0" onClick={this.onCordaSelected}>Dérouler...</option>
                                            <option value="semCorda" onClick={this.onCordaSelected}>Sem corda</option>
                                            <option value="azul" onClick={this.onCordaSelected}>Azul</option>
                                            <option value="laranja" onClick={this.onCordaSelected}>Laranja</option>
                                            <option value="laranjaMarron" onClick={this.onCordaSelected}>Laranja Marron</option>
                                            <option value="marron" onClick={this.onCordaSelected}>Marron</option>
                                            <option value="marronRoxa" onClick={this.onCordaSelected}>Marron Roxa</option>
                                        </select>
                                        <span className="help-block">TODO : changer la liste en fonction du type de cours</span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label">Taille d'abada</label>
                                    <div className="col-md-9">
                                        <label className="radio-inline" htmlFor="inline-radio1">
                                            <input type="radio" id="inline-radio1" name="inline-radios" value="P" onClick={this.onTailleAbadaChanged}/> P 
                                        </label>
                                        <label className="radio-inline" htmlFor="inline-radio2" style={{marginLeft: 5 + 'px'}}>
                                            <input type="radio" id="inline-radio2" name="inline-radios" value="M" onClick={this.onTailleAbadaChanged}/> M 
                                        </label>
                                        <label className="radio-inline" htmlFor="inline-radio3" style={{marginLeft: 5 + 'px'}}>
                                            <input type="radio" id="inline-radio3" name="inline-radios" value="G" onClick={this.onTailleAbadaChanged}/> G 
                                        </label>
                                        <label className="radio-inline" htmlFor="inline-radio3" style={{marginLeft: 5 + 'px'}}>
                                            <input type="radio" id="inline-radio3" name="inline-radios" value="GG" onClick={this.onTailleAbadaChanged}/> GG 
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfosCapoeira;