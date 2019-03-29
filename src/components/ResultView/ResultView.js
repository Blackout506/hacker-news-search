import React from 'react';

import './ResultView.css';

const resultView = (props) => {

  return (
    <div className='ResultView'>
      {/* Conditionally render content appropriate to either stories or comments */}
      {props.content === 'story' ?
        <p>Title: {props.title}</p>
        :
        <div>
          <p>Comment Body:</p>
          <div>
            <em>{props.comment}</em>
          </div>
        </div>}
      {/* Render content that will be needed for both stories and comments */}
      <p>Author: {props.author}</p>
      <p>Points: {props.points}</p>
    </div>
  );
};

export default resultView;
