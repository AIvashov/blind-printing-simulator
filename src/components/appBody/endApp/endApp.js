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
        >
            <Modal.Header>
                <Modal.Title className="d-flex flex-column justify-content-center d-grid gap-4 col-6 mx-auto text-center">
                    <h3>
                        End simulator
                    </h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column text-center">
                    <h4>Your accuracy: {accuracy}<span className="badge ">%</span>and your speed: {speed}<span className="badge ">ch/min</span></h4>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex flex-column justify-content-center d-grid gap-4 col-6 mx-auto" >
                    <Button variant="dark" size="lg" onClick={() => {
                        changeEnd(endApp);
                        changeStart(startApp)
                    }} >Replay</Button>
                </div>
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