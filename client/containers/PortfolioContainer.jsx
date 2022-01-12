import React from 'react';
import { connect } from 'react-redux';
import PortfolioDescription from '../components/PortfolioDescription.jsx'
import PortfolioItems from '../components/PortfolioItems.jsx'

const mapStateToProps = state => ({
    //  Subscribe to state that we need
    portfolioItem: state.stocks.portfolio.stocks,
});

function sorting(a, b) {
    if (a.length === 0 && b.length === 0) return 0;
    else if (a.length === 0) return -1;
    else if (b.length === 0) return 1;

    if (a[0].toLowerCase() > b[0].toLowerCase()) return 1;
    else if ((a[0].toLowerCase() < b[0].toLowerCase())) return -1;
    else return sorting(a.slice(1), b.slice(1));
}
// const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const PortfolioContainer = props => {
    const PortfolioArr = [];
    const keyArr = Object.keys(props.portfolioItem);
    keyArr.sort(sorting);
    for (let i = 0; i < keyArr.length; i++) {
        PortfolioArr.push(<PortfolioItems
            ticker={keyArr[i]}
            quantity={props.portfolioItem[keyArr[i]].quantity}
            cost={props.portfolioItem[keyArr[i]].cost}
            price={props.portfolioItem[keyArr[i]].price}
            key={keyArr[i]}
        />);
    }

    return (
        <div className="container">
            <PortfolioDescription />
            {PortfolioArr}
        </div>
    )
};

export default connect(mapStateToProps, null)(PortfolioContainer);
