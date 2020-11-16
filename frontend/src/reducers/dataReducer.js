import {FETCH_DATA} from '../actions/types';

const initialState = {
    data: [],
};

const dataReducer = (state = initialState, action) =>{
    switch (action.type){
        case FETCH_DATA:
           return {
               data: action.payload,
            };
        default:
            return state;
    }
}

export default dataReducer;