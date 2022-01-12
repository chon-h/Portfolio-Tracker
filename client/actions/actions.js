// import axios from 'axios';
import * as types from '../types/actionTypes';

export const buyStock = data => ({
    type: types.BUY,
    payload: data,
});

export const sellStock = data => ({
    type: types.SELL,
    payload: data,
});
