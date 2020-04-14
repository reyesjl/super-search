import React from 'react';
import Header from '../components/header';
import Link from 'next/link';

class Register extends React.Component {

    // construct component.
    constructor(props) {
        super(props);
    }

    // render register elements.
    render() {
        return (
            <div class='container'>
                <Header />
                <div class="login">
                    <div class="loginForm">
                        <h2>Register</h2>
                        <br />
                        <p id="label">username</p>
                        <p><input type="text"></input></p>
                        <br />
                        <p id="label">password</p>
                        <p><input type="password"></input></p>
                        <br />
                        <p id="label">screenname</p>
                        <p><input type="text"></input></p>
                        <br />
                        <p id="label">zipcode</p>
                        <p><input type="text"></input></p>
                        <p id="loginButton"><button>Signup</button></p>
                    </div>
                </div>
                <p id="formLink">
                            <Link href="/login">
                                <a>Have an account?</a>
                            </Link>
                </p>
            </div>
        )
    }
}

// export component for use.
export default Register;