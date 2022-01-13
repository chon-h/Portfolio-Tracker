import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(actions.login()),
});

const FrontContainer = props => {
    return (
        <div className="loginBox">
            <div className="box" id="usernameBox">
                <label htmlFor="" className='label' id='label'>Username:</label>
                <input id="username" className="input-box" type="text" />
            </div>
            <div className="box" id="passowrdBox">
                <label htmlFor="">Password:</label>
                <input id="passowrd" className="input-box" type="text" />
            </div>
            <div className="box action-buttons">
                <input id="login" type="button" value="Login"
                    onClick={props.login}
                />
                <input id="signup" type="button" value="Sign Up"
                    onClick={props.login}
                />
            </div>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(FrontContainer);
