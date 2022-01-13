import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import PortfolioDescription from '../components/PortfolioDescription.jsx'
import PortfolioItems from '../components/PortfolioItems.jsx'

const mapStateToProps = state => ({
    //  Subscribe to state that we need
    portfolio: state.stocks.portfolio,
});

const mapDispatchToProps = dispatch => ({
    syncData: () => dispatch(actions.syncData()),
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

class PortfolioContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.props.syncData();
    }

    render() {
        const PortfolioArr = [];
        const keyArr = Object.keys(this.props.portfolio.stocks);
        keyArr.sort(sorting);
        for (let i = 0; i < keyArr.length; i++) {
            PortfolioArr.push(<PortfolioItems
                ticker={keyArr[i]}
                quantity={this.props.portfolio.stocks[keyArr[i]].quantity}
                cost={this.props.portfolio.stocks[keyArr[i]].cost}
                price={this.props.portfolio.stocks[keyArr[i]].price}
                key={keyArr[i]}
            />);
        }
        return (
            <div className="container">
                <PortfolioDescription />
                {PortfolioArr}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);
