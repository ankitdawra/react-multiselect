import React from 'react';

import './selectedOption.scss';

function SelectedOption({id, parentId, displayVal, onDelete}) {
  // console.log('hereeee');
  return (
    <div
      type="button"
      className="btn btn-primary m-1"
      onClick={e => e.stopPropagation()}>
      <span dangerouslySetInnerHTML={{__html: displayVal}}></span>
      <button
        type="button"
        className="close ml-1"
        onClick={e => onDelete(e, id, parentId)}>
        <span>&times;</span>
      </button>
    </div>
  )
}

export default React.memo(SelectedOption);