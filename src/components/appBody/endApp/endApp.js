import React from "react";
import {connect} from "react-redux";
import {changeStart, changeEnd} from "../../../actions";
import {Modal, Button} from "react-bootstrap";

const EndApp = ({startApp, changeStart, endApp, changeEnd, accuracy, speed}) => {
    return (
        <Modal
            show = {endApp}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    End simulator
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Your accuracy {accuracy}%</h4>
                <h4>Your speed {speed} sym/min</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    changeEnd(endApp);
                    changeStart(startApp)
                }} >Replay</Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = ({ endApp, startApp, accuracy, speed }) =>{
    return { endApp, startApp, accuracy, speed };
};

const mapDispatchToProps =(dispatch) => {
    return{
        changeStart : (startApp) =>  dispatch(changeStart(startApp)),
        changeEnd : (endApp) =>  dispatch(changeEnd(endApp))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EndApp);