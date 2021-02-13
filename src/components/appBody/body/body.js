import React from "react";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import TextContainer from "../TextContainer/textContainer";
import StartApp from "../startApp";
import {changeStart} from "../../../actions";

const Body =  ({startApp, changeStart}) => {
    if (!startApp){
        return (<TextContainer/>)
    }
    return (<div>
        <Button variant="primary"  onClick={() => changeStart(startApp)}>
            Replay
        </Button>
        <StartApp/>
    </div>)
};

const mapStateToProps = ({ startApp }) =>{
    return { startApp };
};

const mapDispathToProps =(dispatch) => {
    return{
        changeStart: (startApp) =>  dispatch(changeStart(startApp))
    }
};

export default connect(mapStateToProps, mapDispathToProps)(Body);