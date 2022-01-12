import React from 'react';

const PerformanceData = (props) => (
    <div className='performanceDisplay'>
        <div>{props.totalCost}</div>
        <div>{props.totalValue}</div>
        <div>{props.totalValue - props.totalCost}</div>
        <div>{props.realizedGain}</div>
    </div>
);

export default PerformanceData;
