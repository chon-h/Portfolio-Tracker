import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapDispatchToProps = dispatch => ({
    Buy: (data) => dispatch(actions.buyStock(data)),
    Sell: (data) => dispatch(actions.sellStock(data)),
});

const clickFunction = (callback) => {
    const quantityTag = document.querySelector('#quantity');
    const priceTag = document.querySelector('#price');
    const tickerTag = document.querySelector('#ticker');
    const quantity = Number(quantityTag.value);
    const price = Number(priceTag.value);
    const ticker = tickerTag.value;
    quantityTag.value = null;
    priceTag.value = null;
    tickerTag.value = null;
    callback({ quantity, price, ticker });
}

const TransactionCreator = (props) => (
    <div className="creator">
        <div className="box">
            <label htmlFor="" className='label' id='label'>Stock Ticker:</label>
            <input id="ticker" className="input-box" type="text" />
        </div>
        <div className="box">
            <label htmlFor="">Quantity:</label>
            <input id="quantity" className="input-box" type="text" />
        </div>
        <div className="box">
            <label htmlFor="">Price:</label>
            <input id="price" className="input-box" type="text" />
        </div>
        <div className="box action-buttons">
            <input id="Buy" type="button" value="Buy"
                onClick={() => clickFunction(props.Buy)}
            />
            <input id="Sell" type="button" value="Sell"
                onClick={() => clickFunction(props.Sell)}
            />
        </div>
    </div>
);

export default connect(null, mapDispatchToProps)(TransactionCreator);