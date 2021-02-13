
const initialState = {
    text : [],
    numberSentences : 5,
    loading : true,
    error : null,
    startApp : true,
    endApp : false
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_TEXT_REQUEST' :
            return {
                ...state,
                text : [],
                loading : true,
                error : null
            };
        case 'FETCH_TEXT_SUCCESS':
            return {
                ...state,
                text : action.payload,
                loading : false,
                error : null
            };
        case 'FETCH_TEXT_FAILURE' :
            return {
                ...state,
                text : [],
                loading : false,
                error : action.payload
            };
        case 'CHANGE_START' :
            return {
                ...state,
                startApp : action.payload
            };
        case 'CHANGE_NUMBER_SENTENCES' :
            return {
                ...state,
                numberSentences : action.payload
            };

        default:
            return state;
    }
};

export default reducer;