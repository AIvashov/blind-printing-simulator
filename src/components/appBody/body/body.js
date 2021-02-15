import React from "react";
import {connect} from "react-redux";
import TextContainer from "../TextContainer/textContainer";
import StartApp from "../startApp";
import EndApp from "../endApp/endApp";

const Body =  ({startApp}) => {
    if (!startApp){
        return (<div>
            <TextContainer/>
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

export default connect(mapStateToProps)(Body);