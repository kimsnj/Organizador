import React, { Component } from 'react';

class InfosPersonnelles extends Component {
    constructor(props) {
        super(props);
        this.onDroitALImageChanged = this.onDroitALImageChanged.bind(this);
        this.state = {
            droitImage: false,
        };
    }

    onDroitALImageChanged(e) {
        console.log("onDroitALImageChanged");
    }

    render() {
        return (  
        <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4><i className="fa fa-user"></i> Informations personnelles</h4>
                            </div>
                            <div className="card-block">
                                <form
                                    action=""
                                    method="post"
                                    encType="multipart/form-data"
                                    className="form-horizontal">
                                    <div className="form-group row">
                                        <label className="col-md-3 form-control-label" htmlFor="text-input">Nom</label>
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
                                        <label className="col-md-3 form-control-label" htmlFor="text-input">Prénom</label>
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
                                        <label className="col-md-3 form-control-label" htmlFor="text-input">Date de naissance</label>
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
                                        <label className="col-md-3 form-control-label" htmlFor="text-input">Numéro de téléphone</label>
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
                                        <label className="col-md-3 form-control-label" htmlFor="text-input">Adresse</label>
                                        <div className="col-md-9">
                                            <textarea id="textarea-input" name="textarea-input" rows="9" className="form-control" placeholder="Content.."></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                    <label className="col-md-3 form-control-label">Droit à l'image</label>
                                    <div className="col-md-9">
                                        <div className="checkbox">
                                        <label htmlFor="checkbox1">
                                            <input type="checkbox" id="checkbox1" name="checkbox1" value={this.state.droitImage} onChange={this.onDroitALImageChanged}/>
                                        </label>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="form-group row">
                                    <label className="col-md-3 form-control-label">Contact d'urgence</label>
                                    <div className="col-md-9">
                                        <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input type="text" id="username" name="username" className="form-control" placeholder="Nom"/>
                                        </div>
                                        </div>
                                        <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                            <input type="email" id="email" name="email" className="form-control" placeholder="Téléphone"/>
                                        </div>
                                        </div>
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

export default InfosPersonnelles;