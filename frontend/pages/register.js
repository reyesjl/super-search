import React from 'react';
import Header from '../components/header';
import Router from 'next/router';
import Link from 'next/link';

class Register extends React.Component {

    // construct component.
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", screenname: "", zipcode: ""};
    }

    // handle username textbox
    handleUsername(evt) {
        this.setState({username: evt.target.value});
    }

    // handle password textbox
    handlePassword(evt) {
        this.setState({password: evt.target.value});
    }

    // handle screenname textbox
    handleScreenname(evt) {
        this.setState({screenname: evt.target.value});
    }

    // handle zipcode textbox
    handleZipcode(evt) {
        this.setState({zipcode: evt.target.value});
    }

    // handle register fetch to backend
    async handleRegister(evt) {
        const registerUserReq = await fetch('http://localhost:8080/register', {
            method: 'POST',
            body: JSON.stringify({username: this.state.username, password: this.state.password, screenname: this.state.screenname, zipcode: this.state.zipcode}),
            headers: { 'Content-type': 'application/json' }
        });

        // response from server
        const registerUserRes = await registerUserReq.json();
        
        // handle response
        if(registerUserRes.status == "success") {
            Router.replace("/login");
        } else {
            console.log("Error: " + registerUserRes);
        }
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
                        <p><input onChange={this.handleUsername.bind(this)} value={this.state.username} type="text"></input></p>
                        
                        <br />
                        <p id="label">password</p>
                        <p><input onChange={this.handlePassword.bind(this)} value={this.state.password} type="password"></input></p>
                        
                        <br />
                        <p id="label">screenname</p>
                        <p><input onChange={this.handleScreenname.bind(this)} value={this.state.screenname} type="text"></input></p>
                        
                        <br />
                        <p id="label">zipcode</p>
                        <p><input onChange={this.handleZipcode.bind(this)} value={this.state.zipcode} type="text"></input></p>
                        
                        <p id="loginButton"><button onClick={this.handleRegister.bind(this)}>Signup</button></p>
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