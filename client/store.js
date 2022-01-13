
import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import reducers from './reducers/index';
import { getData } from './actions/actions'

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(
    reducers,
    applyMiddleware(thunk),
);

// store.dispatch(getData());

export default store;