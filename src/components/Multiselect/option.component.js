import React from 'react';

function Option({id, displayVal, hidden, isChecked, isDisabled, onCheckHandler, parentId}) {
  // console.log(id);
  if (hidden) {
    return null;
  }
  return (
    <>
      <div className={`form-check option ${parentId ? 'pl-5' : undefined}`}>
        <label className="form-check-label d-block">
          <input
            type="checkbox"
            className="form-check-input"
            onChange={e => onCheckHandler(e, parentId)}
            value={id}
            disabled={isDisabled}
            checked={isChecked}/>
          <div dangerouslySetInnerHTML={{__html: displayVal}}></div>
        </label>
      </div>
    </>
  )
}

export default React.memo(Option);