import Portal from '../Common/portal.component';
import SelectedOption from './selectedOption.component';
import './modal.scss';

function SelectedOptionsModal({selectedOptionsArray, displayKey, onDelete, hideModal}) {
  return (
    <Portal>
      <div className="modal modal-wrapper">
        <div className="backdrop" onClick={hideModal}></div>
        <div className="modal-content">
          <div className="modal-body">
            {selectedOptionsArray.map(option => (
              <SelectedOption
                key={option.id}
                id={option.id}
                displayVal={option[displayKey]}
                onDelete={onDelete}/>
              )
            )}
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default SelectedOptionsModal;