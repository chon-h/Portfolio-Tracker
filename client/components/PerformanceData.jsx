import React from 'react';

const PerformanceData = (props) => (
    <div className='performanceDisplay'>
        <div>{props.totalCost.toFixed(2)}</div>
        <div>{props.totalValue.toFixed(2)}</div>
        <div>{(props.totalValue - props.totalCost).toFixed(2)}</div>
        <div>{props.realizedGain.toFixed(2)}</div>
    </div>
);

export default PerformanceData;
