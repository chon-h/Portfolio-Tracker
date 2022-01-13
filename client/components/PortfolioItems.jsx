import React from 'react';

const PortfolioItems = (props) => (
    <div className='portfolioItems'>
        <div>{props.ticker}</div>
        <div>{props.quantity}</div>
        <div>{props.cost.toFixed(2)}</div>
        <div>{(props.cost * props.quantity).toFixed(2)}</div>
        <div>{props.price.toFixed(2)}</div>
        <div>{(props.price * props.quantity).toFixed(2)}</div>
        <div>{(props.price * props.quantity - props.cost * props.quantity).toFixed(2)}</div>
    </div>
);

export default PortfolioItems;
