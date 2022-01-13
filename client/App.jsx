import React from 'react';
import { connect } from 'react-redux';
import MainContainer from './containers/MainContainer.jsx';
import FrontContainer from './containers/FrontContainer.jsx'
import styles from './scss/style.scss'



const mapStateToProps = state => ({
    //  Subscribe to state that we need
    login: state.stocks.login,
});


const App = (props) => {
    const component = [];
    if (!props.login) component.push(<FrontContainer key='FrontContainer'/>);
    else component.push(<MainContainer key='MainContainer'/>);
    
    return (
    <div id="app">
        <h1 id="header">Portfolio Tracker</h1>
        {component}
    </div>
);
}


export default connect(mapStateToProps, null)(App);