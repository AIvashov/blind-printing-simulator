import React from "react";
import {connect} from "react-redux";
import {changeStart, choiceNumberSentences} from "../../../actions";
import {Modal, Button, Form, Row, Col} from "react-bootstrap";
import './startApp.css'

const StartApp = ({startApp, changeStart, numberSentences, choiceNumberSentences}) => {
    return (
        <Modal
            show = {startApp}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title className=" d-flex justify-content-center d-grid gap-5 mx-auto  text-center">
                    Welcome to blind printing simulator
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className=" d-flex justify-content-center d-grid gap-4 mx-auto  text-center">
                    <Col xs={12} md={9}>
                        <span className="pre-start">For starting simulator choice number of sentences: </span>
                    </Col>
                    <Col xs={12} md={2}>
                        <Form.Group >
                            <Form.Control as="select" value={numberSentences} onChange={(evt)=>{choiceNumberSentences(evt.target.value)}} >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex flex-column justify-content-center d-grid gap-4 col-6 mx-auto" >
                    <Button variant="dark" size="lg" onClick={() => changeStart(startApp)} >Start</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = ({ startApp, numberSentences }) =>{
    return { startApp, numberSentences };
};

const mapDispatchToProps =(dispatch) => {
    return{
        changeStart : (startApp) =>  dispatch(changeStart(startApp)),
        choiceNumberSentences : (value) => dispatch(choiceNumberSentences(value))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StartApp);