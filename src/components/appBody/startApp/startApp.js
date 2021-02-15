import React from "react";
import {connect} from "react-redux";
import {changeStart, choiceNumberSentences} from "../../../actions";
import {Modal, Button, Form} from "react-bootstrap";

const StartApp = ({startApp, changeStart, numberSentences, choiceNumberSentences}) => {
    return (
        <Modal
            show = {startApp}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Welcome to blind printing simulator
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Start simulator</h4>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Choice number of sentences for start simulator</Form.Label>
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
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => changeStart(startApp)} >Start</Button>
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