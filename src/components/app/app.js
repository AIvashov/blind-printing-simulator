import React from "react";

//import style
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
//import components
import TopNavbar from "../top-navbar";
import Body from "../appBody/body";

const App = () => {
    return <div>
        <TopNavbar/>
        <Body />
    </div>
};

export default App;