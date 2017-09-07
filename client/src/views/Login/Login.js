import React from "react";
import { reduxForm, Field } from 'redux-form'
import { Container, Row, Col, CardGroup, Card, Button, InputGroup, InputGroupAddon } from "reactstrap";
import { login } from '../../authentication'

let Login = ({ handleSubmit, pristine, submitting, history }) => {

    const postLogin = (values) => login(values, history);

    return <div className="app flex-row align-items-center">
        <Container>
            <Row className="justify-content-center">
                <Col md="8">
                    <CardGroup className="mb-0">
                        <Card className="p-4">
                            <form onSubmit={handleSubmit(postLogin)}>
                                <h1>Enregistrement</h1>
                                <p className="text-muted">Veuillez entrer vos identifiants</p>
                                <InputGroup className="mb-3">
                                    <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                                    <Field component="input" type="text" name="username" placeholder="Nom d'utilisateur" className="form-control" />
                                </InputGroup>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                                    <Field component="input" type="password" name="password" placeholder="Mot de passe" className="form-control" />
                                </InputGroup>
                                <Row>
                                    <Col xs="6">
                                        <Button color="primary"
                                            className="px-4"
                                            type="submit"
                                            disabled={pristine || submitting}>
                                            Login
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    </div >
};

Login = reduxForm({
    form: 'login'
})(Login)


export default Login;