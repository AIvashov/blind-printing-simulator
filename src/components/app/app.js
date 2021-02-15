import React from "react";
import './app.css';

import TopNavbar from "../topNavbar";
import Body from "../appBody/body";
import {Container} from "react-bootstrap";

const App = () => {
    return (<Container role="main" className='App'>
                <TopNavbar/>
                <Body />
            </Container>)
};

export default App;