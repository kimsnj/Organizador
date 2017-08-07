import React, { Component } from 'react';

class Paiement extends Component {
    constructor(props) {
        super(props);
        this.onSommeChanged = this.onSommeChanged.bind(this);
        this.onMoyenChanged = this.onMoyenChanged.bind(this);
        this.state = {
            cheque: [],
        };
    }

    onMoyenChanged(e) {
        console.log("onMoyenChanged");
    }

    onSommeChanged(e) {
        console.log("onSommeChanged");
    }

    render() {
            return (        
            <div className="row">
                <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                    <h4><i className="fa fa-money"></i> Paiement</h4>
                    </div>
                    <div className="card-block">
                    <form
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        className="form-horizontal">
                        <div className="form-group row">
                            <label className="col-md-3 form-control-label" htmlFor="text-input">Somme</label>
                            <div className="col-md-9">
                            <select id="select" name="select" className="form-control">
                                <option value="0">Dérouler... TODO préproposer valeur en fonction des choix antérieurs</option>
                                <option value="175" onChange={this.onSommeChanged}>175€ (Eveil, 1 fois par semaine)</option>
                                <option value="185" onChange={this.onSommeChanged}>185€ (Enfant, 1 fois par semaine)</option>
                                <option value="195" onChange={this.onSommeChanged}>195€ (Adolescent, 1 fois par semaine)</option>
                                <option value="220" onChange={this.onSommeChanged}>220€ (Adulte, 1 fois par semaine)</option>
                                <option value="308" onChange={this.onSommeChanged}>308€ (Enfant, 2 fois par semaine)</option>
                                <option value="325" onChange={this.onSommeChanged}>325€ (Adolescent, 2 fois par semaine)</option>
                                <option value="395" onChange={this.onSommeChanged}>359€ (Adulte, 2 fois par semaine)</option>
                            </select>
                            <span className="help-block">IDEE : champ libre?</span>
                        </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 form-control-label" htmlFor="text-input">Moyen de paiement</label>
                            <div className="col-md-9">
                            <select id="select" name="select" className="form-control">
                                <option value="0" onChange={this.onMoyenChanged}>Dérouler...</option>
                                <option value="cheque" onChange={this.onMoyenChanged}>Chèque</option>
                                <option value="liquide" onChange={this.onMoyenChanged}>Liquide</option>
                                <option value="virement" onChange={this.onMoyenChanged}>Virement</option>
                                <option value="natureCoquinou" onChange={this.onMoyenChanged}>Nature (coquinou)</option>
                            </select>
                        </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 form-control-label" htmlFor="text-input">Chèque n°</label>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    id="text-input"
                                    name="text-input"
                                    className="form-control"
                                    placeholder="Champ optionnel"/>
                            </div>
                            <label className="col-md-3 form-control-label" htmlFor="text-input">Somme</label>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    id="text-input"
                                    name="text-input"
                                    className="form-control"
                                    placeholder="Champ optionnel"/>
                            </div>
                            <label className="col-md-3 form-control-label" htmlFor="text-input">Date d'encaissement</label>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    id="text-input"
                                    name="text-input"
                                    className="form-control"
                                    placeholder="Champ optionnel"/>
                            </div>
                            <div className="form-group form-actions col-md-9">
                            <button type="submit" className="btn btn-sm btn-info">Ajouter chèque</button>
                            </div>
                            <span className="help-block">N'apparaît que si chèque est sélectionné</span>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 form-control-label" htmlFor="text-input">Commentaire</label>
                            <div className="col-md-9">
                                <textarea id="textarea-input" name="textarea-input" rows="9" className="form-control" placeholder="Content.."></textarea>
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

export default Paiement;