import React from 'react';

import './selectedOption.scss';

function SelectedOption({id, displayVal, onDelete}) {
  console.log('hereeee');
  return (
    <div
      type="button"
      className="btn btn-primary m-1"
      onClick={e => e.stopPropagation()}>
      {displayVal}
      <button
        type="button"
        className="close ml-1"
        onClick={e => onDelete(e, id)}>
        <span>&times;</span>
      </button>
    </div>
  )
}

export default React.memo(SelectedOption);