import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, HashRouter, Switch } from "react-router-dom";

import Site from "./Site";
import Login from "./Login";
import Register from "./Register";

import { logInSession } from '../actions/user';
import { cleanTrainings } from '../actions/trainings';

const mapStateToProps = (store) => {
    return {
        user: store.user,
        plans: store.plans,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logInSession: () => {
            dispatch(cleanTrainings())
            dispatch(logInSession())
        },
    }
}

class App extends Component {

    componentWillMount() {
        if (sessionStorage.getItem('user')) {
            this.props.logInSession();
        }
    }


    render() {
        const { user } = this.props;

        if (!user.logged) {
            document.body.classList.add('landing'); //style change
        } else {
            document.body.classList.remove('landing');
        }

        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register} />
                    <Route path="/" component={Site}/>
                </Switch>

            </HashRouter>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
