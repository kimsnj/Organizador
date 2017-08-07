import React, { Component } from 'react';

class DossierInscription extends Component {
    constructor(props) {
        super(props);
        this.onDossierInscriptionChanged = this.onDossierInscriptionChanged.bind(this);
        this.state = {
            certifMed: false,
            photoId: false,
            ficheAdhesion: false
        };
    }

    onDossierInscriptionChanged(e) {
        console.log('onDossierInscriptionChanged');
    }

    render() {
        return (      
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title mb-0"><i className="fa fa-check-square-o"></i> Dossier d'inscription</h4>
                        </div>
                        <div className="card-block">
                            <fieldset className="form-group" style={{marginLeft: 30 + 'px'}}>
                                <div className="form-check">
                                <label className="form-check-label">
                                    <input type="checkbox" style={{marginRight: 5 + 'px'}} className="form-check-input" name="dossierInscriptionCheckBoxes" id="dossierCheckBox1" value={this.state.certifMed} onChange={this.onDossierInscriptionChanged}/>
                                    Certificat médical
                                </label>
                                </div>
                                <div className="form-check">
                                <label className="form-check-label">
                                    <input type="checkbox" style={{marginRight: 5 + 'px'}} className="form-check-input" name="dossierInscriptionCheckBoxes" id="dossierCheckBox2" value={this.state.photoId} onChange={this.onDossierInscriptionChanged}/>
                                    Photo d'identité
                                </label>
                                </div>
                                <div className="form-check">
                                <label className="form-check-label">
                                    <input type="checkbox" style={{marginRight: 5 + 'px'}} className="form-check-input" name="dossierInscriptionCheckBoxes" id="dossierCheckBox3" value={this.state.ficheAdhesion} onChange={this.onDossierInscriptionChanged}/>
                                    Fiche d'adhésion
                                </label>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        )
  }
}

export default DossierInscription;