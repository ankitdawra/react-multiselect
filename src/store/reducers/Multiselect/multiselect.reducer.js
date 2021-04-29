import * as TYPES from './multiselect.types';
import {options} from '../../../constants';

let updatedOptions;
const initialState = {
  isMultiSelect: true,
  options: {},
  loading: false,
  selectedData: []
}

function MultiselectReducer(state = initialState, action) {
  switch(action.type) {
    case TYPES.LOADING_ITEMS_START:
      return {
        ...state,
        options: {},
        selectedData: [],
        loading: true
      }

    case TYPES.LOADING_ITEMS_STOP:
      return {
        ...state,
        options: action.options,
        loading: false
      }

    case TYPES.PUSH_ITEM: 
      // updatedOptions = state.options.map(op => {
      //   if (op.id == action.payload) {
      //     return {
      //       ...op,
      //       checked: true
      //     }
      //   }
      //   return op;
      // });
      state.options[action.payload] = {
        ...state.options[action.payload],
        checked: true
      }
      return {
        ...state,
        selectedData: state.selectedData.concat(parseInt(action.payload)),
        // options: updatedOptions
      };

    case TYPES.PULL_ITEM:
      // updatedOptions = state.options.map(op => {
      //   if (op.id == action.payload) {
      //     return {
      //       ...op,
      //       checked: false
      //     }
      //   }
      //   return op;
      // });
      state.options[action.payload] = {
        ...state.options[action.payload],
        checked: false
      }
      return {
        ...state,
        selectedData: state.selectedData.filter(v => v !== parseInt(action.payload)),
        // options: updatedOptions
      };

    case TYPES.RESET:
      return {
        ...state,
        options: {},
        selectedData: []
      }

    case TYPES.FILTER_OPTIONS:
      const filteredOptions = {...state.options};
      for(let id in filteredOptions) {
        filteredOptions[id].hidden = 
          action.param && 
          (!filteredOptions[id].name.toLowerCase().includes(action.param.toLowerCase()))
      }
      return {
        ...state,
        options: filteredOptions
      }

    default:
      return state;
  }
}

export default MultiselectReducer;