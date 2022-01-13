import React from 'react';
import TransactionCreator from '../components/TransactionCreator.jsx';
import PortfolioContainer from './PortfolioContainer.jsx';
import PerformanceContainer from './PerformanceContainer.jsx';

const MainContainer = props => (
    <div className="outerBox">
        {/* <h1 id="header">Portfolio Tracker</h1> */}
        <TransactionCreator />
        <PortfolioContainer />
        <PerformanceContainer/>
    </div>
);

export default MainContainer;