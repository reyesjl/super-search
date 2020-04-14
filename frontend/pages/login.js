import React from 'react';
import Header from '../components/header';
import Link from 'next/link';

class Login extends React.Component {

    // construct component.
    constructor(props) {
        super(props);
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
                        <p><input type="text"></input></p>
                        <br />
                        <p id="label">password</p>
                        <p><input type="password"></input></p>
                        <p id="loginButton"><button>Login</button></p>
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