import React from "react";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import TextContainer from "../TextContainer/textContainer";
import StartApp from "../startApp";
import {changeStart} from "../../../actions";
import EndApp from "../endApp/endApp";

const Body =  ({startApp, changeStart}) => {
    if (!startApp){
        return (<div>
            <TextContainer/>
            <Button variant="primary"  onClick={() => changeStart(startApp)}>
                Replay
            </Button>
            <EndApp/>
            <StartApp/>
        </div>)
    }
    return (<div>
        <StartApp/>
    </div>)
};

const mapStateToProps = ({ startApp, endApp }) =>{
    return { startApp, endApp };
};

const mapDispatchToProps =(dispatch) => {
    return{
        changeStart: (startApp) =>  dispatch(changeStart(startApp))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);