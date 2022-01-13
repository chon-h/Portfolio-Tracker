import * as types from '../types/actionTypes';

const initialState = {
    portfolio: {
        stocks:{},
        realizedGain: 0,
    },
    totalValue: 0,
    totalCost: 0,
    updated: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.BUY: {
            //  Check if the form is filled in correctly
            if (isNaN(action.payload.quantity)|| isNaN(action.payload.price) || action.payload.ticker == ''){
                alert('Please fill in the form correctly');
                return state;
            }
            //  Create an object to store the updated information for the stock we are trying to add position 
            const stock = {};

            /* If we do not own the stock already,create assign new properties to it,
            otherwise assign the previous stock object to it */
            if (state.portfolio.stocks[action.payload.ticker] === undefined) {
                stock.cost = 0;
                stock.quantity = 0;
                stock.price = 0;
            } else Object.assign(stock, state.portfolio.stocks[action.payload.ticker]);

            //  Calculate the new cost, quantity and price(to be done)
            const quantity = action.payload.quantity + stock.quantity;
            const cost = (action.payload.price * action.payload.quantity + stock.cost * stock.quantity) / quantity;
            const price = action.payload.currentPrice;; //To be finished later

            //  Assign the updated data to the stock object
            Object.assign(stock, { quantity, cost, price });
            // console.log(stock);

            //  Update the new total cost and new total value
            const totalCost = state.totalCost + action.payload.quantity * action.payload.price;
            const totalValue = state.totalValue + stock.price * action.payload.quantity;

            //  Update the portfolio object
            const updatedStock = {};
            updatedStock[action.payload.ticker] = stock;
            // console.log(updatedStock);
            const updateStocksObject = Object.assign({}, state.portfolio.stocks, updatedStock);
            // console.log(updateStocksObject);
            const portfolio = Object.assign({}, state.portfolio, {stocks: updateStocksObject});

            //  Return the upated states
            return {
                ...state,
                totalCost,
                totalValue,
                portfolio,
            };
        }

        case types.SELL: {
            //  Check if the form is filled in correctly
            if (isNaN(action.payload.quantity)|| isNaN(action.payload.price) || action.payload.ticker == ''){
                alert('Please fill in the form correctly');
                return state;
            }

            //  Create an object for the newStock/updateStock
            const stock = {};

            /* If we do not own the stock alert user and return, otherwise assign the previous 
            stock object to it */
            if (state.portfolio.stocks[action.payload.ticker] === undefined) {
                alert('You do not own the stock!');
                return state;
            } else Object.assign(stock, state.portfolio.stocks[action.payload.ticker]);

            //  Calculate the quantity and assign it to the object if it is not negative
            const quantity = stock.quantity - action.payload.quantity;
            if (quantity < 0) {
                alert('Invalid quantity');
                return state;
            }
            Object.assign(stock, { quantity });

            //  Update the new total cost and new total value
            const totalCost = state.totalCost - action.payload.quantity * stock.cost;
            const totalValue = state.totalValue - action.payload.quantity * stock.price;
            const realizedGain = state.portfolio.realizedGain + action.payload.quantity * (action.payload.price - stock.cost);

            //  Create a placeholder for the updated portfolio
            const portfolio = {};
            
            /*  If quantity is positive, update the portfolio, otherise delete the property from stock list 
            if it is 0 */
            const updatedStock = {};
            updatedStock[action.payload.ticker] = stock;
            const updateStocksObject = Object.assign({}, state.portfolio.stocks, updatedStock);
            Object.assign(portfolio, {stocks: updateStocksObject}, { realizedGain });
            if (quantity === 0) delete portfolio.stocks[action.payload.ticker];

            //  Return the upated states
            return {
                ...state,
                totalCost,
                totalValue,
                portfolio,
            };
        }

        case types.SYNCDATA:{
            return state;
        }

        case types.GETDATA:{
            //  Create placeholder and compute total cost and total value
            let totalCost = 0;
            let totalValue = 0;
            if (action.payload.stocks){
                for (const key in action.payload.stocks){
                    totalCost += action.payload.stocks[key].cost * action.payload.stocks[key].quantity;
                    totalValue += action.payload.stocks[key].price * action.payload.stocks[key].quantity;
                }
                return {
                    ...state,
                    portfolio: action.payload,
                    totalCost,
                    totalValue
                }
            }else return state;
            //  Update state according to our database data
            
        }

        default:
            return state;
    }
};

export default reducer;
