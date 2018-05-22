import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ButtonToolbar, Button, Alert } from 'react-bootstrap';

import { registerUser } from '../actions/user';


const mapStateToProps = (store) => {
    return {
        user: store.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (name, email, password) => {
            dispatch(registerUser(name, email, password))
        },
    }
}

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            submitted: false,
            isValid: false,
            error: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateInputs() {
        const { name, email, password, password2 } = this.state;

        var elements = document.querySelectorAll('.has-danger');
        for (var i = 0; i < elements.length; i++) {
           elements[i].classList.remove('has-danger');
        }

        var elements = document.querySelectorAll('.is-invalid');
        for (var i = 0; i < elements.length; i++) {
           elements[i].classList.remove('is-invalid');
        }



        var isValid = true;
        let invalidInputs = [];
        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || password2.trim() === '' ) {
            isValid = false;
            if (name.trim() === '') {
                invalidInputs.push('name');
            }
            if (email.trim() === '') {
                invalidInputs.push('email');
            }
            if (password.trim() === '') {
                invalidInputs.push('password');
            }
            if (password2.trim() === '') {
                invalidInputs.push('password2');
            }

            this.state.error = 'Verifica los datos ingresados.';
        } else if (password !== password2) {
            isValid = false;

            this.state.error = 'Las contraseñas no coinciden.';

            invalidInputs.push('password');
            invalidInputs.push('password2');
        } else if (!this.validateEmail(email)) {
            isValid = false;

            invalidInputs.push('email');
            this.state.error = 'Verifica el correo que sea válido.';
        }

        if (!isValid) {
            for (let invalidInput of invalidInputs) {
                let input2 = document.getElementById(invalidInput)
                input2.classList.add('is-invalid');
                input2.parentElement.classList.add('has-danger');
            }
        }

        return isValid;
    }


    handleSubmit(e) {
        e.preventDefault();

        const { name, email, password, password2 } = this.state;
        const { registerUser } = this.props;

        if (this.validateInputs()) {
            this.setState({ submitted: true });

            registerUser(name, email, password);
        } else {
            this.setState({ submitted: false });
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    loginForm() {
        const { user } = this.props;

        if (this.state.submitted && !user.logged) {
            return (
                <p>Enviando ...</p>
            );
        } else  {
            const error = this.state.error !== '' ? (
                <Alert bsStyle="warning">
                  Error: { this.state.error }
                </Alert>
            ) : ('');


            return (
                <form role="form" autoComplete="off" onSubmit={this.handleSubmit}>
                    { error }
                    <div className="form-group">
                        <input
                            type="text" name="name" id="name" tabIndex="1"
                            className="form-control" placeholder="Name"
                            onChange={(event) => this.setState({ name: event.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text" name="email" id="email" tabIndex="1"
                            className="form-control" placeholder="Email"
                            onChange={(event) => this.setState({ email: event.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password" name="password" id="password" tabIndex="2"
                            className="form-control" placeholder="Password"
                            onChange={(event) => this.setState({ password: event.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password" name="password2" id="password2" tabIndex="2"
                            className="form-control" placeholder="Repeat Password"
                            onChange={(event) => this.setState({ password2: event.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <ButtonToolbar>
                            <Button type="submit" bsStyle="primary">Crear Usuario</Button>
                            <Button href="/#/login">Ya tengo mi usuario.</Button>
                        </ButtonToolbar>
                    </div>
                </form>
            );
        }
    }

    render() {
        const { user } = this.props;

        if (user.logged) {
            return (<Redirect to="/" />);
        }

        return (
            <section id="register" className="col-lg-4 col-md-6 col-sm-12">
              <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-wrap">
                            <h1>Nuevo Usuario</h1>

                            <p>Estás a un paso de empezar tus entrenamientos!</p>

                            { this.loginForm() }


                        </div>
                    </div>
                </div>
              </div>
            </section>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
