import { useState } from 'react';

import SelectedOption from './selectedOption.component';
import SelectedOptionsModal from './selectedOptionsModal.component'


const MAX_ELEMENT_DISPLAYED = 2;

function SelectedOptions({selectedOptionsArray, displayKey, onDelete}) {
  console.log('SelectedOptions re-render');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {selectedOptionsArray.map((option, index) => index < MAX_ELEMENT_DISPLAYED && (
        <SelectedOption
          key={option.id}
          id={option.id}
          displayVal={option[displayKey]}
          onDelete={onDelete}/>
        )
      )}
      {selectedOptionsArray.length > MAX_ELEMENT_DISPLAYED && (
        <>
          <div className="pointer m-1"
               onClick={() => setShowModal(true)}>
            <span className="badge badge-secondary">+ {selectedOptionsArray.length - MAX_ELEMENT_DISPLAYED} more</span>
          </div>
          {showModal && 
            <SelectedOptionsModal
              selectedOptionsArray={selectedOptionsArray}
              displayKey={displayKey}
              onDelete={onDelete}
              hideModal={() => setShowModal(false)}
              />
          }
        </>
      )}
    </>
  )
}

export default SelectedOptions