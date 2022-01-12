import React from 'react';
import { connect } from 'react-redux';
import PerformanceDescription from '../components/PerformanceDescription.jsx'
import PerformanceData from '../components/PerformanceData.jsx'

const mapStateToProps = state => ({
    //  Subscribe to state that we need
    totalValue: state.stocks.totalValue,
    totalCost: state.stocks.totalCost,
    realizedGain: state.stocks.portfolio.realizedGain,
});

const PerformanceContainer = props => (
    <div className="container">
        <PerformanceDescription />
        <PerformanceData
            totalValue={props.totalValue}
            totalCost={props.totalCost}
            realizedGain={props.realizedGain}
        />
    </div>
);

export default connect(mapStateToProps, null)(PerformanceContainer);

