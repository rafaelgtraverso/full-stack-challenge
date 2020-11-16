import {
    FETCH_DATA,
} from './types';

export const getData = (data) =>(
    {
        type: FETCH_DATA,
        payload:data,
    }
);
