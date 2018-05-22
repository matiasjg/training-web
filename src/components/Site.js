import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Menu from "./Menu";
import Plans from "./Plans";
import Trainings from "./Trainings";
import TrainingDetails from "./TrainingDetails";
import User from "./User";
import PlanDetails from "./PlanDetails";

import * as icons from '@fortawesome/fontawesome-free-solid'

const mapStateToProps = (store) => {
    return {
        user: store.user,
        plans: store.plans,
        trainings: store.trainings,
    }
}

/**
 * Everything inside this component will be secure
 */
class Site extends Component {

    render() {
        const { user } = this.props;

        if (!user.logged) {
            return (<Redirect to="/login" />);
        }

        // normal layout
        return (
            <div className="container">
                <Menu />
                <Switch>
                    <Route exact path="/planes" component={Plans}/>
                    <Route exact path="/entrenamientos" component={Trainings}/>

                    <Route path="/planes/:id" component={PlanDetails}/>
                    <Route path="/entrenamientos/:id" component={TrainingDetails}/>

                    <Route path="/" component={User}/>
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Site);
