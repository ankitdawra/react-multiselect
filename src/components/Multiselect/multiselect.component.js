import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as TYPES from '../../sagas/Multiselect/types';
import Loader from '../Loader/loader.component';
import Option from './option.component';
import SelectedOption from '../SelectedOptions/selectedOption.component';
import SelectedOptions from '../SelectedOptions/selectedOptions.component';
import './multiselect.scss';

// function debounce(cb, time) {
//   if (timer) {
//     clearTimeout(timer)
//   }
//   timer = setTimeout(() => {
//     cb();
//   }, time)
// }


function MultiSelect({canSelectMultiple}) {
  const [showOptions, toggleOptions] = useState(true);
  const [isMultiSelect, setMultiSelect] = useState(canSelectMultiple);
  const [filterVal, setFilterVal] = useState('');
  const dispatch = useDispatch();

  const {options, loading, selectedData, displayKey} = useSelector(({MultiselectReducer}) => MultiselectReducer);

  useEffect(() => {
    dispatch({type: TYPES.LOADING_ITEMS_START})
  }, [])

  const onCheckHandler = useCallback(({target: {value: id, checked}}, parentId) => {
    // console.log(id, checked, parentId);
    dispatch({
      type: TYPES.ON_ITEM_TOGGLE,
      id,
      checked,
      parentId
    })
  }, []);

  const onMultiSelectClick = () => {
    if (isMultiSelect) {
      dispatch({
        type: TYPES.RESET
      })
    }
    setMultiSelect(!isMultiSelect);
  }

  const onDelete = useCallback((event, id, parentId) => {
    event.stopPropagation();
    dispatch({
      type: TYPES.ON_ITEM_TOGGLE,
      id,
      parentId,
      checked: false
    })
  }, []);

  const handleFilterChange = ({target: {value}}) => {
    setFilterVal(value);
    // debounce(() => {
    dispatch({
      type: TYPES.FILTER_OPTIONS,
      payload: {
        param: value,
        filterParam: displayKey
      }
    });
      // }, 1000);
  }

  const changeViewBy = ({target: {value}}) => {
    console.log(value);
    dispatch({
      type: TYPES.CHANGE_VIEW_BY,
      viewBy: value
    })
  }

  if (loading) {
    return (
      <Loader/>
    )
  }

  let selectedOptionsArray = [];
  if (selectedData.length) {
    selectedOptionsArray = selectedData.map(v => options[v]);
  }

  // console.log(options);
  // console.log('selectedData - '+selectedData);
  // console.log('selectedOptionsArray'); console.log(selectedOptionsArray);
  return (
    <div className="multiselect-view">
      <div>
        <div className="form-inline justify-content-between mb-3">
          <div className="form-group">
            <button type="button"
                    className={`btn form-control ${isMultiSelect ? 'btn-primary' : 'btn-light'}`}
                    onClick={onMultiSelectClick}>
              MultiSelect : {isMultiSelect ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="form-group">
            <select onChange={changeViewBy}
                    className="form-control"
                    value={displayKey}>
              <option>View By</option>
              <option value="title">Title</option>
              <option value="name">Name</option>
              <option value="icon">Icon</option>
            </select>
          </div>
        </div>
        <div>
          <div className="selected-options form-group"
               onClick={() => toggleOptions(!showOptions)}>
            {selectedOptionsArray.length > 0 ? 
              selectedOptionsArray.map(option => 
                <SelectedOption
                  key={option.id}
                  id={option.id}
                  parentId={option.parent}
                  displayVal={option[displayKey]}
                  onDelete={onDelete}/>
              ) : 'Please select a value'}
            <span className={`show-options-icon ${showOptions ? 'open-icon' : 'close-icon'}`}>^</span>
          </div>
          <div className={`form-group options ${showOptions ? 'visible' : null}`}>
            <input
              type="text"
              value={filterVal}
              onChange={handleFilterChange}
              className="form-control"
              placeholder={`Search for a ${displayKey}`}/>
            {Object.values(options).map(option => (
              <React.Fragment key={option.id}>
                {!option.parent && (
                  <Option
                    id={option.id}
                    displayVal={option[displayKey]}
                    hidden={option.hidden}
                    isChecked={option.checked}
                    isDisabled={!isMultiSelect && selectedData.length && !selectedData.includes(option.id) ? true : false}
                    onCheckHandler={onCheckHandler}/>
                )}

                {option.cites && option.cites.map(v => (
                  <Option
                    key={options[v].id}
                    id={options[v].id}
                    displayVal={options[v][displayKey]}
                    hidden={options[v].hidden}
                    isChecked={options[v].checked}
                    isDisabled={!isMultiSelect && selectedData.length && !selectedData.includes(options[v].id) ? true : false}
                    onCheckHandler={onCheckHandler}
                    parentId={option.id}/>
                  ) 
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-light btn-lg btn-block mb-2">Selected Items</button>
        {selectedOptionsArray.length > 0 && 
          <SelectedOptions
            selectedOptionsArray={selectedOptionsArray}
            displayKey={displayKey}
            onDelete={onDelete}/>
        }
      </div>
    </div>
  )
}

export default MultiSelect;