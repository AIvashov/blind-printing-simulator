import React, { Component } from "react";
import './TextContainer.css';
import { connect } from "react-redux";
import {Spinner, Alert, Button} from "react-bootstrap"

import withApiService from "../../hoc/with-api-service";
import {changeEnd, changeStart, fetchText, calculateAccuracy, calculateSpeed} from "../../../actions";
import { compose } from "../../../utils";
import ErrorIndicator from "../../error-indicator";

class TextContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            symbol: null,
            englishKeyboard : true,
            textPosition : 0,
            enteredSymbolsTotal : 0,
            enteredSymbolsCorrect : 0,
            enteredTimeSymbols : []
        };

        this.keyListener = this.keyListener.bind(this);
        this.compareSymbols = this.compareSymbols.bind(this);
        this.calculatingAccuracy = this.calculatingAccuracy.bind(this);
        this.calculatingSpeed = this.calculatingSpeed.bind(this);
        this.increaseParam = this.increaseParam.bind(this);
        this.changeColorElement = this.changeColorElement.bind(this);
    }

    componentDidMount() {
        const { numberSentences } = this.props;
        this.props.fetchText(numberSentences);
        document.addEventListener("keydown", this.keyListener );
    };

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyListener );
    }

    /**
     * Enumerate sentences to symbol and return <span>symbol<span/>.
     * @param arr
     * @returns {[<span>]}
     */
    enumerateSentences(arr){
        let span_symbols = [];
        if(arr !== undefined){
            if (arr.length !== 0 && Array.isArray(arr)){
                let sentences = arr[0];
                for (let i = 0; i < sentences.length; i++){
                    let id = `Simbol_${i}`;
                    span_symbols.push(<span key = {id} id={id} className="Symbols">{sentences[i]}</span>);
                }
            }
        }
        return span_symbols
    };

    /**
     *listen symbol entered by the user from the keyboard
     * @param evt - keyboard event.
     */
    keyListener(evt){
        let symbol = evt.key;
        // eslint-disable-next-line no-useless-escape
        const re = new RegExp(/\d|\w|\s|[.$@*\\\/+\-^!()\[\]~%&=?><{}"',:;_#`|]/g);
        if(symbol.length === 1){
            if(symbol.match(re)){
                this.setState({symbol:symbol, englishKeyboard:true});
                this.compareSymbols();
            }
            else{
                this.setState({englishKeyboard:false, symbol:null});
            }
        }
    }

    /**
     *Compares the text symbols entered by the user from the keyboard.
     */
    compareSymbols(){
        let {symbol, textPosition, enteredTimeSymbols, enteredSymbolsCorrect, enteredSymbolsTotal} = this.state;
        let text = this.props.text[0];
        let textLen = text.length;
        if (textPosition < textLen && textPosition !== null){
            this.setState({enteredSymbolsTotal : this.increaseParam(enteredSymbolsTotal)});
            let id_element = `Simbol_${textPosition}`;
            this.changeColorElement(id_element,'green');
            if(symbol === text[textPosition]){
                enteredTimeSymbols.push(new Date());
                let next_element = `Simbol_${this.increaseParam(textPosition)}`;
                this.changeColorElement(next_element,'white', 'green');
                this.setState({
                    textPosition : this.increaseParam(textPosition),
                    enteredSymbolsCorrect: this.increaseParam(enteredSymbolsCorrect),
                    enteredTimeSymbols : enteredTimeSymbols
                });
                this.changeColorElement(id_element,'green');
                if(textPosition === textLen-1 ){
                    this.setState({textPosition : null, symbol:null});
                    this.props.changeEnd(this.props.endApp);
                }
            }
            else {
                this.setState({
                    enteredSymbolsCorrect: enteredSymbolsCorrect,
                });
                this.changeColorElement(id_element,'white', 'red');
            }
            this.calculatingAccuracy(this.state.enteredSymbolsTotal, this.state.enteredSymbolsCorrect);
            this.calculatingSpeed(enteredTimeSymbols);
        }
    };

    /**
     * Calculating the accuracy of the symbols entered by the user.
     * @param enteredSymbolsTotal
     * @param enteredSymbolsCorrect
     */
    calculatingAccuracy(enteredSymbolsTotal, enteredSymbolsCorrect){
        let accuracy = Math.round((100*enteredSymbolsCorrect/enteredSymbolsTotal));
        this.props.calculateAccuracy(accuracy);
    };

    /**
     * Calculating the speed of the symbols entered by the user.
     * @param enteredTimeSymbols - array with timestamps for entering symbols
     */
    calculatingSpeed(enteredTimeSymbols){
        let timeSubtract = [];
        let len = enteredTimeSymbols.length;
        if(len>1){
            while (len > 1) {
                let deducted = enteredTimeSymbols[len-1];
                let reduced  = enteredTimeSymbols[len-2];
                timeSubtract.push(deducted-reduced);
                len--;
            }
            let sumFrequency = 0;
            for (let i = 0; i<timeSubtract.length; i++) {
                sumFrequency += timeSubtract[i];
            }
            let speed = Math.round((60000*timeSubtract.length)/sumFrequency);
            this.props.calculateSpeed(speed);
        }
    }

    /**
     * Increases the parameter by 1.
     * @param Param - integer
     * @returns {*}
     */
    increaseParam(Param){
        return Param + 1
    }

    /**
     * Change CSS style of element.
     * @param id_element - Id HTML element
     * @param colorText
     * @param colorBackground
     */
    changeColorElement(id_element, colorText, colorBackground = 'white'){
        let element = document.getElementById(id_element);
        if(element !== null){
            element.style.color = colorText;
            element.style.backgroundColor = colorBackground;
        }
    }


    render() {
        const { text, loading, error, accuracy, speed } = this.props;
        const { englishKeyboard } = this.state;
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
                <Alert show ={!englishKeyboard} variant="danger">
                    <Alert.Heading>Oops... No that keyboard language... </Alert.Heading>
                    Please, change your keyboard layout to English!
                    <hr/>
                    <div className="d-flex justify-content-center">
                        <Button  onClick={() => {this.setState({englishKeyboard:true})}} variant="outline-danger">
                            OK
                        </Button>
                    </div>
                </Alert>
                {this.enumerateSentences(text)}
                <h4>Accuracy {accuracy}%</h4>
                <h4>Speed {speed} sym/min</h4>
            </div>
        )
    }
}

const mapStateToProps = ({ text, numberSentences, loading, error, endApp, accuracy, speed }) =>{
    return { text, numberSentences, loading, error, endApp, accuracy, speed };
};

const mapDispatchToProps =(dispatch, { apiService }) => {
    return{
        fetchText : fetchText(apiService, dispatch),
        changeEnd : (endApp) =>  dispatch(changeEnd(endApp)),
        changeStart : (startApp) =>  dispatch(changeStart(startApp)),
        calculateAccuracy : (accuracy) =>  dispatch(calculateAccuracy(accuracy)),
        calculateSpeed : (speed) =>  dispatch(calculateSpeed(speed))
    }

};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(TextContainer);