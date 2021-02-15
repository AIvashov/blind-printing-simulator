const textRequested = () => {
    return {
        type : 'FETCH_TEXT_REQUEST'
    }
};

const textLoaded = (newText) => {
    return {
        type : 'FETCH_TEXT_SUCCESS',
        payload : newText
    };
};

const textError = (error) => {
    return {
        type : 'FETCH_TEXT_FAILURE',
        payload : error
    }
};

const fetchText = (apiService, dispatch) => (numberSentences = 5) => {
    dispatch(textRequested());
    apiService.getText(numberSentences)
        .then((text) => dispatch(textLoaded(text)))
        .catch((error) => dispatch(textError(error)));
};

const changeStart = (startApp) => {
    return {
        type : 'CHANGE_START',
        payload : !startApp
    };
};

const changeEnd = (endApp) => {
    return {
        type : 'CHANGE_END',
        payload : !endApp
    };
};

const choiceNumberSentences = (value) => {
    return {
        type : 'CHANGE_NUMBER_SENTENCES',
        payload : value
    };
};

const calculateAccuracy = (accuracy) => {
    return {
        type : 'CALCULATE_ACCURACY',
        payload : accuracy
    };
};

const calculateSpeed = (speed) => {
    return {
        type : 'CALCULATE_SPEED',
        payload : speed
    };
};

export {
    fetchText,
    changeStart,
    changeEnd,
    choiceNumberSentences,
    calculateAccuracy,
    calculateSpeed
};