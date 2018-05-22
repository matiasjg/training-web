import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { getPlans } from '../actions/plans';
import { startPlan, getTrainings } from '../actions/trainings';


const mapStateToProps = (store) => {
    return {
        plans: store.plans,
        trainings: store.trainings,
        user: store.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTrainings: (userId) => {
            dispatch(getTrainings(userId))
        },
        getPlans: () => {
            dispatch(getPlans())
        },
        startPlan: (planId, userId) => {
            dispatch(startPlan(planId, userId))
        }
    }
}
class Plans extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startPlan: false
        };
    }


    handleStartPlan(id) {
        this.setState({ startPlan: true });

        this.props.startPlan(id, this.props.user.id);
    }

    componentDidMount() {
        this.setState({ startPlan: false });

        if (this.props.plans.list.length === 0) {
            this.props.getPlans()
        }
        if (this.props.trainings.list.length === 0) {
            this.props.getTrainings(this.props.user.id)
        }
    }

    cards(id, title, text) {

        const buttonStart = !this.alreadyStarted(id) ? (
                <Button
                    bsStyle="primary"
                    onClick={(e) => this.handleStartPlan(id)}
                >
                    Empezar
                </Button>
        ) : (
                <Button
                    bsStyle="primary"
                    href="/#/entrenamientos"
                >
                    Ver Progreso
                </Button>
        );

        return (
            <div
                key={ id }
                className={ 'col-sm card-'+title.toLowerCase() }
            >
                <div className="card border-primary mb-3">
                  <div className="card-header">{ title }</div>
                  <div className="card-body">
                    <div className="imagePromote"></div>
                    <p className="card-text">
                        { text }
                    </p>
                    <div className="card-buttons">
                        { buttonStart }
                        <Button href={ "/#/planes/" + id } className="btn btn-link">Ver Más</Button>
                    </div>
                  </div>
                </div>
            </div>
        );
    }


    alreadyStarted(planId) {
        const { trainings } = this.props;

        if (!trainings.fetched) return false;

        for (let training of trainings.list) {
            if (parseInt(training.plan_id, 10) === parseInt(planId, 10)) {
                return true;
            }
        }

        return false;
    }

    render() {

        if (this.state.startPlan && this.props.trainings) {
            return (<Redirect to="/entrenamientos" />);
        }

        const { list, fetched } = this.props.plans;

        if (fetched && list && list.length > 0) {

            let cardsList = list.map(item => this.cards(item.id, item.name, item.description));

            return (
                <div>
                    <p>Selecciona el plan que desees iniciar o continuar</p>

                    <div className="row">
                        {cardsList}
                    </div>
                </div>
            );

        } else if (!fetched) {
          return <div>Loading ...</div>;
        } else if (fetched) {
          return (<h3><FontAwesomeIcon icon="frown" size="8x" /> Ups. No encontramos datos.</h3>);
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
