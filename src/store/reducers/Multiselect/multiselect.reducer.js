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

    case TYPES.PUSH_ITEM: {
      const {options} = state;
      const {id, parentId} = action.payload;

      // To handle current clicked item
      options[id] = {
        ...options[id],
        checked: true
      }

      // To handle current checked item's cites
      const cites = options[id].cites || [];
      if (cites.length) {
        cites.map(cityId => {
          options[cityId] = {
            ...options[cityId],
            checked: true
          }
        })
      }

      // To handle parent if all cites checked
      if (parentId) {
        const parent = options[parentId];
        const everyCityChecked = parent.cites.every(cityId => options[cityId].checked)
        if(everyCityChecked) {
          options[parentId] = {
            ...options[parentId],
            checked: true
          }
        }
      }

      return {
        ...state,
        selectedData: Object.values(options).map(v => v.checked ? v.id : null).filter(v => v)
        // selectedData: [...new Set(state.selectedData.concat(parseInt(id), cites))],
      };
    }

    case TYPES.PULL_ITEM: {
      console.log(state);
      const {options} = state;
      const {id, parentId} = action.payload;
      console.log(id, parentId);

      // To handle current clicked item
      options[id] = {
        ...options[id],
        checked: false
      }

      // To handle current checked item's cites
      const cites = options[id].cites || [];
      if (cites.length) {
        cites.map(cityId => {
          options[cityId] = {
            ...options[cityId],
            checked: false
          }
        })
      }

      // To handle parent if all cites are not checked
      if (parentId) {
        const parent = options[parentId];
        const everyCityChecked = parent.cites.every(cityId => options[cityId].checked);
        if(!everyCityChecked) {
          options[parentId] = {
            ...options[parentId],
            checked: false
          }
        }
      }

      return {
        ...state,
        selectedData: Object.values(options).map(v => v.checked ? v.id : null).filter(v => v)
        // selectedData: state.selectedData.filter(v => {
        //   return v !== parseInt(id) && cites.indexOf(v) !== -1;
        // }),
      };
    }

    case TYPES.RESET:
      return {
        ...state,
        options: {},
        selectedData: []
      }

    case TYPES.FILTER_OPTIONS:
      const filteredOptions = {...state.options};
      const {param, filterParam} = action.payload;
      for(let id in filteredOptions) {
        filteredOptions[id].hidden = 
          param && 
          (!filteredOptions[id][filterParam].toLowerCase().includes(param.toLowerCase()))
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