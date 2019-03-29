import * as actionTypes from '../actions/actionTypes';

const initialState = {
  searchHistory: [],
  loading: false,
  results: [],
  error: null
};

//Functions to get results
const getResultsStart = (state, action) => {
  let updatedQueryList = state.searchHistory;
  updatedQueryList.push(action.query);
	return {
		...state,
    searchHistory: updatedQueryList,
		loading: true
	};
};

const getResultsSuccess = (state, action) => {
	return {
		...state,
    loading: false,
		results: action.results
	};
};

const getResultsFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error
	};
};



const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get results cases
    case actionTypes.GET_RESULTS_START: return getResultsStart(state, action);
    case actionTypes.GET_RESULTS_SUCCESS: return getResultsSuccess(state, action);
    case actionTypes.GET_RESULTS_FAIL: return getResultsFail(state, action);
    default: return state;
  };
};

export default searchReducer;
