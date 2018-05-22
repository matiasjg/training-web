import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { getTrainings } from '../actions/trainings';

const mapStateToProps = (store) => {
    return {
        user: store.user.user,
        trainings: store.trainings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTrainings: (uId) => {
            dispatch(getTrainings(uId))
        },
    }
}

/**
 * It will display well formatted the training details.
 * Including a video, time, calories, etc
 */
class TrainingDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedTraining: this.props.match.params.id
        };
    }

    componentDidMount() {
        if (this.props.trainings.list.length === 0) {
            this.props.getTrainings(this.props.user.id)
        }
    }

    filterTraining() {
        const { trainings } = this.props;
        const { selectedTraining } = this.state;

        for (let training of trainings.list) {
            if (parseInt(training.id, 10) === parseInt(selectedTraining, 10)) {
                return training;
            }
        }

        return null;
    }

    render() {

        let training = this.filterTraining();
        if (training) {

            const video = training.video_id ? (
                <iframe
                    src={"https://www.youtube.com/embed/"+training.video_id+"?rel=0"}
                    frameBorder="0"
                    height="350"
                    allow="autoplay; encrypted-media" allowFullScreen />
            ) : ('');

            const time = training.time > 0 ? (
                <ListGroupItem><FontAwesomeIcon icon="clock" /> Tiempo Estimado: { training.time } min</ListGroupItem>
            ) : ('');

            return (
                <div>
                    <div className="card mb-3">
                        <h3 className="card-header">{training.name}</h3>

                        { video }

                        <div className="card-body">
                            <p className="card-text">{ training.details }</p>
                        </div>

                        <ListGroup>
                            <ListGroupItem><FontAwesomeIcon icon="crosshairs" /> Calorias: { training.calories }</ListGroupItem>
                            { time }
                        </ListGroup>

                    </div>
                </div>
            );

        } else {
          return <h3> <FontAwesomeIcon icon="frown" /> Entrenamiento no encontrado.</h3>;
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainingDetails);
