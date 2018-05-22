import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { getPlans } from '../actions/plans';


const mapStateToProps = (store) => {
    return {
        plans: store.plans,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlans: () => {
            dispatch(getPlans())
        },
    }
}

/**
 * List of trainings by plan
 */
class PlanDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedPlan: this.props.match.params.id
        };
    }

    componentDidMount() {
        if (this.props.plans.list.length === 0) {
            this.props.getPlans()
        }
    }

    training(id, title, text) {
        return (
            <ListGroupItem key={ id } header={ title }>
                { text }
            </ListGroupItem>
        );
    }

    filterPlan() {
        const { plans } = this.props;
        const { selectedPlan } = this.state;

        for (let plan of plans.list) {
            if (parseInt(plan.id, 10) === parseInt(selectedPlan, 10)) {
                return plan;
            }
        }

        return null;
    }

    render() {

        let plan = this.filterPlan();
        if (plan && plan.trainings.length > 0) {

            let trainingsList = plan.trainings.map(item => this.training(
                item.id,
                item.name,
                item.details,
                item.time,
                item.calories,
                item.plan_id
            ));

            return (
                <div>
                    <h1>Plan: { plan.name }</h1>

                    <ListGroup>
                        {trainingsList}
                    </ListGroup>
                </div>
            );
        } else if (!plan) {
            return <h3>Cargando ...</h3>
        } else {
          return (<h3 className="notFound">
                <FontAwesomeIcon icon="frown" /> Ups. No encontramos datos.
            </h3>);
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanDetails);
