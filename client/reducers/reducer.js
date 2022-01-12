import * as types from '../types/actionTypes';

const initialState = {
    stockList: {},
    realizedGain: 0,
    totalValue: 0,
    totalCost: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.BUY: {
            //  Create an object for the newStock/updateStock
            const Stock = {};

            /* If we do not own the stock already,create assign new properties to it,
            otherwise assign the previous stock object to it */
            if (state.stockList[action.payload.ticker] === undefined) {
                Stock.cost = 0;
                Stock.quantity = 0;
                Stock.price = 100;
            } else Object.assign(Stock, state.stockList[action.payload.ticker]);

            //  Calculate the new cost, quantity and price(to be done)
            const quantity = action.payload.quantity + Stock.quantity;
            const cost = (action.payload.price * action.payload.quantity + Stock.cost * Stock.quantity) / quantity;
            const price = 100; //To be finished later

            //  Assign the updated data to the stock object
            Object.assign(Stock, { quantity, cost, price });

            //  Update the new total cost and new total value
            const totalCost = state.totalCost + action.payload.quantity * action.payload.price;
            const totalValue = state.totalValue + Stock.price * action.payload.quantity;

            //  Update the stockList object
            const updateStockObject = {};
            updateStockObject[action.payload.ticker] = Stock;
            const stockList = Object.assign({}, state.stockList, updateStockObject);

            //  Return the upated states
            return {
                ...state,
                totalCost,
                totalValue,
                stockList
            };
        }

        case types.SELL: {
            //  Create an object for the newStock/updateStock
            const Stock = {};

            /* If we do not own the stock alert user and return, otherwise assign the previous 
            stock object to it */
            if (state.stockList[action.payload.ticker] === undefined) {
                alert('Invalid ticker');
                return state;
            } else Object.assign(Stock, state.stockList[action.payload.ticker]);

            //  Calculate the quantity and assign it to the object if it is not negative
            const quantity = Stock.quantity - action.payload.quantity;
            if (quantity < 0) {
                alert('Invalid quantity');
                return state;
            }
            Object.assign(Stock, { quantity });
            
            //  Update the new total cost and new total value
            const totalCost = state.totalCost - action.payload.quantity * Stock.cost;
            const totalValue = state.totalValue - action.payload.quantity * Stock.price;
            const realizedGain = state.realizedGain + action.payload.quantity * (action.payload.price - Stock.cost);

            //  Make a copy of the current stockList
            const stockList = Object.assign({}, state.stockList);

            /*  If quantity is positive, update the stockList, otherise delete the property from stock list 
            if it is 0 */
            const updateStockObject = {};
            updateStockObject[action.payload.ticker] = Stock;
            if (quantity === 0) delete stockList[action.payload.ticker];
            else Object.assign(stockList, updateStockObject)

            //  Return the upated states
            return {
                ...state,
                totalCost,
                totalValue,
                realizedGain,
                stockList
            };
        }

        //  case types.ADD_CARD: {
        //    const newMarketList = state.marketList.map((market, idx) => {
        //      if (idx === action.payload) {
        //        return {
        //          ...market,
        //          cards: market.cards + 1,
        //        };
        //      }
        //      return market;
        //    });

        //    return {
        //      ...state,
        //      totalCards: state.totalCards + 1,
        //      marketList: newMarketList,
        //      synced: false,
        //    };
        //  }

        //  case types.DELETE_CARD: {
        //    const newMarketList = state.marketList.map((market, idx) => {
        //      if (idx === action.payload) {
        //        return {
        //          ...market,
        //          cards: market.cards - 1,
        //        };
        //      }
        //      return market;
        //    });

        //    return {
        //      ...state,
        //      totalCards: state.totalCards - 1,
        //      marketList: newMarketList,
        //    };
        //  }

        //  case types.SYNC_MARKETS:
        //    return {
        //      ...state,
        //      synced: true,
        //    };

        //  case types.LOAD_MARKETS:
        //    return {
        //      ...state,
        //      totalMarkets: action.payload.length,
        //      totalCards: action.payload.reduce((res, m) => res + m.cards, 0),
        //      marketList: action.payload,
        //    };

        default:
            return state;
    }
};

export default reducer;
