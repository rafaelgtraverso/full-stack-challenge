import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import dataReducer from './reducers/dataReducer';


const rootReducer = combineReducers({
    dataReducer:dataReducer,
});

const middleware = applyMiddleware(promise,thunk,createLogger());

const configureStore = () => createStore(rootReducer,middleware);

export default configureStore;