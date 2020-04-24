import React from 'react';
import Header from '../components/header';
import Link from 'next/link';
import Router from 'next/router';
import jsCookie from 'js-cookie';

class Login extends React.Component {

    // construct component.
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
    }

    // handle username textbox
    handleUsername(evt) {
        this.setState({username: evt.target.value});
    }

    // handle password textbox
    handlePassword(evt) {
        this.setState({password: evt.target.value});
    }

    // handle login fetch to backend
    async handleLogin(evt) {
        const loggedInUserReq = await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
            headers: { 'Content-type': 'application/json' }
        });

        // response from server
        const loggedInUser = await loggedInUserReq.json();
        
        // handle response
        if(loggedInUser.status == "success") {
            console.log(this.state.username + " has been logged in!");
            
            // set cookies
            jsCookie.remove('screenname');
            jsCookie.remove('zipcode');
            jsCookie.remove('username');
            jsCookie.remove('password');
            jsCookie.set('screenname', loggedInUser.screenname);
            jsCookie.set('zipcode', loggedInUser.zipcode);
            jsCookie.set('username', loggedInUser.username);
            jsCookie.set('password', loggedInUser.password);
            Router.replace("/");
        } else {
            console.log("Error: " + loggedInUser);
        }
    }

    // render login elements.
    render() {
        return (
            <div class='container'>
                <Header />
                <div class="login">
                    <div class="loginForm">
                        <h2>Login</h2>
                        <br />
                        <p id="label">username</p>
                        <p><input onChange={this.handleUsername.bind(this)} value={this.state.username} type="text"></input></p>
                        <br />
                        <p id="label">password</p>
                        <p><input onChange={this.handlePassword.bind(this)} value={this.state.password} type="password"></input></p>
                        <p id="loginButton"><button onClick={this.handleLogin.bind(this)}>Login</button></p>
                    </div>
                </div>
                <p id="formLink">
                            <Link href="/register">
                                <a>Register account?</a>
                            </Link>
                </p>
            </div>
        )
    }
}

// export component for use.
export default Login;