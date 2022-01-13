// import axios from 'axios';
import * as types from '../types/actionTypes';
import axios from 'axios';

export const buyStock = data => (dispatch, getState) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${data.ticker}&apikey=S2X573W01BT65SFA`;
    axios.get(url)
      .then(response => response.data)
      .then(response => {
        const lastestDate = response['Meta Data']['3. Last Refreshed'];
        const latestPrice = response['Time Series (Daily)'][lastestDate]['4. close'];
        data.currentPrice = Number(latestPrice);
        dispatch({
            type: types.BUY,
            payload: data,
        });
      })
      .catch(console.error);
};

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

export const getData = () => (dispatch, getState) => {
    axios.get('/portfolio')
        .then((data) => {
            dispatch({ 
                type: types.GETDATA, 
                payload: data.data
            });
        })
        .catch(console.error);
};

export const updatePrice = () => (dispatch, getState) => {
    axios.get('/portfolio/update')
        .then((data) => {
            dispatch({ 
                type: types.GETDATA, 
                payload: data.data
            });
        })
        .catch(console.error);
};

export const login = () => ({
    type: types.LOGIN,
});

export const reset = () => (dispatch, getState) => {
    axios.put('/portfolio/reset')
        .then((data) => {
            dispatch({
                type: types.RESET,
            });
        })
        .catch(console.error);
};
