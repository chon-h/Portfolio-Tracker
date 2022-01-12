import React from 'react';

const PortfolioItems = (props) => (
    <div className='portfolioItems'>
        <div>{props.ticker}</div>
        <div>{props.quantity}</div>
        <div>{props.cost}</div>
        <div>{props.cost * props.quantity}</div>
        <div>{props.price}</div>
        <div>{props.price * props.quantity}</div>
        <div>{props.price * props.quantity - props.cost * props.quantity}</div>
    </div>
);

export default PortfolioItems;
