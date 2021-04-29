import React from 'react';

function Option({id, name, isChecked, onCheckHandler, isDisabled, hidden}) {
  console.log(id);
  if (hidden) {
    return null;
  }
  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={onCheckHandler}
          value={id}
          disabled={isDisabled}
          checked={isChecked}/>
        {name}
      </label>
    </div>
  )
}

export default React.memo(Option);