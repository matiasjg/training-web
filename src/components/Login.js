import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Alert } from 'react-bootstrap';

import { logIn } from '../actions/user';


const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logInUser: (email, passwd) => {
            dispatch(logIn(email, passwd))
        },
    }
}

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();

        const { email, password } = this.state;
        const { logInUser } = this.props;

        if (this.validateInputs()) {
            this.setState({ submitted: true });

            logInUser(email, password);
        } else {
            this.setState({ submitted: false });
        }
    }


    validateInputs() {
        const { email, password } = this.state;

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
        if (email.trim() === '' || password.trim() === '') {
            isValid = false;
            if (email.trim() === '') {
                invalidInputs.push('email');
            }
            if (password.trim() === '') {
                invalidInputs.push('password');
            }

            this.state.error = 'Verifica los datos ingresados.';
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

    loginForm() {
        const { user } = this.props;

        if (this.state.submitted && !user.logged && !user.error) {
            return (
                <p>Cargando ...</p>
            );
        } else  {
            return (
                <form role="form" autoComplete="off" onSubmit={this.handleSubmit}>
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
                        <div className="row">
                            <div className="col-sm-6 col-sm-offset-3">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </div>

                    <p>No eres un cazador? <Link to="/register" className="btn btn-link">Crea tu usuario aquí.</Link> </p>
                </form>
            );
        }
    }

    render() {
        const { user } = this.props;

        if (user.logged) {
            return (<Redirect to="/" />);
        }


        const error = user.error ? (
            <Alert bsStyle="warning">
              Error: { user.error }
            </Alert>
        ) : ('');

        return (
            <section id="login" className="col-lg-4 col-md-6 col-sm-12">
              <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-wrap">
                            <h1>Bienvenido!</h1>
                            <p>Si ya eres un cazador de objetivos, ingresa tus datos</p>
                            { error }
                            { this.loginForm() }
                        </div>
                    </div>
                </div>
              </div>
            </section>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
