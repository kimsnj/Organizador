import React from 'react'
import { Field, reduxForm } from 'redux-form'


let validate = values => {
  let errors = {};
  if (!values.lastName) {
    errors.lastName = "Comment tu t'appelles?";
  }
  return errors;
}


let AppelForm = props => {
  const { handleSubmit } = props
  return (

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

AppelForm = reduxForm({
  form: 'appel',
  deleteOnComponentUnmont: false,
  validate
})(AppelForm)

export default AppelForm;