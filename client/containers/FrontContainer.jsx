import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(actions.login(data)),
    signup: (data) => dispatch(actions.signup(data))
});

const clickFunction = (callback) => {
    const usernameTag = document.querySelector('#username');
    const passwordTag = document.querySelector('#passowrd');
    const username = usernameTag.value;
    const password = passwordTag.value;
    // usernameTag.value = null;
    // passwordTag.value = null;
    callback({ username, password });
}

const FrontContainer = props => {
    return (
        <div className="loginBox">
            <div className="box" id="usernameBox">
                <label htmlFor="" className='label' id='label'>Username:</label>
                <input id="username" className="input-box" type="text" />
            </div>
            <div className="box" id="passowrdBox">
                <label htmlFor="">Password:</label>
                <input id="passowrd" className="input-box" type="password" />
            </div>
            <div className="box action-buttons">
                <input id="login" type="button" value="Login"
                    onClick={() => clickFunction(props.login)}
                />
                <input id="signup" type="button" value="Sign Up"
                    onClick={() => clickFunction(props.signup)}
                />
            </div>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(FrontContainer);
