import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'


import { logOut } from '../actions/user';

const mapStateToProps = (store) => {
    return {
        user: store.user.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOutUser: () => {
            dispatch(logOut())
        },
    }
}

class User extends Component {

    constructor(props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();

        const { logOutUser } = this.props;

        logOutUser();
    }


    render() {

        const { user } = this.props;

        return (
            <div className="row">
                <div className="pull-left col-md-2 col-sm-12">
                    <FontAwesomeIcon icon="user-circle" size="8x" />
                </div>
                <div className="pull-right cold-md-8 col-sm-12">
                    <h1>{ user.name }</h1>
                    <h3>{ user.email }</h3>
                    <button className="btn btn-primary" onClick={this.handleLogout}>Salir</button>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(User);
