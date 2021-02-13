import React, { Component } from "react";
import './TextContainer.css';
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import withApiService from "../../hoc/with-api-service";
import { fetchText } from "../../../actions";
import { compose } from "../../../utils";
import ErrorIndicator from "../../error-indicator";

class TextContainer extends Component{

    componentDidMount() {
        const { numberSentences } = this.props;
        this.props.fetchText(numberSentences);
    };

    /**
     * Enumerate sentences to symbol and return <span>symbol<span/>.
     * @param arr
     * @returns {[<span>]}
     */
    enumerateSentences(arr){
        let span_symbol = [];
        if(arr !== undefined){
            if (arr.length !== 0 && Array.isArray(arr)){
                let sentence = arr[0];
                for (let i = 0; i < sentence.length; i++){
                    span_symbol.push(<span key = {i} id={i}>{sentence[i]}</span>)
                }
            }
        }
        return span_symbol
    };

    render() {
        const { text, loading, error } = this.props;
        if (loading){
            return (<Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>)
        }
        if(error){
            return <ErrorIndicator/>
        }
        return (
            <div>
                {this.enumerateSentences(text)}
            </div>
        )
    }
}

const mapStateToProps = ({ text, numberSentences, loading, error, startApp }) =>{
    return { text, numberSentences, loading, error, startApp };
};

const mapDispathToProps =(dispatch, { apiService }) => {
    return{
        fetchText: fetchText(apiService, dispatch)
    }

};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispathToProps)
)(TextContainer);