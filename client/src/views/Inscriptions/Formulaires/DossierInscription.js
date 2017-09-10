import React from 'react';
import {Field} from 'redux-form'

let CheckBoxField = field => (
    <div className="form-check">
        <label className="form-check-label">
            <input
                name={field.name}
                className="form-check-input"
                style={{
                marginRight: 5 + 'px'
            }}
                {...field.input}/> {field.label}
        </label>
    </div>
);

let BasicLabel = ({labelText}) => (
    <label className="col-md-3 form-control-label" htmlFor="text-input">{labelText}</label>
)

let DossierInscription = (props) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title mb-0">
                            <i className="fa fa-check-square-o"></i>
                            Dossier d'inscription</h4>
                    </div>
                    <div className="card-block">
                        <fieldset
                            className="form-group"
                            style={{
                            marginLeft: 30 + 'px'
                        }}>
                            <div className="row">
                                <div>
                                    <label className="form-check-label">
                                        <Field
                                            component="input"
                                            name="certificat_medical"
                                            className="form-check-input"
                                            style={{marginRight: 5 + 'px'}}
                                            type="checkbox"/>
                                    </label>
                                </div>
                                <BasicLabel labelText="Certificat médical"/>
                            </div>
                            <div className="row">
                                <div>
                                    <label className="form-check-label">
                                        <Field
                                            component="input"
                                            name="photo"
                                            className="form-check-input"
                                            style={{marginRight: 5 + 'px'}}
                                            type="checkbox"/>
                                    </label>
                                </div>
                                <BasicLabel labelText="Photo"/>
                            </div>
                            <div className="row">
                                <div>
                                    <label className="form-check-label">
                                        <Field
                                            component="input"
                                            name="fiche_adhesion"
                                            className="form-check-input"
                                            style={{marginRight: 5 + 'px'}}
                                            type="checkbox"/>
                                    </label>
                                </div>
                                <BasicLabel labelText="Fiche d'adhésion"/>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DossierInscription;