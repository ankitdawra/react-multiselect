import {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as TYPES from '../../sagas/Multiselect/types';
import Loader from '../Loader/loader.component';
import Option from './option.component';

// function debounce(cb, time) {
//   if (timer) {
//     clearTimeout(timer)
//   }
//   timer = setTimeout(() => {
//     cb();
//   }, time)
// }


function MultiSelect() {
  const [showOptions, toggleOptions] = useState(true);
  const [isMultiSelect, setMultiSelect] = useState(true);
  const [filterVal, setFilterVal] = useState('');
  const dispatch = useDispatch();

  const {options, loading, selectedData} = useSelector(({MultiselectReducer}) => MultiselectReducer);

  useEffect(() => {
    dispatch({type: TYPES.LOADING_ITEMS_START})
  }, [])

  const onCheckHandler = useCallback(({target: {value: id, checked}}) => {
    console.log(id, checked);
    dispatch({
      type: TYPES.ON_ITEM_TOGGLE,
      id,
      checked
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

  const onPull = () => {
    dispatch({
      type: TYPES.ON_ITEM_TOGGLE,
      id:1,
      checked: false
    })
  }

  const handleFilterChange = ({target: {value}}) => {
    setFilterVal(value);
    // debounce(() => {
    dispatch({
      type: TYPES.FILTER_OPTIONS,
      param: value
    });
      // }, 1000);
  }

  if (loading) {
    return (
      <Loader/>
    )
  }

  console.log(options);
  console.log(selectedData);

  return (
    <>
      <div>
        <button className="btn btn-default"
                onClick={onMultiSelectClick}>
          MultiSelect : {isMultiSelect ? 'ON' : 'OFF'}
        </button>
        <button className="btn btn-default"
                onClick={onPull}>
          Pull me
        </button>
        <div onClick={() => toggleOptions(!showOptions)}>
          {selectedData.length ? selectedData.join(',') : 'Please select a value'}
        </div>
        {showOptions && (
          <div>
            <input
              type="text"
              value={filterVal}
              onChange={handleFilterChange}/>
            {Object.values(options).map(({id, name, checked, hidden}) => (
              <Option
                key={id}
                id={id}
                name={name}
                isChecked={checked}
                hidden={hidden}
                isDisabled={!isMultiSelect && selectedData.length && !selectedData.includes(id) ? true : false}
                onCheckHandler={onCheckHandler}/>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default MultiSelect;