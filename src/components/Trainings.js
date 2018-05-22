import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Button, Grid, Row, Col } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { getTrainings } from '../actions/trainings';
import { getPlans } from '../actions/plans';


const mapStateToProps = (store) => {
    return {
        user: store.user.user,
        trainings: store.trainings,
        plans: store.plans
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTrainings: (uId) => {
            dispatch(getTrainings(uId))
        },
        getPlans: () => {
            dispatch(getPlans())
        },
    }
}

/**
 * List of started trainings by the user
 */
class Trainings extends Component {

    componentDidMount() {
        if (this.props.plans.list.length === 0) {
            this.props.getPlans()
        }
        if (this.props.trainings.list.length === 0) {
            this.props.getTrainings(this.props.user.id)
        }
    }


    filterPlan(planId) {
        const { plans } = this.props;

        for (let plan of plans.list) {
            if (parseInt(plan.id, 10) === parseInt(planId, 10)) {
                return plan;
            }
        }

        return null;
    }

    trainingHtml(id, title, text, time, calories, plan_id) {
        return (
            <ListGroupItem key={ id } header={ title }>
                <Grid>
                    <Row className="row-no-padding">
                        <Col xs={12} md={10}>
                            { text }
                        </Col>
                        <Col xs={12} md={2} className="text-right">
                            <Button
                                bsStyle="primary"
                                href={"/#/entrenamientos/"+id}
                            >
                                Ver Detalles
                            </Button>
                        </Col>
                    </Row>
                </Grid>
            </ListGroupItem>
        );
    }

    render() {
        const { list, fetched } = this.props.trainings;

        if (fetched && list && list.length > 0) {

            var trainingList = [];
            var planId = -1;
            for (let training of list) {
                if (planId != training.plan_id) {
                    let plan = this.filterPlan(training.plan_id);
                    console.log('newplan', training.plan_id);
                    console.log('plan', plan);
                    planId   = training.plan_id;

                    trainingList.push(<h2 className="category">{ plan.name }</h2>);
                }

                trainingList.push(this.trainingHtml(
                    training.id,
                    training.name,
                    training.details,
                    training.time,
                    training.calories,
                    training.plan_id
                ));
            }


            return (
                <div>
                    <p>Revisa tus planes:</p>

                    <ListGroup>
                        {trainingList}
                    </ListGroup>
                </div>
            );

        } else if (!fetched) {
          return <div>Loading ...</div>;
        } else if (fetched) {
          return (
            <div>
                <FontAwesomeIcon icon="frown" />  Ups. No encontramos datos.
                <Button href="/#/planes"> Ver Planes </Button>
            </div>
          );
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trainings);
