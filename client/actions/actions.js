// import axios from 'axios';
import * as types from '../types/actionTypes';
import axios from 'axios';

export const buyStock = data => ({
    type: types.BUY,
    payload: data,
});

export const sellStock = data => ({
    type: types.SELL,
    payload: data,
});

export const syncData = () => (dispatch, getState) => {
    axios.put('/portfolio', getState().stocks.portfolio)
        .then(({ status }) => {
            if (status === 200) dispatch({ type: types.SYNCDATA });
        })
        .catch(console.error);
};