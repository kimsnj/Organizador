import React, { Component } from 'react';
import { Field } from 'redux-form'

let CheckBoxField = field => (
    <div className="form-check">
        <label className="form-check-label">
            <input className="form-check-input" style={{ marginRight: 5 + 'px' }} type="checkbox" {...field.input} />
            {field.label}
        </label>
    </div>
);

let DossierInscription = (props) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title mb-0"><i className="fa fa-check-square-o"></i> Dossier d'inscription</h4>
                    </div>
                    <div className="card-block">
                        <fieldset className="form-group" style={{ marginLeft: 30 + 'px' }}>
                            <Field name="certificat" label="Certificat Médical" component={CheckBoxField} />
                            <Field name="photo" label="Photo d'identité" component={CheckBoxField} />
                            <Field name="fiche" label="Fiche d'adhésion" component={CheckBoxField} />
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DossierInscription;