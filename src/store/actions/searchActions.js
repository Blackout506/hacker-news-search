import * as actionTypes from './actionTypes';
import axios from "axios";

// Actions for obtaining results
export const getResultsStart = (query) => {
	return {
		type: actionTypes.GET_RESULTS_START,
    query: query
	};
};

export const getResultsFail = (error) => {
	return {
		type: actionTypes.GET_RESULTS_FAIL,
		error: error
	};
};

export const getResultsSuccess = (resultList) => {
	return {
		type: actionTypes.GET_RESULTS_SUCCESS,
		results: resultList
	};
};

export const getResults = (query, searchBy) => {
	return dispatch => {
		dispatch(getResultsStart(query));
    let url = 'http://hn.algolia.com/api/v1/search?query=' + query;
    //Change our url based on the user's choice to search for stories or comments
    if (searchBy === 'story') {
      url += '&tags=story';
    }
    else if (searchBy === 'comment') {
      url += '&tags=comment';
    }
    let resultList = [];
    axios.get(url)
  	  .then(response => {
        response.data.hits.map((hit) => {
          resultList.push({
            title: hit.title,
            comment: hit.comment_text,
            author: hit.author,
            points: hit.points
          });
          return resultList;
        });
		    dispatch(getResultsSuccess(resultList));
		  })
		  .catch(err => {
			  console.log(err);
			  dispatch(getResultsFail(err));
		});
	}
}
