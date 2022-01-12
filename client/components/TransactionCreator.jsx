import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapDispatchToProps = dispatch => ({
    Buy: (data) => dispatch(actions.buyStock(data)),
    Sell: (data) => dispatch(actions.sellStock(data)),
});

const clickFunction = (callback) => {
    const quantity = Number(document.querySelector('#quantity').value);
    const price = Number(document.querySelector('#price').value);
    const ticker = document.querySelector('#ticker').value;
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
            <input id="Buy" type="submit" value="Buy"
                onClick={() => clickFunction(props.Buy)}
            />
            <input id="Sell" type="submit" value="Sell"
                onClick={() => clickFunction(props.Sell)}
            />
        </div>
    </div>
);

export default connect(null, mapDispatchToProps)(TransactionCreator);